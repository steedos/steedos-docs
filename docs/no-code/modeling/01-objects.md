
# Business Objects

:::info Learning Objectives

* Understand what an "Object" is and how it differs from an Excel spreadsheet.
* Learn how to create a new Custom Object (e.g., "Project" or "Contract").
* Master the difference between an Object's Display Label and its **API Name**.
:::

## What is an "Object"?

In Steedos, an **Object** is the core container used to store data.

If you are familiar with Excel, understanding "Objects" is quite simple:

* An **Object** is like a **Sheet** in an Excel file (e.g., "Customers," "Contracts").
* **Fields** within an object are like the **Columns** in Excel (e.g., "Customer Name," "Phone Number").
* **Records** within an object are like the **Rows** in Excel (e.g., the specific data for a customer named "John Doe").

### Why use Objects instead of Excel?

While Excel is flexible, Steedos Objects offer significant advantages for multi-user collaboration and complex business logic:

1. **Structured Data**: You can enforce rules (e.g., the "Amount" field must be a number, "Date" must be a valid date), preventing data inconsistency.
2. **Relational Power**: You can easily link a "Contract" object to a "Customer" object. Clicking a customer allows you to see all associated contracts instantly.
3. **Granular Security**: You can control who sees the table, or even specific columns (e.g., hiding the "Cost" field from certain roles).

---

## Standard Objects vs. Custom Objects

In Steedos, you will encounter two types of objects:

1. **Standard Objects**: Out-of-the-box objects provided by the Steedos platform.
* Examples: **Users**, **Organizations**, **Space Users**, etc.


2. **Custom Objects**: Objects created by you to meet specific business requirements.
* Example: If you need to manage company vehicles, you create a **"Vehicle"** object; to manage projects, you create a **"Project"** object.



[Image illustrating a platform with pre-built system objects and a toolbox for creating custom business objects]

---

## Detailed Configuration Items

When creating or editing an object, you will see various configuration options. We have categorized these settings into four sections:

### 1. Identity

Defines the object's identity and how the system recognizes it.

| Label | Key Configuration | Description |
| --- | --- | --- |
| **Display Label** | `label` | **Required**. The name users see in the UI (e.g., "Contract"). |
| **API Name** | `name` | **Required**. The unique identifier for the system (e.g., `contract`). <br/>

<br/>⚠️ **Note**: Avoid changing this after creation. Use lowercase English; do not use Pinyin. |
| **Icon** | `icon` | Choose a recognizable icon for the menu and object headers. |
| **Description** | `description` | Visible to admins only. Used to document the purpose of the object. |

### 2. Features

Decides which built-in capabilities the object possesses. Steedos provides many modules that can be enabled with a simple checkbox.

| Feature | Key | Usage & Effect |
| --- | --- | --- |
| **Allow Attachments** | `enable_files` | Adds an "Attachments" section to the record detail page for uploading PDFs, images, etc. |
| **Enable Chatter** | `enable_chatter` | Enables social collaboration. Users can leave comments and @ colleagues directly on a record. |
| **Enable Tasks** | `enable_tasks` | Allows users to assign "To-do Tasks" related to the record (e.g., a "Follow-up" task under a Contract). |
| **Enable Events** | `enable_events` | Allows scheduling meetings or activities in the calendar related to this record. |
| **Show Approval Sub-tab** | `enable_instances` | **Core Feature**. Must be enabled if you want to initiate approval workflows (e.g., "Expense Claims") from this object. |
| **Audit Trails** | `enable_audit` | **Security**. Records every change made to the object (who, when, and what was changed). |

### 3. User Interface (UI)

Controls the interactive experience when users browse lists or detail pages.

| Configuration | Key | Description |
| --- | --- | --- |
| **Inline Edit** | `enable_inline_edit` | **Efficiency Pro**. Allows users to double-click cells in a list view to edit data without opening the detail page. |
| **Split View** | `enable_split` | Displays a list on the left and details on the right. Perfect for quick browsing (e.g., reviewing Resumes). |
| **Tree View** | `enable_tree` | Suitable for hierarchical data (e.g., Departments or Regions). |
| **Enhanced Lookup** | `enable_enhanced_lookup` | Replaces the dropdown menu with a searchable popup window for selecting related records. |

---

## Hands-on: Creating a "Project" Object

Let’s create a **"Project"** object from scratch to manage company project information.

### Step 1: Access the Object Manager

1. Log in to Steedos.
2. Click the **Settings (Gear Icon)** in the top right.
3. In the left sidebar, go to **"Object Settings"** -> **"Objects"**.
4. Click the **"New"** button.

### Step 2: Define Identity

Fill in the core identification information. This is the most critical step.

| Field | Suggestion | Example |
| --- | --- | --- |
| **Display Label** | User-friendly name. | `Project` |
| **API Name** | **Crucial**: Internal unique ID. Use pure English, no spaces. | `project` |
| **Icon** | A representative icon. | (Select a briefcase icon) |
| **Description** | Internal note for admins. | `Used to manage internal and delivery projects.` |

### Step 3: Enable Optional Features

Under the advanced settings, check the features you need:

* [x] **Allow Search**: Makes project data searchable via the global search bar.
* [x] **Enable Attachments**: Allows document/image uploads.
* [x] **Enable Tasks**: Allows creating to-do items under a project.

### Step 4: Save

Click **"Save"**.

🎉 **Congratulations! You have successfully created your first Business Object.**

---

## What’s Next?

You now have an empty "Project" table. To make it functional, you should:

1. **Add Fields**: Add columns like "Start Date," "Budget," or "Project Manager." (Read: [Fields and Data Types](https://www.google.com/search?q=./02-fields.md))
2. **Adjust Layouts**: Design the list views and record detail page layouts.
3. **Enter Data**: Go back to the main interface and try creating your first project record.

---

## FAQ

**Q: Can I change the API Name later?** A: Technically yes, but **strongly discouraged**. If you have referenced this name in reports, code, or formulas, changing it will break those references.

**Q: Can I delete objects I no longer need?** A: Yes. However, check for relationships first. If other objects are linked to it, those relationships must be removed before deletion.
