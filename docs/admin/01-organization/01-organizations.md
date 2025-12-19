# Department and Company Structure

In Steedos, constructing a clear organizational structure is the foundation of system implementation. The organizational architecture does more than just display the company's hierarchy (such as headquarters, branches, departments, and offices); it directly determines the **scope of data permissions** (who can see whose data) and the **direction of approval workflows** (level-by-level approvals).

---

## 1. Core Concepts

Steedos utilizes a **tree structure** to manage organizational units.

### Organizations

In the system, whether it is "Headquarters," "Branch Office," "Finance Department," or "Sales Team A," they are collectively referred to as **Organizations**. They are connected through **Parent-Child relationships** to form a tree.

* **Root Node**: Usually represents the entire group or headquarters.
* **Company (Branch)**: Typically refers to a subsidiary or a large branch with independent accounting capabilities.
* **Department**: Refers to a functional unit, such as "R&D" or "Marketing."

> **Example Structure**:
> ```text
> Steedos Software (Root)
> ├── Shanghai HQ (Company)
> │   ├── R&D Center (Department)
> │   │   ├── Backend Team
> │   │   └── Frontend Team
> │   └── Sales Department (Department)
> └── Beijing Branch (Company)
>     └── Sales Office
> 
> ```
> 
> 

---

## 2. Managing the Organizational Structure

Administrators can maintain this "tree" within the Settings interface.

### Creating/Editing an Organization

1. Enter the **Settings** app.
2. Navigate to **Organization** > **Organizations**.
3. Click **New** or click on an existing organization name to **Edit**.

### Key Field Descriptions

| Field Name | Description | Impact/Role |
| --- | --- | --- |
| **Name** | The display name, e.g., "Finance Department." | Used for UI display. |
| **Parent** | **The key to building hierarchy.** Select the parent unit this department belongs to. | If left blank, this node becomes a Root Node. |
| **Company** | Marks whether this node is an independent legal entity or branch. | Used in financial scenarios or data isolation. |
| **Manager** | Assigns the leader of the department (linked to a User). | **Crucial.** Used for the "Automatically find manager" function in approval flows. |
| **Director** | Specifies the high-level executive in charge of the department. | Used for cross-level approvals or special permission logic. |

---

## 3. Managing Personnel Affiliation

Placing users into the correct "slots" is the first step of permission management. Every user must be assigned within the organizational structure.

### Setting a Primary Department

In **User Management**, edit the user's **Primary Department** field to attach them to a specific leaf node of the organizational tree.

### One Person, Multiple Positions (Multi-Department Affiliation)

If an employee holds multiple roles (e.g., John is both the "R&D Manager" and a "Architecture Committee Member"), Steedos supports **Auxiliary Departments**:

* In the user's detail page, under the **Organizations** related list, you can add additional department associations.
* This means the user can simultaneously view shared data within both departments.

---

## 4. Application Scenarios

Once the organizational structure is configured, the system automatically applies it in the following areas:

### A. Data Permissions (Vertical Visibility)

If the system's sharing rules are set to "Private," the principle of **"Superiors see Subordinates"** is generally followed:

* **Subordinates**: Regular employees can usually only see their own data.
* **Superiors**: The "Sales Team 1 Manager" can naturally see all data created by employees in "Sales Team 1."
* **Executive Superiors**: The "Sales Director" can see all data from both "Sales Team 1" and "Sales Team 2."

### B. Approval Workflows (Automated Routing)

When configuring workflows or approval processes, you don't need to specify a specific person's name (like "John"). Instead, you specify a **Role Relationship**.

* **Scenario**: An employee submits a leave request.
* **Configuration**: The approval step is set to `Submitter's Department Manager`.
* **Effect**: The system automatically looks up the user in the `Manager` field of the applicant's department. If personnel change (a new manager is hired), you don't need to modify the workflow; the approval will automatically route to the new manager.

---

## 5. Best Practices

1. **Maintain Moderate Hierarchy**: Avoid creating excessively deep hierarchies (aim for 5 levels or fewer). Deep trees can slow down permission calculations and increase management complexity.
2. **Keep Managers Updated**: The **Manager** field is the core of approval automation. Ensure this is updated immediately during personnel changes to prevent approval requests from getting stuck.
3. **Framework First**: During initial implementation, build the major departmental framework (Level 1 and 2 departments) first. Subdivide into smaller teams (Level 3) once the project is stable.
