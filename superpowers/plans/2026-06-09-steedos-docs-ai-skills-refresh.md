# Steedos Docs AI Skills 文档翻新实施计划

> **给 agentic workers：** 必须使用子技能 `superpowers:subagent-driven-development`（推荐）或 `superpowers:executing-plans`，按任务逐步执行本计划。步骤使用 checkbox（`- [ ]`）语法追踪状态。

**目标：** 为 Steedos 3.0 文档站新增一个聚焦的 AI 辅助开发与 Steedos Skills 小节，并新增一份很薄、工具中立的 `AGENTS.md`。

**架构：** 在英文和中文 current docs 的 Developer 栏目下新增一个由 Docusaurus 自动生成侧边栏的小节。platform 仓库只作为只读资料来源，不把完整 `skills/*/SKILL.md` 内容搬进文档站。实施验证边界是 Docusaurus 构建。

**技术栈：** Docusaurus 3.9.x、Markdown/MDX 文档、YAML category 文件、Yarn、文档站使用 Node 18+。

---

## 文件结构映射

- 新建 `docs/developer/02-ai-assisted-development/_category_.yml`：英文 Developer 小节元数据。
- 新建 `docs/developer/02-ai-assisted-development/01-overview.md`：英文 AI 辅助 Steedos 开发概览。
- 新建 `docs/developer/02-ai-assisted-development/02-steedos-skills.md`：英文 Steedos Skills 使用指南。
- 新建 `docs/developer/02-ai-assisted-development/03-ai-dev-testing.md`：英文读者项目内 AI 开发/测试迭代指南。
- 修改 `docs/developer.md`：给新增小节增加英文入口。
- 新建 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/_category_.yml`：中文小节元数据。
- 新建 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/01-overview.md`：中文概览。
- 新建 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/02-steedos-skills.md`：中文 Skills 指南。
- 新建 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/03-ai-dev-testing.md`：中文 AI 开发/测试指南。
- 修改 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer.md`：给新增小节增加中文入口。
- 新建 `AGENTS.md`：薄项目事实、文档目录、命令、AI 助手注意事项。

不要修改 `versioned_docs/`、`i18n/zh-CN/docusaurus-plugin-content-docs/version-*` 或 `/Users/tujiajun/Documents/Github/steedos-platform-3`。

## 任务 1：新增英文 AI 辅助开发文档

**文件：**
- 新建：`docs/developer/02-ai-assisted-development/_category_.yml`
- 新建：`docs/developer/02-ai-assisted-development/01-overview.md`
- 新建：`docs/developer/02-ai-assisted-development/02-steedos-skills.md`
- 新建：`docs/developer/02-ai-assisted-development/03-ai-dev-testing.md`
- 修改：`docs/developer.md`

- [ ] **步骤 1：创建英文小节目录**

运行：

```bash
mkdir -p docs/developer/02-ai-assisted-development
```

预期：命令以状态 0 退出。

- [ ] **步骤 2：添加英文 category 元数据**

创建 `docs/developer/02-ai-assisted-development/_category_.yml`，内容为：

```yaml
label: AI-Assisted Development
position: 2
collapsed: false
link:
  type: generated-index
```

- [ ] **步骤 3：添加英文概览页面**

创建 `docs/developer/02-ai-assisted-development/01-overview.md`，内容为：

```markdown
---
title: AI-Assisted Development
sidebar_position: 1
---

# AI-Assisted Development

Steedos 3.0 is built around metadata-driven development. Objects, fields, permissions, pages, applications, and business logic can be represented as files inside a Steedos project. That makes Steedos a strong fit for AI-assisted development: the assistant can work with explicit project files, while developers keep control of requirements, review, testing, and release decisions.

AI should not replace business ownership. Treat it as a development partner that can draft metadata, explain platform concepts, generate package files, and help iterate on errors after you test the result.

## Recommended Workflow

1. Describe the business requirement in natural language.
2. Ask the AI assistant to produce a plan before changing files.
3. Review the proposed objects, fields, permissions, pages, and automation.
4. Let the assistant modify files under your Steedos project, usually inside `steedos-packages/`.
5. Start the Steedos project and verify the result in the browser.
6. Feed errors, screenshots, or observations back into the assistant and iterate.

## What AI Can Help With

AI assistants are most useful for tasks that map to Steedos metadata:

| Area | Examples |
| --- | --- |
| Data modeling | Objects, fields, relationships, list views |
| User interface | Applications, tabs, Amis pages, buttons |
| Security | Permission sets, profiles, record access rules |
| Business logic | Triggers, functions, workflow-related scripts |
| Data and reporting | Seed data, analytics questions, dashboards |
| Testing | Browser test flows, issue reproduction, iteration notes |

## Human Review Still Matters

Before publishing AI-generated changes, review:

- Whether the data model matches the real business process.
- Whether permissions expose only the right records and fields.
- Whether generated scripts are safe, maintainable, and scoped.
- Whether the UI is clear enough for the target users.
- Whether tests cover the workflow that will be used in production.

For Steedos-specific guidance, install and use Steedos Skills so your AI assistant can reason with the platform's conventions instead of generic low-code assumptions.
```

- [ ] **步骤 4：添加英文 Steedos Skills 页面**

创建 `docs/developer/02-ai-assisted-development/02-steedos-skills.md`，内容为：

````markdown
---
title: Steedos Skills
sidebar_position: 2
---

# Steedos Skills

Steedos Skills are focused knowledge packs for AI coding assistants. They summarize Steedos project structure, metadata file formats, APIs, testing workflows, and common implementation patterns.

Use them with assistants such as Codex, Claude, GitHub Copilot, Cursor, or any tool that can load Anthropic-compatible Agent Skills or consume the same Markdown knowledge files.

## Install Skills

Install all Steedos Skills:

```bash
npx skills add steedos/steedos-platform --all
```

Install one skill:

```bash
npx skills add steedos/steedos-platform --skill steedos-objects
```

List available skills:

```bash
npx skills add steedos/steedos-platform --list
```

If your assistant does not support skills directly, you can still use the files in the Steedos platform repository as reference material when discussing implementation details.

## Choose Skills By Task

| Task | Skills to use |
| --- | --- |
| Create a project or package | `steedos-getting-started`, `steedos-project-package` |
| Configure environment variables | `steedos-configuration` |
| Define objects and fields | `steedos-objects`, `steedos-object-fields` |
| Configure permissions | `steedos-object-permissions` |
| Add buttons or actions | `steedos-object-buttons`, `steedos-server-logic` |
| Build pages or navigation | `steedos-pages`, `steedos-applications`, `steedos-tabs` |
| Add translations | `steedos-translations` |
| Add seed data | `steedos-seed-data` |
| Build reports or dashboards | `steedos-analytics` |
| Use REST or GraphQL APIs | `steedos-server-api`, `steedos-graphql-api` |
| Test iteratively with a browser | `steedos-dev-testing` |

## Choose Skills By File Type

| File type | Skill |
| --- | --- |
| `*.object.yml` | `steedos-objects` |
| `*.field.yml` | `steedos-object-fields` |
| `*.listview.yml` | `steedos-objects` |
| `*.button.yml` | `steedos-object-buttons` |
| `*.trigger.yml` | `steedos-server-logic` |
| `*.function.yml` | `steedos-server-logic` |
| `*.app.yml` | `steedos-applications` |
| `*.tab.yml` | `steedos-tabs` |
| `*.page.yml` and `*.page.amis.json` | `steedos-pages` |
| `*.permission.yml` | `steedos-object-permissions` |
| `*.translation.yml` | `steedos-translations` |
| `*.data.yml`, `*.data.json`, `*.data.csv` | `steedos-seed-data` |

## Good Prompts

Ask the assistant to use the relevant skill and work from your project structure:

```text
Use the Steedos objects and fields skills. Design a contract management data model in my Steedos project, then show the files you plan to create before editing.
```

```text
Use the Steedos dev-testing skill. Test the CRM module at http://localhost:5100 with a temporary, low-privilege local or staging test account, and iterate until the core create/edit/list workflow passes.
```

Keep the assistant grounded in your actual project files. Steedos Skills provide platform knowledge, but your project requirements and review decisions still come from your team.
````

- [ ] **步骤 5：添加英文 AI 开发与测试页面**

创建 `docs/developer/02-ai-assisted-development/03-ai-dev-testing.md`，内容为：

````markdown
---
title: AI Development And Testing Workflow
sidebar_position: 3
---

# AI Development And Testing Workflow

This workflow is for developers using AI assistants in their own Steedos projects. It is not the build process for this documentation repository.

The goal is to keep AI-generated changes reviewable: plan first, edit targeted metadata and package files, run the Steedos project, test the business flow, then feed concrete results back into the assistant.

## 1. Prepare The Project

Create and start from a standard Steedos project:

```bash
npx create-steedos-app my-project
cd my-project
yarn
```

Install Steedos Skills for your assistant:

```bash
npx skills add steedos/steedos-platform --all
```

## 2. Ask For A Plan First

Before editing files, ask the assistant to analyze the requirement and propose an implementation plan.

Example:

```text
Use Steedos Skills. Design a CRM module with accounts, contacts, opportunities, permissions, list views, and demo data. First give me the implementation plan and file list. Do not edit files until I approve the plan.
```

Review the plan for naming, relationships, required fields, permissions, and whether the work should live in a new or existing package under `steedos-packages/`.

## 3. Implement In Small Steps

After approving the plan, ask the assistant to make targeted changes. Typical files include:

- Object metadata under `steedos-packages/<package>/main/default/objects/`.
- Application and tab metadata under `applications/` and `tabs/`.
- Page metadata under `pages/`.
- Trigger and function metadata under `triggers/` and `functions/`.
- Permission and translation files under their matching metadata folders.

Keep related changes together and review generated YAML carefully.

## 4. Run And Verify

Start the Steedos project:

```bash
yarn start
```

Open the printed URL, commonly:

```text
http://localhost:5100
```

Verify the workflow manually:

- The app and tabs appear in the expected location.
- Lists show the expected columns and filters.
- Forms include required fields and relationships.
- Permissions match the intended users.
- Buttons, triggers, and functions behave as expected.

## 5. Iterate With Evidence

When something fails, give the assistant concrete evidence:

- Error logs from the terminal.
- Browser screenshots or visible page state.
- The file path and record/action that failed.
- The expected behavior and actual behavior.

Example:

```text
The opportunity save action fails. Here is the terminal error and the object file path. Please identify the cause, make the smallest fix, and tell me what to retest.
```

## 6. Optional Browser Automation

For complex workflows, provide a test URL, temporary test account, short-lived password, and target page so the assistant can use Playwright MCP or another browser automation tool.

Use a local or staging temporary, low-privilege test account with a short-lived password. Avoid sharing production secrets, real customer data, reusable passwords, or unsanitized logs and screenshots with AI tools.

Example:

```text
Use browser automation to test the CRM module.
URL: http://localhost:5100
Account: <temporary-test-account>
Password: <short-lived-test-password>
Target workflow: create an account, create a contact, create an opportunity, then verify they appear in the list views.
```

Automated browser testing should complement human review. Before release, review the generated files and confirm the business process with real users or product owners.
````

- [ ] **步骤 6：给英文 Developer 入口页添加导流**

修改 `docs/developer.md`，在 workflow 列表之后、`## Prerequisite Skills` 之前添加：

```markdown
## AI-Assisted Development

Steedos projects are metadata-driven, which makes them well suited for AI-assisted development. Use the [AI-Assisted Development](./developer/02-ai-assisted-development/01-overview) guide to learn how to install Steedos Skills, plan changes with an AI coding assistant, and test generated metadata safely.

---
```

- [ ] **步骤 7：检查英文文档文件**

运行：

```bash
find docs/developer/02-ai-assisted-development -maxdepth 1 -type f | sort
rg -n "AI-Assisted Development|Steedos Skills|AI Development And Testing" docs/developer docs/developer.md
```

预期：

- 列出 4 个新增英文文件。
- 能找到新增页面标题和 Developer 入口页导流内容。

- [ ] **步骤 8：提交英文文档**

运行：

```bash
git add docs/developer.md docs/developer/02-ai-assisted-development
git commit -m "docs: add english ai-assisted development guide"
```

预期：提交成功，并且只包含英文文档改动。

## 任务 2：新增中文 AI 辅助开发文档

**文件：**
- 新建：`i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/_category_.yml`
- 新建：`i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/01-overview.md`
- 新建：`i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/02-steedos-skills.md`
- 新建：`i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/03-ai-dev-testing.md`
- 修改：`i18n/zh-CN/docusaurus-plugin-content-docs/current/developer.md`

- [ ] **步骤 1：创建中文小节目录**

运行：

```bash
mkdir -p i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development
```

预期：命令以状态 0 退出。

- [ ] **步骤 2：添加中文 category 元数据**

创建 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/_category_.yml`，内容为：

```yaml
label: AI 辅助开发
position: 2
collapsed: false
link:
  type: generated-index
```

- [ ] **步骤 3：添加中文概览页面**

创建 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/01-overview.md`，内容为：

```markdown
---
title: AI 辅助开发
sidebar_position: 1
---

# AI 辅助开发

Steedos 3.0 采用元数据驱动开发。对象、字段、权限、页面、应用和业务逻辑都可以在 Steedos 项目中以文件形式表达。这让 Steedos 很适合 AI 辅助开发：AI 助手可以围绕清晰的项目文件工作，开发者则负责需求判断、代码审查、测试和发布决策。

AI 不应该替代业务负责人或开发者。更合适的方式是把它当成开发搭档：帮助起草元数据、解释平台概念、生成 package 文件，并在你测试后根据错误信息继续迭代。

## 推荐工作流

1. 用自然语言描述业务需求。
2. 让 AI 助手先输出方案，不要直接改文件。
3. 审查对象、字段、权限、页面和自动化逻辑设计。
4. 让 AI 助手修改 Steedos 项目文件，通常位于 `steedos-packages/` 下。
5. 启动 Steedos 项目，在浏览器中验证结果。
6. 把错误、截图或页面现象反馈给 AI 助手，继续迭代。

## AI 适合协助的内容

AI 助手最适合处理能映射到 Steedos 元数据的任务：

| 领域 | 示例 |
| --- | --- |
| 数据建模 | 对象、字段、关系、列表视图 |
| 用户界面 | 应用、导航、Amis 页面、按钮 |
| 安全控制 | 权限集、简档、记录访问规则 |
| 业务逻辑 | 触发器、函数、工作流相关脚本 |
| 数据与报表 | 初始化数据、统计问题、仪表盘 |
| 测试 | 浏览器测试流程、问题复现、迭代记录 |

## 人工审查仍然重要

发布 AI 生成的改动前，请审查：

- 数据模型是否符合真实业务流程。
- 权限是否只暴露正确的记录和字段。
- 生成脚本是否安全、可维护且范围清晰。
- 界面是否足够清晰，适合目标用户使用。
- 测试是否覆盖生产中会使用的关键流程。

为了让 AI 助手理解 Steedos 约定，请安装并使用 Steedos Skills，避免它只基于通用低代码经验进行猜测。
```

- [ ] **步骤 4：添加中文 Steedos Skills 页面**

创建 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/02-steedos-skills.md`，内容为：

````markdown
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

如果你的 AI 助手不能直接安装 skills，也可以把 Steedos platform 仓库中的 skills 文件作为参考资料，用于讨论具体实现。

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
````

- [ ] **步骤 5：添加中文 AI 开发与测试页面**

创建 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/03-ai-dev-testing.md`，内容为：

````markdown
---
title: AI 开发与测试工作流
sidebar_position: 3
---

# AI 开发与测试工作流

本页面向在自己 Steedos 项目中使用 AI 助手的开发者。它不是当前文档站仓库的构建流程。

目标是让 AI 生成的改动可审查、可验证：先计划，再有针对性地修改元数据和 package 文件，启动 Steedos 项目，测试业务流程，然后把具体结果反馈给 AI 助手继续迭代。

## 1. 准备项目

从标准 Steedos 项目开始：

```bash
npx create-steedos-app my-project
cd my-project
yarn
```

为你的 AI 助手安装 Steedos Skills：

```bash
npx skills add steedos/steedos-platform --all
```

## 2. 先让 AI 给方案

在修改文件之前，先让 AI 助手分析需求并提出实现计划。

示例：

```text
请使用 Steedos Skills。帮我设计一个 CRM 模块，包含客户、联系人、商机、权限、列表视图和演示数据。请先给出实现计划和文件清单，在我确认前不要编辑文件。
```

审查计划时，重点看命名、关系、必填字段、权限，以及这些改动应该放在 `steedos-packages/` 下的新 package 还是已有 package 中。

## 3. 小步实施

确认计划后，让 AI 助手进行有针对性的改动。常见文件包括：

- `steedos-packages/<package>/main/default/objects/` 下的对象元数据。
- `applications/` 和 `tabs/` 下的应用与导航元数据。
- `pages/` 下的页面元数据。
- `triggers/` 和 `functions/` 下的触发器与函数元数据。
- 权限、翻译等对应 metadata 目录下的文件。

相关改动应保持在一起，并仔细审查生成的 YAML。

## 4. 启动并验证

启动 Steedos 项目：

```bash
yarn start
```

打开控制台输出的地址，常见为：

```text
http://localhost:5100
```

人工验证关键流程：

- 应用和导航是否出现在预期位置。
- 列表是否显示预期字段和过滤条件。
- 表单是否包含必填字段和关系字段。
- 权限是否符合目标用户。
- 按钮、触发器、函数行为是否符合预期。

## 5. 带着证据迭代

如果功能不符合预期，请给 AI 助手提供具体证据：

- 终端错误日志。
- 浏览器截图或页面状态。
- 失败的文件路径、记录或操作。
- 期望行为和实际行为。

示例：

```text
商机保存失败。下面是终端错误和对象文件路径。请定位原因，做最小修复，并告诉我需要重新测试什么。
```

## 6. 可选浏览器自动化

复杂流程可以提供测试地址、临时测试账号、短期有效密码和目标页面，让 AI 助手使用 Playwright MCP 或其他浏览器自动化工具测试。

只使用本地或测试环境中的临时、低权限测试账号，并使用短期有效的测试账号密码。日志和截图应先脱敏，不要包含生产凭据、真实管理员账号、真实客户数据、长期复用密码或其他敏感信息。

示例：

```text
请使用浏览器自动化测试 CRM 模块。
地址：http://localhost:5100
账号：<临时测试账号>
密码：<短期有效的测试账号密码>
目标流程：新建客户、新建联系人、新建商机，然后确认它们出现在列表视图中。
```

浏览器自动化测试应作为人工审查的补充。发布前，请继续审查生成文件，并与真实用户或产品负责人确认业务流程。
````

- [ ] **步骤 6：给中文 Developer 入口页添加导流**

修改 `i18n/zh-CN/docusaurus-plugin-content-docs/current/developer.md`，在 workflow 列表之后、`## 必备技能清单` 之前添加：

```markdown
## AI 辅助开发

Steedos 项目采用元数据驱动结构，很适合结合 AI 编程助手进行开发。阅读 [AI 辅助开发](./developer/02-ai-assisted-development/01-overview) 指南，了解如何安装 Steedos Skills、让 AI 先规划再改动，并安全测试生成的元数据。

-----
```

- [ ] **步骤 7：检查中文文档文件**

运行：

```bash
find i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development -maxdepth 1 -type f | sort
rg -n "AI 辅助开发|Steedos Skills|AI 开发与测试工作流" i18n/zh-CN/docusaurus-plugin-content-docs/current/developer i18n/zh-CN/docusaurus-plugin-content-docs/current/developer.md
```

预期：

- 列出 4 个新增中文文件。
- 能找到新增页面标题和中文 Developer 入口页导流内容。

- [ ] **步骤 8：提交中文文档**

运行：

```bash
git add i18n/zh-CN/docusaurus-plugin-content-docs/current/developer.md i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development
git commit -m "docs: add chinese ai-assisted development guide"
```

预期：提交成功，并且只包含中文 current docs 改动。

## 任务 3：新增工具中立的 AGENTS.md

**文件：**
- 新建：`AGENTS.md`

- [ ] **步骤 1：创建 AGENTS.md**

创建 `AGENTS.md`，内容为：

```markdown
# AGENTS.md

## Project Facts

- This repository is the Docusaurus source for https://docs.steedos.com/.
- Only modify this `steedos-docs` repository for documentation-site work.
- `/Users/tujiajun/Documents/Github/steedos-platform-3` is a read-only reference repository for Steedos Platform 3.0 docs, skills, and templates.
- Current docs are labeled as version 3.0 in `docusaurus.config.js`.
- Do not edit older versioned docs unless explicitly requested.

## Documentation Layout

- English current docs: `docs/`.
- Chinese current docs: `i18n/zh-CN/docusaurus-plugin-content-docs/current/`.
- Old version docs live under `versioned_docs/` and `i18n/zh-CN/docusaurus-plugin-content-docs/version-*`.
- Sidebars are configured in `sidebars.js` and mostly use autogenerated directories.
- Keep English and Chinese current docs in sync for new, moved, or renamed pages.

## Commands

- Install with Node 18 and Yarn: `nvm use 18`, then `yarn`.
- English preview: `yarn start`.
- Chinese preview: `yarn start:cn`.
- English build: `yarn build`.
- Chinese build: `yarn build:cn`.
- OpenAPI builds, when OpenAPI files change: `yarn build:openapi` and `yarn build:openapi:cn`.

## Notes For AI Assistants

- This is not the Steedos server/platform runtime repository; do not use Steedos server validation commands here.
- Do not modify `/Users/tujiajun/Documents/Github/steedos-platform-3`.
- Prefer small, bilingual current-docs changes and run the relevant Docusaurus build before reporting completion.
- Unless there is a specific reason to use another language, write human-reviewed design docs, plans, and work summaries in Chinese. Keep code, commands, paths, and English published docs in their required language.
```

- [ ] **步骤 2：检查 AGENTS.md 范围**

运行：

```bash
wc -l AGENTS.md
rg -n "steedos-platform-3|yarn build|versioned_docs|Codex|Claude|Copilot" AGENTS.md
```

预期：

- `AGENTS.md` 足够短，方便快速扫读。
- 文件明确 platform 参考仓库是只读边界。
- 文件包含文档站验证命令。
- 文件明确人类 review 的设计文档、计划和工作总结优先中文。

- [ ] **步骤 3：提交 AGENTS.md**

运行：

```bash
git add AGENTS.md
git commit -m "docs: add agent guidance"
```

预期：提交成功，并且只包含 `AGENTS.md`。

## 任务 4：验证文档构建与改动范围

**文件：**
- 不新增文件。
- 验证任务 1-3 产生的所有改动。

- [ ] **步骤 1：确认改动文件范围**

运行：

```bash
git diff --name-only master...HEAD | sort
```

预期输出只包含：

```text
AGENTS.md
docs/developer.md
docs/developer/02-ai-assisted-development/01-overview.md
docs/developer/02-ai-assisted-development/02-steedos-skills.md
docs/developer/02-ai-assisted-development/03-ai-dev-testing.md
docs/developer/02-ai-assisted-development/_category_.yml
superpowers/specs/2026-06-09-steedos-docs-ai-skills-refresh-design.md
i18n/zh-CN/docusaurus-plugin-content-docs/current/developer.md
i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/01-overview.md
i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/02-steedos-skills.md
i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/03-ai-dev-testing.md
i18n/zh-CN/docusaurus-plugin-content-docs/current/developer/02-ai-assisted-development/_category_.yml
```

如果计划文件尚未提交，或用户后续决定提交计划文件，implementation plan 文件也可能出现。不得出现 `versioned_docs/`、旧版本 i18n docs 或 platform 仓库文件。

- [ ] **步骤 2：检查发布文档中没有本机绝对路径**

运行：

```bash
rg -n "/Users/tujiajun|steedos-platform-3" docs/developer i18n/zh-CN/docusaurus-plugin-content-docs/current/developer
```

预期：发布文档内容中没有匹配项。

- [ ] **步骤 3：构建英文文档**

运行：

```bash
yarn build
```

预期：Docusaurus 构建成功。如果因为依赖缺失失败，只有在需要安装依赖并获得审批后才运行 `yarn`。

- [ ] **步骤 4：构建中文文档**

运行：

```bash
yarn build:cn
```

预期：Docusaurus 中文构建成功。

- [ ] **步骤 5：确认工作区干净**

运行：

```bash
git status --short --branch
```

预期：

```text
## codex/docs-ai-skills-refresh
```

如果出现构建输出或生成文件，检查它们是否已被忽略。不要提交构建产物。

- [ ] **步骤 6：报告最终实施结果**

最终报告必须包含：

- 英文文档、中文文档和 `AGENTS.md` 对应的提交。
- `yarn build` 结果。
- `yarn build:cn` 结果。
- 确认 `/Users/tujiajun/Documents/Github/steedos-platform-3`、`versioned_docs/` 和旧版本 i18n docs 未被修改。
- 任何构建失败或跳过命令及其原因。
