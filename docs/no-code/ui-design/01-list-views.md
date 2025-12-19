# List Views

:::info Learning Objectives

* Understand what a List View is and how it differs from Excel filtering.
* Learn how to create an efficient view (e.g., "My Pending Tasks").
* Master various display modes including **Table**, **Split View**, and **Calendar**.
* Understand how to share views with your team.
:::

## What is a List View?

If an **Object** is a "warehouse" storing thousands of data entries, then a **List View** is a "window" through which you see that data.

Think of an Excel spreadsheet:

1. You have a master sheet with 10,000 customer entries.
2. You want to see "All customers in Beijing." You would click "Filter" -> "City" -> "Beijing."
3. You want to see "New VIP customers this month." You would add another layer of filtering.

In Steedos, we save these **filter criteria** and the **visible columns** as a **"List View."**

* **Default Views**: Systems usually come with views like "All Records" or "Recently Viewed."
* **Common Scenarios**:
* Sales reps only seeing **"My Leads."**
* Managers viewing **"Contracts Expiring This Month."**
* Project managers viewing **"Active Projects."**



---

## Hands-on: Creating a Custom View

Let's create a view named **"My High-Priority Projects"** within the Project object.

### Step 1: Create a New View

1. Navigate to the Project list page.
2. Click the current view name in the top left (e.g., "All Projects").
3. Select **"New"** from the dropdown menu or click the gear icon and choose **"New List View."**

### Step 2: Naming

* **List Name**: Enter `My High-Priority Projects`.
* **API Name**: Enter `my_high_priority_projects` (English recommended).

### Step 3: Configure Filters — **Core Step**

This determines *which rows* are displayed.

1. In the Filter panel on the right, set the logic:
* **Filter by Owner**: Choose `My projects` (only records where you are the owner).
* **Add Filter Criteria**:
* Field: `Priority`
* Operator: `equals`
* Value: `High`




2. Click **Save**. The list will update to show only relevant data.

### Step 4: Choose Columns to Display

This determines *which columns* are displayed.

1. Click the **Settings (Gear Icon)** in the top right -> **"Select Fields to Display."**
2. Move fields like `Project Name`, `Status`, `Due Date`, and `Budget` from "Available Fields" to "Visible Fields."
3. Click **Save**.

🎉 **Done!** You now have a tailor-made workspace.

---

## Advanced: Beyond Tables (Multi-View Modes)

The power of Steedos lies in viewing the same data in multiple formats. You can switch modes in the top right corner of the list.

### 1. Table View

* **Classic**: The Excel-like layout.
* **Best for**: Browsing large amounts of data, sorting, or performing bulk edits.

### 2. Split View

* **Productivity Pro**: Displays a list on the left and record details on the right.
* **Best for**: Rapidly processing a list. For example, a salesperson making calls can click down the list on the left while viewing details on the right without navigating back and forth.

### 3. Calendar View

* **Time-centric**: Displays records on a calendar.
* **Best for**: Any object with dates, such as Meetings, Task Deadlines, or Contract Expirations.

---

## Sharing and Permissions

By default, views you create may be private. If you've built a great "Monthly Performance Dashboard" and want to show it to your manager, you need to adjust the settings.

In **Sharing Settings**, there are usually three levels:

1. **Only I can see this (Private)**: Your personal draft or specific workflow.
2. **All users can see this (Public)**: Everyone in the company can access it. Use sparingly to avoid cluttering others' menus.
3. **Share with specific groups (Roles/Groups)**: Share only with "Sales Department" or "Finance Managers."

---

## Pro-Tips

### 📌 Pinning a View

Tired of seeing "Recently Viewed" every time you click a tab?

* Switch to your favorite view (e.g., "My High-Priority Projects").
* Click the **Pin icon 📌** next to the view name.
* The system will now open this view by default whenever you enter this object.

### ✏️ Inline Editing

Update data without opening the record.

* In Table View, hover over a cell. If a **Pencil icon ✏️** appears, you can edit it directly.
* After editing, click **"Save"** at the bottom of the list.

### 🔍 Search Within List

If the view still has too much data:

* Use the search bar above the list. **Note**: This usually searches only within the scope of the current view's filters, not the entire database.
