---
sidebar_position: 20
title: Package Service
---

# What is Package Service?

The Steedos Platform is based on the Moleculer microservices architecture, where each package is a [Moleculer Service](https://moleculer.services/docs/0.14/services). You can define actions, methods, and subscribe to events in the service. 


## package.service.js

The `package.service.js` in the root directory of the steedos package is the loading entry for the package microservice.

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

### namespace

Namespace of nodes to segment your nodes on the same network.
Must be set to `steedos`.

### mixins

Mixins are a flexible way to distribute reusable functionalities for Moleculer services. The Service constructor merges these mixins with the current schema. When a service uses mixins, all properties present in the mixin will be “mixed” into the current service.

:::tip
After mixin `@steedos/service-package-loader`, the package service will automatically scan and load metadata files from subfolders upon startup. 
:::

### dependencies

If your service depends on other services, use the dependencies property in the schema. The service waits for dependent services before calls the started lifecycle event handler.

If the package you are developing depends on metadata from another package, you can use `dependencies` to control the loading order of the packages. For example, if the contract management package relies on metadata from the master data package, you can define it as follows:

```js
module.exports = {
  name: "@steedos-labs/contract",
  dependencies: ["@steedos-labs/master"],
}
```

## Actions

The actions are the callable/public methods of the service. The action calling represents a remote-procedure-call (RPC). It has request parameters & returns response, like a HTTP request. For more information check the [Moleculer Actions](https://moleculer.services/docs/0.14/actions) documentation.

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

## Call services
To call a service use the `broker.call` method. The broker looks for the service (and a node) which has the given action and call it. The function returns a `Promise`.

### Syntax
```js
const res = await broker.call(actionName, params, opts);
```

## REST API

Steedos comes with a built-in [API Gateway](https://moleculer.services/docs/0.14/moleculer-web), it can publish your services as RESTful APIs. 

This way, your action function can be accessed directly using an HTTP request, without the need to connect to the microservices network.

You can publish an action as a RESTful API by specifying the `rest` parameter.  

For more information check the [REST API](./action-api) documentation.

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

## Triggers

By writing triggers, you can automatically trigger a piece of server-side code before and after record creation, deletion, and changes, achieving personalized data validation and processing.

You can define an action and add a `trigger` parameter to it.

For more information check the [Trigger](./action-trigger) documentation.

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

## Events

You can subscribe to events under the events key. For more information check the [Events](./moleculer/events) documentation.

### Subscribe to events

Context-based event handler & emit a nested event.

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
