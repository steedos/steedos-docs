# Sharing Rules

In Steedos, **record-level permissions** (i.e., which specific rows in a table a user can see) are primarily determined by the "Data Scope" defined in **Profiles** or **Permission Sets**.

When the baseline scope defined in a Profile (such as "View Own Only") is too restrictive for complex business needs, we use **Sharing Rules** to grant additional access.

---

## 1. The Foundation: Data Scope

**"How much data a user can see" is defined directly within Object Permissions.**

When configuring a **Profile** or **Permission Set**, administrators must specify a **Data Scope** for each object (e.g., "Contracts") in addition to checking "Read" or "Edit" permissions.

### Common Data Scope Levels

Steedos typically provides the following levels of visibility control:

| Scope Level | Meaning | Use Case |
| --- | --- | --- |
| **All** | **Public**. The user can view/modify **all** records in the table, regardless of ownership. | Administrators, Auditors, Public Knowledge Bases. |
| **Company** | **Branch Level**. The user can see all data belonging to their assigned company/branch (and its sub-departments). | Branch Managers, Administrative Staff. |
| **Organization** | **Department Level**. The user can see all data belonging to their specific department (and its sub-departments). | Department Heads / Managers. |
| **Owner** | **Private**. The user can only see records **they created** or records where they are the **assigned Owner**. | Individual Sales Reps, Standard Employees. |

:::tip Core Logic
If you want the default permission for an object to be "Private," set the Data Scope to **"Owner"** in that user's Profile.
:::

---

## 2. Sharing Rules: Opening Exceptions

When the Profile scope (e.g., "Owner") is too strict, but you cannot grant "All" access due to security risks, you use **Sharing Rules** to bridge specific data gaps.

**The Golden Rule of Sharing:** Sharing rules can only perform "addition" on existing permissions; they can never perform "subtraction."

### Use Cases

* **Cross-Department Collaboration**: A sales rep in the Beijing branch can normally only see their own leads but needs to share "Signed" contracts with the "Headquarters Finance Department" for review.
* **Special Project Groups**: A specific high-value customer record needs to be shared with all members of the "IPO Preparation Team," regardless of which department those members belong to.

### Types of Sharing Rules

#### A. Criteria-Based Sharing

Sharing is triggered automatically based on specific field values within a record.

* **Rule**: If `Contract Amount` > 1,000,000.
* **Action**: Share with the `Risk Control Department`.
* **Access Level**: `Read-Only`.

#### B. Organization-Based Sharing

Sharing is based on the department the record belongs to.

* **Rule**: All records belonging to the `Shanghai R&D Department`.
* **Action**: Share with the `Beijing Product Team`.
* **Access Level**: `Read-Only`.

---

## 3. Troubleshooting Access: A Step-by-Step Logic

When a user reports they "cannot see data" or "see data they shouldn't," follow this troubleshooting path:

1. **Step 1: Check the Profile/Permission Set (The Base)**
* Find the user's Profile.
* Is **"Allow Read"** checked for the object?
* What is the **"Data Scope"** set to?
* If it's `All`, they can see everything (no further troubleshooting needed).
* If it's `Owner`, move to Step 2.




2. **Step 2: Check the Record Owner**
* Who is the `Owner` of this record?
* If it's the user themselves, they should have access.
* If not, does the user belong to a parent department of the Owner (and does their Profile scope include sub-departments)?


3. **Step 3: Check Sharing Rules**
* Is there a specific Sharing Rule "feeding" this data to the user or their department/group?

