---
sidebar_position: 10
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

## Mixins

Mixins are a flexible way to distribute reusable functionalities for Moleculer services. The Service constructor merges these mixins with the current schema. When a service uses mixins, all properties present in the mixin will be “mixed” into the current service.

:::tip
After mixin `@steedos/service-package-loader`, the package service will automatically scan and load metadata files from subfolders upon startup. 
:::

## Dependencies

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
    mult: {
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


### REST API

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

### Triggers

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


