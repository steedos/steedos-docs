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
