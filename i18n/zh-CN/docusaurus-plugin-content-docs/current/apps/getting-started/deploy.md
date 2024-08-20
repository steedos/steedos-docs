---
title: 私有部署
---

遵循以下步骤在Docker上部署Steedos应用。

## 前提条件

1. [Docker](https://docs.docker.com/get-docker/) (版本 20.10.7 或更高)
2. [Docker-Compose](https://docs.docker.com/compose/install/) (版本 1.29.2 或更高)
3. Steedos 企业版许可证

## 安装 Steedos 应用

在您的机器上创建一个名为`steedos-apps`的文件夹用于部署和数据存储。然后，使用`cd`命令导航到此文件夹，并按照以下步骤操作：

1. 联系我们获取 企业版许可证。

2. 创建一个新的文件`docker-compose.yml`

```bash
version: "3.9"

services:

  steedos-enterprise:
    image: steedos/steedos-enterprise:latest
    container_name: steedos-enterprise
    ports:
      - "80:80"    
      - "443:443" 
      - "9001:9001"
    environment:
      - ROOT_URL=http://127.0.0.1
      - TRANSPORTER=redis://redis:6379
      - CACHER=redis://redis:6379/1
      - STEEDOS_LICENSE=trial
      - STEEDOS_LOG_LEVEL=info
      - NPM_CACHE_ENABLED=true
      - NPM_CACHE_PACKAGE_CONTENT=true
      - NPM_REGISTRY_URL=https://registry.npmmirror.com
    tty: true
    volumes:
      - "./storage:/steedos-storage"
    depends_on:
      redis:
        condition: service_started
  steedos-apps:
    image: steedos/steedos-apps:latest
    container_name: steedos-apps
    environment:
      - TRANSPORTER=redis://redis:6379
      - CACHER=redis://redis:6379/1
    depends_on:
      redis:
        condition: service_started
  redis:
    image: redis:6.2
    command: "redis-server --save \"\" --appendonly no --loglevel warning"
```

这将在当前目录保存文件。

3. 使用以下命令启动Docker容器。如果您没有运行`docker-compose`的权限，您可能需要使用`sudo`来运行。

```bash
docker-compose up -d
```

如果本地不存在该镜像，此命令会下载必要的Docker镜像并启动容器。

4. 打开 [http://localhost](http://localhost) 并等待服务器启动。这可能需要长达5分钟的时间。一旦服务器启动并运行，您可以在 [http://localhost](http://localhost) 访问 Steedos。

如果您继续遇到问题，请联系 [support@steedos.com](mailto:support@steedos.com)。

## 更多阅读

* [配置 Steedos 实例](/deploy/steedos-config)
