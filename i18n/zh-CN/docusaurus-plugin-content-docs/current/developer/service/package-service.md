---
sidebar_position: 20
---

# 软件包微服务

微服务软件包根目录必须有一个  `package.service.js` 文件。

## package.service.js

steedos 软件包的根目录中的 `package.service.js` 是软件包微服务的加载入口。

```js
const packageJSON = require('./package.json');

module.exports = {
  name: packageJSON.name,
  namespace: "steedos",

  /*
    After mixin @steedos/service-package-loader, the package service will 
    automatically scan and load metadata files from subfolders upon startup. 
  */
  mixins: [require('@steedos/service-package-loader')],

  metadata: {
    $package: {
      name: packageJSON.name,
      version: packageJSON.version,
      path: __dirname,
      isPackage: true
    }
  },

  /**
   * Settings
   */
  settings: {
  },

  /**
   * Dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  actions: {

  },

  /**
   * Events
   */
  events: {

    },
  /**
   * Methods
   */
  methods: {
  },

  /**
   * Service created lifecycle event handler
   */
  async created() {
  },

  /**
     * Service started lifecycle event handler
     */
  async started() {
  },

  /**
   * Service stopped lifecycle event handler
   */
  async stopped() {
  }
};
```

### 命名空间

节点的命名空间用于在同一网络上分割您的节点。
必须设置为 `steedos`。

### 混入 (mixins)

混入是一种灵活的方式，用于为 Moleculer 服务分发可重用的功能。服务构造函数将这些混入与当前模式合并。当服务使用混入时，混入中存在的所有属性都会“混合”到当前服务中。

:::tip
混入 `@steedos/service-package-loader` 之后，软件包服务将在启动时自动扫描子文件夹并加载元数据文件。
:::

### 依赖项

如果您的服务依赖于其他服务，请在模式中使用 dependencies 属性。服务在调用已启动的生命周期事件处理程序之前，等待依赖的服务。

如果您正在开发的软件包依赖于另一个软件包的元数据，您可以使用 `dependencies` 来控制软件包的加载顺序。例如，如果合同管理软件包依赖于主数据软件包的元数据，您可以如下定义：

```js
module.exports = {
  name: "@steedos-labs/contract",
  dependencies: ["@steedos-labs/master"],
}
```

## 操作

操作是服务的可调用/公共方法。操作调用代表远程过程调用（RPC）。它具有请求参数并返回响应，就像 HTTP 请求一样。有关更多信息，请查看 [Moleculer 操作](https://moleculer.services/docs/0.14/actions)文档。

```js
  actions: {
    multi: {
      cache: false,
      params: {
        a: "number",
        b: "number"
      },
      handler(ctx) {
        if (!ctx.action.cache)
          return Number(ctx.params.a) * Number(ctx.params.b);
      }
    }
  }
```

## 调用服务
要调用服务，请使用 `broker.call` 方法。代理查找具有给定操作的服务（和节点）并调用它。该函数返回一个 `Promise`。

### 语法
```js
const res = await broker.call(actionName, params, opts);
```

## REST API

Steedos 附带了一个内置的 [API 网关](https://moleculer.services/docs/0.14/moleculer-web)，它可以将您的服务发布为 RESTful API。

这样，您的操作功能可以直接通过 HTTP 请求访问，无需连接到微服务网络。

您可以通过指定 `rest` 参数将操作发布为 RESTful API。

有关更多信息，请查看 [REST API](./action-api) 文档。

```js
  actions: {
    hello: {
      rest: { method: 'GET', path: '/hello/:name' },
      handler(ctx) {
        return {
          data: 'Welcome ' + ctx.params.name
        }
      }
    },
  }
```

## 触发器

通过编写触发器，您可以在记录创建、删除和更改之前和之后自动触发一段服务器端代码，实现个性化的数据验证和处理。

您可以定义一个操作并为其添加 `trigger` 参数。

有关更多信息，请查看 [触发器](./action-trigger) 文档。

```js
  actions: {
    spaceUsersBeforeUpdate: {
      trigger: { 
        listenTo: 'space_users', 
        when: ['beforeInsert', 'beforeUpdate']
      },
      async handler(ctx) {
        this.broker.logger.debug('spaceUsersBeforeUpdate', ctx)
      }   
    }
  }
```

## 事件

您可以在 events 键下订阅事件。有关更多信息，请查看 [事件](./moleculer/events) 文档。

### 订阅事件

基于上下文的事件处理程序和发出嵌套事件。

```js
module.exports = {
    name: "@steedos-labs/project",
    events: {
        "@space_users.inserted"(ctx) {
            console.log("Payload:", ctx.params);
            console.log("Sender:", ctx.nodeID);
            console.log("Metadata:", ctx.meta);
            console.log("The called event name:", ctx.eventName);

            ctx.emit("users.changed", { data: ctx.params.doc });
        },

        "@space_users.deleted": {
            handler(ctx) {
                console.log(`${this.broker.nodeID}:${this.fullName}: Event '${ctx.eventName}' received. Payload:`, ctx.params, ctx.meta);
            }
        }
    }
};
```
