---
sidebar_position: 10
title: Project Structure
---

# Steedos DX Project Structure and Source Format

A Steedos DX project has a specific project structure and source format. Source format uses a different set of files and file extensions from what the Metadata API uses. When you retrieve metadata from the org with the project retrieve start command, Steedos CLI stores it in source format in your project. When you deploy metadata, Steedos CLI converts it into the format that the Metadata API requires.

## Project Structure

```bash
my-project
├── steedos-packages
│   ├── package1
│   ├── package2
│   └── package3
├── steedos-platform
├── package.json
└── moleculer.config.js
```

### steedos-packages

When you create your Steedos DX project, you can organize your metadata into logical groupings by creating multiple package directories locally. You can group similar code and source for an application or customization to better organize your team’s repository. 

### steedos-platform

To develop a package, you need to connect to a Steedos Platform deployment . Navigate to the 'steedos-platform' folder to launch a local Steedos Platform.

### package.json

The `package.json` file is a fundamental element in virtually all projects that involve Node.js. It serves as a base source for defining various modules required in the project, among other configuration details. 

