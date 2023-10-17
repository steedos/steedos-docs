---
sidebar_position: 10
---

# Package Service

The Steedos Platform is based on the [Moleculer](https://moleculer.services/) microservices architecture, where each steedos package is a microservice. The `package.service.js` in the root directory of the steedos package is the loading entry for the steedos package microservice.

## Service Schema

The [Service](https://moleculer.services/docs/0.14/services) represents a microservice in the Moleculer framework. You can define actions, methods, and subscribe to events. 


After mixin `@steedos/service-package-loader`, the package service will automatically scan and load metadata files from subfolders upon startup. 

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