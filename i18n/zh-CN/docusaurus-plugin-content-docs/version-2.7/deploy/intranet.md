---
title: 纯内网部署
sidebar_position: 4
sidebar_class_name: hidden
---

按照以下步骤在 Ubuntu 20.04 纯内网环境中部署 Steedos。

## 先决条件

1. [Ubuntu](https://releases.ubuntu.com/20.04/) (版本 20.04) 内网服务器
2. 预装了docker服务的linux服务器，需访问外网

## 安装docker
请在联网的Linux服务器上进行下载操作：
1. 访问链接 https://download.docker.com/linux/ubuntu/dists/focal/pool/stable/
2. 根据适用的架构（amd64、armhf、arm64或s390x）下载内网环境下所需要的deb文件，并上传到内网服务器tmp路径中

```shell
# Docker Engine
docker-ce_24.0.7-1~ubuntu.20.04~focal_amd64.deb

# Docker CLI
docker-ce-cli_24.0.7-1~ubuntu.20.04~focal_amd64.deb

# Docker Container
containerd.io_1.6.9-1_amd64.deb

# Docker Compose
docker-compose-plugin_2.6.0~ubuntu-focal_amd64.deb
```

3. 进入内网服务器tmp目录，安装.deb包

```shell
sudo dpkg -i ./containerd.io_1.6.9-1_amd64.deb \
    ./docker-ce_24.0.7-1~ubuntu.20.04~focal_amd64.deb \
    ./docker-ce-cli_24.0.7-1~ubuntu.20.04~focal_amd64.deb \
    ./docker-compose-plugin_2.6.0~ubuntu-focal_amd64.deb
```

4. 安装完成后，查看docker版本

```shell
docker -v
Docker version 24.0.7, build afdd53b
```

## 安装 Steedos

在您的内网服务器上创建一个名为 `steedos` 的文件夹，用于部署和数据存储。

1. 进入 `steedos`文件夹，创建 `docker-compose.yml` 文件：

```yml
version: "3.9"

services:

  steedos:
    image: steedos/steedos-community:2.6
    ports:
      - "80:80"    # Steedos
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
      - "6379:6379"    # Redis
    env_file:
      - .env
    volumes:
      - "./steedos-storage:/steedos-storage"
    environment:
      - STEEDOS_UNPKG_URL=/unpkg/
      - STEEDOS_SENTRY_ENABLED=false
      - STEEDOS_PUBLIC_ANALYTICS_ENABLED=false
```

2. Create `.env` file:

```shell
PORT=80
ROOT_URL=http://serverip
```

3. 在外网服务器上创建`docker-compose.yml`，文件内容与内网上的docker-compose.yml一致，查看`docker-compose.yml` 文件并下载相关image

```shell
docker pull steedos/steedos-community:2.6
```

4. 将下载好的镜像另存为rar格式文件并上传到内网服务器tmp路径中

```shell
docker save -o steedos-community.rar steedos/steedos-community:2.6
```

5. 进入内网服务器tmp路径中依次加载镜像

```shell
docker load < steedos-community.rar
```

6. 使用以下命令启动 Docker 容器。

```shell
docker compose up -d
```

## 缓存unpkg

内网环境中首次访问会蓝屏，这时需要在联网服务器上将资产包缓存到本地并上传到内网服务器，进入已联网的Linux服务器上进行以下操作：
1. 进入steedos文件夹，修改 `docker-compose.yml` 文件，添加环境变量缓存unpkg到本地：
```yaml
    environment:
      - NPM_CACHE_ENABLED=true
      - NPM_CACHE_PACKAGE_INFO=true
      - NPM_CACHE_PACKAGE_CONTENT=true
      - NPM_REGISTRY_URL=https://registry.npmmirror.com
```

2. 启动steedos服务
```shell
docker compose up -d
```

3. 将当前路径下的缓存的unpkg资产包打包成 `unpkg.tar.gz`，上传到内网服务器 `steedos/storage` 文件夹中
```shell
cd steedos/storage
tar -czf unpkg.tar.gz unpkg
```

4. 进入内网服务器 `steedos/storage` 文件夹下，解压 `unpkg.tar.gz`
```shell
cd steedos/storage
tar -xzvf unpkg.tar.gz
```

5. 进入内网服务器 `steedos` 文件夹中，重启steedos服务
```shell
cd steedos
docker compose down
docker compose up -d
```

