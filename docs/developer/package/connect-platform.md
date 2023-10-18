---
title: Connecting to Platform
sidebar_position: 30
---

To develop a package, you need to connect to a Steedos Platform deployment. 

## Starting Platform

The easiest way to run the platform is by using Docker. 

```bash
cd steedos-platform
docker-compose up
```

You can also refer to the instructions in the `./steedos-platform` dir to run Steedos Platform with Node.js.

### Register Admin Account

Upon its first launch, the system will prompt you to register an account and create an organization. This account will also become the administrator account for the organization.

### Create an API Key

You can log in to the Steedos server with administrator credentials, go to the settings app, select the API Key menu, and create a new API Key.

## Config Metadata Server

Setup environment variables required for metadata synchronization.

```bash
steedos source:config
```

- Metadata Server: METADATA_SERVER is the ROOT_URL of the Steedos server you wish to connect to.
- Metadata API Key: METADATA_APIKEY is used to authenticate your identity. 

This command writes environment variables into the .env.local file, 

```bash
METADATA_SERVER=
METADATA_APIKEY=
```

You can also set the above environment variables directly without running the command.

## Starting Packages

The Steedos package operates using the [Moleculer](https://moleculer.services/docs) microservices framework, connecting microservices through the configuration of a unified [Moleculer Transporter](https://moleculer.services/docs/0.14/networking).

### Setup Environment Variable

```bash
TRANSPORTER=redis://127.0.0.1:6379
```

### Starting Services

```bash
yarn
yarn start
```

You can also directly use the [moleculer-runner](https://moleculer.services/docs/0.14/runner) command to launch the steedos packages.

```bash
moleculer-runner steedos-packages/*/package.service.js --hot --repl
```