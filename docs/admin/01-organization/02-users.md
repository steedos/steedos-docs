# User Management

Users are individuals who can log in to the Steedos system and access data. Each user is associated with a specific account. As an administrator, you are responsible for creating new users, modifying user information, resetting passwords, and managing the activation status of accounts.

---

## 1. User Concepts

In Steedos, a **User** represents the account of a natural person. To maintain the integrity of historical data (such as records previously created or approved by an employee), we generally **do not delete** users when they leave the company. Instead, we **deactivate** them.

* **Active Users**: Occupy a system license and can log in.
* **Deactivated Users**: Do not occupy a license and cannot log in, but their historical footprints (records, approvals, logs) remain intact for auditing.

---

## 2. Creating New Users

Administrators can manually add new users through the setup interface.

### Step-by-Step Instructions

1. Click the **App Launcher** (nine-dot icon) in the top-left corner and enter the **Settings** app.
2. In the left sidebar, navigate to **Organization** > **Users**.
3. Click the **New** button in the top-right corner.
4. Fill in the user's basic information (see the Core Fields table below).
5. Click **Save**.

### Core Field Descriptions

When creating or editing a user, the following fields are critical:

| Field Name | Required | Description |
| --- | --- | --- |
| **Name** | Yes | The user's real name, displayed throughout the system (e.g., in approval logs and record owner fields). |
| **Username** | Yes | The unique identifier for login. We recommend using an **email address** or **employee ID**. It must be unique across the entire system. |
| **Email** | No | Used for system notifications such as approval alerts and password reset links. |
| **Mobile** | No | Used for SMS notifications or Multi-Factor Authentication (MFA). |
| **Profile** | Yes | **Critical Field**. Determines the user's base permissions (e.g., System Admin, Standard User). Usually set to `user` by default. |
| **Active** | Yes | When checked, the user is **activated** and can log in. When unchecked, the account is **frozen/deactivated**. |
| **Primary Department** | No | The main department the user belongs to, used for displaying the organizational hierarchy. |

> **Note**: If your system is integrated with LDAP/AD, WeCom (Work WeChat), or DingTalk, users are typically synchronized automatically, and manual creation is not required.

---

## 3. Maintenance and Updates

### Modifying User Information

When an employee’s role changes or personal details are updated, administrators can edit the user record:

1. Click the user's **Name** in the user list.
2. Click the **Edit** button.
3. Update the necessary information (e.g., change department or mobile number) and save.

### Resetting Passwords

If a user forgets their password, an administrator can manually reset it:

1. Navigate to the user's detail page.
2. Click the **Reset Password** button in the top-right corner.
3. Enter and confirm the new password. The user will use this new password for their next login.

---

## 4. Deactivating Users

When an employee leaves the company or no longer requires access, administrators must deactivate the account.

### Why Deactivate instead of Delete?

Steedos records have complex relational dependencies. For instance, a user might be the "Owner" of a historical contract or have "Approved" a specific workflow step.

* **Deleting a User**: Causes data inconsistency, breaks reports, and makes historical records untraceable.
* **Deactivating a User**: Prevents login while preserving all historical data and audit trails.

### How to Deactivate

1. Find the user in the list and click **Edit**.
2. **Uncheck** the "Active" checkbox.
3. Click **Save**.

**Post-Deactivation Effects:**

* The user is immediately blocked from logging in.
* The user’s **License** is released for use by another person.
* All historical data created by the user is retained for reference.

---

## 5. Frequently Asked Questions (FAQ)

**Q: A user reports they can't log in and see a "Account Locked" message.**
A: This usually happens after too many failed password attempts. An administrator can unlock the account or reset the password from the user's detail page.

**Q: I get a "Username already exists" error when creating a new user.**
A: Usernames must be unique system-wide. Try adding a suffix or using the corporate email address as the username.

**Q: How do I import users in bulk?**
A: Please refer to the **Data Management > Data Import** section to learn how to use Excel/CSV templates for batch imports.
