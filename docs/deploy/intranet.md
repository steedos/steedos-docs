---
title: Intranet
sidebar_position: 4
sidebar_class_name: hidden
---

Follow the steps below to deploy Steedos in an Ubuntu 20.04 intranet environment.

## Prerequisites

1. [Ubuntu](https://releases.ubuntu.com/20.04/) (Version 20.04) intranet server.
2. A Linux server with a pre-installed Docker service, which requires access to the external network.

## Installing Docker
Please download on a connected Linux server:
1. Visit the link: https://download.docker.com/linux/ubuntu/dists/focal/pool/stable/
2. Based on the applicable architecture (amd64, armhf, arm64, or s390x), download the required deb files for the intranet environment and upload them to the tmp directory of the intranet server.

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

3. Navigate to the tmp directory on the intranet server and install the .deb packages.

```shell
sudo dpkg -i ./containerd.io_1.6.9-1_amd64.deb \
    ./docker-ce_24.0.7-1~ubuntu.20.04~focal_amd64.deb \
    ./docker-ce-cli_24.0.7-1~ubuntu.20.04~focal_amd64.deb \
    ./docker-compose-plugin_2.6.0~ubuntu-focal_amd64.deb
```

4. After installation, check the Docker version.

```shell
docker -v
Docker version 24.0.7, build afdd53b
```

## Installing Steedos

On your intranet server, create a folder named `steedos` for deployment and data storage.

1. Create `docker-compose.yml` file:

```yml
version: "3.9"

services:

  steedos:
    image: steedos/steedos-community:2.6
    ports:
      - "5000:5000"    # Steedos
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
      - "6379:6379"    # Redis
    env_file:
      - .env
    volumes:
      - "./steedos-storage:/steedos-storage"
```

2. Create `.env` file:

```shell
PORT=80
ROOT_URL=http://serverip
```

3. View the `docker-compose.yml` file and download the relevant images.

```shell
docker pull steedos/steedos-community:2.6
docker pull redis:6.2.10
docker pull mongo:4.4
```

4. Save the downloaded images as rar format files and upload them to the tmp directory of the intranet server.

```shell
docker save -o steedos-community.rar steedos/steedos-community:2.6
docker save -o redis.rar redis:6.2.10
docker save -o mongo.rar mongo:4.4
```

5. Navigate to the tmp directory on the intranet server and sequentially load the images.

```shell
docker load < steedos-community.rar
docker load < redis.rar
docker load < mongo.rar
```

6. Navigate to the `steedos` directory on the intranet server and use the following command to start the Docker containers. If you don't have permission to run `docker compose`, you might need to use `sudo`.

```shell
docker compose up -d
```
