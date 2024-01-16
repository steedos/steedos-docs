---
sidebar_label: Environment Setup
sidebar_position: 0.2
---

# Environment Setup

### 1. Install Node.js

Download and install the latest version of Node.js 14 (14.21.3) from the official website [14.21.3](https://nodejs.org/download/release/v14.21.3/). Please click to download and install.

> During the installation process, please select "Automatically install the necessary tools" to install the required tools automatically.

#### Install yarn command

After installing Node.js, open the terminal and execute the following command to install yarn:

```
npm install -g yarn
```

#### Install steedos command

Install or update the Steedos CLI command tool:

```
npm i steedos-cli --global
```

### 2. Install MongoDB

Refer to the [MongoDB Installation Documentation](https://www.mongodb.com/docs/v4.4/administration/install-community/) to install the database.

During the installation, please select to install MongoDB Compass, which is a visualization operation tool that comes with the Mongo windows installation package.

After successful installation, add the installation path to the system environment variables, for example: C:\Program Files\MongoDB\Server\4.4\bin

#### Configure MongoDB cluster mode startup (Windows)
Modify the mongod.cfg in the MongoDB installation path, for example: C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg

```bash
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
...

# Find replication, remove # and add a line of configuration
replication:
  # The following configuration must be indented by two spaces
  replSetName: rs0
```

Find the MongoDB service in Task Manager-Services and right-click to restart.

### 3. Install Redis

Refer to the [Redis Installation Documentation](https://redis.io/docs/install/install-redis/).

> After installing Redis, the following configuration needs to be added to the Redis configuration file, for example: C:\Program Files\Redis\redis.windows.conf, to prevent Redis error messages when starting the project: Redis-sub client is disconnected.

```bash
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit pubsub 0 0 0
client-output-buffer-limit slave 0 0 0
```

### 4. Install VS Code

Visual Studio Code (abbreviated as "VS Code") is a cross-platform source code editor by Microsoft, running on Mac OS X, Windows, and Linux, aimed at writing modern Web and cloud applications.

Download the installation package from the [VS Code official website](https://code.visualstudio.com/) and install and run VS Code.
