---
sidebar_label: Docker
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 使用 Docker 部署 Steedos

本文将指导您如何在服务器上使用 Docker 部署 Steedos 平台。

## 前置条件

在开始之前，请确保系统满足以下要求：

1. 已安装 [Docker](https://docs.docker.com/get-docker/)（版本需不低于 20.10.7）
2. 已安装 [Docker-Compose](https://docs.docker.com/compose/install/)（版本需不低于 1.29.2）
3. 确保服务器端口（如 80、443）已开放并允许外部访问
4. 如部署 Steedos 企业版，需提前获取许可证

## 部署步骤

### 1. 准备配置文件

创建名为 `docker-compose.yml` 的文件，并填写以下内容：

<Tabs queryString="current-edition">
<TabItem label="社区版" value="community_edition">

```yaml
version: "3.9"

services:

  steedos:
    image: steedos/steedos-community:3.0
    ports:
      - "80:80"        # Steedos
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
    environment:
      - ROOT_URL=http://127.0.0.1 # 替换为您的实际域名或 IP
    volumes:
      - "./steedos-storage:/steedos-storage" # 附件和日志
      - "./.steedos:/app/.steedos" # 已安装的包

```

</TabItem>

<TabItem label="企业版" value="enterprise_edition">

```yaml
version: "3.9"

services:

  steedos:
    image: steedos/steedos-enterprise:3.0
    ports:
      - "80:80"        # Steedos
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
    environment:
      - ROOT_URL=http://127.0.0.1 # 替换为您的实际域名或 IP
      - STEEDOS_LICENSE="your_license_key_here"  # 替换为您的实际许可证密钥
    tty: true
    volumes:
      - "./steedos-storage:/steedos-storage" # 附件和日志
      - "./.steedos:/app/.steedos" # 已安装的包
```

</TabItem>
</Tabs>

请根据实际情况调整环境变量和端口设置。

### 2. 启动容器

在包含 `docker-compose.yml` 文件的目录下，执行以下命令以启动 Steedos 与 MongoDB 容器：

```bash
docker-compose up -d
```

### 3. 验证部署

部署完成后，可在浏览器中访问 `http://localhost`（或您配置的访问地址）来验证 Steedos 是否成功运行。

## 配置与优化

* **安全性**：建议配置 SSL/TLS，确保所有通信通过 HTTPS 进行，以提升安全性。
* **备份**：定期备份 MongoDB 数据库以防止数据丢失。
* **性能监控**：可使用 Docker 或第三方工具监控 Steedos 容器的性能与资源使用情况。

## 故障排查

若在部署过程中遇到问题，可检查以下内容：

* 确保所有环境变量设置正确
* 查看 Docker 容器日志以获取错误信息
* 确认服务器端口未被防火墙阻挡

## 更新与维护

当 Steedos 发布新版本时，可按以下步骤完成更新：

1. 停止当前运行的容器：

```bash
docker-compose down
```

2. 拉取最新的 Steedos 镜像：

```bash
docker-compose pull
```

3. 重新启动容器：

```bash
docker-compose up -d
```

更新前请确保已完成数据备份。

## 延伸阅读

* [Steedos 实例配置](/deploy/steedos-config)
