---
sidebar_position: 10
---
# Steedos Package

A steedos package stores custom objects and custom object translations in intuitive subdirectories. Source format makes it much easier to find what you want to change or update. And you can say goodbye to messy merges.
t to change or update. And you can say goodbye to messy merges.

```bash
my-package
|   ├── main/                                    # Main code directory
|   |   ├── default/                             # Folder containing default code and content
|   |   |   ├── applications/                    # Custom applications
|   |   |   ├── objects/                         # Custom objects directory, containing definitions such as fields
|   |   |   |   ├── my_object/                   # Files and configurations for an individual custom object
|   |   |   |   |   ├── fields/                  # Contains fields for the custom object
|   |   |   |   |   ├── listviews/               # Custom list views for the object
|   |   |   |   |   ├── permissions/             # Permissions for the custom object
|   |   |   |   |   └── my_object.object.yml     # YAML configuration file for the custom object
|   |   |   ├── pages/                           # Custom pages
|   |   |   ├── tabs/                            # Custom tabs
|   |   |   ├── triggers/                        # Triggers
│   ├── package.json                             # Node.js package information and dependencies
│   └── package.service.js                       # Service configuration for the package
│   └── README.md                                # README.md file for the package.
```

## package.service.js

The Steedos Platform is based on the [Moleculer](https://moleculer.services/) microservices architecture, where each steedos package is a microservice. The `package.service.js` in the root directory of the steedos package is the loading entry for the steedos package microservice.

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