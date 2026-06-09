---
title: Steedos Skills
sidebar_position: 2
---

# Steedos Skills

Steedos Skills 是给 AI 编程助手使用的领域知识包。它们总结了 Steedos 项目结构、元数据文件格式、API、测试流程和常见实现模式。

你可以在 Codex、Claude、GitHub Copilot、Cursor 等 AI 编程助手中使用这些知识。只要工具支持 Anthropic-compatible Agent Skills，或能读取相同的 Markdown 知识文件，就可以利用这些内容。

## 安装 Skills

安装全部 Steedos Skills：

```bash
npx skills add steedos/steedos-platform --all
```

安装单个 skill：

```bash
npx skills add steedos/steedos-platform --skill steedos-objects
```

列出可用 skills：

```bash
npx skills add steedos/steedos-platform --list
```

如果你的 AI 助手不能直接安装 skills，也可以把 Steedos platform 仓库中的 [skills 文件](https://github.com/steedos/steedos-platform/tree/3.0/skills) 作为参考资料，用于讨论具体实现。

## 按任务选择 Skills

| 任务 | 推荐 skills |
| --- | --- |
| 创建项目或软件包 | `steedos-getting-started`, `steedos-project-package` |
| 配置环境变量 | `steedos-configuration` |
| 定义对象和字段 | `steedos-objects`, `steedos-object-fields` |
| 配置权限 | `steedos-object-permissions` |
| 添加按钮或动作 | `steedos-object-buttons`, `steedos-server-logic` |
| 构建页面或导航 | `steedos-pages`, `steedos-applications`, `steedos-tabs` |
| 添加翻译 | `steedos-translations` |
| 添加初始化数据 | `steedos-seed-data` |
| 构建报表或仪表盘 | `steedos-analytics` |
| 使用 REST 或 GraphQL API | `steedos-server-api`, `steedos-graphql-api` |
| 使用浏览器迭代测试 | `steedos-dev-testing` |

## 按文件类型选择 Skills

| 文件类型 | Skill |
| --- | --- |
| `*.object.yml` | `steedos-objects` |
| `*.field.yml` | `steedos-object-fields` |
| `*.listview.yml` | `steedos-objects` |
| `*.button.yml` | `steedos-object-buttons` |
| `*.trigger.yml` | `steedos-server-logic` |
| `*.function.yml` | `steedos-server-logic` |
| `*.app.yml` | `steedos-applications` |
| `*.tab.yml` | `steedos-tabs` |
| `*.page.yml` 和 `*.page.amis.json` | `steedos-pages` |
| `*.permission.yml` | `steedos-object-permissions` |
| `*.translation.yml` | `steedos-translations` |
| `*.data.yml`, `*.data.json`, `*.data.csv` | `steedos-seed-data` |

## 好的提示词示例

让 AI 助手使用相关 skill，并基于你的项目结构工作：

```text
请使用 Steedos objects 和 fields skills。帮我设计合同管理数据模型，先列出准备创建的文件和字段设计，确认后再编辑。
```

```text
请使用 Steedos dev-testing skill。访问 http://localhost:5100 测试 CRM 模块，并迭代到新增、编辑、列表查看的核心流程通过。
```

请始终让 AI 助手基于你的实际项目文件工作。Steedos Skills 提供平台知识，但项目需求和审查决策仍然来自你的团队。
