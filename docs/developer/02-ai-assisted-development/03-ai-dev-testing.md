---
title: AI Development and Testing Workflow
sidebar_position: 3
---

# AI Development and Testing Workflow

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

For complex workflows, provide a test URL, account, password, and target page so the assistant can use Playwright MCP or another browser automation tool.

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
