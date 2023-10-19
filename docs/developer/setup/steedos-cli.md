---
title: Install Steedos Cli
sidebar_position: 20
---

## Introduction

Steedos CLI is a command-line interface tool designed to streamline the processes of creating, managing, and deploying Steedos applications. With Steedos CLI, you can easily handle various tasks right from your terminal, improving your workflow and increasing productivity.

## Prerequisites

- Node.js (version 14 or later)
- npm (typically comes with Node.js)

## Installation

To install the Steedos CLI, run the following command in your terminal:

```bash
npm install -g steedos-cli
```

This command installs the Steedos CLI globally on your system, allowing you to access it from any directory.

## Basic Commands

Below are some of the basic commands you might use in your projects:

### Show Help

```bash
steedos help
```

### Clone Sample Repository

```bash
git clone https://github.com/steedos-labs/contract
```

Install dependences and run the project. 

```bash
yarn
yarn start
```

If it's an empty database, the system will prompt you to register an account and create a workspace.


### Navigating to the Project

```bash
cd my-project
```

### Set Default Package Path

If you are working on a multi-package project, you may also need to configure the default package path.

For example, Set the following environment variables in the .env file:

```
DEFAULT_PACKAGE_PATH=steedos-packages/<my-package-dir>
```

### Source Config

Setup environment variables required for metadata synchronization.

```bash
steedos source:config
```

- Metadata Server: METADATA_SERVER is the ROOT_URL of the Steedos server you wish to connect to, which can be a local development environment or a remote server.
- Metadata API Key: METADATA_APIKEY is used to authenticate your identity. You can log in to the Steedos server with administrator credentials, go to the settings app, select the API Key menu, and create a new API Key.

This command writes environment variables into the .env.local file, 

```
METADATA_SERVER=
METADATA_APIKEY=
```

You can also set the above environment variables directly without running the command.

### Source Deploy

Deploy metadata from package source code to steedos server.

```bash
steedos source:deploy -p steedos-packages/contract
```

- `-p` path of the steedos package you wish to deploy

### Source Retrieve

Retrieve metadata from steedos server to package source code

```bash
steedos source:retrieve -p steedos-packages/contract
```

- `-p` path of the steedos package you wish to retrieve to.

## Troubleshooting

If you encounter issues while using Steedos CLI, consider the following troubleshooting steps:

- Check your Node.js and npm versions and ensure they meet the prerequisite requirements.
- Verify that you're running the commands in the correct directory.
- For more specific errors, refer to the error log provided in the console.

If issues persist, reach out to the support community or consult the official documentation.