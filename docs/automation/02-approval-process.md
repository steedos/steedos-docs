
# Approval Processes

:::info Learning Objectives

* Understand the difference between Workflow and Approval (Automation vs. Human Decision).
* **Key Prerequisite**: Learn how to qualify an object for the approval process.
* **Core Skill**: Configure a multi-level approval flow (e.g., Manager -> Director).
* **Advanced**: Master **Unanimous Approval** (voting) and **Reassignment**.
:::

## What is an Approval Process?

If a **Workflow** is like a fully automated vending machine (Insert coin -> Product drops), then an **Approval Process** is like a visa application requiring a stamp.

It defines the **routing map** for a record within the company:

1. **Submission**: Employee (e.g., John) clicks "Submit for Approval."
2. **Locking**: The record becomes read-only to prevent tampering during the process.
3. **Routing**: The system notifies John's manager, Lee.
4. **Decision**: Lee clicks "Approve" or "Reject."
5. **Result**: The record status changes, or it proceeds to the next level (e.g., the CEO) for final sign-off.

---

## Step 0: Enable Approval Capability (Crucial!)

In Steedos, not all objects are "approval-ready" by default. If you cannot find your object in the approval configuration interface, it is likely because this step was skipped.

1. Go to **Settings** -> **Object Settings**.
2. Select the object you want to approve (e.g., "Contracts").
3. Check the box **"Enable Instances" (显示审批单子表)**.
4. Click **Save**.

---

## Practical Exercise: Two-Level Contract Approval

**Scenario**:

* All contracts must first be approved by the **Department Manager**.
* If the amount exceeds **$50,000**, it requires a second approval by the **Finance Director**.
* Upon final approval, the status changes to "Approved"; if rejected, it changes to "Rejected."

### 1. Create the Process

1. Go to **Settings** -> **Automation** -> **Approval Processes**.
2. Select the **Manage Object**: `Contract`.
3. Click **New Approval Process**.
4. **Name**: `High-Value Contract Standard Approval`.

### 2. Set Entry Criteria

Which contracts are eligible for this process?

* Not every contract needs a formal review. For instance, only those in "Draft" status should be submitted.
* **Criteria**: `Contract: Status` equals `Draft`.

### 3. Define "Initial Submission Actions"

What happens the moment a user clicks the "Submit" button?

* **Record Lock**: The system locks the record by default. It is recommended to keep this enabled to prevent data changes during review.
* **Field Update**: Automatically change `Contract Status` to `In Approval`.

### 4. Define Approval Steps — **The Core Logic**

#### Step 1: Manager Approval

1. Click **New Approval Step**.
2. **Name**: `Step 1: Manager Approval`.
3. **Entry Criteria**: `All records enter this step` (since all contracts require manager review).
4. **Assign Approver**:
* Instead of picking a specific person, choose **"Related User"** -> `Contract Owner` -> `Manager`.
* *(Note: This assumes you have maintained the reporting structure in the User table.)*



#### Step 2: Finance Director Review

1. Click **New Approval Step**.
2. **Name**: `Step 2: Finance Director Review`.
3. **Entry Criteria**: Filter by amount.
* Select `Enter this step if the following criteria are met`.
* Criteria: `Contract: Amount` greater than `50,000`.
* *(Logic: If the amount is below $50k, the system skips this step and treats it as approved.)*


4. **Assign Approver**:
* Select **"Automatically assign to approver(s)"** -> Specify the Finance Director (e.g., `User: Alice`).



### 5. Define "Final Actions"

What is the "Grand Finale" once the process ends?

* **Final Approval Actions**:
* **Field Update**: Change `Contract Status` to `Approved`.
* **Record Unlock**: Allow for subsequent archiving or execution.


* **Final Rejection Actions**:
* **Field Update**: Change `Contract Status` to `Rejected`.
* **Record Unlock**: Allow the employee to modify and resubmit.



---

## Advanced: Unanimous vs. First-Response Approval

Sometimes, a step requires **multiple people** to review (e.g., Technical and Legal departments). When assigning to multiple users or a queue, you have two choices:

1. **First Response (First one to approve wins)**:
* **Scenario**: Anyone in the group can decide.
* **Logic**: If Legal has 3 staff members, the request goes to all 3. As soon as **any one** of them clicks "Approve," it moves to the next step.


2. **Unanimous (Everyone must approve)**:
* **Scenario**: Total consensus is required.
* **Logic**: All assigned approvers must click "Approve." If even **one** person clicks "Reject," the entire process is terminated.



---

## User Experience: How it Looks

Once configured, here is what changes for the user:

1. **Submission**: A **"Submit for Approval"** button appears at the top-right of the Contract detail page.
2. **Notification**: When it is Lee’s turn, he receives a notification (Bell icon/Email).
3. **Action Bar**: When Lee opens the contract, an action bar appears with:
* **Approve**
* **Reject**
* **Reassign**: Lee can delegate the decision to someone else (e.g., Wang).



---

## FAQ

**Q: Why is the "Submit for Approval" button missing or grayed out?**
A: Check the following:

1. Does the record meet the **Entry Criteria**? (e.g., you set it to "Draft" but tried to submit a "Signed" contract).
2. Does the user have permission to submit? (Usually, only the record owner can submit).
3. **Most common**: Did you forget to check "Enable Instances" in Step 0?

**Q: Can I recall a submission?**
A: Yes. As the submitter, if you realize you made a mistake, you can usually click **"Recall"** in the Approval History list before it is finalized. This unlocks the record.

**Q: Does a rejection go back one step or start over?**
A: This is configurable in the step settings.

* **Back to Previous Step**: Sends the request back to the previous approver (like ping-pong).
* **Back to Submitter**: Terminates the flow (Default behavior).
