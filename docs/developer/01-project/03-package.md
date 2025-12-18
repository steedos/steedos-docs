# Packages

:::info Learning Objectives

* Understand what a Package is (a modular container).
* Master the Steedos project file structure (`steedos-app` vs `steedos-packages`).
* **Core Skill**: Create a new package to isolate business logic.
* Learn how to configure `package.json` to declare package properties.
:::

## What is a Package?

If your Steedos project is a **castle**, then a **Package** is a **"Lego set"** used to build it.

* **Project**: The entire application container.
* **Package**: A functional module. For example:
* `finance-pkg`: Contains finance-related objects (invoices, payments), reports, and approval flows.
* `hr-pkg`: Contains HR-related objects (employees, leaves) and frontend components.



By splitting functionality into different packages, you achieve:

1. **Isolation**: Changes in the Finance module won't accidentally break the HR module.
2. **Reusability**: You can copy the developed `hr-pkg` directly into another project for immediate use.
3. **Team Collaboration**: Team A can work on the Finance package while Team B works on the HR package without interference.

---

## Project Structure and Package Location

In a standard Steedos project, you will see the following structure:

```text
my-steedos-project/
├── package.json            # Project-level dependency management
└── steedos-packages/       # [Extended Packages Directory]
    ├── finance-app/        # Custom Package A (Finance)
    │   ├── package.json
    │   └── main/default/...
    │
    └── hr-app/             # Custom Package B (HR)
        ├── package.json
        └── main/default/...

```

* **`steedos-packages`**: This is where you store your extended packages. If you want to develop or decouple your own business logic, place it here.

---

## Hands-on: Creating a "Finance" Package

Assume we need to develop a Finance module. To keep it organized, we don't want to mix it with the default system code.

### Step 1: Create the Directory

Inside the `steedos-packages` folder in your project root, create a folder named `finance-app`.

```bash
mkdir -p steedos-packages/finance-app
cd steedos-packages/finance-app

```

### Step 2: Initialize package.json

A Steedos package is essentially a standard **NPM package**. Run the initialization command:

```bash
npm init -y

```

### Step 3: Configure Steedos Properties (Critical)

Open the generated `package.json`. You need to add a `steedos` property to tell the system, "Hey, I am a Steedos business package, please load me."

```json
{
  "name": "@my-company/finance-app",
  "version": "1.0.0",
  "description": "Enterprise Finance Management Module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "steedos": {
    "isPackage": true
  }
}

```

---

## Package Loading Mechanism

You might wonder: *"How does the system know I added a package?"*

When Steedos starts, it scans two primary locations:

1. **Project Dependencies (`node_modules`)**: If your root `package.json` depends on published NPM packages that contain the `steedos` property, they are automatically loaded.
2. **Local Package Directory (`steedos-packages`)**: The system automatically scans all sub-folders in this directory. If it finds a valid `package.json` with the Steedos property, it loads the metadata and code.

:::tip Dependency Management
If your "Finance Package" depends on a "Base Package," you can declare it in the `dependencies` section of `finance-app/package.json`. Steedos will attempt to load them in order (though metadata is usually loosely coupled, making order less critical).
:::

---

## Advanced: Referencing Third-party NPM Packages

Sometimes your business logic requires third-party libraries (e.g., `moment.js` for time handling or `lodash` for data manipulation).

1. **Enter your package directory**:
```bash
cd steedos-packages/finance-app

```


2. **Install the dependency**:
```bash
yarn add moment

```


3. **Use it in a Trigger**:
In your `triggers/calculate_date.trigger.js`:
```javascript
const moment = require('moment'); // Direct reference

module.exports = {
    beforeInsert: async function (doc) {
        // Set due date to 7 days from now
        doc.due_date = moment().add(7, 'days').toDate();
    }
}

```



**This is the prototype of a microservices-style architecture**: each package has its own independent dependencies, preventing version conflicts (pollution).

---

## FAQ

**Q: How do I see the newly created package in the VS Code extension?**
A: After creating a new package under `steedos-packages`, remember to run `yarn install` at the project root or restart VS Code. The extension will automatically recognize and list all packages. Ensure you set the correct path when synchronizing.

**Q: What happens if multiple packages have objects with the same name?**
A: **A conflict will occur!** The API Name of an object in Steedos must be globally unique.

* If Package A has a `contract` object and Package B also has a `contract` object, the system will throw an error or overwrite one during startup.
* **Best Practice**: Use a namespace prefix for your custom packages. For example, name objects in the Finance package as `fin_invoice` and in the HR package as `hr_leave`.

**Q: Can I publish my completed package for others to use?**
A: Absolutely. Since it is a standard NPM package:

1. Run `npm publish` to push it to an NPM registry.
2. Others can then run `yarn add @your-company/finance-app` in their own projects.
3. Restart the service, and your functionality is integrated.
