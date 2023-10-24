---
sidebar_position: 90
title: 项目结构
---

# Steedos DX 项目的结构和源格式

Steedos DX 项目有特定的项目结构和源格式。源格式使用的文件集和文件扩展名与 Metadata API 使用的不同。当您使用项目检索开始命令从 org 检索元数据时，Steedos CLI 将其以源格式存储在您的项目中。当您部署元数据时，Steedos CLI 将其转换为 Metadata API 所需的格式。

## 项目结构

```bash
my-project
├── steedos-packages
│   ├── package1
│   ├── package2
│   └── package3
├── steedos-platform
├── package.json
└── moleculer.config.js
```

### steedos-packages

当您创建 Steedos DX 项目时，可以通过在本地创建多个包目录来将元数据组织成逻辑分组。您可以将类似的代码和源代码分组到一个应用程序或自定义中，以更好地组织您团队的存储库。

### steedos-platform

要开发一个包，您需要连接到一个 Steedos Platform 部署。导航到 'steedos-platform' 文件夹以启动本地 Steedos Platform。

### package.json

`package.json` 文件在几乎所有涉及 Node.js 的项目中都是基本元素。它作为定义项目中所需的各种模块以及其他配置细节的基础来源。
