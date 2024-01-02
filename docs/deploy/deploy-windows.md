---
sidebar_label: Windows
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Windows Development Environment Deployment Guide

This tutorial takes my-app as an example, guiding you on how to locally deploy and run a project developed based on Steedos2.5 in the Windows system. After the deployment, you can develop Steedos projects.

## Prerequisites

Before starting, please ensure that your system meets the following requirements:

1. Windows 10 Professional Edition 22H2 latest version

## Deployment Steps

### 1. Install Nodejs

Download the last version of Nodejs 14, which we recommend, [14.21.3](https://nodejs.org/download/release/v14.21.3/node-v14.21.3-x64.msi) from the official website and install it after downloading.

For more versions, please refer to https://nodejs.org/en/download/releases/. We have not fully tested other versions. If you need to use other versions, please refer to the Node.js long-term maintenance version schedule https://nodejs.org/en/about/previous-releases

Note: During installation, please select "Automatically install the necessary tools" to automatically install the required tools.

#### Install yarn command

After installing nodejs, open the terminal and execute the following command to install yarn

```
npm install -g yarn
```

#### Install steedos command

Install or update the Steedos CLI command tool

```
npm i steedos-cli --global
```

### 2. Install MongoDB

Refer to the official [documentation](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-windows/) to install the database, and it is recommended to install [4.4](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.27-rc0-signed.msi).

When installing, please select to install MongoDB Compass, which is a visualization operation tool that comes with the Mongo windows installation package.

After successful installation, add the installation path to the system environment variables, for example: C:\Program Files\MongoDB\Server\4.4\bin

#### Configure mongodb cluster mode startup
Modify mongod.cfg in the installation path of mongodb, for example: C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg

```bash
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
...

#  Find replication, remove the # and add a line of configuration
replication:
  #  The following configuration must be indented by two spaces
  replSetName: rs0
```

Find the MongoDB service in Task Manager-Services and right-click to restart.

### 3. Install Redis

Find the [installer](https://www-steedos-com.oss-cn-beijing.aliyuncs.com/steedos/platform/bin/redis/Redis-x64-3.2.100.msi) through the Windows version of the Redis library and install the Redis service.

It is recommended to choose to add the redis installation path to PATH during installation.

Please note that after the installation of Redis is complete, the following configuration needs to be added to the redis configuration file, for example: C:\Program Files\Redis\redis.windows.conf, to prevent Redis from reporting an error when starting the project: Redis-sub client is disconnected.

```bash
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit pubsub 0 0 0
client-output-buffer-limit slave 0 0 0
```

### 4. Install VS Code

Visual Studio Code (abbreviated as "VS Code") is a cross-platform source code editor released by Microsoft that runs on Mac OS X, Windows, and Linux, targeted at writing modern Web and cloud applications.

Download the [installer](https://vscode.download.prss.microsoft.com/dbazure/download/stable/0ee08df0cf4527e40edc9aa28f4b5bd38bbff2b2/VSCodeUserSetup-x64-1.85.1.exe) from the official website and install and run VS Code.

### 5. Install Steedos

#### Create a project

Create a my-app project by executing the command npx create-steedos-app my-app in the terminal.

```bash
npx create-steedos-app my-app
```

After executing the above command, a folder named "my-app" will be created in the current document folder, and its main directory structure is:

```bash
my-app
├── .vscode
├── steedos-packages
├── steedos-platform
├── .env
├──

 .gitpod.yml
├── moleculer.config.js
├── package.json
└── README.md
```

Among them,

* `steedos-packages`: When your project needs sub-package management, this folder can be used. You can also copy third-party software packages to this folder, and Steedos will automatically load the metadata in it when it starts.
* `steedos-platform`: Steedos core service. When starting a software package service, the core service must be enabled first. If you need to upgrade the steedos core version, you also need to modify the package.json file in this folder.
* `moleculer.config.js`: Configuration file for running services with moleculer.
* `.env`: Environment variable configuration file, where you can configure ports, URLs, and other environment variables.
* `package.json`: Used to configure npm packages on which this project depends.

#### Enable platform core service
Use VS Code to open the my-app folder, click "Terminal" to open a command window, enter steedos-platform and install the packages the project depends on

```bash
cd steedos-platform
yarn
```

Copy .env to .env.local, used to configure the environment variables of the running service, specify the MongoDB address, Redis service address, and ROOT_URL (default is 127.0.0.1, can be modified to the server's own ip):

```bash
# https://docs.steedos.com/deploy/steedos-config

PORT=5000
ROOT_URL=http://127.0.0.1
TRANSPORTER=redis://127.0.0.1:6379
CACHER=redis://127.0.0.1:6379/1
MONGO_URL=mongodb://127.0.0.1:27017/steedos
MONGO_OPLOG_URL=mongodb://127.0.0.1:27017/local

STEEDOS_STORAGE_DIR=./steedos-storage
```

Execute yarn start to enable the service:
```bash
yarn start
```

#### Start the software package service

Enter the project root path in the terminal to install the dependent packages, for example, enter my-app:

```bash
yarn 
```

Copy .env to .env.local, used to configure the environment variables of the running service, and the TRANSPORTER needs to be configured to be consistent with the TRANSPORTER in the core service steedos-platform:

```bash
TRANSPORTER=redis://127.0.0.1:6379

# VSCode code sync
METADATA_SERVER=http://127.0.0.1:5000
METADATA_APIKEY=
DEFAULT_PACKAGE_PATH=steedos-packages/contract
```

Execute yarn start to enable the service:
```bash
yarn start
```

After the service is successfully enabled, access the service using the configured IP address and port, for example: http://127.0.0.1:5000

---