
# Glossary

:::info Introduction
Many Steedos concepts are derived from Salesforce. If certain terms like "Object" or "Profile" seem unfamiliar, don't worry.
Think of this document as a **"Steedos-to-Human Dictionary"** for your quick reference.
:::

## 📚 Data Model

*The skeleton of the system; it determines what your data looks like.*

| Term | Analogy | Description |
| --- | --- | --- |
| **Object** | Spreadsheet / Table | **Like a "Sheet" in Excel.**<br/><br/>A container for storing data. For example, "Customer" and "Contract" are both Objects. |
| **Field** | Column | **Like a "Column" in Excel.**<br/><br/>An attribute within an object. Examples include "Name," "Phone," and "Address." |
| **Record** | Row | **Like a "Row" in Excel.**<br/><br/>A specific entry of data. For example, all information belonging to the customer "John Doe" is a single Record. |
| **Standard Object** | Built-in Table | Out-of-the-box objects provided by the system, such as `users`, `organizations`, and `space_users`. |
| **Custom Object** | User-defined Table | Objects you create based on business needs, such as `projects` or `invoices`. |
| **Lookup** | Foreign Key / Weak Link | A connection between two objects. For example, selecting a "Customer" within a "Contract." Deleting the customer usually **does not** delete the contract. |
| **Master-Detail** | Parent-Child / Strong Link | A **tight coupling** between two objects. For example, "Expense Report" and "Line Items." Deleting the report (Master) causes the items (Detail) to be **automatically deleted**. |
| **_id (Record ID)** | Unique ID / SSN | A unique, system-generated alphanumeric string for every record (e.g., `64f1a2b3c...`). The system uses this to distinguish between data entries. |

---

## 🖥️ User Interface (UI)

*The face of the system; it determines how users interact with the data.*

| Term | Analogy | Description |
| --- | --- | --- |
| **App** | Workbench / Folder | **Like a "Folder" on a smartphone home screen.**<br/>

<br/>It is not standalone software, but a collection of related menus (Tabs). e.g., a "Sales App" containing Customers, Leads, and Contracts. |
| **Tab** | Menu Entry | A button that opens an object's list. **Note:** You must create a Tab for an Object before users can see it in the navigation menu. |
| **List View** | Filter / Saved Search | **Like "Filtering" in Excel.**<br/>

<br/>A saved set of filter criteria, such as "My Pending Tasks" or "Contracts Added This Week." |
| **Amis** | Rendering Engine | The frontend UI framework (open-sourced by Baidu) used by Steedos. It generates pages via JSON configurations and supports drag-and-drop design. |

---

## 🤖 Automation

*The brain of the system; it determines the business logic.*

| Term | Analogy | Description |
| --- | --- | --- |
| **Workflow Rule** | Robot / IFTTT | **"If This, Then That."**<br/>

<br/>Fully automated logic. For example: **If** Amount > $1M, **Then** automatically email the CEO. |
| **Approval Process** | Approval Flow | A process requiring human intervention: Submit -> Lock -> Manager Approval -> Finance Approval -> Finish. |
| **Trigger** | Interceptor / Hook | **Advanced logic for programmers.**<br/>

<br/>A script (Node.js) that can intercept data **before** saving for validation or execute complex calculations **after** saving. |
| **WebHook** | Push Notification | Sends a notification to an external URL when data changes. Commonly used to integrate with Slack, Microsoft Teams, or custom external systems. |

---

## 🛡️ Security & Permissions

*The gatekeeper of the system; it determines who can see what.*

| Term | Analogy | Description |
| --- | --- | --- |
| **User** | Account | An individual who can log into the system. |
| **Profile** | Job Role / Driver's License | **Determines "What you can do."**<br/>

<br/>For example: Do you have the right to "Export Data"? Can you see the "Setup Menu"? Every user must have one Profile. |
| **Permission Set** | Expansion Pack / VIP Card | **Determines "What else you can do."**<br/>

<br/>A flexible supplement to permissions. If a user has standard permissions, you can assign a "Recruitment Permission Set" to allow them to view resumes temporarily. |
| **Sharing Rule** | Exception / Access Grant | A rule that allows records that are normally private to be shared with specific groups of people. |

---

## ⚙️ Development & Architecture

*The foundation of the system; essential for developers.*

| Term | Analogy | Description |
| --- | --- | --- |
| **Metadata** | Configuration / Blueprint | The soul of Steedos. Definitions for all objects, fields, and permissions exist as `.yml` or JSON files. |
| **API Name** | Unique Identifier | The programmatic name for an object or field (e.g., `contracts`, `amount`). This name must be used in code and formulas instead of the display label. |
| **GraphQL** | Universal API | A query language provided by Steedos that allows the frontend to request specific combinations of data from the backend in one go. |
| **OData** | Standard Protocol | A REST-based protocol that allows external tools like Excel or Power BI to connect directly to the Steedos database. |
| **Package** | Plugin / Module | A bundle of related functionalities. For example, "Inventory Management" can be bundled as a Package and installed into other Steedos instances. |
