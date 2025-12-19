# Profiles

A **Profile** is the cornerstone of the Steedos permission system. Every user must be assigned exactly one profile. The profile determines a user's **foundational identity** and **baseline permissions** within the system.

If a user is like an employee, a **Profile** is their "Job Description"—defining which apps they can see, which objects they can operate, and which system-level privileges they possess.

---

## 1. Core Concepts

Profiles primarily control permissions across three layers:

1. **Object Permissions**:
* Whether a user can **Create**, **Read**, **Update**, or **Delete** a specific type of data (commonly known as **CRUD** permissions).
* *Example: A salesperson can "Create" opportunities but may only "Read" contracts.*


2. **Field Permissions**:
* Even if a user can see the "Contract" object, can they see the "Contract Amount" field?
* Field-level security can be set to "Hidden" or "Read-Only."


3. **System Permissions**:
* Can the user log in?
* Can the user access the "Setup" (admin) interface?
* Can the user export reports?



---

## 2. Standard Built-in Profiles

Steedos comes pre-configured with several standard profiles that cover basic role requirements:

* **System Administrator**:
* Has "View All" and "Modify All" permissions for all data.
* Has full system configuration privileges.
* *Note: Do not modify this profile unnecessarily to avoid locking yourself out of administrative functions.*


* **User**:
* The most common profile for employees. Typically has read/write access to basic business objects but cannot access backend settings.


* **Guest**:
* Used for public access by unauthenticated users (e.g., a public knowledge base or official website). Permissions should be extremely strict, usually read-only.



---

## 3. Managing Profiles

Administrators can create custom profiles to meet specific business needs.

### 3.1 Creating/Cloning Profiles

:::tip Best Practice
**Avoid modifying standard profiles (like "User") directly.** If you need to fine-tune permissions (e.g., preventing standard users from deleting records), it is recommended to **Clone** a standard profile, name it (e.g., "Standard Sales Rep"), and then apply your changes.
:::

1. Go to **Settings** > **Permissions** > **Profiles**.
2. Find an existing profile (e.g., `User`) and click **Clone**.
3. Enter a new profile name (e.g., `Sales Rep`).
4. Click **Save**.

### 3.2 Configuring Object Permissions

On the Profile detail page, you can exert granular control over every object (e.g., "Accounts," "Orders"):

| Permission | Meaning | Risk Note |
| --- | --- | --- |
| **Read** | Can view data of this object. | Basic access. |
| **Create** | Can create new records. |  |
| **Edit (Update)** | Can modify existing records. |  |
| **Delete** | Can delete records. | **Use with caution**. Usually reserved for managers. |
| **View All** | Can view **all** data in this object's table, regardless of sharing rules. | **High Risk**. Typically for auditors or data analysts. |
| **Modify All** | Can modify/delete **all** data in this object's table, regardless of sharing rules. | **Extremely High Risk**. Usually restricted to admins. |

### 3.3 Configuring Field Permissions

Within the object settings for a profile, you can also control the visibility of specific fields:

* **Visible**: The user can see and interact with the field.
* **Read-Only**: The user can see the field but cannot modify it, even in edit mode (e.g., Approval Status or calculated commission amounts).
* **Invisible**: The field is completely hidden from the UI, reports, and APIs for that user.

---

## 4. Profile vs. Permission Set

This is the most common point of confusion in the Steedos/Salesforce permission model, yet it is the most important.

* **Profile**: This is the **Baseline**. A user **must have exactly one**. It defines "minimum essential access."
* **Permission Set**: This is an **Add-on**. A user can have **multiple**. It is used for "incremental authorization" or "special grants."

### Allocation Strategy: The Principle of Least Privilege

**Recommended approach**:

1. Keep the **Profile** as restrictive as possible. Grant only the basic permissions that everyone in that role truly needs.
2. Use **Permission Sets** to handle the "pluses."

> **Scenario Example**:
> A company has 100 sales reps.
> * **Profile**: Assign all 100 people the `Sales User` profile (can read/write, but cannot delete or export).
> * **Permission Set**: Create a permission set named `Export Data`.
> * **Assignment**: Assign this permission set only to the 5 Sales Managers.
> 
> 
> The benefit: If you need to revoke export rights later, you simply remove the user from the Permission Set without affecting the Profile or other users.

---

## 5. FAQ

**Q: I updated "App Visibility" in the profile, but the user still can't see the menu?**
A: Check the **Object Permissions** for that menu item. If the user does not have "Read" permission for the underlying object, the menu will not appear even if it is enabled.

**Q: Why is the "Delete" button missing?**
A: Check the user's profile and ensure the **Delete** permission is checked for that specific object. For security reasons, the standard "User" profile typically has delete permissions disabled by default.

---

**Next Step**: Now that you understand how to set "baseline permissions" via profiles, let's learn how to use **[Permission Sets](https://www.google.com/search?q=./02-permission-sets.md)** to flexibly grant additional privileges to specific users.