# Custom Buttons

:::info Learning Objectives

* Understand the purpose of buttons: Moving beyond standard CRUD to triggering business logic.
* **Core Skill**: Master the 6 display locations (List view, Record page, dropdown menus).
* **Amis Interaction**: Learn to configure actions triggered by button clicks (Dialogs, Confirmations, Ajax requests).
:::

## What are Custom Buttons?

By default, the system provides standard buttons like "New," "Edit," and "Delete." However, real-world business scenarios often require more personalized operations, such as:

* **One-click Approval**: Clicking "Approve" on a contract page to automatically update its status.
* **Quick Follow-up**: Clicking a button on a customer list row to pop up a small window for recording activity.
* **Print Preview**: Jumping to a formatted print page with a single click.

In Steedos, these are achieved through **Custom Buttons**. You can define exactly what happens after a click using **Amis Actions**.

---

## 1. Button Locations

This is the first step in configuration. Steedos provides high-level control over where a button appears. We categorize these into **"List-level"** (targeting the whole table) and **"Record-level"** (targeting a specific row).

### Location Reference Table

| Display Location (Label) | Code Value | Scenario Description | Illustration |
| --- | --- | --- | --- |
| **List Top Right** | `list` | **Global Operations**. Not for a specific row, but for the whole object (e.g., Import, Export, New). | List Header |
| **Record Top Right + Row Menu** | `record` | **Most Common**. Visible on the detail page and accessible as a shortcut in the list row menu. | Record Header + Row Menu |
| **Record "More" + Row Menu** | `record_more` | **Secondary Operations**. Keeps the header clean but remains accessible in the row menu. | Record "More" + Row Menu |
| **Row Menu Only** | `list_item` | **Shortcut Operations**. Only used when browsing a list; unnecessary inside the detail page. | List Row Menu |
| **Record Top Right Only** | `record_only` | **Detail-specific**. For complex operations that require viewing the record details first. | Record Header |
| **Record "More" Only** | `record_only_more` | **Low-frequency**. For actions like "View Version History" or "Archive." | Record "More" Menu |

:::tip What happens if I choose the wrong location?

* If you set a button to `list` (List Top Right) but try to access a specific record ID in your logic, it will fail because that location doesn't "know" which row you are targeting.
* If you choose a `record` type location, the system automatically passes the `record_id` (usually `${_id}`) to the button context.
:::

---

## 2. Defining Button Behavior (Amis Actions)

Once the location is set, what happens when it's clicked? Steedos uses the **Amis Renderer** to handle interactions. When configuring a button, you will see an **Amis Schema** section where you define the behavior using JSON.

### Three Common Interaction Patterns

#### Pattern A: Dialog

The most common interaction. It pops up a form for the user to fill out before confirming.

* **Scenario**: Clicking "Reject" pops up a box asking for the "Rejection Reason."
* **Amis Type**: `dialog`
* **Example**:
```json
{
  "type": "button",
  "actionType": "dialog",
  "dialog": {
    "title": "Please provide a reason",
    "body": {
      "type": "form",
      "controls": [
        {
          "type": "textarea",
          "name": "reason",
          "label": "Reason"
        }
      ]
    }
  }
}

```



#### Pattern B: Drawer

Similar to a dialog but slides out from the side of the screen. Ideal for longer forms.

* **Scenario**: Clicking "Complete Profile" slides out a comprehensive form.
* **Amis Type**: `drawer`

#### Pattern C: Ajax Request

Silent execution. It tells the server to perform a task directly without further user input.

* **Scenario**: Clicking "Check-in" records the time in the background and shows a "Success" message.
* **Amis Type**: `ajax`
* **Example**:
```json
{
  "type": "button",
  "actionType": "ajax",
  "confirmText": "Are you sure you want to proceed?",
  "api": {
    "method": "post",
    "url": "/api/custom/check_in",
    "data": {
      "record_id": "${_id}"
    }
  }
}

```



---

## Practical Exercise: Create a "Complete Project" Button

Let's create a button for the "Project" object that changes the status to "Completed" instantly.

### Step 1: Create New Button

1. Go to **Settings** -> **Object Settings** -> **Project** -> **Buttons**.
2. Click **New**.

### Step 2: Configure Basic Attributes

* **Display Label**: `Mark Completed`
* **API Name**: `btn_finish_project`
* **Location**: Select `Record Top Right Only (record_only)`.
* **Color**: `Primary` (Blue).

### Step 3: Configure Amis Behavior

In the **Amis Schema** or **Action Configuration** area, enter the following logic (using the standard Steedos GraphQL API):

```json
{
  "type": "button",
  "label": "Mark Completed",
  "actionType": "ajax",
  "confirmText": "Are you sure you want to mark this project as completed?",
  "api": {
    "method": "post",
    "url": "/graphql",
    "data": {
      "query": "mutation { project__update(id: \"${_id}\", doc: { status: \"completed\" }) { _id } }"
    },
    "messages": {
      "success": "Project marked as completed!"
    }
  }
}

```

### Step 4: Save and Test

Save the configuration and open any Project record. A blue "Mark Completed" button will appear in the header. Click it, confirm, and watch the status update automatically.

---

## Advanced Tips

### 1. Visibility Control (Visible On)

You likely don't want the "Mark Completed" button to show up on projects that are already finished.

* Find the **"Visible On"** field in the button configuration.
* Enter the expression: `this.status !== 'completed'`
* **Result**: The button only appears if the status is not "Completed."

### 2. Bulk Actions

If you choose the `list` location, you might want to process multiple rows at once.

* In this context, the Amis environment provides `ids` (a list of selected record IDs).
* You can pass this array to your backend API to perform batch updates.

---

## FAQ

**Q: I configured a button, but nothing happens when I click it.**
A: Check the browser **Console (F12 -> Console)**. This is usually due to an incorrect API URL or a syntax error in your Amis JSON.

**Q: How do I add an icon to a button?**
A: Use the **Icon** field in the configuration. It supports FontAwesome. For example, enter `fa fa-check`.

**Q: Can a button link to an external website?**
A: Yes. Set the `actionType` to `url` and provide the link in the `url` property.

```json
{
  "actionType": "url",
  "url": "https://www.google.com/search?q=${name}",
  "blank": true
}

```
