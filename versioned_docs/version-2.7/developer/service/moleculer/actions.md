---
sidebar_position: 20
---

# Actions

The actions are the callable/public methods of the service. The action calling represents a remote-procedure-call (RPC). It has request parameters & returns response, like a HTTP request.

If you have multiple instances of services, the broker will load balance the request among instances.

![action-balancing](/img/service/action-balancing.gif)

## Call services
To call a service use the `broker.call` method. The broker looks for the service (and a node) which has the given action and call it. The function returns a `Promise`.

### Syntax
```js
const res = await broker.call(actionName, params, opts);
```
The `actionName` is a dot-separated string. The first part of it is the service name, while the second part of it represents the action name. So if you have a `posts` service with a `create` action, you can call it as `posts.create`.

The `params` is an object which is passed to the action as a part of the Context. The service can access it via `ctx.params`. *It is optional. If you don't define, it will be `{}`*.

The `opts` is an object to set/override some request parameters, e.g.: `timeout`, `retryCount`. *It is optional.*

**Available calling options:**

| Name | Type | Default | Description |
| ------- | ----- | ------- | ------- |
| `timeout` | `Number` | `null` | Timeout of request in milliseconds. If the request is timed out and you don't define `fallbackResponse`, broker will throw a `RequestTimeout` error. To disable set `0`. If it's not defined, the `requestTimeout` value from broker options will be used. |
| `retries` | `Number` | `null` | Count of retry of request. If the request is timed out, broker will try to call again. To disable set `0`. If it's not defined, the `retryPolicy.retries` value from broker options will be used.|
| `fallbackResponse` | `Any` | `null` | Returns it, if the request has failed.  |
| `nodeID` | `String` | `null` | Target nodeID. If set, it will make a direct call to the specified node. |
| `meta` | `Object` | `{}` | Metadata of request. Access it via `ctx.meta` in actions handlers. It will be transferred & merged at nested calls, as well. |
| `parentCtx` | `Context` | `null` | Parent `Context` instance. Use it to chain the calls.  |
| `requestID` | `String` | `null` | Request ID or Correlation ID. Use it for tracing. |


### Usages
**Call without params**
```js
const res = await broker.call("user.list");
```

**Call with params**
```js
const res = await broker.call("user.get", { id: 3 });
```

**Call with calling options**
```js
const res = await broker.call("user.recommendation", { limit: 5 }, {
    timeout: 500,
    retries: 3,
    fallbackResponse: defaultRecommendation
});
```

**Call with promise error handling**
```js
broker.call("posts.update", { id: 2, title: "Modified post title" })
    .then(res => console.log("Post updated!"))
    .catch(err => console.error("Unable to update Post!", err));    
```

**Direct call: get health info from the "node-21" node**
```js
const res = await broker.call("$node.health", null, { nodeID: "node-21" })
```

### Metadata

Send meta information to services with `meta` property. Access it via `ctx.meta` in action handlers. Please note that in nested calls the `meta` is merged.

:::tip
When writing REST APIs, you can obtain the current user session from `ctx.meta.user`. If you want to access `ctx.meta.user` within the action being called, you need to manually pass it in.
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


## Streaming
Moleculer supports Node.js streams as request `params` and as response. Use it to transfer an incoming file from a gateway, encode/decode or compress/decompress streams.

### Examples

**Send a file to a service as a stream**
```js
const stream = fs.createReadStream(fileName);

broker.call("storage.save", stream, { meta: { filename: "avatar-123.jpg" }});
```
Please note, the `params` should be a stream, you cannot add any additional variables to the `params`. Use the `meta` property to transfer additional data.

**Receiving a stream in a service**
```js
module.exports = {
    name: "storage",
    actions: {
        save(ctx) {
            // Save the received stream to a file
            const s = fs.createWriteStream(`/tmp/${ctx.meta.filename}`);
            ctx.params.pipe(s);
        }
    }
};
```

**Return a stream as response in a service**
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

**Process received stream on the caller side**
```js
const filename = "avatar-123.jpg";
broker.call("storage.get", { filename })
    .then(stream => {
        const s = fs.createWriteStream(`./${filename}`);
        stream.pipe(s);
        s.on("close", () => broker.logger.info("File has been received"));
    })
```

**AES encode/decode example service**
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
