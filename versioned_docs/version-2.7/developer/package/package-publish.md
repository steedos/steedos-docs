# Package Publishing

## Overview

Steedos packages allow developers to bundle applications, components, and resources, making them easily shareable and reusable among different projects and teams. These packages are based on npm specifications (a popular JavaScript package manager), facilitating the management of package publishing, versioning, and dependencies.

## Basic Concepts

### 1. Steedos Package

- **Definition**: A Steedos Package is a software package that contains all necessary files and resources to implement specific functionalities or applications on the Steedos platform.
- **package.service.js**: Each Steedos Package must contain a 'package.service.js' file.
- **Components**: Packages can include a variety of components, such as object definitions, triggers, views, workflows, and more.

### 2. npm

- **Definition**: npm is the world's largest software package registry and management system, primarily for JavaScript.
- **Functionality**: With npm, you can automatically manage your project's dependencies and versioning. Published packages can be publicly searched and installed.

## Preparations

Before publishing your Steedos Package, you need to prepare the following:

- **npm account**: Visit the [npm official website](https://www.npmjs.com/) to create an account and verify your email.
- **Project files**: Organize your Steedos project, ensuring all files are properly prepared and follow Steedos and npm best practices.

## Publishing Process

Here are the detailed steps to publish your Steedos Package to npm:

### 1. Configure the `package.json` file

Create or update a `package.json` file in your project root directory. This file acts as your project's manifest and contains information like:

```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "description": "A short description of your package",
  "main": "index.js",
  "author": "Your Name <youremail@example.com>",
  "homepage": "https://github.com/yourusername/your-package-name#readme"
}
```

### 2. Log in to your npm account

In your command line or terminal, run the following command and provide your credentials as prompted:

```shell
npm login
```

### 3. Publish your package

Ensure you are in your project root directory, then execute:

```shell
npm publish
```

This action uploads your package to npm. If your package is public, it is now accessible and installable by anyone. For private packages, you might need to subscribe to npm's private repository service for a fee.

### 4. Version Management

With each publication, you should update the version number in your `package.json` file. It's good practice to follow semantic versioning rules (major, minor, and patch).

By following these steps, your Steedos Package should now be successfully published on npm and available for installation within the Steedos platform. Remember, maintaining clear documentation and a change log is crucial for managing package versions and communicating with the community.

## Publishing a Private Package

Sometimes, your Steedos Package may contain sensitive or private code that isn't suitable for public npm packages. npm offers private package functionality, allowing you to control who can install your package, thus protecting your code from unauthorized access.

### Setting a Private Package

To set your Steedos Package as private, you need to add or modify the following line in your `package.json` file:

```json
{
  "private": true
}
```

This ensures your package won't be publicly published to npm. However, this setting alone won't upload your package to npm.

### Publishing to npm's Private Repository

npm offers a paid private repository service (npm Private Packages), allowing you to publish private packages. To use this service, you need to:

- **Purchase a subscription**: Visit the npm official website, choose a suitable plan, and buy the private repository service.
- **Authenticate your account**: In your command line or terminal, use the same `npm login` command, ensuring you're logged into an account authorized to publish private packages.
- **Publish**: As with public packages, you use:

```shell
npm publish
```

However, since your `package.json` is marked with `"private": true`, npm will publish it to your private repository, not the public index.

### Permission Management

Private packages require managing which users or teams can access them. You can configure these permissions in the repository settings on the npm official website, ensuring only authorized members can install or modify your private package.

With these steps, you can successfully publish a private package and control its access. This provides security for projects containing sensitive information, private code, or internal tools.
