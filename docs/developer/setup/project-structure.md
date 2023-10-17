---
sidebar_position: 10
title: Project Structure
---

# Steedos DX Project Structure and Source Format

A Steedos DX project has a specific project structure and source format. Source format uses a different set of files and file extensions from what the Metadata API uses. When you retrieve metadata from the org with the project retrieve start command, Steedos CLI stores it in source format in your project. When you deploy metadata, Steedos CLI converts it into the format that the Metadata API requires.

## Source Transformation

It’s not uncommon for metadata formatted source to be very large, making it difficult to find what you want. If you work on a team with other developers who update the same metadata at the same time, you have to deal with merging multiple updates to the file. If you’re thinking that there has to be a better way, you’re right.

Before, all custom objects and object translations were stored in one large metadata file.

We solve this problem by providing a new source shape that breaks down these large source files to make them more digestible and easier to manage with a version control system. It’s called source format.

## Multiple Package Project

When you create your Steedos DX project, we recommend that you organize your metadata into logical groupings by creating multiple package directories locally. You can group similar code and source for an application or customization to better organize your team’s repository. 

```bash
my-project
├── steedos-packages
│   ├── package1
│   ├── package2
│   └── package3
├── docker-compose.yml
├── package.json
└── steedos.config.js
```

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

