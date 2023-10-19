---
sidebar_position: 5
title: Microservice Architecture
---

# Microservice Architecture Overview

The Steedos Platform is based on the Moleculer microservices architecture. Moleculer is a fast, modern and powerful microservices framework for Node.js. It helps you to build efficient, reliable & scalable services. 


## Service

A service is a simple nodejs module containing some part of a complex application. It is isolated and self-contained, meaning that even if it goes offline or crashes the remaining services would be unaffected.

## Node

A node is a simple OS process running on a local or external network. A single instance of a node can host one or many services.

## Networking

In order to communicate with other nodes (Steedos Platform) you need to configure a transporter. Most of the supported transporters connect to a central message broker that provide a reliable way of exchanging messages among remote nodes. These message brokers mainly support publish/subscribe messaging pattern.

![Networking](./assets/networking.svg)

## Service Broker

The ServiceBroker is the main component of Moleculer. It handles services, calls actions, emits events and communicates with remote nodes. You must create a ServiceBroker instance on every node.

![](./assets/service-broker.svg)

## Transporter

Transporters is an important module if you are running services on multiple nodes. Transporter communicates with other nodes. It transfers events, calls requests and processes responses …etc. If multiple instances of a service are running on different nodes then the requests will be load-balanced among them.

Steedos uses redis as the default Transporter.

```bash
TRANSPORTER=redis://127.0.0.1:6379
```
:::tip
Please make sure the TRANSPORTER you configured matches the Steedos server you wish to connect to and that the network is interconnected. 
:::

:::danger
For running in a production environment, be sure to configure the Redis password.
:::