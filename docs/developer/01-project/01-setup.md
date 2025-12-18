# Project Initialization

:::info Learning Objectives

* Set up the Node.js development environment (v22).
* Initialize a project using the scaffolding tool (`create-steedos-app`).
* **Core Skill**: Understand the project directory structure based on **Yarn Workspaces**.
* **Core Skill**: Master the workflow of starting databases and services using Yarn scripts.
:::

Steedos 3.0 adopts a standard Node.js microservices architecture with a clear project structure and a fully built-in runtime environment.

---

## 1. Prerequisites

Before you begin, ensure your machine (Windows/Mac/Linux) has the following software installed:

### Node.js & Yarn

Steedos relies on Node.js to run.

* **Node.js**: Recommended version is **v22 LTS**.
* [Download Node.js](https://nodejs.org/)


* **Yarn**: The project uses Yarn Workspaces to manage multiple packages. **Yarn is mandatory**.
```bash
npm install -g yarn

```



### Database Services (Docker)

Steedos requires MongoDB for data storage and Redis for caching. You can install these databases locally or run them using **Docker** (highly recommended).

* [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## 2. Development Tools (VS Code)

**Visual Studio Code** is the best companion for Steedos development.

### Recommended Extensions

To ensure the best development experience (syntax highlighting, code completion), we suggest installing:

1. **ESLint & Prettier**: For code linting and formatting.
2. **Steedos Extensions**: (Official) Provides metadata code completion and visual synchronization features.

---

## 3. Scaffolding (Initialization)

We provide a scaffolding tool that generates a standard project directory with a single command.

### Step 1: Create the Project

Open your terminal and run:

```bash
npx create-steedos-app my-steedos-project

```

### Step 2: Install Dependencies

Navigate into the project directory and install dependencies. Because the project uses Workspaces, this step installs dependencies for the main project and all sub-packages simultaneously.

```bash
cd my-steedos-project
yarn install

```

---

## 4. Project Anatomy

The generated project uses a **Monorepo** structure. All core business logic is located within the `steedos-packages` directory:

```text
my-steedos-project/
├── .vscode/               # Recommended VS Code configurations
├── steedos-packages/      # [Core] Workspace directory containing all business packages
│   └── example-app/       # Sample business package (copy this to create new ones)
│       ├── package.json   # Package name and dependencies
│       └── main/
│           └── default/
│               ├── objects/   # Object definitions (.object.yml)
│               ├── triggers/  # Backend trigger logic (.js)
│               └── apps/      # Application menu definitions (.app.yml)
├── services/              # Microservice configurations (moleculer.config.js)
├── steedos-config.yml     # Main system config (DB links, ports, etc.)
├── package.json           # Main project file defining startup scripts
├── docker-compose.yml     # Database orchestration file
└── .gitignore

```

:::tip Development Tip
**Where should you write your code?**
Always work within the `steedos-packages/` directory.

* When Steedos starts, it automatically scans all sub-folders in this directory declared as a `steedos-package`.
* You can create multiple folders here (e.g., `finance-pkg`, `hr-pkg`) to isolate different business modules.
:::

---

## 5. Run & Debug

We have built-in shortcut commands in `package.json`, so you don't need to memorize complex Docker instructions.

### Step 1: Start the Databases

The project includes a `start:db` script which calls Docker Compose to launch MongoDB and Redis.

```bash
yarn start:db

```

*(Note: Ensure Docker Desktop is running. This command occupies local ports 27017 and 6379.)*

### Step 2: Start Steedos Services

Run the following command to start the main application (based on `@steedos/server`):

```bash
yarn start

```

When you see the following log in your terminal, the system is ready:

> 🚀 Application is running on: http://localhost:5100

### Step 3: Access the System

Open your browser and visit:

**`http://localhost:5100`**

---

## 6. Version Control (Git)

### What to Commit

* All business code under `steedos-packages/` (.yml, .js, .tsx).
* `package.json` and `yarn.lock`.
* Configuration files like `steedos-config.yml`.

### What to Ignore

* `node_modules/`
* `.steedos/` (Temporary system cache—**never commit this**).
* `steedos-storage/` (Locally uploaded attachments).

---

## FAQ

**Q: `yarn install` is failing?**
A: Check if your Node.js version is v18 or v22.

**Q: `yarn start:db` does nothing?**
A: Ensure Docker Desktop is running. You can also run `docker-compose up -d` manually to troubleshoot detailed errors.

**Q: Why can't I import a dependency I added to `package.json`?**
A: In Workspaces mode, if you are using a dependency within `steedos-packages/my-app`, you should either run `yarn add xxx` inside that directory or use `yarn workspace @my-app/name add xxx` from the root.
