---
sidebar_position: 10
---
# Steedos Package

Steedos packages are based on Node.js package specifications.

## Package Structure

A steedos package stores custom objects and custom object translations in intuitive subdirectories. Source format makes it much easier to find what you want to change or update. And you can say goodbye to messy merges.

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

## package.json

The `package.json` file is a fundamental element in virtually all projects that involve Node.js. It serves as a base source for defining various modules required in the project, among other configuration details. 

1. Name and Version

- `name`: The identifier of your project. This name is used when your package is published to the npm repository.
- `version`: Tracks the current version of your project. This field adheres to semantic versioning standards.

2. Description and Keywords

- `description`: A brief summary of your project, outlining what it does or is used for.
- `keywords`: A list of keywords to help users discover your project when searching through npm repositories.

3. Entry Point and Scripts

- `main`: This field points to the entry file of your application, typically `index.js`.
- `scripts`: A collection of script commands that automate various development tasks. These can include starting the server, running tests, or creating build artifacts.

4. Author and License

- `author`: Information about the project's creator or maintainers. This can include the name, email, and a URL to either a personal or project-related website.
- `license`: Indicates the license under which the project is available. This information is important for legal clarity about how others can use, share, or contribute to your project.

5. Dependencies and DevDependencies

- `dependencies`: A list of all the npm packages your project depends on to function. These are installed in all instances of the project.
- `devDependencies`: A list of npm packages necessary for development purposes (e.g., testing, building) but not for running the actual application.

6. Additional Fields

- `repository`: The URL of your project's repository. Helpful for contributors to find the source code.
- `homepage`: The URL of your project's homepage—different from the repository link, this often leads to a page designed for your project documentation.

---

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