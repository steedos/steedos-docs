# Metadata Synchronization

:::info Learning Objectives

* Install and configure the **Steedos VS Code extension**.
* **Core Skill**: Browse server-side metadata directly from the editor sidebar.
* **Core Skill**: Master one-click **"Retrieve"** and **"Deploy"** operations.
* Configure paths for **Multi-package** environments.
:::

The **Steedos VS Code Extension** provides a visual metadata management panel, allowing you to synchronize configurations between your local environment and the server without memorizing CLI commands.

---

## 1. Installation

### Install the VS Code Extension

1. Open **Visual Studio Code**.
2. Click the **Extensions** icon on the left sidebar (or press `Ctrl+Shift+X`).
3. Search for `Steedos`.
4. Select **Steedos Extension Pack** and click **Install**.
*(Note: This pack automatically includes the core "Steedos CLI Integration" plugin).*

---

## 2. Connecting to the Server

Once installed, you must point the extension to your Steedos service. We recommend using **Environment Variables** for a secure configuration.

### Configure Environment Variables

In your project root, create or edit the `.env.local` file (this file is typically ignored by Git and is ideal for sensitive information).

Add the following lines:

```bash
# Your Steedos Service URL (usually http://localhost:3000 for local dev)
METADATA_SERVER=http://localhost:3000

# Your API Key (used for authentication)
METADATA_APIKEY=your_api_key_here

```

:::tip How to get an API Key?

1. Log in to the Steedos system.
2. Click your avatar in the top right -> **Personal Settings**.
3. Navigate to the **API Key** section to view or generate a new key.
:::

### Verify Connection

Click the **Steedos Icon** (typically an "S" shape) in the VS Code Activity Bar on the left.

* If you see a list of metadata categories (e.g., Objects, Layouts, Apps), the connection is successful.
* If an error appears, try running the following command in your project root to initialize the config:
```bash
npx steedos source:config

```



---

## 3. Retrieve: Download from Server

**Scenario**: You modified fields of the "Contract" object via the "Setup" UI in the browser and now want to save those changes to your local source code.

1. Open the **Steedos Provider** in the VS Code sidebar.
2. Expand the metadata categories (Objects, Apps, Tabs, etc.).
3. Find `contracts` under the `Objects` section.
4. Click the **Cloud Download icon** to the right of the item.

:::warning Overwrite Warning
**Retrieving will overwrite local files!**
If you have uncommitted changes in your local code, they will be lost upon retrieval.
**Best Practice**: Always **Commit** your local changes to Git before performing a Retrieve operation.
:::

---

## 4. Deploy: Upload to Server

**Scenario**: You manually edited a `.object.yml` file in VS Code or pulled a colleague's code from Git, and you want to apply those changes to the running system.

1. In the VS Code **Explorer**, locate the file or folder you wish to upload (e.g., `steedos-packages/main/default/objects/contracts.object.yml`).
2. **Right-click** on the file or folder.
3. Select **Steedos: Deploy Source** from the context menu.

A notification saying "Deploying..." will appear in the bottom right, followed by "Source deployed successfully" upon completion.

---

## 5. Advanced: Multi-package Support

By default, retrieved files are placed in the `steedos-app` directory. If your project uses multiple packages (e.g., `steedos-packages/finance`, `steedos-packages/hr`), you must specify which package is the current target for synchronization.

### Set Default Package Path

You can define the target directory via the `DEFAULT_PACKAGE_PATH` variable.

**Option A: Using the Command Palette (Recommended)**

1. Press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`).
2. Type and select `Steedos: Set Default Package Path`.
3. Select your target folder (e.g., `steedos-packages/my-custom-pkg`).

**Option B: Manual Configuration in .env.local**

```bash
DEFAULT_PACKAGE_PATH=steedos-packages/my-custom-pkg

```

Once configured:

* Clicking the **Retrieve** icon will download metadata into this specific directory.
* **Note**: The `Deploy Source` context menu item only appears for files located within a valid Steedos project structure or your defined package path.

---

## FAQ

**Q: The sidebar keeps loading or stays empty.**
A: Please check the following:

1. Is the Steedos service actually running?
2. Is the `METADATA_SERVER` address in `.env.local` correct?
3. Has your API Key expired?

**Q: I get a `Connection refused` error.**
A: This usually means the server is down. Ensure you have run `yarn start` or `docker-compose up` in your terminal.

**Q: Why is "Steedos: Deploy Source" missing from my right-click menu?**
A: The extension only shows this option for files within recognized Steedos package directories (like `steedos-app` or your configured `DEFAULT_PACKAGE_PATH`). Ensure your file structure follows the standard Steedos conventions.
