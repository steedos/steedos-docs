---
title: 内网部署
sidebar_position: 4
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

在您的内网服务器上创建一个名为 `steedos` 的文件夹，用于部署和数据存储。在联网的Linux服务器上进行下载操作：
1. 运行以下 cURL 命令下载 `docker-compose.yml` 文件：

```shell
curl -L https://raw.githubusercontent.com/steedos/steedos-platform/master/deploy/docker/docker-compose.yml -o $PWD/docker-compose.yml
```

将下载好的`docker-compose.yml` 文件上传到内网服务器 `steedos` 文件夹内。

2. 查看`docker-compose.yml` 文件并下载相关image

```shell
docker pull steedos/steedos-enterprise:2.5
docker pull redis:6.2.10
docker pull mongo:4.4
```

3. 将下载好的镜像另存为rar格式文件并上传到内网服务器tmp路径中

```shell
docker save -o steedos-enterprise.rar steedos/steedos-enterprise:2.5
docker save -o redis.rar redis:6.2.10
docker save -o mongo.rar mongo:4.4
```

4. 进入内网服务器tmp路径中依次加载镜像

```shell
docker load < steedos-enterprise.rar
docker load < redis.rar
docker load < mongo.rar
```

5. 进入内网服务器`steedos` 文件夹中，使用以下命令启动 Docker 容器。如果您没有运行 `docker compose` 的权限，您可能需要使用 `sudo`。

```shell
docker compose up -d
```