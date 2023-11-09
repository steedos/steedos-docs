---
sidebar_label: Docker
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Steedos Docker Deployment Guide

This document will guide you on how to deploy the Steedos platform on your server using Docker.

## Prerequisites

Before you begin, ensure that your system meets the following requirements:

1. [Docker](https://docs.docker.com/get-docker/) (version 20.10.7 or higher)
2. [Docker-Compose](https://docs.docker.com/compose/install/) (version 1.29.2 or higher)
3. Ensure that server ports (such as 80, 443) are open for external access
4. If deploying Steedos Enterprise Edition, you need to obtain a license first

## Deployment Steps

### 1. Prepare Configuration File

Create a file named `docker-compose.yml` and fill in the following content:

<Tabs queryString="current-edition">
<TabItem label="Community Edition" value="community_edition">

```yaml
version: "3.9"

services:

  steedos:
    image: steedos/steedos-community:2.5
    ports:
      - "80:80"
    environment:
      - ROOT_URL=http://127.0.0.1
      - PORT=80
      - MONGO_URL=mongodb://mongodb:27017/steedos
      - MONGO_OPLOG_URL=mongodb://mongodb:27017/local
      - TRANSPORTER=redis://redis:6379
      - CACHER=redis://redis:6379/1
      - STEEDOS_STORAGE_DIR=/steedos-storage
    volumes:
      - "steedos-storage:/steedos-storage"
    depends_on:
      redis:
        condition: service_started
      mongodb:
        condition: service_healthy
  
  redis:
    image: redis:6.2.10
    command: "redis-server --save \"\" --appendonly no --loglevel warning"
    ports:
      - "6379:6379"
  
  mongodb:
    image: mongo:4.4
    ports:
      - 27017:27017
    command: "--bind_ip_all --replSet steedos --logpath /var/log/mongodb/mongod.log"
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo --quiet | grep 1
      interval: 10s
      timeout: 10s
      retries: 5
    volumes:
      - 'steedos-mongo-data:/data/db'

  mongodb-init:
    image: mongo:4.4
    restart: "no"
    depends_on:
      mongodb:
        condition: service_healthy
    command: >
      mongo --host mongodb:27017 --eval "rs.initiate({ _id: 'steedos', members: [{_id: 0, host: 'mongodb:27017'}]})"

```

</TabItem>

<TabItem label="Enterprise Edition" value="enterprise_edition">

```yaml
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
      - STEEDOS_LICENSE=trial
    tty: true
    volumes:
      - "./storage:/steedos-storage"
```

</TabItem>
</Tabs>

Please adjust the environment variables and ports according to your actual situation.

### 2. Start Containers

In the directory containing the `docker-compose.yml` file, run the following command to start the Steedos and MongoDB containers:

```bash
docker-compose up -d
```

### 3. Verify Deployment

After deployment, you can verify that Steedos is running successfully by accessing `http://localhost` (or your configured address) through a browser.

## Configuration and Optimization

- **Security**: To enhance security, it is recommended to configure SSL/TLS and ensure that all communications are conducted via HTTPS.
- **Backup**: Regularly back up your MongoDB database to prevent data loss.
- **Performance Monitoring**: Use Docker or third-party tools to monitor the performance and resource usage of Steedos containers.

## Troubleshooting

If you encounter problems during deployment, check the following:

- Ensure all environment variables are correctly set.
- Check the Docker container logs for error messages.
- Ensure server ports are not blocked by a firewall.

## Updates and Maintenance

When Steedos releases a new version, you can update your deployment with the following steps:

1. Stop the currently running containers:

```bash
docker-compose down
```

2. Pull the latest Steedos image:

```bash
docker-compose pull
```

3. Restart the containers:

```bash
docker-compose up -d
```

Ensure you back up your data before updating.

## Further Reading

* [Configuring Steedos Instances](/deploy/steedos-config)
