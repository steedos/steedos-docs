
# Apps and Menus

:::info Learning Objectives

* Understand the concept of an "App" in Steedos (it is a "Workbench," not a standalone downloadable software).
* **Core Skill**: Learn how to create a new app (e.g., "Project Management App").
* **Common Pitfall**: Understand why an object might be missing from the menu (The "Missing Tab" issue).
* Master how to customize exclusive navigation menus for different departments.
:::

## What is an "App"?

In Steedos, the word "App" might be slightly misleading. It does not refer to a `.exe` or `.apk` file that you need to download and install.

**Think of Steedos as a smartphone:**

* **Objects** are like the various features or functions (Phone, Messages, Camera).
* **Apps** are like the **"Folders"** on your home screen.
* **Menus** are like the **"Shortcuts"** inside those folders.

**Scenario Examples:**

* When a **Sales Rep** starts work, they open the **"Sales App."** Their menu consists of `Leads`, `Accounts`, `Opportunities`, and `Contracts`. They don't need to see employee attendance.
* When an **HR Manager** starts work, she opens the **"Human Resources App."** Her menu consists of `Employees`, `Recruitment`, `Payroll`, and `Leave Requests`. She doesn't need to see sales opportunities.

By creating different "Apps," we provide employees in different roles with a clean, focused **Workbench**.

---

## Step 1: Understanding "Tabs"

Before assembling an "App," we need to prepare the parts. In Steedos, these parts are called **Tabs**.

:::danger Why can't I see my Object?
This is the most common issue for beginners.
**The Rule**: Simply creating an "Object" is not enough. If that object does not have a corresponding **"Tab,"** it cannot be mounted onto a menu.
*(Note: If you checked "Show in Tab" when creating the object, the system automatically creates this for you.)*
:::

### Common Tab Types

1. **Object Tab**: Clicking this opens a list view of an object (e.g., the "Contracts" list). This is the most common type.
2. **Web Tab**: Clicking this embeds an external webpage within the system (e.g., embedding a Google search page or a Tableau dashboard).
3. **Page Tab**: Clicking this opens a completely custom-designed page (e.g., a complex "Management Cockpit" dashboard).

---

## Hands-on: Building a "Project Management" App

Assume we have already created three objects: "Projects," "Tasks," and "Work Logs." Now, we want to bundle them into an App for the Project Department.

### 1. Create App

1. Go to **Settings** -> **App Settings** -> **Apps**.
2. Click **New**.
3. Fill in the basic info:
* **Display Label**: `Project Management System`
* **API Name**: `project_management`
* **Logo**: Upload an icon representing projects (displayed in the top-left corner).
* **Description**: `Used by the Project Department to manage delivery projects across the company.`



### 2. Design Menu

This is the critical step that determines what the user sees.

In the New/Edit App interface, find the **"Select Items"** or **"Navigation Items"** section:

1. **Left List (Available Items)**: Lists all available Tabs in the system.
2. **Right List (Selected Items)**: This is the menu for the current App.
3. **Action**:
* Find `Projects`, `Tasks`, and `Work Logs` on the left.
* Click the **Right Arrow (Add)** to move them to the right.
* **Important**: Don't forget to add `Home` as the first item.


4. **Sorting**: In the right list, select an item and use the **Up/Down Arrows** to adjust its order in the navigation bar.

### 3. Assign Profiles

Who is this App for?

In the **"Profiles"** section:

1. Check `System Administrator` (Admins must see it for maintenance).
2. Check `Project Manager`.
3. **Do Not** check `Sales` (Sales reps don't need to see this App, avoiding unnecessary clutter).

### 4. Save

Click **Save**.

---

## How Do Users Switch Apps?

Once configured, how does a user access it?

1. Refresh the browser page.
2. Click the **nine-dot icon (App Launcher)** in the top-left corner of the system.
3. In the panel that appears, you will see the **"Project Management System"** you just created.
4. Click it, and the top navigation bar will instantly transform into your configured layout (Home, Projects, Tasks, Work Logs).

---

## Advanced Tips

### 1. Embedding External Systems (Web Tab)

Suppose the project team needs to access the company’s legacy "Reimbursement System" every day. You can integrate it so users don't feel like they are switching systems.

1. **Create a Web Tab**:
* Settings -> Tabs -> New Web Tab.
* URL: Enter the address of the legacy system.
* Display Mode: Choose "Full Screen" or "Embedded."


2. **Add to App**:
* Go back to the "Project Management App" settings and add this new Web Tab to the menu.


3. **Effect**: When users click "Reimbursement," the legacy system opens directly inside Steedos.

### 2. Mobile Menu

The Steedos mobile app automatically syncs these configurations.

* The "Apps" and "Menu Order" you configure on the desktop will automatically take effect in the mobile navigation bar and workbench.
* **Tip**: Since mobile screens are small, place the 4–5 most important menu items at the top; secondary items will be tucked into the "More" menu on mobile.

---

## FAQ

**Q: I added the object to the menu, but regular users still can't see it?**
A: This is usually a **Double-Lock** issue.

1. **Lock 1 (App Level)**: Does the user have permission to access this App? (Covered in this chapter).
2. **Lock 2 (Object Level)**: Does the user have permission to access the data? (You need to grant "Read" permission for the "Project" object in **Permission Sets/Profiles**).
* *If a user has App access but no Object access, they will see the menu button, but clicking it will result in an "Access Denied" message.*



**Q: Can only Admins create Apps?**
A: Yes. This is a system-level configuration that requires `admin` privileges.

**Q: Can I modify the "Standard Apps" provided by the system?**
A: Yes, though we don't recommend deleting core features. You can edit standard apps to hide modules your company doesn't use (e.g., if you don't sell physical products, hide the "Products" menu) to keep the interface clean.
