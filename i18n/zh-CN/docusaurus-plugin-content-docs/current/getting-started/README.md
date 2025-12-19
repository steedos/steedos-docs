---
title: 入门指南
sidebar_position: 5
---

# 欢迎使用华炎魔方 3.0

**华炎魔方（Steedos）是领先的开源低代码开发平台，是 Salesforce 的国内最佳开源替代方案。**

我们采用先进的 **元数据驱动（Metadata-Driven）** 架构，通过 AI 原生能力，帮助企业以传统开发 **1/10** 的成本，快速构建安全、可扩展的数字化核心应用。

![steedos overview](/diagrams/steedos-overview-zh-CN.svg)

## 核心价值主张

* **元数据驱动，敏捷建模**：通过 YAML 或可视化界面定义对象与逻辑。系统自动生成数据库表结构、标准 API 及管理界面，实现“模型即应用”。
* **企业级安全体系**：不同于简单的表单工具，华炎魔方拥有严密的权限模型，支持**字段级权限控制**与**记录级共享规则**，满足大型组织合规需求。
* **AI 原生自动化**：Steedos 3.0 深度集成 **AI Copilot** 与 **AI Agents**，让用户通过自然语言即可完成数据查询、报表生成及复杂业务操作。

## 六大核心功能支柱

| 核心支柱 | 关键能力 |
| --- | --- |
| **建模 (Modeling)** | 自定义对象、主子明细关系、公式字段与累计汇总。 |
| **自动化 (Automation)** | 多级审批流、工作流规则、Node.js 触发器。 |
| **界面 (UI Designer)** | 基于百度 Amis 引擎，提供高性能、动态配置的业务界面。 |
| **安全 (Security)** | 简档与权限集、记录级共享规则、审计日志、数据脱敏。 |
| **开发 (Pro-Code)** | Steedos CLI、VS Code 插件、基于 Git 的源码级版本控制。 |
| **分析 (Insights)** | 实时多维报表、可视化仪表盘，原生支持 Excel 与 Power BI。 |

## 开发者与集成能力

华炎魔方拒绝“黑盒”限制，专为专业开发者设计：

* **API First**：原生提供 **GraphQL**、REST 及 **OData** 标准接口。
* **微服务架构**：基于 **Moleculer** 框架，支持高并发下的分布式部署与水平扩展。
* **云原生部署**：支持 Docker、K8s 容器化，适配私有云、混合云及国产化信创环境。

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
