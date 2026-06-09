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

If your assistant does not support skills directly, you can still use the files in the [Steedos platform skills directory](https://github.com/steedos/steedos-platform/tree/3.0/skills) as reference material when discussing implementation details.

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
Use the Steedos dev-testing skill. Test the CRM module at http://localhost:5100 with the account I provide, and iterate until the core create/edit/list workflow passes.
```

Keep the assistant grounded in your actual project files. Steedos Skills provide platform knowledge, but your project requirements and review decisions still come from your team.
