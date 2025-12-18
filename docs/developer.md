
# Developer Guide

:::info Core Philosophy
**Low-Code + Pro-Code = Infinite Possibilities**

* Use **No-Code** capabilities to handle 80% of common requirements (CRUD, simple workflows, reports) for maximum **speed**.
* Use **Pro-Code** capabilities to tackle the 20% core differentiation (complex algorithms, system integrations, custom UI) for maximum **depth**.
:::

Welcome to the world of Steedos development.

If you are a programmer, you might have reservations about "Low-Code platforms": *"Will it limit my creativity?"* or *"Will I have to learn a bunch of proprietary, quirky syntax?"*

Rest assured. Steedos 3.0 is built on a standard technology stack (**Node.js, MongoDB, React**). Here, you are still the full-stack engineer you know and love—you just have a powerful acceleration engine added to your toolbox.

---

## What Can You Do Here?

As a developer, you can take control of any layer of the system:

### 1. Backend Extensions (Node.js)

* **Triggers**: Intercept requests before or after data is saved to perform complex validations or calculations (e.g., automatically checking inventory in an ERP system before a contract is finalized).
* **Custom APIs**: Write standard REST or GraphQL APIs for third-party system consumption.
* **Microservices**: Leverage the **Moleculer** framework to write independent microservice modules that are decoupled from the Steedos core.

### 2. Frontend Extensions (React + Amis)

* **Custom Components**: Build a stunning "3D model viewer" in React and use it via drag-and-drop within the Page Designer.
* **Complex Interaction Logic**: Write JavaScript snippets to control form linkages, validations, and dynamic visual effects.
* **Theme Customization**: Use CSS/SASS for deep UI customization, or even rewrite the entire login page.

### 3. Engineering & DevOps

* **Code as Configuration**: All objects, fields, and permission settings can be exported as `.yml` files.
* **Version Control**: Commit these configuration files to a Git repository for Code Review and version rollbacks.
* **CI/CD**: Automate application deployment to production environments using GitHub Actions or Jenkins.

---

## The Workflow

Steedos adopts a **"Metadata Driven"** development model. Your typical workflow looks like this:

1. **Retrieve**: Use the CLI tool to pull online configurations (objects, permissions, etc.) to your local machine, converting them into `.yml` files.
2. **Code**:
* Modify `.yml` files in **VS Code**.
* Create `.js` files to write Trigger logic.
* Create `.tsx` files to build React components.


3. **Debug**: Start the Steedos service locally to preview your changes in real-time.
4. **Deploy**: Once testing passes, use the CLI to push metadata and code to your staging or production environments.

---

## Prerequisite Skills

Before you dive in, we recommend having a foundation in the following:

* **JavaScript (ES6+) / TypeScript**: The universal languages for Steedos development.
* **JSON & YAML**: The primary formats for configuration files.
* **Node.js Basics**: Understanding `npm/yarn` and module imports/exports.
* **React Basics**: (Required for frontend tasks) Understanding components, Props, and State.
* **MongoDB Query Syntax**: (Optional) Helpful for writing complex database queries.

---

:::tip Advice for Developers
Don't try to reinvent the wheel with code.
Before you start coding, ask yourself: **"Can this feature be achieved through no-code configuration?"**

* If yes, prioritize configuration (as it is more stable and easier to maintain).
* If no, or if the configuration feels extremely forced, then—**Show me the code!**
:::
