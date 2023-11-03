---
sidebar_position: 20
---

# 动作

动作是服务的可调用/公共方法。动作调用代表远程过程调用（RPC）。它具有请求参数并返回响应，就像HTTP请求一样。

如果您有多个服务实例，代理将在实例之间对请求进行负载平衡。

![action-balancing](/img/service/action-balancing.gif)

## 调用服务
要调用服务，请使用 `broker.call` 方法。代理寻找具有给定动作的服务（和节点）并调用它。该函数返回一个 `Promise`。

### 语法
```js
const res = await broker.call(actionName, params, opts);
```
`actionName` 是一个点分隔的字符串。它的第一部分是服务名称，而第二部分代表动作名称。因此，如果您有一个带有 `create` 动作的 `posts` 服务，您可以调用它作为 `posts.create`。

`params` 是一个对象，作为上下文的一部分传递给动作。服务可以通过 `ctx.params` 访问它。*这是可选的。如果您不定义，它将是 `{}`*。

`opts` 是一个对象，用于设置/覆盖某些请求参数，例如：`timeout`、`retryCount`。*这也是可选的。*

**可用的调用选项：**

| 名称 | 类型 | 默认值 | 描述 |
| ------- | ----- | ------- | ----------- |
| `timeout` | `Number` | `null` | 请求的超时时间（以毫秒为单位）。如果请求超时并且您没有定义 `fallbackResponse`，代理将抛出一个 `RequestTimeout` 错误。设置为 `0` 以禁用。如果未定义，将使用代理选项中的 `requestTimeout` 值。 |
| `retries` | `Number` | `null` | 请求的重试次数。如果请求超时，代理将尝试再次调用。设置为 `0` 以禁用。如果未定义，将使用代理选项中的 `retryPolicy.retries` 值。|
| `fallbackResponse` | `Any` | `null` | 如果请求失败，则返回。  |
| `nodeID` | `String` | `null` | 目标 nodeID。如果设置，它将直接呼叫指定的节点。 |
| `meta` | `Object` | `{}` | 请求的元数据。在动作处理程序中通过 `ctx.meta` 访问。它也会在嵌套调用中被转移和合并。 |
| `parentCtx` | `Context` | `null` | 父 `Context` 实例。用它来链接调用。  |
| `requestID` | `String` | `null` | 请求ID或关联ID。用于追踪。 |

### 用法
**不带参数的调用**
```js
const res = await broker.call("user.list");
```

**带参数调用**
```js
const res = await broker.call("user.get", { id: 3 });
```

**带调用选项的调用**
```js
const res = await broker.call("user.recommendation", { limit: 5 }, {
    timeout: 500,
    retries: 3,
    fallbackResponse: defaultRecommendation
});
```

**带有承诺错误处理的调用**
```js
broker.call("posts.update", { id: 2, title: "Modified post title" })
    .then(res => console.log("Post updated!"))
    .catch(err => console.error("Unable to update Post!", err));    
```

**直接调用：从“node-21”节点获取健康信息**
```js
const res = await broker.call("$node.health", null, { nodeID: "node-21" })
```

### 元数据

使用 `meta` 属性向服务发送元信息。在动作处理程序中通过 `ctx.meta` 访问。请注意，在嵌套调用中 `meta` 会合并。

:::tip
编写 REST API 时，您可以从 `ctx.meta.user` 获取当前用户会话。如果您想在被调用的动作中访问 `ctx.meta.user`，则需要手动传递它。
:::

```js
const res = await this.broker.call('objectql.find', 
  {
    objectName: 'accounts',
    query: {
      fields: ['name', 'owner'],                      
      filters: ['owner', '=', ctx.meta.user.userId],  
      sort: 'name desc'                               
    },
  },
  {
    meta:{
        user: ctx.meta.user
    }
  }
);
```

## 流
Moleculer 支持 Node.js 流作为请求 `params` 和响应。使用它来传输从网关收到的文件，编码/解码或压缩/解压缩流。

### 示例

**将文件作为流发送到服务**
```js
const stream = fs.createReadStream(fileName);

broker.call("storage.save", stream, { meta: { filename: "avatar-123.jpg" }});
```
请注意，`params` 应该是一个流，您不能向 `params` 添加任何额外的变量。使用 `meta` 属性传输附加数据。

**在服务中接收流**
```js
module.exports = {
    name: "storage",
    actions: {
        save(ctx) {
            // 将接收到的流保存到文件
            const s = fs.createWriteStream(`/tmp/${ctx.meta.filename}`);
            ctx.params.pipe(s);
        }
    }
};
```

**在服务中返回流作为响应**
```js
module.exports = {
    name: "storage",
    actions: {
        get: {
            params: {
                filename: "string"
            },
            handler(ctx) {
                return fs.createReadStream(`/tmp/${ctx.params.filename}`);
            }
        }
    }
};
```

**在调用方处理接收到的流**
```js
const filename = "avatar-123.jpg";
broker.call("storage.get", { filename })
    .then(stream => {
        const s = fs.createWriteStream(`./${filename}`);
        stream.pipe(s);
        s.on("close", () => broker.logger.info("File has been received"));
    })
```

**AES 编码/解码示例服务**
```js
const crypto = require("crypto");
const password = "moleculer";

module.exports = {
    name: "aes",
    actions: {
        encrypt(ctx) {
            const encrypt = crypto.createCipher("aes-256-ctr", password);
            return ctx.params.pipe(encrypt);
        },

        decrypt(ctx) {
            const decrypt = crypto.createDecipher("aes-256-ctr", password);
            return ctx.params.pipe(decrypt);
        }
    }
};
```
