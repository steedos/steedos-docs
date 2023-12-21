---
sidebar_label: 开发环境部署 - Windows
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Windows 开发环境部署指南

本教程以 my-app 为例，指导你如何在 Windows 系统中本地部署和运行基于Steedos2.5开发的项目，部署完成后就可以开发Steedos项目了。

## 前提条件

在开始之前，请确保您的系统满足以下要求：

1. Windows 10 专业版 22H2最新版

## 部署步骤

### 1. 安装Nodejs

从官网下载我们推荐安装的14版的最后一个版本 [14.21.3](https://nodejs.org/download/release/v14.21.3/node-v14.21.3-x64.msi)，请点击下载后安装。

更多版本请参考 https://nodejs.org/en/download/releases/ ，其他版本我们未充分测试过，如果需要使用其他版本请参阅Node.js长期维护版本日程 https://nodejs.org/en/about/previous-releases

注意：安装过程中请勾选 "Automatically install the necessary tools"，自动安装必要的工具。

#### 安装yarn命令

nodejs安装完成之后打开终端执行以下命令安装yarn

```
npm install -g yarn
```

#### 安装steedos命令

安装或更新Steedos CLI命令工具

```
npm i steedos-cli --global
```

### 2. 安装MongoDB

参考官方安装[文档](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-windows/)安装数据库，建议安装[4.4](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.27-rc0-signed.msi)。

安装时请勾选安装MongoDB Compass，Compass是Mongo windows 安装包自带的一个可视化操作工具。

安装成功后将安装路径添加到系统环境变量中，例如：C:\Program Files\MongoDB\Server\4.4\bin

#### 配置mongodb集群模式启动
修改mongodb安装路径下的mongod.cfg，例如：C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg

```bash
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
...

#  找到replication，去掉#并添加一行配置
replication:
  #  以下配置必须缩进两个空格
  replSetName: rs0
```

在 任务管理器-服务 中找到MongoDB服务，并右键重启。

### 3. 安装Redis

通过Windows版本Redis库找到[安装包](https://www-steedos-com.oss-cn-beijing.aliyuncs.com/steedos/platform/bin/redis/Redis-x64-3.2.100.msi)，安装Redis服务。

建议安装时选择将 redis 安装路径添加到 PATH。

请注意，Redis安装完成后，需要在redis配置文件中补上以下配置，例如：C:\Program Files\Redis\redis.windows.conf，以防止启动项目时Redis报错：Redis-sub client is disconnected。

```bash
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit pubsub 0 0 0
client-output-buffer-limit slave 0 0 0
```

### 4. 安装VS Code

Visual Studio Code（简称"VS Code"）是Microsoft发布一个运行于 Mac OS X、Windows和 Linux 之上的，针对于编写现代Web和云应用的跨平台源代码编辑器。

从官网下载[安装包](https://vscode.download.prss.microsoft.com/dbazure/download/stable/0ee08df0cf4527e40edc9aa28f4b5bd38bbff2b2/VSCodeUserSetup-x64-1.85.1.exe)，安装运行VS Code。


### 5. 安装Steedos

#### 创建项目

通过在终端执行 npx create-steedos-app my-app 命令创建 my-app 项目。

```bash
npx create-steedos-app my-app
```

执行上述命令后会在当前文档夹下创建一个名为"my-app"的文件夹

#### 安装依赖包
使用VS Code 打开my-app文件夹，点击“终端”，打开命令窗口安装项目依赖的包

```bash
yarn
```

#### 配置环境变量
需要拷贝.env 到 .env.local，用于配置运行的服务的环境变量，指定MongoDB地址、Redis服务地址和ROOT_URL(默认为127.0.0.1，可以修改为服务器本机ip):

```bash
PORT=5000
ROOT_URL=http://127.0.0.1:5000
MONGO_URL=mongodb://127.0.0.1:27017/steedos
MONGO_OPLOG_URL=mongodb://127.0.0.1:27017/local
TRANSPORTER=redis://127.0.0.1:6379
CACHER=redis://127.0.0.1:6379/1
```

#### 启动服务

在终端中执行yarn start启动服务

```bash
yarn start
```
