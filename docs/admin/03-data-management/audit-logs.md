
# Audit Logs and History Tracking

To meet enterprise compliance requirements—such as audit trails and accountability—Steedos provides a robust "Safety Net" mechanism. Administrators can track **who** modified **what** data and **when**, including a side-by-side comparison of old and new values.

The Steedos audit system is divided into two primary categories:

1. **Field History Tracking**: Records changes to business data (e.g., a Contract Amount changing from $100k to $200k).
2. **System Audit Logs**: Records logins and sensitive administrative actions (e.g., who exported data or who modified permissions).

---

## 1. Field History Tracking

This is the most frequently used audit feature, allowing you to track the lifecycle of a specific business record.

### 1.1 Enabling Tracking

By default, field history is disabled to optimize storage performance. Administrators must explicitly configure which fields to track.

1. **Enter Object Setup**:
* Go to **Settings** > **Object Settings**.
* Select the object you want to track (e.g., **Contract**).


2. **Enable History Tracking**:
* In the object's basic properties, check the **Track History** box.


3. **Select Fields to Track**:
* Navigate to the **Fields** tab of that object.
* Click the **Set History Tracking** button in the top right.
* Select the sensitive or critical fields you wish to monitor.
* *Recommended*: Amount, Status, Owner, Due Date.
* *Not Recommended*: Long Text descriptions, formula fields (usually non-trackable), or high-frequency non-essential fields.





### 1.2 Viewing History Records

Once configured, the system automatically logs changes in the background. To make these visible to end-users, you must add the history list to the page layout.

1. **Adjust Page Layout**:
* In Object Settings, click **Page Layouts**.
* In the **Related Lists** section, drag **Contract History** onto the page.


2. **User Experience**:
* Open any contract record. In the "History" related list at the bottom, you will see:
* **Date**: 2023-10-01 10:00
* **User**: John Doe
* **Action**: Changed **Amount** from `$10,000` to `$20,000`.





:::warning Data Integrity
Audit logs are **read-only**. Even administrators cannot modify historical audit records, ensuring the impartiality and legal validity of the audit trail.
:::

---

## 2. Login Audit Logs

Administrators need to monitor system access security to detect abnormal login behavior.

### Viewing Login History

1. Go to **Settings** > **Organization** > **Users**.
2. Click on a specific user (e.g., Admin).
3. In the **Login History** related list, you can view:
* **Login Time**
* **Source IP Address**
* **Login Status** (Success, Invalid Password, Restricted IP, etc.)
* **Browser/Device Info**



> **Security Scenario**: If an account shows frequent failed login attempts from an unknown overseas IP at midnight, the administrator should immediately freeze the account and force a password reset.

---

## 3. Best Practices

### 3.1 Tracking Strategy

Do not track every single field.

* **Performance**: While Steedos is highly scalable, tracking meaningless changes (like punctuation in a "Notes" field) consumes database storage and clutters the audit view.
* **Compliance**: Focus your tracking on **"Money, Power, and Status"**—any field that impacts financial totals, ownership, or business stages.

### 3.2 Data Retention

Audit logs grow over time and can become massive.

* **Recommendation**: Periodically (e.g., annually) use the **Data Export** tool to back up audit records older than two years to cold storage, then purge them from the production database to maintain system agility.

### 3.3 Audit vs. Access Logs

Field History Tracking records **what was changed**. If your requirement is to know "Who viewed this data without changing it," that falls under **Access Logs**.

* Access logs generate significantly more data than audit logs. These are usually handled at the infrastructure level (e.g., MongoDB logs or middleware) rather than the application UI unless strictly required by high-security regulations.
