---
sidebar_position: 10
title: Package Service
---

# What is Package Service?

The Steedos Platform is based on the Moleculer microservices architecture, where each package is a [Moleculer Service](https://moleculer.services/docs/0.14/services). You can define actions, methods, and subscribe to events. 

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




