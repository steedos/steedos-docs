# 软件包

:::info 学习目标

  * 理解什么是软件包（模块化的容器）。
  * 掌握 Steedos 项目的文件结构（`steedos-app` vs `steedos-packages`）。
  * **核心技能**：创建一个新的软件包来隔离业务逻辑。
  * 学会配置 `package.json` 以声明包的属性。
:::

## 什么是软件包？

如果说你的 Steedos 项目是一座**城堡**，那么**软件包 (Package)** 就是组成城堡的\*\*“积木套装”\*\*。

  * **项目 (Project)**：是整个应用容器。
  * **软件包 (Package)**：是功能模块。例如：
      * `finance-pkg`：包含财务相关的对象（发票、付款）、报表和审批流。
      * `hr-pkg`：包含人力相关的对象（员工、请假）和前端组件。

通过将功能拆分到不同的包中，你可以实现：

1.  **隔离性**：财务模块的修改不会意外弄坏 HR 模块。
2.  **复用性**：你可以把开发好的 `hr-pkg` 直接复制到另一个项目中使用。
3.  **团队协作**：团队 A 负责财务包，团队 B 负责 HR 包，互不干扰。

-----

## 项目结构与包的位置

在一个标准的 Steedos 项目中，你会看到以下结构：

```text
my-steedos-project/
├── package.json            # 项目级的依赖管理
└── steedos-packages/       # [扩展软件包目录]
    ├── finance-app/        # 自定义包 A (财务)
    │   ├── package.json
    │   └── main/default/...
    │
    └── hr-app/             # 自定义包 B (人力)
        ├── package.json
        └── main/default/...
```

  * **`steedos-packages`**：这是存放扩展包的地方。如果你想或者拆分自己的业务，请放在这里。

-----

## 实战：创建一个“财务”软件包

假设我们需要开发一个财务模块，为了保持整洁，我们不希望把它和默认代码混在一起。

### 第 1 步：创建目录

在项目根目录下的 `steedos-packages` 文件夹中，创建一个名为 `finance-app` 的文件夹。

```bash
mkdir -p steedos-packages/finance-app
cd steedos-packages/finance-app
```

### 第 2 步：初始化 package.json

Steedos 的软件包本质上就是一个标准的 **NPM 包**。运行初始化命令：

```bash
npm init -y
```

### 第 3 步：配置 Steedos 属性 (关键)

打开生成的 `package.json`，你需要添加一个 `steedos` 属性，告诉系统“嘿，我是一个 Steedos 业务包，请加载我”。

```json
{
  "name": "@my-company/finance-app",
  "version": "1.0.0",
  "description": "企业财务管理模块",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  
  // --- 关键配置结束 ---
}
```

-----

## 软件包加载机制

你可能会问：*“系统怎么知道我加了一个包？”*

Steedos 启动时会扫描以下两个位置：

1.  **项目依赖 (`node_modules`)**：如果你的 `package.json` 依赖了一些发布的 npm 包（且这些包里有 `steedos` 属性），它们会被自动加载。
2.  **本地包目录 (`steedos-packages`)**：系统会自动扫描该目录下的所有子文件夹，如果发现合法的 `package.json`，就会加载。

:::tip 依赖管理
如果你的“财务包”依赖了“基础包”，你可以在 `finance-app/package.json` 的 `dependencies` 中声明它。Steedos 会尝试按顺序加载（虽然元数据通常是松耦合的，顺序影响较小）。
:::

-----

## 进阶：引用第三方 NPM 包

有时候你的业务逻辑需要用到第三方的算法库（例如 `moment.js` 处理时间，或者 `lodash` 处理数据）。

1.  **进入你的软件包目录**：
    ```bash
    cd steedos-packages/finance-app
    ```
2.  **安装依赖**：
    ```bash
    yarn add moment
    ```
3.  **在触发器中使用**：
    在你的 `triggers/calculate_date.trigger.js` 中：
    ```javascript
    const moment = require('moment'); // 直接引用

    module.exports = {
        beforeInsert: async function (doc) {
            doc.due_date = moment().add(7, 'days').toDate();
        }
    }
    ```

**这就是微服务化架构的雏形**：每个包都有自己独立的依赖，互不污染。

-----

## 常见问题 (FAQ)

**Q: 我在 VS Code 插件里怎么看到新创建的包？**
A: 如果你在 `steedos-packages` 下创建了新包，记得先在项目根目录运行 `yarn install` 或重启 VS Code。插件会自动识别并列出所有包。记得在同步时设置正确的路径（参考 [VS Code 插件指南](https://www.google.com/search?q=../02-cli/03-vscode-extension.md)）。

**Q: 多个包里如果有同名的对象会怎样？**
A: **会冲突！** Steedos 中对象的 API Name 是全局唯一的。

  * 如果包 A 有 `contract` 对象，包 B 也有 `contract` 对象，系统启动时会报错或覆盖。
  * **最佳实践**：为你的自定义包加上命名空间前缀。例如财务包的对象命名为 `fin_invoice`，HR 包的对象命名为 `hr_leave`。

**Q: 我能把做好的包发布给别人用吗？**
A:当然可以。因为它是标准的 NPM 包。

1.  `npm publish` 发布到 npm 仓库。
2.  别人在他们的项目中 `yarn add @your-company/finance-app`。
3.  重启服务，你的功能就集成进去了。