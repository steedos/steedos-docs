
# Basic Concepts

Understanding the core concepts of Steedos Platform is the key to mastering low-code development. Unlike traditional development where you define database schemas and write separate backend code, Steedos uses a **Metadata Driven** architecture.

This means you describe *what* your application should look like (Metadata), and the platform handles *how* to build, render, and execute it.

![Steedos Overview](/img/platform/steedos-dx.png)

## 1\. Metadata

Metadata is "data about data." In Steedos, metadata is the source code of your business application. It defines the data model, user interface layouts, permission rules, and automation logic.

  * **Format**: Metadata is stored as simple YAML or JSON files.
  * **Benefits**: Because your app is defined by configuration files, it is easy to version control (Git), easy to migrate between environments, and readable by both humans and machines.


## 2\. Objects

The **Object** is the fundamental building block of Steedos. If you are coming from a SQL background, an Object is similar to a Database Table, but it is much more powerful.

An Object definition includes:

  * **Database Schema**: How data is stored (in MongoDB).
  * **API Definitions**: GraphQL and REST endpoints are automatically generated.
  * **UI Configuration**: How the data looks in List Views and Forms.

**Standard Objects vs. Custom Objects:**

  * **Standard Objects**: Out-of-the-box objects provided by the platform (e.g., `users`, `organizations`, `space`).
  * **Custom Objects**: Objects you create to meet specific business needs (e.g., `project`, `contract`, `vehicle`).

Example of a simple Object definition (`car.object.yml`):

```yaml
name: car
label: Vehicle
icon: car
fields: ...
```

## 3\. Fields

**Fields** define the individual data points within an Object. They correspond to "Columns" in a spreadsheet or database table.

Steedos provides rich field types that go beyond simple text:

  * **Basic Types**: Text, Number, Date, Boolean, Select.
  * **Relational Types**:
      * **Lookup**: Links to a record in another object (e.g., A *Project* looks up a *Manager*).
      * **Master-Detail**: A strong parent-child relationship (e.g., *Order Items* belong to an *Order*).
  * **Advanced Types**: Grid (Table within a form), Image, File, Formula, Summary.

## 4\. Apps

An **App** in Steedos is a container that groups related Objects and Tabs together to solve a specific business problem. It acts as a navigational wrapper.

For example:

  * **Sales CRM App**: Contains *Leads*, *Opportunities*, *Accounts*, and *Contacts*.
  * **Project Management App**: Contains *Projects*, *Tasks*, and *Timesheets*.

Users can switch between Apps using the App Launcher (the 9-dot menu) in the top-left corner of the interface.

## 5\. Records

**Records** are the actual data instances stored in the database. If an Object is a table, a Record is a "Row".

  * Each record is automatically assigned a unique `_id`.
  * Records respect permission rules defined in the metadata.
  * Records can be accessed via the UI or the API.

## 6\. Automation

Logic in Steedos allows you to automate business processes without constant manual intervention.

  * **Workflow Rules**: Automate standard actions like sending email alerts or updating fields when a record is created or updated.
  * **Approval Processes**: Define complex approval chains (e.g., "If budget \> $5000, require VP approval").
  * **Triggers**: Write custom Node.js code that executes `before` or `after` database operations (insert, update, delete).

## 7\. Permissions (Security)

Steedos employs a robust security model to ensure the right people see the right data.

  * **Profiles**: Define what a user can *do* (e.g., "System Admin" vs. "Standard User"). It controls object-level permissions (Create, Read, Update, Delete).
  * **Roles**: Define the hierarchy of the organization (e.g., Manager above Employee).
  * **Sharing Rules**: Define which individual records a user can *see*. (e.g., "Users can only see records they own" or "Managers can see records owned by their subordinates").


### Summary

| Concept | Traditional Dev Equivalent | Steedos Role |
| :--- | :--- | :--- |
| **Object** | SQL Table + API Controller | Defines data & behavior |
| **Field** | SQL Column | Defines data attributes |
| **Record** | SQL Row | The actual data |
| **Metadata** | Source Code / Config | The DNA of the app |
| **Trigger** | Database Trigger / Hook | Backend logic |
