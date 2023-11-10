---
title: Custom Objects
sidebar_position: 1
---

Building applications on the Steedos platform often requires the creation of one or more custom objects to store all necessary business data. Custom objects can be considered as tables in a database, containing a series of fields where you can store data.

## Creating Custom Objects

Creating custom objects is the first step in defining the data model for your application. Below are the steps to create a custom object:

1. **Enter Settings**: Log in to your Steedos account and click the gear icon in the upper right corner to access "Settings".

2. **Object Management**: In the settings menu, select "Object Management" and click on "Objects".

3. **Create New Object**: Start the creation process by clicking the "New Object" button on the page.

4. **Define Object Properties**:
   - **Label**: Enter the display name of the object.
   - **Object Name**: Enter the unique name of the object, which will be used for APIs and development.
   - **Record Name**: Specify the name field and format (text or auto-number) for the record.
   - **Description**: Enter a description to explain the purpose and content of the object.

5. **Add Fields and Relationships**:
   - After saving the object definition, add fields to store the data for records.
   - Create relationship fields as needed to link to records of other objects.

6. **Configure Page Layouts**:
   - Define the view and edit page layouts for records.
   - Select the fields and related lists to be included in the page layouts.

7. **Set Security**:
   - Determine which user profiles can access the new object.
   - Set field-level security to control access to specific fields.

8. **Save and Test**:
   - Save your custom object.
   - Create, view, and edit records in the application to test the object's configuration.

9. **Review and Adjust**:
   - Make necessary adjustments to the object based on test results and user feedback.
   - Ensure the object meets the needs of business processes.

By following these steps, you can successfully create custom objects in Steedos and use them as the foundation for building powerful business applications.


## Object Properties

Property | Description
-- | --
Data Source | The data for this object will be saved to the specified data source; the default data source uses the MongoDB database.
Display Name | This name will be displayed in the interface to represent the object.
API Name | A unique identifier for the field, can only contain lowercase letters and numbers, must start with a letter, and cannot end with an underscore or contain two consecutive underscore characters.
Icon | Choose an appropriate icon for your object.
Development Status | The development status of this object, "In Development" objects are only accessible to administrators, once the object's related functions are ready, you should set it to "Deployed".
Remarks | Enter a description for this object.
External Data Source | Reference data from a third-party database.
Allow Attachments | This object can have attachments uploaded.
Allow Tasks | Business data in this object can have tasks added.
Allow Notes | Business data in this object can have notes added.
Allow Events | Business data in this object can have events added.
Allow Object Process Configuration | Only business objects with this feature enabled will be displayed in the object process configuration menu.
Allow Viewing Applications | Business data in this object can be approved.
Track Field History | When this feature is enabled, the system will automatically record the modification history of this field.
Enable Tree Structure for Record Display | When enabled, the lookup fields associated with this object will display their options in a tree structure.
Enable Popup Window Lookup Mode | When enabled, the lookup fields associated with this object will display their options in a popup window.

:::tip
The record field history feature requires a professional license to use.
:::
