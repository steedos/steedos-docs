---
title: Overview
sidebar_position: 0.1
---

# How Steedos Developer Experience Changes the Way You Work

Steedos Developer Experience (DX) is a new way to manage and develop apps on the Steedos Low-Code Platform across their entire lifecycle. It brings together the best of the Low-Code Platform to enable source-driven development, team collaboration with governance, and new levels of agility for custom app development on Steedos.

![Steedos DX](/img/platform/steedos-dx.png)

## Highlights of Steedos DX

### 1. Source-driven Development
- Enables tracking of changes and history through version control systems like Git.
- Facilitates a source of truth for the org's metadata, ensuring consistency across environments.

### 2. Team Collaboration
- Supports concurrent development, promoting teamwork and parallel workstreams.
- Reduces conflicts through isolated development environments and a clear understanding of changes.

### 3. Continuous Integration and Deployment (CI/CD)
- Integrates with popular CI/CD tools for automated testing and deployment.
- Promotes a robust development cycle with continuous feedback and iterative improvements.

### 4. Environment Management
- Run you package on different Steedos environments for various purposes (development, testing, staging).
- Ensures separation between production and non-production environments.

### 5. Package and Dependency Management
- Organizes metadata and settings in logical units (packages) that are easy to manage and deploy.
- Handles dependencies cleanly, ensuring features work harmoniously and are deployed together when necessary.

### 6. Modular Deployment
- Supports deploying specific functionalities or updates without the need for a full-scale deployment.
- Enhances agility and response to business needs.


## Steedos DX Project

Steedos DX Project is a workflow methodology for managing and developing Steedos applications, emphasizing a source-driven approach for more efficient version control and team collaboration. The Steedos DX project folder typically contains the following elements:

1. **Metadata**: These encompass all non-coded configurations, such as object definitions, fields, layouts, processes, validation rules, etc.

2. **Source Code**: This houses all source code for the application, including microservices, triggers, REST apis, visual components, micro pages, etc., organized within a structured directory for cleanliness and manageability.

3. **Resource Files**: These might include static resources like images, style sheets, JavaScript files, etc., enhancing the user interface.



## Steedos DX Development Process

This entire process underscores agile development, continuous integration, and continuous delivery, allowing teams to quickly respond to changes and improve delivery quality.

1. **Environment Setup**: Developers need to set up their development environment, involving the installation of the Steedos CLI, Visual Studio Code, and other necessary plugins.

2. **Pulling Source Code**: Utilizing the Steedos CLI, developers pull the latest source code from the source repository.

3. **Local Development and Debugging**: Developers write and debug code in their local environments, using tools like the Nodejs Debugger for precision and robustness.

4. **Source Control**: Changes should be regularly committed to a version control system (like Git), enabling the sharing of alterations and acquisition of code from team members.

5. **Deployment and Testing**: With the Steedos CLI, developers can deploy local changes to a test environment for further testing and validation.

6. **Code Review and Merging**: Code reviews should be conducted before code is deployed to production. Once the code passes reviews and tests, it can be merged into the main branch and deployed to the production environment.

```
 Start
    |
    V
  Set up Steedos DX environment
    |
    V
  Initialize project and version control
    |
    V
  Run local development environment
    |
    V
  Develop new features (custom objects, microservices, triggers, APIs, micro pages, components, etc.)
    |
    V
  Local testing and debugging
    |
    V
  Push code to the testing environment for validation
    |
    V
  Execute all tests in the testing environment
    |
    V
  Code review and quality checks
    |
    V
  Ready to create a new version?
    |---- Yes ----|
    |             |
    |---- No -----|
    |             V
    |          Continue development and testing
    |             |
    |-------------|
    V
  Create and release package beta version (npm)
    |
    V
  Test new package version in the beta environment
    |
    V
  Fix issues identified during beta testing
    |
    V
  Ready for release?
    |---- Yes ----|
    |             |
    |---- No -----|
    |             V
    |          Repeat fix and testing steps
    |             |
    |-------------|
    V
  Release package (npm)
    |
    V
  Package maintenance and customer support
    |
    V
  End
```

