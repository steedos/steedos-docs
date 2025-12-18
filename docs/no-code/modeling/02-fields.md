
# Fields and Data Types

:::info Learning Objectives

* Understand the concept of Fields (analogous to Excel columns).
* **Master Core Technical Specs**: Character limits, numeric precision, and rounding rules.
* **Master Complex Concepts**: Clearly distinguish between **Lookup** and **Master-Detail** relationships.
* Learn the specific data formats used in **Reports** and **Data Import**.
:::

## What is a Field?

If an **Object** is a Sheet in Excel, then a **Field** is a **Column** in that sheet.

Fields define the **Data Format** (text, number, etc.) and the **Validation Rules** (e.g., maximum character length) for your records.

---

## 1. Text and Input Types

Used for storing names, descriptions, notes, and other unstructured information.

| Field Type | Icon | Use Case | Technical Specs |
| --- | --- | --- | --- |
| **Text** | 🅰️ | Names, Titles | • Max **255** characters.<br/>

<br/>• Supports Shield Platform Encryption. |
| **Long Text** | 📝 | Descriptions, Notes | • **Capacity**: Default 32,768 characters, adjustable up to **131,072**.<br/>

<br/>• **Line Breaks**: Every Enter key counts as **2 characters**.<br/>

<br/>• **Reports**: Displays only the first **999** characters (export for full details). |
| **Rich Text** | 📰 | Announcements, Articles | • WYSIWYG editor (bold, color, lists).<br/>

<br/>• **Capacity**: Max **131,072** characters (including hidden HTML tags).<br/>

<br/>• **Images**: Supports gif, jpeg, png up to **1 MB**. |
| **Email** | 📧 | Customer Emails | • Max **80** characters; automatic format validation.<br/>

<br/>• **Note**: Sending emails to this field does not automatically log activity history. |
| **URL** | 🔗 | Website Links | • Max 255 characters.<br/>

<br/>• **Display**: Shows first **50** characters; clickable to open full URL. |

---

## 2. Numbers and Currency

Used for amounts, quantities, and statistical data.

:::warning Precision Warning
All numeric field types (Number, Currency, Percent) lose precision after **15 decimal places**. Excess decimal places may be truncated by the system.
:::

### Number

* **Use Case**: Inventory counts, age, sort orders.
* **Rules**:
* **Leading Zeros**: Automatically removed (e.g., `007` becomes `7`).
* **Rounding Rule**: Uses **"Round half up"**.
* `12.345` ➔ `12.35`
* `-12.345` ➔ `-12.35`





### Currency

* **Use Case**: Contract amounts, unit prices. Automatically adds symbols (¥, $).
* **Rules**:
* **Rounding Rule**: Uses **"Round-half-to-even"** (Banker's Rounding). This is the financial standard to reduce cumulative errors in large-scale calculations.
* `23.5` ➔ `24` (Ends in 5, rounds to the nearest even number).
* `22.5` ➔ `22` (Ends in 5, rounds to the nearest even number).





### Percent

* **Use Case**: Discount rates, completion progress.
* **Rules**: Input as a decimal (e.g., `0.10`), displayed as a percentage (`10%`).

---

## 3. Date and Time

| Field Type | Description | Example Format |
| --- | --- | --- |
| **Date** | Year, month, and day only. Primary for report filtering. | `2025-12-31` |
| **Date/Time** | Includes year, month, day, and specific time. | `2025-12-31 14:30` |
| **Time** | Time only. Supports milliseconds. `Z` suffix denotes GMT. | `17:30:45.125Z` |

---

## 4. Logic and Choice Types

Standardize input to ensure data quality.

### Checkbox

* **Definition**: A boolean state (Yes/No, True/False).
* **Data Representation**:
* **In UI**: Displayed as a checkbox ☑️.
* **In Report Filters**: Uses `True` (checked) and `False` (unchecked).
* **In Import/Export**: Uses `1` (checked) and `0` (unchecked).



### Picklist (Dropdown)

* **Definition**: A single-select dropdown menu.
* **Configuration**: Requires pre-defined Labels (what users see) and Values (what the database stores).

### Picklist (Multi-select)

* **Definition**: Allows selecting multiple tags from a list.
* **Storage Format**: Values are separated by **semicolons** `;` in the database and export files (e.g., `Java;Python;C++`).

---

## 5. Relationships — **Essential Reading**

The core power of Steedos lies in handling relationships between tables. This is the most critical concept for new developers.

### Lookup Relationship — "Weak Association"

**"You can point to it, but you remain independent."**

* **Scenario**: **Work Order** linked to a **Customer**; **Employee** belonging to a **Department**.
* **UI**: Represented by a magnifying glass icon 🔍 which opens a selection modal.
* **Behavior**:
* **Independence**: If the "Parent" (Customer) is deleted, the "Child" (Work Order) is **not** deleted (the field is simply cleared).
* **Flexibility**: Usually optional; a record doesn't necessarily need a lookup value.



### Master-Detail Relationship — "Strong Association"

**"United in existence, controlled by the Master."**

* **Scenario**: **Expense Report** and **Line Items**; **Order** and **Order Products**.
* **Behavior**:
1. **Cascade Delete**: If the "Master" (Expense Report) is deleted, all "Detail" records (Line Items) are **automatically deleted**.
2. **Security Inheritance**: Permissions for the detail record are entirely dependent on the master record.
3. **Required**: A detail record must always be linked to a master; "orphan" records are not allowed.
4. **Roll-Up Summaries**: This relationship is a prerequisite for using Roll-Up Summary fields.



---

## 6. Formula

**"Automated results, just like Excel formulas."**

Formula fields are **read-only**. The system calculates the value in real-time based on the expression you define. When the source data changes, the formula result updates instantly.

* **Use Cases**:
* **Math**: `Total_Price = Unit_Price * Quantity`
* **Text Concatenation**: `Full_Name = Last_Name + " " + First_Name`
* **Logic**: `Status = (End_Date < Today) ? "Expired" : "Active"`
* **Cross-object**: Display fields from a related object (e.g., showing "Customer Tier" on a "Contract" page).



---

## 7. Roll-Up Summary

**"Automating the totals from child records."**

This allows a Master record to automatically calculate data from its Detail records.

:::danger Core Prerequisite
**Requires a Master-Detail Relationship!**
Roll-Up Summary fields cannot be used with standard Lookup relationships.
:::

* **Supported Operations**:
1. **Count**: Total number of child records.
2. **Sum**: Total value of a specific numeric field across child records.
3. **Min/Max**: The lowest or highest value (e.g., earliest start date).



---

## 8. Auto Number

**"A unique ID for every record."**

Instead of manual entry, **Auto Number** fields generate a sequential ID automatically to ensure uniqueness.

* **Format Syntax**:
* `{0000}`: Represents the numeric sequence.
* `{YYYY}`, `{MM}`, `{DD}`: Represents current Year, Month, or Day.
* **Example**: A format of `INV-{YYYY}-{0000}` produces `INV-2025-0001`.



---

## FAQ

**Q: Can I change a field type after it has been created?**
A: **High Risk.** While permitted, it often leads to data loss or truncation (e.g., changing "Long Text" to "Text" will cut off data beyond 255 characters).

**Q: How do I make a field mandatory?**
A: Check the **Required** attribute in the field settings. This applies across the API, imports, and the UI.
