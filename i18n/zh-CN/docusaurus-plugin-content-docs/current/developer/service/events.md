# Events

Steedos has a built-in event bus to support [Event-driven architecture](http://microservices.io/patterns/data/event-driven-architecture.html) and to send events to local and remote services. 

:::tip
Please note that built-in events are fire-and-forget meaning that if the service is offline, the event will be lost.
:::

## Balanced events
The event listeners are arranged to logical groups. It means that only one listener is triggered in every group.

> **Example:** you have 2 main services: `billing` & `payment`. Both subscribe to the `user.purchased` event. You start 2 instances of `billing` service and 2 instances of `payment` service. When you emit the `user.purchased` event, only one `billing` and one `payment` service instance will receive the event.

![balanced-events](/img/service/balanced-events.gif)


**Example**
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

### Emit balanced events

Send balanced events with `broker.emit` function. The first parameter is the name of the event, the second parameter is the payload. 
_To send multiple values, wrap them into an `Object`._

```js
// The `user` will be serialized to transportation.
broker.emit("user.purchased", config);
```

## Broadcast event
The broadcast event is sent to all available local & remote services. It is not balanced, all service instances will receive it.

![broadcast-events](/img/service/broadcast-events.gif)

Send broadcast events with `broker.broadcast` method.
```js
broker.broadcast("user.updated", config);
```

## Subscribe to events

Event context is useful if you are using event-driven architecture and want to trace your events. The Event Context is very similar to Action Context, except for a few new event related properties. 

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


Subscribe to events in 'events' property of services. Use of wildcards (`?`, `*`, `**`) is available in event names.

```js
module.exports = {
    events: {
        // Subscribe to `user.created` event
        "@space_users.inserted"(ctx) {
            console.log("User created:", ctx.params);
        },

        // Subscribe to all `user` events, e.g. "user.created", or "user.removed"
        "@space_users.*"(ctx) {
            console.log("User event:", ctx.params);
        }
        // Subscribe to every events
        // Legacy event handler signature with context
        "**"(payload, sender, event, ctx) {
            console.log(`Event '${event}' received from ${sender} node:`, payload);
        }
    }
}
```

### Event parameter validation

Similar to action parameter validation, the event parameter validation is supported.
Like in action definition, you should define `params` in event definition and the built-in `Validator` validates the parameters in events.

```js
// mailer.service.js
module.exports = {
    name: "@steedos-labs/mail",
    events: {
        "send.mail": {
            // Validation schema
            params: {
                from: "string|optional",
                to: "email",
                subject: "string"
            },
            handler(ctx) {
                this.logger.info("Event received, parameters OK!", ctx.params);
            }
        }
    }
};
```
>The validation errors are not sent back to the caller, they are logged or you can catch them with global error handler.

## Steedos events

### Record CRUD events

When records in a business object changes, Steedos automatically emits an event. You can subscribe to these events in your code to handle relevant business logic.

1. `@objectApiName.inserted`

When data inserted in object.

2. `@objectApiName.updated`

When data updated in object.

3. `@objectApiName.deleted`

When data deleted in object.

:::tip
Don't forget to add an `@` symbol before the Object Api Name. For example, when the object api name is `space_users`, you should write `@space_users.`
:::

**Payload**

Variable | Usage
-- | --
isInsert | Returns true if this trigger is triggered by an insert operation.
isUpdate | Returns true if this trigger is triggered by an update operation.
isDelete | Returns true if this trigger is triggered by a delete operation.
isFind | Returns true if this trigger is triggered by a query operation.
isBefore | Returns true if this trigger is triggered before any record operation.
isAfter | Returns true if this trigger is triggered after all record operations.
id | The unique identifier of the record [string].
doc | The record content that needs to be inserted/updated [json].
previousDoc | The record before updated/deleted [json].
userId | The unique identifier of the current user [string].
spaceId | The current workspace [string].
objectName | The current object name [string].

## System events
The broker broadcasts some internal events. These events always starts with `$` prefix.

### `$services.changed`
The broker sends this event if the local node or a remote node loads or destroys services.

**Payload**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `localService ` | `Boolean` | True if a local service changed. |

**Payload**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `node` | `Node` | Node info object |
| `unexpected` | `Boolean` | `true` - Not received heartbeat, `false` - Received `DISCONNECT` message from node. |
