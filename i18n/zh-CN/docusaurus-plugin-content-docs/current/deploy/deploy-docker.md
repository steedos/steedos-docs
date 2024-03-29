---
sidebar_label: Docker 部署
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Steedos Docker 部署指南

本文档将指导您如何使用 Docker 在您的服务器上部署 Steedos 平台。

## 前提条件

在开始之前，请确保您的系统满足以下要求：

1. [Docker](https://docs.docker.com/get-docker/) (版本 20.10.7 或更高版本)
2. [Docker-Compose](https://docs.docker.com/compose/install/) (版本 1.29.2 或更高版本)
3. 确保服务器端口（如 80, 443）已开放，以便外部访问
4. 如果部署 Steedos 企业版，需要先获得许可证

## 部署步骤

### 1. 准备配置文件

创建一个名为 `docker-compose.yml` 的文件，并填入以下内容：

<Tabs queryString="current-edition">
<TabItem label="社区版" value="community_edition">

```yaml
version: "3.9"

services:

  steedos:
    image: steedos/steedos-community:latest
    ports:
      - "80:80"        # Steedos
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
      - "6379:6379"    # Redis
    environment:
      - ROOT_URL=http://127.0.0.1
      - NPM_REGISTRY_URL=https://registry.npmmirror.com
    volumes:
      - "./steedos-storage:/steedos-storage"
```

</TabItem>

<TabItem label="企业版" value="enterprise_edition">

```yaml
version: "3.9"

services:

  steedos-enterprise:
    image: steedos/steedos-enterprise:latest
    container_name: steedos-enterprise
    ports:
      - "80:80"        # Steedos
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
      - "6379:6379"    # Redis
    environment:
      - ROOT_URL=http://127.0.0.1
      - STEEDOS_LICENSE= # 请将此处替换为您的 Steedos 企业版许可证
      - NPM_CACHE_ENABLED=true
      - NPM_CACHE_PACKAGE_CONTENT=true
      - NPM_REGISTRY_URL=https://registry.npmmirror.com
    tty: true
    volumes:
      - "./steedos-storage:/steedos-storage"
```

</TabItem>
</Tabs>

请根据您的实际情况调整环境变量和端口。

### 2. 启动容器

在包含 `docker-compose.yml` 文件的目录中，运行以下命令来启动 Steedos 和 MongoDB 容器：

```bash
docker-compose up -d
```

### 3. 验证部署

部署完成后，您可以通过浏览器访问 `http://localhost`（或您配置的其他地址）来验证 Steedos 是否成功运行。

## 配置和优化

- **安全性**：为了提高安全性，建议配置 SSL/TLS，并确保所有通信都通过 HTTPS 进行。
- **备份**：定期备份您的 MongoDB 数据库，以防止数据丢失。
- **性能监控**：使用 Docker 或第三方工具监控 Steedos 容器的性能和资源使用情况。

## 故障排除

如果在部署过程中遇到问题，请检查以下事项：

- 确保所有环境变量都已正确设置。
- 检查 Docker 容器的日志以获取错误信息。
- 确保服务器端口没有被防火墙阻止。

## 更新和维护

当 Steedos 发布新版本时，您可以通过以下步骤更新您的部署：

1. 停止当前运行的容器：

```bash
docker-compose down
```

> 如果需要同时清理volume数据，可以使用 `docker-compose down -v` 命令。

2. 拉取最新的 Steedos 镜像：

```bash
docker-compose pull
```

3. 重新启动容器：

```bash
docker-compose up -d
```

确保在更新前备份您的数据。

## 进一步阅读

* [配置 Steedos 实例](/deploy/steedos-config)
