---
sidebar_position: 10
title: Project Structure
---

# Steedos DX Project Structure and Source Format

A Steedos DX project has a specific project structure and source format. Source format uses a different set of files and file extensions from what the Metadata API uses. When you retrieve metadata from the org with the project retrieve start command, Steedos CLI stores it in source format in your project. When you deploy metadata, Steedos CLI converts it into the format that the Metadata API requires.

## Multiple Package Project

When you create your Steedos DX project, we recommend that you organize your metadata into logical groupings by creating multiple package directories locally. You can group similar code and source for an application or customization to better organize your team’s repository. 

```bash
my-project
├── steedos-packages
│   ├── package1
│   ├── package2
│   └── package3
├── docker-compose.yml
├── package.json
└── steedos.config.js
```

## package.json

The `package.json` file is a fundamental element in virtually all projects that involve Node.js. It serves as a base source for defining various modules required in the project, among other configuration details. 

1. Name and Version

- `name`: The identifier of your project. This name is used when your package is published to the npm repository.
- `version`: Tracks the current version of your project. This field adheres to semantic versioning standards.

2. Description and Keywords

- `description`: A brief summary of your project, outlining what it does or is used for.
- `keywords`: A list of keywords to help users discover your project when searching through npm repositories.

3. Entry Point and Scripts

- `main`: This field points to the entry file of your application, typically `index.js`.
- `scripts`: A collection of script commands that automate various development tasks. These can include starting the server, running tests, or creating build artifacts.

4. Author and License

- `author`: Information about the project's creator or maintainers. This can include the name, email, and a URL to either a personal or project-related website.
- `license`: Indicates the license under which the project is available. This information is important for legal clarity about how others can use, share, or contribute to your project.

5. Dependencies and DevDependencies

- `dependencies`: A list of all the npm packages your project depends on to function. These are installed in all instances of the project.
- `devDependencies`: A list of npm packages necessary for development purposes (e.g., testing, building) but not for running the actual application.

6. Additional Fields

- `repository`: The URL of your project's repository. Helpful for contributors to find the source code.
- `homepage`: The URL of your project's homepage—different from the repository link, this often leads to a page designed for your project documentation.

---
