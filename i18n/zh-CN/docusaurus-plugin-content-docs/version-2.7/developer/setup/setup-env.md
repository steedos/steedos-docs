---
sidebar_label: 环境准备
sidebar_position: 0.2
---

# 环境准备


### 1. 安装Nodejs

从官网下载我们推荐安装的14版的最后一个版本 [14.21.3](https://nodejs.org/download/release/v14.21.3/)，请点击下载后安装。

> 安装过程中请勾选 "Automatically install the necessary tools"，自动安装必要的工具。

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

参考[MongoDB安装文档](https://www.mongodb.com/docs/v4.4/administration/install-community/)安装数据库。

安装时请勾选安装MongoDB Compass，Compass是Mongo windows 安装包自带的一个可视化操作工具。

安装成功后将安装路径添加到系统环境变量中，例如：C:\Program Files\MongoDB\Server\4.4\bin

#### 配置mongodb集群模式启动 （Windows）
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

参考 [Redis安装文档](https://redis.io/docs/install/install-redis/) 。

> Redis安装完成后，需要在redis配置文件中补上以下配置，例如：C:\Program Files\Redis\redis.windows.conf，以防止启动项目时Redis报错：Redis-sub client is disconnected。

```bash
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit pubsub 0 0 0
client-output-buffer-limit slave 0 0 0
```

### 4. 安装VS Code

Visual Studio Code（简称"VS Code"）是Microsoft发布一个运行于 Mac OS X、Windows和 Linux 之上的，针对于编写现代Web和云应用的跨平台源代码编辑器。

从[VS Code官网](https://code.visualstudio.com/)下载安装包，安装运行VS Code。

