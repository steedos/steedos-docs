# 元数据同步

:::info 学习目标

  * 安装并配置 Steedos VS Code 扩展。
  * **核心技能**：在编辑器侧边栏直接浏览服务器上的元数据。
  * **核心技能**：一键“拉取 (Retrieve)”和“部署 (Deploy)”。
  * 掌握多软件包 (Packages) 环境下的路径配置。
:::

**Steedos VS Code 扩展** 提供了可视化的元数据管理面板，让你无需记忆命令即可完成同步。

## 1\. 安装与准备

### 安装 VS Code 插件

1.  打开 Visual Studio Code。
2.  点击左侧的 **扩展 (Extensions)** 图标（或按 `Ctrl+Shift+X`）。
3.  搜索 `Steedos`。
4.  选择 **Steedos Extension Pack** 并点击 **Install**。
    *(注：该扩展包会自动安装核心的 "Steedos CLI Integration" 插件)*

-----

## 2\. 连接到服务器

插件安装后，需要告诉它去连接哪个 Steedos 服务。我们推荐使用 **环境变量** 来配置，以保证安全。

### 配置环境变量

在你的项目根目录下，创建或编辑 `.env.local` 文件（此文件通常不会被提交到 Git，适合存放敏感信息）。

添加以下两行：

```bash
# 你的 Steedos 服务地址 (本地开发通常是 http://localhost:3000)
METADATA_SERVER=http://localhost:3000

# 你的 API Key (用于身份验证)
METADATA_APIKEY=这里填入你的API_Key
```

:::tip 如何获取 API Key?

1.  登录 Steedos 系统。
2.  点击右上角头像 -\> **个人设置**。
3.  在“API 密钥”部分可以查看或生成新的 Key。
:::

### 验证连接

配置完成后，点击 VS Code 左侧活动栏中新增的 **Steedos 图标**（通常是一个 S 形图标）。

  * 如果能看到元数据列表（如 Objects, Layouts），说明连接成功。
  * 如果提示报错，请尝试在项目根目录运行命令生成配置：
    ```bash
    npx steedos source:config
    ```

-----

## 3\. 拉取：从服务器下载 (Retrieve)

**场景**：你在浏览器里通过“设置”界面修改了“合同”对象的字段，现在想把这些修改保存到本地代码里。

1.  点击 VS Code 左侧的 **Steedos 图标**。
2.  在面板中，你会看到服务器上所有的元数据分类（Objects, Apps, Tabs 等）。
3.  展开 `Objects`，找到 `contracts (合同)`。
4.  点击该项右侧的 **下载图标 (Cloud Download)**。

:::warning 覆盖警告
**拉取操作会直接覆盖本地文件！**
如果你的本地代码中有未提交的修改，拉取后这些修改将丢失。
**最佳实践**：在执行 Retrieve 之前，永远先将本地代码 **Commit** 到 Git 仓库。
:::

-----

## 4\. 部署：上传到服务器 (Deploy)

**场景**：你在 VS Code 里手动修改了 `contracts.object.yml` 文件，或者从 Git 拉取了同事的代码，现在想让它在系统里生效。

1.  在 VS Code 的 **资源管理器 (Explorer)** 中，找到你要上传的文件（例如 `steedos-app/main/default/objects/contracts.object.yml`）。
2.  在文件（或文件夹）上点击 **鼠标右键**。
3.  选择菜单中的 **Steedos: Deploy Source**。

VS Code 右下角会提示“Deploying...”，成功后会提示“Source deployed successfully”。

-----

## 5\. 进阶配置 (多软件包支持)

默认情况下，同步下来的文件会放在 `steedos-app` 目录下。如果你的项目比较复杂，使用了多个软件包（例如 `steedos-packages/finance`, `steedos-packages/hr`），你需要告诉插件当前要把代码同步到哪里。

### 设置默认同步路径

你可以通过配置环境变量 `DEFAULT_PACKAGE_PATH` 来指定当前工作的软件包目录。

**方法 A：通过命令面板切换（推荐）**

1.  按 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) 打开命令面板。
2.  输入并选择 `Steedos: Set Default Package Path`。
3.  选择你想要同步的文件夹（例如 `steedos-packages/my-custom-pkg`）。

**方法 B：手动配置 .env.local**

```bash
[package]
DEFAULT_PACKAGE_PATH=steedos-packages/my-custom-pkg
```

配置生效后：

  * 点击侧边栏的“下载”按钮，元数据会下载到你指定的这个目录下。
  * **注意**：只有位于该目录下的文件，右键菜单中的 `Deploy Source` 才会生效。

-----

## 常见问题 (FAQ)

**Q: 侧边栏一直转圈加载不出来？**
A: 请检查：

1.  Steedos 服务是否已启动？
2.  `.env.local` 中的 `METADATA_SERVER` 地址是否正确？
3.  API Key 是否过期？

**Q: 报错 `Connection refused`？**
A: 这通常是因为服务没起起来。请确保在终端运行了 `yarn start` 或 `docker-compose up`。

**Q: 为什么我右键菜单里没有 `Steedos: Deploy Source`？**
A: 请检查你点击的文件是否位于有效的 Steedos 项目结构中（通常需要在 `steedos-app` 或你配置的 `DEFAULT_PACKAGE_PATH` 目录下）。插件会自动检测当前文件路径是否合法。