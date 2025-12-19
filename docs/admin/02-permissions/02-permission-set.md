# Permission Sets

If a **Profile** determines a user's "basic identity," then a **Permission Set** is a user's "special pass."

A Permission Set is a flexible permission management tool used to grant users **additional** privileges without having to modify their assigned Profile.

## 1. Core Logic: Additive, Not Restrictive

The most important rule regarding Permission Sets is: **Permission Sets can only extend permissions; they cannot restrict them.**

In Steedos, the permission calculation formula is as follows:

> **Final Permissions = Profile Permissions + Permission Set A + Permission Set B + ...**

### The Analogy

* **Profile**: Like an employee's **ID Badge**. Every "Sales Department" employee has the same badge, allowing them to swipe through the front door and the office area.
* **Permission Set**: Like a **Temporary Key**.
* If a specific sales employee needs to enter the "Finance Room" to reconcile accounts, you don't need to change their "Sales Badge" to a "Finance Badge" (changing the Profile), nor do you need to expand the permissions of the "Sales Badge" (which would affect everyone).
* You simply give them a "Finance Room Key" (assign a Permission Set). Once they are done, you take the key back.



---

## 2. Profile vs. Permission Set

| Feature | Profile | Permission Set |
| --- | --- | --- |
| **Quantity Limit** | Each user **must and can only** have one. | Each user can have **zero or multiple**. |
| **Design Purpose** | Defines baseline permissions (what everyone shares). | Defines functional permissions (what only a few need). |
| **Flexibility** | Lower. Modifying a Profile affects all users assigned to it. | Extremely High. Can be combined and assigned freely. |
| **Typical Use** | Standard User, System Administrator. | Data Importer, Recruitment Interviewer, Price Approver. |

---

## 3. Creation and Configuration

### Step 1: Create the Permission Set

1. Navigate to **Settings** > **Permissions** > **Permission Sets**.
2. Click **New**.
3. **Label**: Enter an easily identifiable name (e.g., `Import Leads` — Permission to import lead data).
4. **License**: Usually left blank unless the set is specific to a certain license type.
5. Click **Save**.

### Step 2: Define Permissions

Once saved, the interface is very similar to the Profile configuration. You can configure:

* **Object Settings**: Grant "Delete" or "View All" permissions for specific objects (e.g., Opportunities).
* **Field Permissions**: Grant visibility to sensitive fields (e.g., "Estimated Gross Profit").
* **System Permissions**: Enable system-level features like "API Enabled" or "Manage Reports."

---

## 4. Assigning Permission Sets

Once the "key" is created, you need to issue it to specific individuals.

### Method 1: Assigning via Permission Set (Batch)

1. On the Permission Set detail page, click the **Manage Assignments** button at the top.
2. Click **Add Assignments**.
3. Select the users you want to grant this permission to (supports selecting users across different departments or profiles).
4. Click **Assign**.

### Method 2: Assigning via User (Individual)

1. Navigate to the **Users** list and click a specific user's name.
2. Scroll down to the **Permission Set Assignments** related list.
3. Click **Edit Assignments**.
4. Move the available Permission Sets from the left column to the "Enabled" column on the right.

---

## 5. Best Practice Scenarios

To keep your system clean and secure, it is recommended to follow the principle: **"Minimize Profiles, Modularize Permission Sets."**

### Scenario A: Data Import Permissions

**Problem**: The company dictates that only a few senior sales assistants can bulk-import customer data; all other sales reps must enter data one by one.
**The Wrong Way**: Clone a "Senior Sales" profile and enable "Import" for it. This leads to "Profile Explosion."
**The Right Way**:

1. All sales reps keep the `Sales User` Profile (no import permissions).
2. Create an `Import Data Capability` Permission Set and check "Import Leads" in System Permissions.
3. Assign this Permission Set only to those senior assistants.

### Scenario B: Cross-Department Collaboration

**Problem**: An R&D Manager is temporarily joining the "IPO Preparation Group" and needs to view "Audit Report" objects in the Finance Department.
**The Right Way**:

1. The manager keeps the `R&D Manager` Profile.
2. Create an `IPO Project Access` Permission Set, granting "Read" access to the "Audit Report" object.
3. Assign it to the manager. Once the project concludes, remove the assignment.

---

**Next Step**: Profiles and Permission Sets solve "Object" and "Field" level permissions (i.e., whether you can see a table or a column). If you need to control permissions at the **record level** (i.e., whether you can see a specific row of data, such as "only seeing data I created"), please read [Sharing Rules](./03-sharing-rules.md).