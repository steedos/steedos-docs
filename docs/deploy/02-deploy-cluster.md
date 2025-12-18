# Cluster Deployment

:::info Applicable Scenarios
This guide is intended for **Steedos Enterprise Edition** users.
Through cluster deployment, you can achieve **High Availability (HA)** and **Horizontal Scaling** to support a higher volume of concurrent users.
:::

## Architecture Overview

In a standalone deployment, Steedos typically runs as a single instance. In a cluster deployment, the architecture is upgraded to include:

* **Load Balancer (Traefik)**: Acts as the entry point, distributing incoming user requests across multiple backend Steedos instances.
* **App Cluster (Steedos Replicas)**: Runs multiple Steedos containers simultaneously (defaulting to 2) to share the business workload.
* **Sticky Sessions**: Uses cookies to ensure that consecutive requests from the same user (especially long-running WebSocket connections) are always routed to the same Steedos instance.
* **MongoDB Replica Set**: Enables the Oplog feature to ensure real-time data synchronization across multiple instances.

---

## Deployment Steps

### 1. Create Deployment Directory

Create a new directory on your server to house the cluster configuration files.

```bash
mkdir steedos-cluster
cd steedos-cluster

```

### 2. Create Configuration File

Create a new `docker-compose.yml` file and paste the following content.

:::warning Important Notes

* Ensure you provide your Enterprise Edition license key in the `STEEDOS_LICENSE` field.
* `ROOT_URL` must be updated to your actual domain name or IP; otherwise, images and links may fail to render correctly.
:::

```yaml
version: "3"

services:
  # 1. Traffic Gateway and Load Balancer (Traefik)
  traefik:
    image: traefik:v3.5
    command:
      - "--api.insecure=true"      # Enables Dashboard (on port 8080)
      - "--providers.docker=true"  # Listens to Docker events
      - "--entrypoints.web.address=:80" # Defines the Web entry point
    ports:
      - "80:80"     # Web access port
      - "8080:8080" # Traefik Admin Panel port
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  # 2. Steedos Enterprise Cluster
  steedos:
    image: steedos/steedos-enterprise:3.0
    deploy:
      replicas: 2   # Core Config: Launches 2 instances
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:5100/"]
      interval: 30s
      timeout: 5s
      retries: 3
    # Traefik Dynamic Configuration Labels
    labels:
      - traefik.enable=true
      - traefik.http.routers.steedos.rule=PathPrefix(`/`)
      - traefik.http.routers.steedos.entrypoints=web
      - traefik.http.services.steedos.loadbalancer.server.port=80 # Internal container port
      # --- Critical Config: Sticky Session ---
      # Must be enabled to prevent Socket.io disconnections
      - traefik.http.services.steedos.loadbalancer.sticky.cookie=true
      - traefik.http.services.steedos.loadbalancer.sticky.cookie.name=steedos_session
    volumes:
      - './steedos-storage:/steedos-storage' # Attachment storage (S3/MinIO recommended for production)
      - './.steedos:/app/.steedos'           # Code and Metadata mount
    environment:
      - STEEDOS_LICENSE=your_license_key_here  # Enter your License here
      - ROOT_URL=http://127.0.0.1              # Update to your actual domain
      - MONGO_URL=mongodb://mongodb:27017/steedos

  # 3. Caching Service
  redis:
    image: redis:6.2.10
    # Disable persistence to boost performance; used primarily for caching and Pub/Sub
    command: "redis-server --save \"\" --appendonly no --loglevel warning"
    ports:
      - "6379:6379"
 
  # 4. Database (Automatic Replica Set Initialization)
  mongodb:
    image: mongo:7.0
    ports:
      - 27017:27017
    # Startup command includes a script to automatically initialize the Replica Set
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

### 3. Launch the Cluster

Execute the following command in the directory to start all services:

```bash
docker-compose up -d

```

Wait a few minutes and verify the service status:

```bash
docker-compose ps

```

You should see two containers running for the `steedos` service (e.g., `steedos-cluster-steedos-1` and `steedos-cluster-steedos-2`).

---

## Deep Dive into Core Configuration

### 1. Why Configure Sticky Sessions?

In the `labels` section, we defined:

```yaml
- traefik.http.services.steedos.loadbalancer.sticky.cookie=true
- traefik.http.services.steedos.loadbalancer.sticky.cookie.name=steedos_session

```

Steedos real-time communication relies on **WebSocket (Socket.io)**. The connection process involves multiple handshakes. If the load balancer sends the first handshake to Instance A and the second to Instance B, the connection will fail. Enabling **Sticky Sessions** ensures Traefik injects a cookie so that all subsequent requests from that user are pinned to the same instance.

### 2. The Necessity of MongoDB Replica Sets

The MongoDB startup command is intentionally extensive to **automatically initialize a Replica Set**. Steedos relies on the MongoDB **Oplog (Operations Log)** for real-time message pushing. MongoDB only generates an Oplog when in Replica Set mode. Since standalone MongoDB does not support this by default, a specific initialization script is required.

### 3. How to Scale Out?

As your user base grows and more resources are needed, simply modify the `replicas` count in `docker-compose.yml`:

```yaml
deploy:
  replicas: 4  # Scale from 2 to 4

```

Then, rerun the update command:

```bash
docker-compose up -d

```

Docker will automatically launch new containers, and Traefik will discover them to begin distributing traffic.

---

## Verification & Monitoring

### Accessing the Traefik Dashboard

You can visit `http://YOUR_SERVER_IP:8080` in your browser to view the Traefik console. In the Dashboard, you should see that the `steedos` service backend maps to **two IP addresses**, confirming that load balancing is active.

### Note on File Storage

In cluster mode, the default configuration uses a local directory mount (`./steedos-storage`).
**Caution**: For production-grade multi-host clusters (Swarm or K8s), you cannot use local directories; otherwise, a file uploaded to Instance A will be missing when accessed via Instance B.
**Recommendation**: Configure environment variables in `docker-compose.yml` to point file storage to **AWS S3** or **MinIO** object storage.

```yaml
environment:
  - STEEDOS_CFS_STORE=s3
  - STEEDOS_CFS_AWS_S3_BUCKET=your-bucket
  - STEEDOS_CFS_AWS_S3_REGION=us-east-1
  # ... other S3 configurations

```