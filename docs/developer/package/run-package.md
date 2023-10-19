---
title: Run Package
sidebar_position: 30
---

# How to run Steedos Packages?

The package of the Steedos Platform consists of metadata and microservices and needs to be loaded into the Steedos Platform to run. 

You can use the following two methods to run the package:

1. Production environment: Your package is developed and published to npm, and you directly install the package in the Steedos Platform. 
2. Development environment: Launch the package using the microservice method and connect to the Steedos Platform through Transporter.


## Run Platform

First, you must run Steedos Platform. You can follow the [Self Hosting Tutorial](/deploy/deploy-docker) to deploy Steedos on a server, or launch a local Steedos Platform.

```bash
cd steedos-platform
docker-compose up
```

You can also refer to the instructions in the `./steedos-platform` dir to run Steedos Platform with Node.js.

### Register Admin Account

Upon its first launch, the system will prompt you to register an account and create an organization. This account will also become the administrator account for the organization.

### Create an API Key

You can log in to the Steedos server with administrator credentials, go to the settings app, select the API Key menu, and create a new API Key.

## Setup Environment Variable

### Setup TRANSPORTER

The Steedos package operates using the [Moleculer](https://moleculer.services/docs) microservices framework, connecting microservices through the configuration of a unified [Moleculer Transporter](https://moleculer.services/docs/0.14/networking).

```bash
TRANSPORTER=redis://127.0.0.1:6379
```
:::tip
Please make sure the TRANSPORTER you configured matches the Steedos server you wish to connect to and that the network is interconnected. 
:::

:::danger
For running in a production environment, be sure to configure the Redis password.
:::

### Setup Metadata Server

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

## Run Packages

### Install Dependences

```bash
yarn
```

### Run Services

You can use the [moleculer-runner](https://moleculer.services/docs/0.14/runner) command to launch the steedos packages.

```bash
yarn moleculer-runner steedos-packages/*/package.service.js --hot --repl
```

:::tip
Please note that the Steedos DX project supports multi-package development, and the above command simultaneously launches all software packages under the steedos-packages folder.
:::