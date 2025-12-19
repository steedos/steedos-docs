# Workflow Rules

:::info Learning Objectives

* Understand the core logic of automation: **IF (Condition) + THEN (Action)**.
* Learn how to create a rule: Automatically mark a contract as "High Priority" when the amount exceeds $1M.
* Master the three core actions: **Field Updates**, **Email Alerts**, and **Webhooks (for Slack/Teams/WeChat)**.
* Understand the difference between **Immediate Actions** and **Time-Dependent Actions** (e.g., triggering 3 days later).
:::

## What is a Workflow Rule?

Before automation, business operations relied on "manual monitoring":

> A salesperson, John, signs a big deal. He manually notifies his manager via message, manually updates the customer's status in the system, and has to remember to send a follow-up invoice 3 days later.

What if John forgets?

**Workflow Rules** act as the system's **"24-hour robot assistant."** Once you define the rules, the robot monitors every piece of data. As soon as a record meets the criteria, it gets to work automatically.

Its logic is simple, much like the popular IFTTT (If This Then That):

* **IF (Criteria)**: The "Contract Amount" is greater than $1,000,000.
* **THEN (Action)**: Automatically email the General Manager and change the Customer Level to "VIP."

---

## The Three Core Elements

Before configuring any rule, you only need to answer three questions:

1. **Object**: Who is this happening to? (Is it a Contract? A Leave Request?)
2. **Evaluation Criteria**: Under what conditions should it trigger? (Amount > $1M? Status = Rejected?)
3. **Action**: What should be done after it's triggered? (Send an email? Update a field? Send a webhook notification?)

---

## Practical Exercise: Automatic Marking of High-Value Contracts

**Scenario**: We need an automated rule. Whenever a salesperson creates or updates a contract with an amount exceeding **$1,000,000**, the system should automatically set the "Priority" field to **"High."**

### Step 1: Create a New Rule

1. Go to **Settings** -> **Automation** -> **Workflow Rules**.
2. Click **New**.
3. Select **Object**: `Contract`.

### Step 2: Configure Evaluation Criteria

This is the part that often confuses beginners. Please choose carefully:

* **Created**:
* Triggered only when the record is first created. Future edits won't trigger it again.


* **Created, and every time it's edited**:
* **Most Common**. Triggers whether the record is brand new or if someone changes a $500k amount to $1M later.


* **Created, and any time it's edited to subsequently meet criteria**:
* Triggers only at the "moment of transition" from not meeting the criteria to meeting them. Useful for "Notification" scenarios to avoid spamming emails every time a name is edited.



**For this example, choose: `Created, and every time it's edited`.**

### Step 3: Set Rule Criteria

Define what counts as a "Big Deal" for the robot.

* **Field**: `Contract: Amount`
* **Operator**: `greater than`
* **Value**: `1000000`

### Step 4: Add Action

The criteria are met; what's next?

1. In the "Immediate Workflow Actions" area, click **Add Workflow Action** -> **New Field Update**.
2. **Name**: `Update to High Priority`.
3. **Field to Update**: Select `Priority`.
4. **New Value**: Select `High`.
5. Click **Save**.

🎉 **Done!** Now try creating a contract for $2,000,000. After saving, you’ll see the "Priority" has been automatically set to "High."

---

## What Else Can the Robot Do? (Action Types)

Beyond "Field Updates," workflows can handle much more:

### 1. Email Alert

* **Scenario**: Remind a customer to renew 30 days before a contract expires.
* **Config**: You need to set up an "Email Template" first, then select recipients (can be a specific manager or the dynamic "Contract Owner").

### 2. Outbound Message (Webhook)

* **Scenario**: Push a notification to a **Slack** or **Discord** bot when a new order arrives.
* **Config**: Enter the external system's URL. Steedos will package the data details and send them over.

### 3. Time-Dependent Actions

This is one of the most powerful features—**"Setting a timer."**

* **Scenario**: Remind me **"7 days before the contract end date."**
* **How to configure**:
In the Workflow Rule page, you will see a **"Time Triggers"** section.
1. Add a Time Trigger: Select `Contract: End Date` -> `Before` -> `7 Days`.
2. Add an action under this trigger: Send an Email Alert.


* *The system will automatically check at that specific time. If the contract hasn't been renewed by then, the reminder will fire.*



---

## FAQ

**Q: I created a rule, but why didn't my old data change?**
A: Workflow rules are **event-driven**. They only run the moment data is **"Created"** or **"Saved."**

* If you want old data to be updated, you need to trigger a "Save" on those records (even a bulk edit without changing content will work).

**Q: Can rules conflict? (Infinite Loops)**
A: Yes.

* Example: Rule A says "Amount > $1M, set to VIP." Rule B says "For VIP customers, set Amount to $500k."
* This creates a loop. Always keep your logic clear to avoid "fights" between rules.

**Q: What is the execution order for multiple rules?**
A: The system does not guarantee a specific order. Avoid having two different rules modify the same field.

**Q: How do I temporarily stop a rule?**
A: In the rule list, uncheck the **"Active"** box. You don't need to delete the rule.
