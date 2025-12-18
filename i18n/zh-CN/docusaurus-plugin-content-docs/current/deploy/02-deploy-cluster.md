# 集群部署

:::info 适用场景
本指南适用于 **Steedos 企业版** 用户。
通过集群部署，您可以实现系统的高可用性 (High Availability) 和横向扩展能力，支持更多的并发用户。
:::

## 架构概览

在单机部署中，Steedos 通常只有一个实例。而在集群部署中，我们将架构升级为：

  * **负载均衡器 (Traefik)**：作为流量入口，将用户请求分发给后端的多个 Steedos 实例。
  * **应用集群 (Steedos Replicas)**：同时运行多个 Steedos 容器（默认配置为 2 个），共同分担业务压力。
  * **会话保持 (Sticky Sessions)**：通过 Cookie 确保同一个用户的连续请求（特别是 WebSocket 长连接）始终转发给同一个 Steedos 实例。
  * **MongoDB 副本集 (Replica Set)**：开启 Oplog 功能，确保多个实例之间的数据实时同步。

## 部署步骤

### 1\. 创建部署目录

在服务器上创建一个新的目录，用于存放集群配置文件。

```bash
mkdir steedos-cluster
cd steedos-cluster
```

### 2\. 创建配置文件

新建 `docker-compose.yml` 文件，并写入以下内容。

:::warning 注意事项

  * 请务必在 `STEEDOS_LICENSE` 中填入您的企业版授权码。
  * `ROOT_URL` 必须修改为您实际访问的域名或 IP，否则图片和链接可能无法正常显示。
:::

<!-- end list -->

```yaml
version: "3"

services:
  # 1. 流量网关与负载均衡 (Traefik)
  traefik:
    image: traefik:v3.5
    command:
      - "--api.insecure=true"      # 开启 Dashboard (8080端口)
      - "--providers.docker=true"  # 监听 Docker 事件
      - "--entrypoints.web.address=:80" # 定义 Web 入口
    ports:
      - "80:80"     # Web 访问端口
      - "8080:8080" # Traefik 管理面板端口
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  # 2. Steedos 企业版集群
  steedos:
    image: steedos/steedos-enterprise:3.0
    deploy:
      replicas: 2   # 核心配置：设置启动 2 个实例
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:5100/"]
      interval: 30s
      timeout: 5s
      retries: 3
    # Traefik 动态配置标签
    labels:
      - traefik.enable=true
      - traefik.http.routers.steedos.rule=PathPrefix(`/`)
      - traefik.http.routers.steedos.entrypoints=web
      - traefik.http.services.steedos.loadbalancer.server.port=80 # 容器内部服务端口
      # --- 关键配置：会话保持 (Sticky Session) ---
      # 必须开启，否则 Socket.io 连接会断开
      - traefik.http.services.steedos.loadbalancer.sticky.cookie=true
      - traefik.http.services.steedos.loadbalancer.sticky.cookie.name=steedos_session
    volumes:
      - './steedos-storage:/steedos-storage' # 附件存储（生产环境建议使用 S3/MinIO 对象存储）
      - './.steedos:/app/.steedos'           # 代码与元数据挂载
    environment:
      - STEEDOS_LICENSE=your_license_key_here  # 请在此填入 License
      - ROOT_URL=http://127.0.0.1              # 请修改为实际域名
      - MONGO_URL=mongodb://mongodb:27017/steedos

  # 3. 缓存服务
  redis:
    image: redis:6.2.10
    # 关闭持久化以提升性能，主要用于缓存和 Pub/Sub
    command: "redis-server --save \"\" --appendonly no --loglevel warning"
    ports:
      - "6379:6379"
 
  # 4. 数据库 (自动初始化副本集)
  mongodb:
    image: mongo:7.0
    ports:
      - 27017:27017
    # 启动命令包含自动初始化 Replica Set 的脚本
    command: >
      bash -c "
        mongod --replSet steedos --bind_ip_all --quiet --logpath /var/log/mongodb/mongodb.log --logappend &
        echo '=> Waiting for MongoDB to start ...';
        until mongosh --eval 'db.runCommand(\"ping\").ok' --quiet | grep 1; do
          sleep 2;
        done;
        echo '=> Initiating replica set ...';
        mongosh --eval 'rs.initiate({_id: \"steedos\", members: [{_id: 0, host: \"localhost:27017\"}]})';
        wait
      "
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh --quiet | grep 1
      interval: 10s
      timeout: 10s
      retries: 5
    volumes:
      - 'steedos-mongodb:/data/db'

volumes:
  steedos-mongodb:
    driver: local
```

### 3\. 启动集群

在目录下执行以下命令启动所有服务：

```bash
docker-compose up -d
```

等待几分钟，查看服务状态：

```bash
docker-compose ps
```

您应该能看到 `steedos` 服务有 2 个容器在运行（例如 `steedos-cluster-steedos-1` 和 `steedos-cluster-steedos-2`）。

-----

## 核心配置解析

### 1\. 为什么要配置 Sticky Session？

在 `labels` 部分，我们配置了：

```yaml
- traefik.http.services.steedos.loadbalancer.sticky.cookie=true
- traefik.http.services.steedos.loadbalancer.sticky.cookie.name=steedos_session
```

Steedos 的实时通信依赖于 WebSocket (Socket.io)。WebSocket 建立连接的过程需要多次握手。如果负载均衡器把第一次握手发给了实例 A，第二次握手发给了实例 B，连接就会失败。
开启 **Sticky Session** 后，Traefik 会给浏览器植入一个 Cookie，保证该用户后续的所有请求都固定转发给同一个实例。

### 2\. MongoDB 副本集的必要性

配置文件中 MongoDB 的启动命令非常长，它的作用是**自动初始化副本集 (Replica Set)**。
Steedos 依赖 MongoDB 的 **Oplog (操作日志)** 来实现实时的消息推送。只有在副本集模式下，MongoDB 才会生成 Oplog。单机版 MongoDB 默认是不支持的，所以这里必须使用特殊脚本启动。

### 3\. 如何扩容 (Scale Out)？

如果您的用户量增加，需要更多服务器资源，只需修改 `docker-compose.yml` 中的 `replicas` 数量：

```yaml
deploy:
  replicas: 4  # 从 2 改为 4
```

然后重新运行更新命令：

```bash
docker-compose up -d
```

Docker 会自动启动新的容器，Traefik 会自动发现它们并将流量分发过去。

-----

## 验证与监控

### 访问 Traefik 仪表盘

您可以通过浏览器访问 `http://服务器IP:8080` 查看 Traefik 的控制台。
在 Dashboard 中，你应该能看到 `steedos` 服务后端对应了 **2 个 IP 地址**，这证明负载均衡已经生效。

### 文件存储说明

在集群模式下，默认配置使用了本地目录 `./steedos-storage` 挂载。
**注意**：在生产级多主机集群（Swarm 或 K8s）中，不能使用本地目录，否则用户上传到实例 A 的图片，访问实例 B 时会找不到。
**建议**：在 `docker-compose.yml` 中配置环境变量，将文件存储指向 **AWS S3** 或 **MinIO** 对象存储。

```yaml
environment:
  - STEEDOS_CFS_STORE=s3
  - STEEDOS_CFS_AWS_S3_BUCKET=your-bucket
  - STEEDOS_CFS_AWS_S3_REGION=us-east-1
  # ... 其他 S3 配置
```