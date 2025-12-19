# Fields and Data Types

:::info Learning Objectives

* Understand the concept of Fields (analogy to Excel columns).
* **Master Core Technical Specs**: Character limits, numeric precision, and rounding rules.
* **Key Difficulty**: Thoroughly clarify the difference between **Lookup** and **Master-Detail** relationships.
* Understand the special formats of various fields in **Reports** and **Data Import**.
:::

## What is a Field?

If an **Object** is a worksheet (Sheet) in Excel, then a **Field** is the row of **Columns** in the header.

Fields determine the **format** of the data (Is it text or a number?) and the **rules** (What is the maximum number of characters allowed?).

---

## 1. Text & Input

Used to store unstructured information such as names, descriptions, and notes.

| Field Type | Icon | Use Case |
| --- | --- | --- |
| **Text** | 🅰️ | Names, Titles |
| **Long Text** | 📝 | Detailed descriptions, notes |
| **Rich Text** | 📰 | Announcements, Articles |
| **Email** | 📧 | Customer email addresses |
| **URL** | 🔗 | Official website links |

---

## 2. Numbers & Currency

Data involving amounts, quantities, and statistics.

:::warning Precision Warning
All numeric fields (Number, Currency, Percent) lose precision after **15 decimal places**. If you enter too many decimal places, the system may truncate them.
:::

### Number

* **Scenario**: Inventory quantity, age, sort order.
* **Rules**:
* **Leading Zeros**: Automatically removed by the system (e.g., `007` becomes `7`).
* **Rounding Rule**: Uses **"Round half up"**.
* `12.345` -> `12.35`
* `-12.345` -> `-12.35`





### Currency

* **Scenario**: Contract amount, unit price. The system automatically adds currency symbols (¥, $).
* **Rules**:
* **Rounding Rule**: Uses **"Banker's Rounding" (Round-half-to-even)**. This is a standard algorithm for financial systems (rounding to the nearest even number when the fraction is exactly .5) to reduce cumulative errors in large-scale calculations.
* `23.5` -> `24` (5 follows no digits, rounds up to even)
* `22.5` -> `22` (5 follows no digits, rounds down to even)





### Percent

* **Scenario**: Discount rate, completion percentage.
* **Rule**: Enter a decimal (e.g., `0.10`), and the system displays it as a percentage (`10%`).

---

## 3. Date & Time

| Field Type | Description | Example Format |
| --- | --- | --- |
| **Date** | Year, month, and day only. Primary basis for report filtering. | `2025-12-31` |
| **Date/Time** | Includes year, month, day, and specific time. | `2025-12-31 14:30` |
| **Time** | Time only. Supports milliseconds. `Z` at the end represents GMT. | `17:30:45.125Z` |

---

## 4. Logic & Choice

Used to standardize input and prevent users from entering invalid data.

### Checkbox

* **Definition**: Only two states: "Yes/No" (e.g., Is Resigned?).
* **Data Representation (Important)**:
* **In UI**: Displayed as a checkbox ☑️.
* **In Report Filters**: Uses `True` (checked) and `False` (unchecked).
* **In Data Import/Export**: Uses `1` (checked) and `0` (unchecked).



### Select (Picklist)

* **Definition**: Single-select dropdown menu.
* **Configuration**: Requires pre-defined **Labels** (Display values) and **Values** (Code values). Supports multi-select.

---

## 5. Relationships — **Core Reading**

Steedos' core capability lies in handling relationships between tables. This is the area most prone to confusion for beginners.

### Lookup Relationship — "Weak Association"

**"You can point to it, but you are independent."**

* **Scenario**: **Work Order** linked to **Customer**; **Employee** belonging to a **Department**.
* **UI**: Displayed as a magnifying glass icon 🔍, clicking it pops up a selection window.
* **Behavioral Characteristics**:
* **Independence**: If the "Customer" (Parent) is deleted, the "Work Order" (Child) is usually **not** deleted (the relationship field simply becomes empty).
* **Flexibility**: This field is usually **optional** (e.g., a lead might not belong to a company yet).



### Master-Detail Relationship — "Strong Association"

**"United in life and death; the Master controls everything."**

* **Scenario**: **Expense Report** and **Expense Items**; **Order** and **Order Line Items**.
* **Behavioral Characteristics**:
1. **Cascade Delete**: If the "Expense Report" (Master) is deleted, all "Items" (Detail) are **automatically deleted** by the system.
2. **Security Inheritance**: The permissions of the detail record depend entirely on the master record. If you don't have permission to view the "Expense Report," you cannot view its "Items."
3. **Required**: A detail record must always be linked to a master; "orphan" data cannot exist.
4. **Roll-Up Summary**: Roll-up summary functions can only be used if a Master-Detail relationship is established.



---

## 6. Formula

**"Calculate results automatically, just like Excel formulas."**

Formula fields are **read-only**; users cannot fill them in manually. Values are calculated in real-time based on expressions you write. When source data changes, the formula result updates immediately.

* **Use Cases**:
* **Simple Math**: `Total Price = Unit Price * Quantity`
* **Text Concatenation**: `Full Name = Last Name + " " + First Name`
* **Logic**: `Status = (End Date < Today) ? "Expired" : "Normal"`
* **Cross-object Value**: Display fields of a related object directly (e.g., displaying the "Customer Tier" directly on the "Contract" page).



---

## 7. Roll-Up Summary

**"Automate the totals by looking at the details."**

This is one of Steedos' most powerful statistical features. It allows the master record (Parent) to automatically summarize data from all its detail records (Children).

:::danger Core Prerequisite
**A "Master-Detail Relationship" must be established!**
If the relationship between two objects is just a standard "Lookup Relationship," you cannot use Roll-Up Summary fields. This is the most common configuration error.
:::

* **Four Supported Operations**:
1. **Count**: How many "Tasks" are under this "Project"?
2. **Sum**: What is the total amount of all "Closed Orders" for this "Customer"?
3. **Min**: What is the earliest start date among the "Tasks" of this project?
4. **Max**: What is the largest amount among all "Payments" for this salesperson?



---

## 8. Auto Number

**"Give every piece of data a unique ID number."**

Instead of manual entry, the **Auto Number** field generates incremental sequence numbers automatically to ensure they are never duplicated.

* **Format Syntax**:
* `{0000}` represents the numeric sequence.
* `{YYYY}`, `{MM}`, `{DD}` represent the current year, month, and day.
* **Example**: Setting the format to `INV-{YYYY}-{0000}` will generate `INV-2025-0001`, followed by `INV-2025-0002`.



---

## FAQ

**Q: Can I change a field type after it's created?**
A: **High Risk!** Although allowed, it often leads to data loss or truncation. For example, changing "Long Text" to "Text" will cut off data exceeding 255 characters; changing "Text" to "Number" will clear non-numeric content.

**Q: How do I make a field "Mandatory"?**
A: Check the **Required** attribute when creating or editing a field. Note: This applies to all layers (API, Import, UI entry), so use it carefully.
