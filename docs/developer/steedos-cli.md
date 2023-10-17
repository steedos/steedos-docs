---
title: Install Steedos Cli
sidebar_position: 0.2
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

### Create a New Project

```bash
npx create-steedos-app my-project
```

### Navigating to the Project

```bash
cd my-project
```

### Source Config

Setting up metadata synchronization requires the METADATA_SERVER and METADATA_APIKEY of the steedos server to which you are connecting.

```bash
steedos source:config
```

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