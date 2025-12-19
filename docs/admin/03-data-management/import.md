# Data Import

Steedos provides a powerful data import engine. To standardize data entry and simplify operations for end-users, Steedos utilizes a **"Predefined Import Template"** mechanism.

Administrators first configure "Object Import Settings" (including field mapping, uniqueness validation rules, etc.) in the backend. Users then simply select the prepared template and upload their Excel file, without needing to worry about complex field correlations.

---

## 1. Import Configuration (Admin Side)

Before users can perform an import, an administrator must create an import configuration.

### Accessing the Configuration

1. Click the **"⚙" (Settings)** icon in the top right to enter the Setup interface.
2. In the left sidebar, expand **"Advanced Settings"** and click **"Data Import"**.
3. Click the **"New"** button in the top right to define a new import rule.

### Basic Information

Fill in the following core parameters:

* **Description**: Give the configuration a clear name (e.g., "Customer Import - Standard Template") for users to identify.
* **Object**: Select the target object where the data will be stored (e.g., `Accounts`, `Contacts`).
* **Operation**: Define the data processing logic:
* **Insert**: Only insert new records.
* **Update**: Only update existing records (requires a uniqueness field).
* **Upsert**: The most common mode; updates existing records or inserts new ones if they don't exist.


* **Uniqueness Field**: Specify a field (e.g., "Employee ID," "Mobile," or "External ID") to serve as the basis for duplicate checking.

### Field Mapping

This is the most critical part of the configuration. Click **"+ New"** to define the relationship between Excel columns and database fields line by line.

| Configuration Item | Description |
| --- | --- |
| **Excel Header** | The exact column title in the first row of your Excel file (e.g., `Full Name`, `Mobile`). |
| **Object Field** | The corresponding field in the Steedos object (e.g., `name`, `mobile`). |
| **Related Key** | **(For Lookup/Master-Detail fields only)** <br/><br/> Specify which attribute in the related object matches the value in the Excel cell. |
| **Save Key if Failed** | **(Advanced)** <br/><br/> If checked, if the system cannot find a matching related record, it will save the raw Excel value to the database (used for fault tolerance). |
---

### 💡 Key Concept: Configuring Lookup Fields

When importing lookup fields (e.g., assigning a "Profile" to a "User"), the Excel file usually contains a **Name**, while the database stores an **ID**.

**Example Scenario**: The Excel has a "Position Level" column containing `Admin`, which needs to link to the `Profile` object.

1. **Object Field**: Select `Profile (profile)`.
2. **Related Key**: Enter `name`.
* *Meaning*: You are telling the system to take the value "Admin" from Excel and find the record in the `Profile` object where the `name` equals "Admin," then save that record's ID.


3. **Save Key if Failed**:
* *Unchecked*: If there is no profile named "Admin," the row will fail and return an error.
* *Checked*: Even if no match is found, the system will force the string "Admin" into the field (ensure the field allows non-ID values or use this for data cleansing).



---

## 2. Executing the Import (User Side)

Once configured, any user with "Create" permissions can execute the import.

### Steps

1. **Enter List View**: Navigate to the list view of the relevant object (e.g., "Contacts").
2. **Click Import**: Click the **"Import"** button in the top-right toolbar.
3. **Select Template**:
* Choose the predefined configuration created by the admin.
* Click **"Download Template"**: The system generates an empty Excel file with the correct headers based on the admin's configuration.


4. **Upload and Submit**:
* Fill in the data in the local Excel file.
* Upload the file and click **"Submit"**.



---

## 3. Results and Troubleshooting

Data is processed asynchronously in the background.

### Viewing Results

* **UI Notification**: Once finished, a notification will appear at the top of the page showing the count of successful and failed records.
* **Detailed Logs**:
1. Admins can return to **"Settings" > "Data Import"**.
2. Click the specific import record ID.
3. In the **"Import Details"** related list, you can see the processing result for every single row.



### Common Errors

If there are failed records, check the **"Error Message"** field:

| Error Type | Common Cause | Solution |
| --- | --- | --- |
| **Required field missing** | A mandatory field is empty. | Check if the Excel is missing required columns like Name or Status. |
| **Duplicate value** | Violation of uniqueness rules. | Check for duplicates in the file or change the operation to "Update/Upsert." |
| **Lookup validation failed** | Could not find the related record. | Ensure the name in Excel (e.g., Department name) matches the system record exactly (check for spaces). |
