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


## Steedos DX Development Process

The Steedos DX development process is a comprehensive workflow designed for efficient, iterative, and quality-controlled software development. It begins with setting up the necessary environment and initializing project specifics, followed by a rigorous cycle of development, local testing, and validations in the testing environment.

New functionalities encompass various aspects like custom objects, microservices, triggers, APIs, etc. Post-development, the code undergoes thorough checks, including peer reviews and quality assessments. If not deemed ready for a new version, the cycle of development and testing continues.

Upon readiness, a beta version of the software package is released and tested under real-world conditions (beta environment) to identify any lingering issues, which are then rectified. This step ensures only the most stable, functional, and clean code is forwarded for the final release.

After successful verification in the beta stages, the software package is formally released. Post-release, the focus shifts to ongoing maintenance and customer support, ensuring end-users encounter minimal issues and that the product adapts to evolving requirements or potential improvements. This streamlined process underscores the importance of each phase in ensuring the release of a reliable, high-quality software package, reaffirming Steedos DX's commitment to excellence.


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

