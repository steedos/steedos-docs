---
title: 安装 Steedos Cli
sidebar_position: 20
---

## 介绍

Steedos CLI 是一个命令行界面工具，旨在简化创建、管理和部署 Steedos 应用程序的流程。有了 Steedos CLI，您可以直接在终端中轻松处理各种任务，改善工作流程并提高生产力。

## 先决条件

- Node.js（14 版或更高版本）
- npm（通常随 Node.js 一起提供）

## 安装

要安装 Steedos CLI，请在终端中运行以下命令：

```bash
npm install -g steedos-cli
```

此命令将在您的系统上全局安装 Steedos CLI，允许您从任何目录访问它。

## 基本命令

以下是您可能在项目中使用的一些基本命令：

### 显示帮助

```bash
steedos help
```

### 克隆样本仓库

```bash
git clone https://github.com/steedos-labs/contract
```

安装依赖并运行项目。

```bash
yarn
yarn start
```

如果是空数据库，系统将提示您注册帐户并创建工作区。

### 导航至项目

```bash
cd my-project
```

### 设置默认包路径

如果您正在处理多包项目，您可能还需要配置默认包路径。

例如，在.env文件中设置以下环境变量：

```
DEFAULT_PACKAGE_PATH=steedos-packages/<my-package-dir>
```

### 源配置

设置元数据同步所需的环境变量。

```bash
steedos source:config
```

- 元数据服务器：METADATA_SERVER 是您希望连接的 Steedos 服务器的 ROOT_URL，可以是本地开发环境或远程服务器。
- 元数据 API 密钥：METADATA_APIKEY 用于验证您的身份。您可以使用管理员凭据登录 Steedos 服务器，转到设置应用程序，选择 API 密钥菜单，并创建新的 API 密钥。

此命令将环境变量写入 .env.local 文件，

```
METADATA_SERVER=
METADATA_APIKEY=
```

您也可以直接设置上述环境变量，而无需运行命令。

### 源部署

将包源代码中的元数据部署到 steedos 服务器。

```bash
steedos source:deploy -p steedos-packages/contract
```

- `-p` 您希望部署的 steedos 包的路径

### 源检索

从 steedos 服务器检索元数据到包源代码

```bash
steedos source:retrieve -p steedos-packages/contract
```

- `-p` 您希望检索到的 steedos 包的路径。

## 故障排除

如果在使用 Steedos CLI 时遇到问题，请考虑以下故障排除步骤：

- 检查您的 Node.js 和 npm 版本，确保它们满足先决条件要求。
- 确认您在正确的目录中运行命令。
- 对于更具体的错误，请参阅控制台中提供的错误日志。

如果问题仍然存在，可以联系支持社区或查阅官方文档。
