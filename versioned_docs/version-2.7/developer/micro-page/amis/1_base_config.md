# Configuration and Components

Welcome to the AMIS documentation. In this section, we will delve into the core concept of schema, which is the key element for defining the structure and behavior of components in AMIS.

### The Simplest AMIS Configuration
An example of the most basic AMIS configuration is as follows:

```json
{
  "type": "page",
  "body": "Hello World!"
}
```

This is a piece of JSON configuration, at the heart of which are two fields: **type** and **body**. The **type** field is the most crucial part of an AMIS node, indicating that the current node needs to render a Page component. The **body** field, as an attribute of the Page component, is responsible for guiding how the component renders the page content.

### The Core of Components: Type and Properties
In AMIS, the configuration of a component is always composed of a **type** field (identifying the current component) and other properties. For example:

```json
{
  "type": "xxx",
  ...other properties
}
```

### Component Tree: The Foundation for Building Complex Interfaces
Let's look at a slightly more complex configuration:

```json
{
  "type": "page",
  "body": {
    "type": "tpl",
    "tpl": "Hello World!"
  }
}
```

This configuration indicates through the **type** field that a component named Tpl, which is a template rendering component, will be rendered in the body content area. In **body**, besides the configuration object, it can also be an array, thus adding more components, such as divider and form components.

### Tree Layout: The Key to Implementing Complex Pages
AMIS implements the production of complex pages through a tree structure, for example:

```
Page
 ├── Toolbar
 │ └─ Form 
 ├── Grid 
 │ ├─ Panel
 │ │ └─ Tabs
 │ │ └─ Chart
 │ └─ Panel
 │ └─ Chart
 └── CRUD
```

With this hierarchical combination, AMIS can easily achieve complex layout effects.




