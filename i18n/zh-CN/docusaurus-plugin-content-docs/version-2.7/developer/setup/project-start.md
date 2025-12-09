---
title: 运行项目
sidebar_position: 30
---

# 如何运行 Steedos DX 项目

Steedos 项目中包含元数据和微服务，需要加载到 Steedos 平台中才能运行。

Steedos DX 开发环境使用微服务方式启动软件包，并通过 Transporter 连接到 Steedos 平台。

## 部署并运行 Steedos 平台

首先，您必须部署并运行 Steedos 平台。您可以遵循[自托管教程](/deploy/deploy-docker)在服务器上部署 Steedos，或启动本地 Steedos 平台。

```bash
cd steedos-platform
docker-compose up
```

您也可以参照 `./steedos-platform` 目录中的说明，使用 Node.js 运行 Steedos 平台。

### 注册管理员账户

在首次启动时，系统将提示您注册一个账户并创建一个组织。这个账户也将成为该组织的管理员账户。

### 创建 API 密钥

您可以使用管理员凭据登录到 Steedos 服务器，转到设置应用程序，选择 API 密钥菜单，并创建一个新的 API 密钥。

## 配置元数据同步

### 设置元数据服务器

设置元数据同步所需的环境变量。

```bash
steedos source:config
```

- 元数据服务器：METADATA_SERVER 是您希望连接到的 Steedos 服务器的 ROOT_URL。
- 元数据 API 密钥：METADATA_APIKEY 用于验证您的身份。

这个命令将环境变量写入 .env.local 文件，

```bash
METADATA_SERVER=
METADATA_APIKEY=
```

您也可以直接设置上述环境变量，而无需运行该命令。

## 运行 Steedos 软件包

### 安装依赖项

```bash
yarn
```


## 传输器

Steedos 平台默认使用 Redis 作为传输器。在开发和调试 Steedos 软件包之前，您需要进行相关配置。设置环境变量 TRANSPORTER 指向您的 Redis 实例。

```bash
TRANSPORTER=redis://127.0.0.1:6379
```

:::tip
请确保您配置的 TRANSPORTER 与您希望连接的 Steedos 服务器匹配，并且网络是互连的。
:::

:::danger
对于在生产环境中运行，请务必配置 Redis 密码。
:::

### 运行软件包

为了简化 Steedos 软件包的运行流程，您可以使用 [moleculer-runner](https://moleculer.services/docs/0.14/runner) 命令来启动 steedos 软件包。

```bash
npx moleculer-runner steedos-packages/*/package.service.js --hot --repl
```

这个命令将执行以下操作：

- **`hot`**: 开启热重载，当服务文件有更改时，它会自动重启相关服务。
- **`repl`**: 开启 REPL 模式，允许您在命令行中与运行中的服务进行交互。


:::tip
请注意，Steedos DX 项目支持多包开发，上述命令会同时启动 steedos-packages 文件夹下的所有软件包。
:::

### 开发建议
- 确保 Steedos 平台在开发过程中始终可用。
- 在修改服务代码时，利用 --hot 选项可以省去手动重启服务的麻烦。
- 利用 REPL 模式来调试和测试您的服务，这是一个强大的交互式工具，能帮助您快速定位问题。