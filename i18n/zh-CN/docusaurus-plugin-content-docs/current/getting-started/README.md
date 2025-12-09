---
title: 入门指南
sidebar_position: 5
---

# 欢迎使用 Steedos Platform

**Steedos Platform** 是一款开源的企业级低代码开发平台。基于 **元数据驱动（Metadata Driven）** 架构，它使开发者能够以 10 倍速度构建、部署和管理复杂的企业应用。

无论是构建 CRM、ERP，还是深度定制的业务系统，Steedos 都提供从数据建模、界面生成到流程自动化的全栈能力。

![steedos overview](/diagrams/steedos-overview.svg)

## 🌟 主要特性

* **🚀 快速开发**：以简单的 JSON/YAML 配置文件定义数据对象，即可自动生成 CRUD API 与用户界面。
* **🔧 面向代码的低代码模式**：支持可视化设计工具，同时保留对开发者友好的方式，可在 VS Code 中直接编辑元数据代码。
* **⚛️ 现代技术栈**：后端基于 Node.js 与 MongoDB，前端采用 React，便于扩展与集成。
* **🔗 强大的集成能力**：内置 GraphQL 与 REST API，可轻松对接第三方系统。
* **🛡️ 企业级安全**： granular 权限控制体系，支持字段级安全与记录级共享规则。

## ⚡ 快速开始

开始之前，请确保已安装 [Docker](https://www.docker.com/) 与 [Docker Compose](https://docs.docker.com/compose/)。

### 方案一：Docker（推荐）

体验 Steedos 的最快方式：

```bash
docker run -d -p 80:80 steedos/steedos-community:3.0
```

### 方案二：创建新项目（适用于开发者）

通过脚手架创建标准工程项目：

```bash
# 创建项目
npx create-steedos-app my-project

# 进入目录并安装依赖
cd my-project
yarn install

# 启动服务
yarn start
```

### 访问控制台

服务启动后，在浏览器中访问 `http://localhost`。

* **默认界面**：您将看到 Steedos 的初始化向导或登录页面。
* **配置**：系统会自动生成默认管理员账号，或引导您创建账户。

## 🤝 社区与支持

Steedos 是一个活跃的开源项目。如遇问题或有功能建议，欢迎联系：

* **GitHub Issues**：提交问题或功能请求（[前往 GitHub](https://github.com/steedos/steedos-platform)）
* **社区论坛**：与其他开发者交流想法。
* **企业支持**：如需商业功能或技术支持，请联系销售团队。（[前往 官网](https://www.steedos.com)）
