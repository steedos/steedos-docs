---
sidebar_position: 10
---

# What is Steedos Package?

If you’re new to packaging, you can think about a package as a container that you fill with metadata. It contains a set of related features, customizations, and schema. You use packages to move metadata from one Steedos deployment to another.

Each package has a distinct life cycle. You add metadata to a package, and create a new package version. While the package is continually evolving, each package version is an immutable artifact.

A package version contains the specific metadata and features associated with the package version, at the time it was created. As you iterate on your package, and add, remove, or change the packaged metadata, you create many package versions.

You can install a package version in a steedos deployment. Installing a package version is similar to deploying metadata. Each package version has a version number, and subscribers can install a new package version into their steedos through a package upgrade.

> Since package versions are immutable, they can also be used as artifacts for Continuous Integration (CI) and Continuous Delivery (CD) processes.

You can repeat the package development cycle any number of times. You can change metadata, create a package version, test the package version, and finally deploy or install the package to a production org. This distinct app development lifecycle lets you control exactly what, when and how your metadata is rolled out. In the installed org, you can inspect which metadata came from which package and the set of all metadata associated with a specific package.



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


## Package Types: Managed vs. Unlocked

Steedos offers different packaging mechanisms that cater to various deployment strategies and business models. Two prominent types are Managed Packages and Unlocked Packages. Each serves unique purposes, especially concerning application lifecycle management, proprietary software distribution, and customization flexibility.

Managed and Unlocked Packages address diverse needs within the Steedos arena. Managed Packages suit developers distributing finalized, often commercial, applications to end-users. In contrast, Unlocked Packages are tailored for organizations seeking enhanced internal development processes, promoting agility, and customization in building Steedos solutions.

### Managed Packages

Managed Packages are primarily used by Steedos partners developing applications for distribution on the Steedos AppExchange. They're also used by developers who need to distribute their applications to multiple customers or instances.

- **Upgrade Path:** Facilitates updates (new versions) without necessitating a complete reinstall, preserving user data and customizations.
- **Code Encapsulation:** Contains proprietary logic within components, shielding it from the client organization and maintaining intellectual property confidentiality.
- **Restrictive Customization:** Post-installation, the core components and logic cannot be altered by the client, ensuring application consistency.

### Unlocked Packages (In Development)

Unlocked Packages, integral to the Steedos DX approach, cater to Steedos customers favoring a modular, source-driven development and deployment model devoid of commercial intent.

- **Editable Components:** Post-deployment, subscribers can freely modify package components, fostering an adaptable development environment.
- **Source-Driven Development:** Compatible with version control systems, enhancing team collaboration and trackability of changes.
- **Versioning and Dependency Management:** Simplifies internal version control and inter-package dependencies, streamlining the development process.

### Comparing Managed and Unlocked Packages

1. **Purpose:** Managed Packages target application distribution, often for commercial use, whereas Unlocked Packages optimize collaborative development efforts internally within organizations.
2. **Code Accessibility:** Managed Packages conceal proprietary code, while Unlocked Packages grant subscribers full code access, permitting extensive customization.
3. **Update Mechanism:** Both package types support versioning, but Managed Packages emphasize seamless upgrades for external users, contrasting with Unlocked Packages' focus on internal development fluidity.