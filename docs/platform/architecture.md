
# Technical Architecture

:::info Learning Objectives

* Understand the soul of Steedos: **Metadata Driven**.
* Learn how **Node.js** and **MongoDB** ensure system speed and flexibility.
* Understand how **React + Amis** achieve "Configuration as UI".
* Discover why this architecture is faster and more stable than traditional development.
:::

Steedos is not a traditional software; it is more like a **"Blueprint-Reading Robot."**

Traditional software development is like **"Oil Painting"**—programmers painstakingly hardcode the interface. To change the position of a button, you must "scrape it off and repaint" (modify code, compile, and redeploy).

Steedos, however, is like **"Building Blocks"**—we simply define the **"Blueprints" (Metadata)**, and the system engine automatically reads them to generate the software instantly.

---

## 1. The Core Soul: Metadata Driven

This is the most critical concept in Steedos.

### What is Metadata?

* **Data**: Specific content like "John Doe," "$1,000," or "2025-01-01."
* **Metadata**: Data that describes other data. For example: "The 'Amount' field must be a number" or "The 'Customer' table has three columns."

In Steedos, **Everything is Configuration**. Objects, fields, menus, permissions, and even page layouts exist as text files in **YAML** or **JSON** format.

### Core Advantage: Decoupling Code from Configuration

* **Traditional Development**: Business logic is tightly coupled with the underlying code. Upgrading the framework often breaks business functions.
* **Steedos Architecture**:
* **Engine**: Maintained by the Steedos team, responsible for parsing blueprints.
* **Business Metadata**: Maintained by you, defining business logic.
* **The Benefit**: When Steedos upgrades its core engine, your business configurations remain unaffected and may even gain new features automatically (e.g., if we optimize table performance, all your tables get faster immediately).



---

## 2. The Powerful Brain: Backend Architecture (Node.js + MongoDB)

Steedos uses the modern **Node.js** stack, consistent with the technology choices of companies like Netflix, Uber, and PayPal.

### The Engine: Node.js

* **Characteristics**: Non-blocking, high concurrency.
* **The Analogy**: A traditional server is like a **bank with only one teller window**—one customer must finish before the next is called. Node.js is like a **self-service hall**—it can handle thousands of requests simultaneously, processing whoever’s data is ready first without waiting. This makes Steedos exceptionally fast.

### The Memory: MongoDB

Steedos uses **MongoDB** as its default database.

* **Why not SQL (MySQL/Oracle)?**
* SQL databases are like **fixed Excel spreadsheets** with rigid structures. Adding a column to a massive table can freeze the database.
* MongoDB is like a **folder system** where every piece of data is an independent document (JSON).


* **The Perfect Match for Low-Code**:
In a low-code environment, users frequently add fields or change types. MongoDB’s **Schema-less** nature allows you to add or remove fields on the fly without restarting the database or performing complex migrations.

---

## 3. The Dynamic Interface: Frontend Architecture (React + Amis)

Everything the user sees in the browser is driven by **React** and the **Amis** framework (open-sourced by Baidu).

### The Renderer: Amis

Remember the "blueprint" we mentioned? Amis is the **"Architect who reads the blueprint."**

* The backend sends a JSON configuration to the frontend:
```json
{ "type": "page", "title": "Contract Management", "body": "Table..." }

```


* Amis receives this and instantly renders a beautiful page in the browser.
* **What You See Is What You Get (WYSIWYG)**: This is why changes appear in real-time when you drag and drop components in the Page Designer.

### Responsive Design

Thanks to this architecture, Steedos interfaces are **responsive by default**. A single configuration will display as three columns on a desktop, two columns on an iPad, and a single column on a smartphone—no separate mobile development required.

---

## 4. Summary: The Journey of a Request

To put it all together, let’s look at what happens when a user clicks the "Save" button:

1. **Frontend (Amis)**: Collects form data and packages it into a JSON object.
2. **Network Layer (API)**: Sends data to the server via GraphQL or REST API.
3. **Backend (Node.js)**:
* **Authentication**: Who are you? (Identity microservice).
* **Authorization**: Do you have permission to modify this field? (Checks Permission Metadata).
* **Validation**: Is the amount less than 0? (Executes Trigger logic).


4. **Database (MongoDB)**: Writes the validated, "clean" data to the disk.
5. **Automation (Workflow)**: After a successful write, the engine triggers: "Hey, there's a new contract; notify the manager!"

---

## FAQ

**Q: Where are the metadata files (.yml) stored?**
A: In **Development Mode**, they are individual files in your project folder, allowing for version control via GitHub. In **Production Mode**, they are loaded into a database cache to ensure high-speed access.

**Q: Can I develop for Steedos using Java or C#?**
A: The Steedos core is written in Node.js. However, because it is built on **Microservices** and **Standard APIs**, you can write external services in Java and interact with Steedos via Webhooks or APIs. Language is no longer a barrier.
