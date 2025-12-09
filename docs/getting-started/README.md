---
title: Getting Started
sidebar_position: 5
---

# Welcome to Steedos Platform

**Steedos Platform** is an open-source enterprise low-code development platform. Built on a **Metadata Driven** architecture, it empowers developers to build, deploy, and manage complex enterprise applications at 10x speed.

Whether you are building a CRM, ERP, or a highly customized business system, Steedos provides full-stack capabilities ranging from data modeling and UI generation to process automation.

![Steedos Overview](/img/platform/steedos-dx.png)

## 🌟 Key Features

  * **🚀 Rapid Development**: Define data objects using simple JSON/YAML configuration files to automatically generate CRUD APIs and user interfaces.
  * **🔧 Code-Centric Low-Code**: Supports visual design tools while remaining developer-friendly by allowing direct editing of metadata code in VS Code.
  * **⚛️ Modern Tech Stack**: Built on Node.js and MongoDB on the backend, and React on the frontend, making it easy to extend and integrate.
  * **🔗 Powerful Integration**: Built-in GraphQL and REST APIs allow for seamless connection with third-party systems.
  * **🛡️ Enterprise Security**: A granular permission control system supporting field-level security and record-level sharing rules.

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

### 3\. Access the Console

Once the service starts, open your browser and visit `http://localhost`.

  * **Default Interface**: You will see the Steedos setup wizard or login screen.
  * **Configuration**: The system will automatically generate a default administrator account or guide you to create one.


## 🤝 Community & Support

Steedos is an active open-source project. If you encounter issues or have feature suggestions, feel free to reach out:

  * **GitHub Issues**: Submit bugs or feature requests ([Go to GitHub](https://github.com/steedos/steedos-platform))
  * **Community Forum**: Discuss ideas with other developers.
  * **Enterprise Support**: Need commercial features or technical support? Please contact our sales team.
