# 初始化项目 

:::info 学习目标

  * 准备 Node.js 开发环境。
  * 配置 VS Code 以获得最佳的代码补全体验。
  * 使用脚手架 (`create-steedos-app`) 初始化你的第一个项目。
  * 理解 Steedos 项目的目录结构。
:::

工欲善其事，必先利其器。Steedos 3.0 基于标准的 Node.js 技术栈，因此你的开发环境与开发普通的 React 或 Express 项目非常相似。

## 1\. 基础环境准备 (Prerequisites)

在开始之前，请确保你的电脑（Windows/Mac/Linux）已安装以下软件：

### Node.js & Yarn

Steedos 依赖 Node.js 运行。

  * **Node.js**: 推荐版本 **v22 LTS**。
      * [下载 Node.js](https://nodejs.org/)
  * **Yarn**: 我们推荐使用 Yarn 作为包管理器（当然 npm 也可以）。
    ```bash
    npm install -g yarn
    ```

### 数据库服务 (MongoDB & Redis)

Steedos 需要 MongoDB 存储数据，Redis 存储缓存。
**强烈建议**：不要在本机直接安装这些数据库软件，而是使用 **Docker** 运行它们。这样可以保持你的电脑干净，且随时可以重置。

  * [下载 Docker Desktop](https://www.docker.com/products/docker-desktop)

-----

## 2\. 开发工具 (VS Code)

Visual Studio Code 是开发 Steedos 项目的最佳伴侣。

### 推荐插件

为了让编写 `.yml` 配置和 `.js` 代码更爽，建议安装以下插件：

1.  **ESLint & Prettier**: 保证代码格式规范。
2.  **YAML**: Red Hat 出品。提供 `.yml` 文件的语法高亮和格式化。
3.  **Steedos Extensions** (可选): 如果在插件市场搜索到官方插件，建议安装，它能提供元数据代码补全提示。

-----

## 3\. 初始化项目 (Scaffolding)

我们提供了一个脚手架工具，只需一行命令即可生成标准的工程目录。

### 第一步：创建项目

打开终端，运行以下命令：

```bash
npx create-steedos-app my-steedos-project
```


### 第二步：安装依赖

进入项目目录并安装依赖包：

```bash
cd my-steedos-project
yarn install
```

-----

## 4\. 目录结构详解 (Anatomy)

生成的项目结构如下，作为开发者，你需要清楚每个文件夹的用途：

```text
my-steedos-project/
├── .vscode/               # VS Code 推荐配置
├── steedos-packages/example-app  # [核心] 所有的元数据文件放在这里
│   ├── main/
│   │   ├── default/
│   │   │   ├── objects/   # 对象定义 (.object.yml)
│   │   │   ├── triggers/  # 后端触发器代码 (.js)
│   │   │   ├── client/    # 前端脚本与组件 (.js/.tsx)
│   │   │   └── apps/      # 应用定义 (.app.yml)
├── services/              # 微服务配置 (moleculer.config.js)
├── steedos-config.yml     # 系统主配置文件 (数据库链接、端口等)
├── package.json           # 项目依赖
├── docker-compose.yml     # 用于启动本地数据库
└── .gitignore
```

:::tip 约定大于配置
Steedos 引擎会自动扫描 `steedos-packages/example-app` 目录下的所有文件。

  * 只要你把一个 `.object.yml` 文件扔进这个文件夹，重启服务后，系统里就会自动多出一个对象。
  * 建议按照 `objects/`, `triggers/` 这样的子目录分类存放，保持整洁。
:::

-----

## 5\. 启动开发服务 (Run & Debug)

### 第一步：启动后台服务 (数据库)

在项目根目录下，我们为你准备了一个 `docker-compose.yml`，它只包含 MongoDB 和 Redis，不包含 Steedos 主程序。

```bash
# 启动数据库
docker-compose up -d
```

*(注意：这会占用你本机的 27017 和 6379 端口)*

### 第二步：启动 Steedos 主程序

现在，利用 Node.js 在本机启动 Steedos。这样修改代码后，服务可以快速热重载。

```bash
yarn start
```

当终端看到以下日志时，说明启动成功：

> INFO  [Runner]: Gateway started on http://localhost:5100

### 第三步：验证

打开浏览器访问 `http://localhost:3000`。
默认的管理员账号通常在启动日志中会提示，或者默认为安装向导中创建的账号。

-----

## 6\. 版本控制 (Git)

Steedos 项目天生适合 Git 管理。

### 应该提交什么？(Commit)

  * `steedos-app/` 下的所有 `.yml`, `.js`, `.json` 文件。
  * `package.json` 和 `yarn.lock`。
  * `steedos-config.yml` (注意不要在里面写死生产环境的密码，建议引用环境变量)。

### 不应该提交什么？(Ignore)

  * `node_modules/`
  * `.steedos/` (这是系统运行时生成的临时文件缓存，千万别提交！)
  * `storage/` (本地上传的附件)

-----

## 常见问题 (FAQ)

**Q: `yarn install` 报错？**
A: 请检查你的 Node.js 版本。Steedos 3.0 需要 Node 14+ (推荐 18)。如果是 Python 编译错误，通常是因为某些原生模块编译失败，尝试安装 `windows-build-tools` (Windows) 或 `xcode-select --install` (Mac)。

**Q: 启动时提示 MongoDB 连接失败？**
A: 请确认你的 Docker 容器是否活着 (`docker ps`)。如果你没有使用 Docker，而是连接远程数据库，请检查 `steedos-config.yml` 中的 `MONGO_URL` 配置。

**Q: 我修改了 `.object.yml`，界面没变化？**
A: 修改元数据文件通常需要 **重启服务** (`Ctrl + C` 然后重新 `yarn start`) 才能生效。如果是修改前端 `.js` 或 `.tsx` 文件，通常支持热更新。
