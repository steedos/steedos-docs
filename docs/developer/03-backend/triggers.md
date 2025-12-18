
# Object Triggers

In Steedos 3.0, developing triggers is more efficient than ever. You no longer need to deploy code files; you can write backend logic scripts directly within the **System UI**.

Triggers are primarily used for complex business requirements that go beyond standard workflows, such as cross-object data validation, cascading updates, or intercepting/filtering data during queries.

---

## 1. Trigger Types and Lifecycle

Steedos triggers are divided into **Before Events** and **After Events** based on when they execute relative to the database operation.

### A. Before Events (Interceptors)

Functions prefixed with `before` are used to intercept operations **before** they reach the database.

* **Purpose**: Validate user input, sanitize data, and enforce custom permission logic.
* **Error Handling**: If the code throws an error, the database operation is rolled back, and the error message is displayed directly on the frontend.
* **Events**:
* `beforeInsert`: Triggered before a new record is created.
* `beforeUpdate`: Triggered before an existing record is modified.
* `beforeDelete`: Triggered before a record is deleted (useful for preventing deletion of protected data).
* `beforeFind`: Triggered before a query is executed (useful for adding mandatory filters).



### B. After Events (Side Effects)

Functions prefixed with `after` are executed **after** the database operation has successfully completed.

* **Purpose**: Execute associated tasks such as sending notifications, updating related records, or logging audit trails.
* **Events**:
* `afterInsert`: Triggered after a record is successfully created.
* `afterUpdate`: Triggered after a record is successfully modified.
* `afterDelete`: Triggered after a record is deleted.



---

## 2. Managing Triggers

Administrators can manage triggers directly within the **Object Setup** interface.

### Access Path

1. Click the **Settings (Gear Icon)** in the top right.
2. Navigate to **Object Settings** -> **Objects**.
3. Select the object you want to configure (e.g., "Contracts").
4. In the object detail page, find the **Object Triggers** sub-tab. Here you can create, edit, or delete triggers.

---

## 3. Creating a Trigger

### Configuration Steps

1. Click **New** in the Object Triggers list.
2. Fill in the basic information:
* **API Name**: Unique identifier (e.g., `validate_amount`).
* **Enabled**: Check this to make the trigger active immediately.
* **Events**: Select the timing (e.g., `beforeInsert`, `afterUpdate`).


3. **Code Content**: Enter your JavaScript logic in the script editor.
4. Click **Save**.

---

## 4. Coding Guide

Steedos automatically injects context variables like `ctx`, `global`, and `objects` into the script environment.

### 4.1 The `ctx` Context

`ctx` contains all relevant information about the current request.

#### `ctx.params` (Common Variables)

Use `const { doc, previousDoc } = ctx.params` to access data changes:

| Variable | Type | Description |
| --- | --- | --- |
| **isInsert / isUpdate** | Boolean | Identifies the operation type. |
| **isDelete / isFind** | Boolean | Identifies the operation type. |
| **isBefore / isAfter** | Boolean | Identifies if the trigger is running before or after the DB operation. |
| **doc** | JSON | **New Data**. The record being created or the fields being updated. |
| **previousDoc** | JSON | **Old Data**. The original record (available in update/delete). |
| **id** | String | The unique ID of the record. |
| **query** | JSON | The query criteria (available only in `beforeFind`). |
| **data** | Array | The result set (available only in `afterFind`). |

#### `ctx` Methods

* **`ctx.getObject(objectName)`**: Returns an object instance for CRUD operations.
* **`ctx.broker`**: The Moleculer Broker instance used to call other microservice actions.

---

## 5. Practical Example: Amount Validation

**Requirement**: When creating a "Payment," validate that the payment amount does not exceed the total amount of the associated "Contract."

* **Object**: Payments (`payments`)
* **Events**: `beforeInsert`, `beforeUpdate`

**Code Implementation**:

```javascript
// 1. Get the current document from params
const { doc } = ctx.params;
const { amount, contractId } = doc;

// 2. Skip if no contract is linked
if (!contractId) return;

// 3. Fetch the associated contract record
const contractsObj = ctx.getObject("contracts");
const contractDoc = await contractsObj.findOne(contractId);

if (!contractDoc) {
    throw new Error("Associated contract not found.");
}

// 4. Validation logic
if (amount > contractDoc.amount) {
    // 5. Throwing an error stops the save and alerts the user
    throw new Error("Payment amount cannot exceed the Contract total.");
}

```

---

## 6. Debugging

You can use standard `console.log` for debugging. Output will appear in the Steedos service backend logs (Docker logs or PM2 logs).

```javascript
console.log("Trigger executing for record:", ctx.params.id);

```