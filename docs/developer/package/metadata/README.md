---
title: Metadata
sidebar_position: 30
---

# What is Metadata?

## Introduction

When developing on the Steedos platform, understanding the role of metadata is crucial. Steedos operates with metadata at its core, facilitating the model of "low-code" and ensuring system adaptability and scalability. This guide will introduce Steedos DX metadata, its importance, and how developers can effectively engage with it.

## Understanding Metadata in Steedos

### What is Metadata?

Metadata in the Steedos environment refers to the data that describes the structure, data model, business logic, and even the UI of your applications. It encompasses a wide range of configurations, such as object definitions, fields, roles, workflows, and page layouts, amongst others.

### Why is Metadata Important?

1. **Consistency and Maintainability**: By defining the structures and elements, metadata provides a consistent framework that aids in application development. It makes the system easily maintainable.
2. **Upgradability**: Since the configuration is separated from the core platform, updates and migrations become less cumbersome.
3. **Collaboration**: Metadata can be version-controlled, making it easier for teams to collaborate, track changes, and maintain a history of configurations.
4. **Rapid Deployment**: Changes in metadata are reflected almost immediately, enabling quick iterations for development teams.

## Working with Metadata in Steedos DX

### Metadata Structure

Steedos DX uses a folder-based structure to store metadata, commonly found in the project's root directory. The typical components include:

- **Objects**: Contains the definitions for custom objects and fields. Each object would have its own sub-directory.
- **Layouts**: Comprises the configuration for UI layouts.
- **Workflows & Triggers**: Contains the business logic and automation processes.
- **Permissions**: Defines roles and sharing rules.

### Best Practices for Handling Metadata

- **Version Control**: Always use version control systems like Git to track changes in metadata. It's essential for collaboration and rollback.
- **Use Descriptive Naming**: Name your metadata components in a way that reflects their purpose and context within the application.
- **Organize Metadata**: Maintain a logical folder structure and organize the metadata to reflect the system's architecture.
- **Document Changes**: Keep comprehensive documentation for custom metadata, including the reason for changes, to understand the evolution of the system components.

### Deploying Metadata

With Steedos DX, you can deploy metadata directly through the command line interface (CLI). It simplifies the process of moving configurations between environments (e.g., from development to production).
