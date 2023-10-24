# 事件

Steedos内置了事件总线，支持[事件驱动架构](http://microservices.io/patterns/data/event-driven-architecture.html)，并向本地和远程服务发送事件。

:::tip
请注意，内置事件是即发即弃的，这意味着如果服务离线，事件将会丢失。
:::

## 均衡事件
事件监听器被安排到逻辑组中。这意味着每个组中只有一个监听器被触发。

> **例子：** 你有2个主要服务：`billing`（计费） 和 `payment`（支付）。两者都订阅了 `user.purchased` 事件。你启动了2个 `billing` 服务实例和2个 `payment` 服务实例。当你发出 `user.purchased` 事件时，只有一个 `billing` 和一个 `payment` 服务实例会收到事件。

![balanced-events](/img/service/balanced-events.gif)


**例子**
```js
module.exports = {
    name: "@steedos-labs/project",
    events: {
        "user.purchased": {
            handler(ctx) {
                console.log("Payload:", ctx.params);
                console.log("Sender:", ctx.nodeID);
                console.log("Metadata:", ctx.meta);
                console.log("The called event name:", ctx.eventName);
            }
        }
    }
}
```

### 发送均衡事件

使用 `broker.emit` 函数发送均衡事件。第一个参数是事件的名称，第二个参数是有效载荷（payload）。
_要发送多个值，请将它们封装到一个 `Object` 中。_

```js
// “user”将被序列化以进行传输。
broker.emit("user.purchased", config);
```

## 广播事件
广播事件被发送到所有可用的本地和远程服务。它不是均衡的，所有服务实例都会接收到。

![broadcast-events](/img/service/broadcast-events.gif)

使用 `broker.broadcast` 方法发送广播事件。
```js
broker.broadcast("user.updated", config);
```

## 订阅事件

如果您使用事件驱动架构并希望追踪您的事件，那么事件上下文非常有用。事件上下文与操作上下文非常相似，除了一些新的与事件相关的属性。

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

在服务的 'events' 属性中订阅事件。事件名称中可以使用通配符（`?`，`*`，`**`）。

```js
module.exports = {
    events: {
        // 订阅 `user.created` 事件
        "@space_users.inserted"(ctx) {
            console.log("创建了用户:", ctx.params);
        },

        // 订阅所有 `user` 事件，例如 "user.created" 或 "user.removed"
        "@space_users.*"(ctx) {
            console.log("用户事件:", ctx.params);
        }
        // 订阅所有事件
        // 带上下文的传统事件处理器签名
        "**"(payload, sender, event, ctx) {
            console.log(`从 ${sender} 节点收到的事件 '${event}'：`, payload);
        }
    }
}
```

### 事件参数验证

与动作参数验证类似，也支持事件参数验证。
就像在动作定义中一样，你应该在事件定义中定义 `params`，内置的 `Validator` 会在事件中验证参数。

```js
// mailer.service.js
module.exports = {
    name: "@steedos-labs/mail",
    events: {
        "send.mail": {
            // 验证模式
            params: {
                from: "string|optional",
                to: "email",
                subject: "string"
            },
            handler(ctx) {
                this.logger.info("收到事件，参数OK！", ctx.params);
            }
        }
    }
};
```
> 验证错误不会发送回调用方，它们会被记录，或者你可以使用全局错误处理器捕获它们。

## Steedos 事件

### 记录 CRUD 事件

当业务对象中的记录发生变化时，Steedos会自动发出一个事件。您可以在代码中订阅这些事件来处理相关的业务逻辑。

1. `@objectApiName.inserted`

当对象中插入数据时。

2. `@objectApiName.updated`

当对象中的数据更新时。

3. `@objectApiName.deleted`

当对象中的数据被删除时。

:::tip
不要忘记在对象Api名称前添加 `@` 符号。例如，当对象api名称是 `space_users` 时，你应该写 `@space_users.`。
:::

**有效载荷**

变量 | 用法
-- | --
isInsert | 如果此触发器由插入操作触发，则返回true。
isUpdate | 如果此触发器由更新操作触发，则返回true。
isDelete | 如果此触发器由删除操作触发，则返回true。
isFind | 如果此触发器由查询操作触发，则返回true。
isBefore | 如果此触发器在任何记录操作之前触发，则返回true。
isAfter | 如果此触发器在所有记录操作之后触发，则返回true。
id | 记录的唯一标识符 [字符串]。
doc | 需要插入/更新的记录内容 [json]。
previousDoc | 更新/删除之前的记录 [json]。
userId | 当前用户的唯一标识符 [字符串]。
spaceId | 当前工作区 [字符串]。
objectName | 当前对象名称 [字符串]。

## 系统事件
经纪人广播一些内部事件。这些事件始终以 `$` 前缀开头。

### `$services.changed`
如果本地节点或远程节点加载或销毁服务，经纪人会发送此事件。

**有效载荷**

| 名称 | 类型 | 描述 |
| ---- | ---- | ----------- |
| `localService` | `Boolean` | 如果本地服务改变，则为True。 |

**有效载荷**

| 名称 | 类型 | 描述 |
| ---- | ---- | ----------- |
| `node` | `Node` | 节点信息对象 |
| `unexpected` | `Boolean` | `true` - 未收到心跳，`false` - 从节点收到 `DISCONNECT` 消息。 |
