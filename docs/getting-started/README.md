---
title: Getting Started
sidebar_position: 5
---

# Welcome to Steedos 3.0

**Steedos is the leading open-source, AI-native alternative to Salesforce.**

By leveraging a **Metadata-Driven** architecture, we enable enterprises to build mission-critical applications with the speed of low-code and the flexibility of pro-code.

![steedos overview](/diagrams/steedos-overview.svg)

## Core Value Propositions

* **Metadata-Driven Speed**: Define your business objects, fields, and logic via YAML or UI. Steedos automatically generates the database schema, standard APIs, and management interfaces.
* **Enterprise-Grade Security**: Unlike basic low-code tools, Steedos features a robust security model with **Field-Level Permissions** and **Record-Level Sharing Rules**.
* **AI-Native Automation**: Steedos 3.0 integrates **AI Copilots** and **AI Agents** directly into your business logic to automate complex decision-making processes.

## The 6 Functional Pillars

| Pillar | Key Capabilities |
| --- | --- |
| **Modeling** | Custom Objects, Master-Detail relationships, and Roll-up summaries. |
| **Automation** | Multi-level Approvals, Workflow Rules, and Node.js Triggers. |
| **UI Designer** | High-performance, dynamic interfaces powered by Amis. |
| **Insights** | Real-time multi-dimensional reports and BI dashboards. |
| **Security** | RBAC, Sharing Rules, Data Encryption, and Audit Trails. |
| **DevOps** | Steedos CLI, VS Code integration, and Git-based version control. |

## Pro-Code Extensibility

Steedos is not a "Black Box." It is built for professional developers:

* **API-First**: Native support for **GraphQL**, REST, and **OData**.
* **Microservices**: Distributed architecture built on the **Moleculer** framework.
* **Cloud-Native**: Deploy anywhere—Private, Public, or Hybrid Cloud—using Docker and K8s.

## ⚡ Quick Start

Before you begin, please ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.

### Option 1: Docker (Recommended)

The fastest way to experience Steedos:

```bash
docker run -d -p 80:80 steedos/steedos-community:3.0
```

### Option 2: Create New Project (For Developers)

Create a standard engineering project using the scaffold:

```bash
# Create project
npx create-steedos-app my-project

# Enter directory and install dependencies
cd my-project
yarn install

# Start the server
yarn start
```

### Access the Console

Once the service starts, open your browser and visit `http://localhost`.

  * **Default Interface**: You will see the Steedos setup wizard or login screen.
  * **Configuration**: The system will automatically generate a default administrator account or guide you to create one.


## 🤝 Community & Support

Steedos is an active open-source project. If you encounter issues or have feature suggestions, feel free to reach out:

  * **GitHub Issues**: Submit bugs or feature requests ([Go to GitHub](https://github.com/steedos/steedos-platform))
  * **Community Forum**: Discuss ideas with other developers.
  * **Enterprise Support**: Need commercial features or technical support? Please contact our sales team.
