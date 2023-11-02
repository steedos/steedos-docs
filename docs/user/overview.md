---
sidebar_label: Overview
sidebar_position: 10
---

# Steedos User Guide

## Overview

Welcome to Steedos Platform, the open-source alternative to Salesforce's low-code platform. Steedos Platform is designed to empower users with a suite of tools that streamline the creation, management, and optimization of business applications. With its user-friendly interface and robust features, Steedos Platform enables you to harness the power of low-code development to drive innovation and efficiency within your organization.

Steedos Platform is a comprehensive low-code development platform that allows users to build custom applications tailored to their unique business needs. It provides a flexible and intuitive environment for users to design, develop, and deploy applications with minimal coding required. Whether you're looking to manage customer relationships, streamline internal processes, or analyze data, Steedos Platform offers the versatility and scalability to meet your objectives.

We are thrilled to have you on board and are committed to providing you with the tools and support you need to succeed. This user manual will guide you through the basics of the Steedos Platform, helping you get started with confidence and ease.

Let's embark on this journey together and unlock the full potential of low-code development with Steedos Platform!

### Basic Concepts and Terminology

- **Record**: A record is a unit of information stored in Salesforce, such as a customer, contact, or sales opportunity.
- **Object**: An object is a container for records, defining the structure and behavior of the records. Standard objects include "Account," "Contact," and "Opportunity," and users can also create custom objects.
- **Field**: A field is an attribute within an object, used to store specific information, such as a customer's name or address.
- **List View**: A list view is a collection of records that allows users to filter and view records based on specific criteria.
- **Report**: A report is an analysis and summary of Salesforce data, which can be displayed as charts or tables.
- **Dashboard**: A dashboard is a set of visual reports used to present key metrics and trends at a glance.

## Getting Started

### Login and Navigation
To start using the Salesforce Platform, users need to visit the specific URL provided by their company and log in using the assigned username and password. After logging in, users will see the main interface and can access different modules and functions through the navigation bar.

### Personalizing the User Interface
Users can personalize the interface according to their preferences. This includes adjusting the home page layout, choosing items to display on the navigation bar, creating custom list views, etc.

### Managing Personal Information and Settings
Users can manage their personal information and settings by clicking on the profile icon in the top right corner of the screen. Here, users can update personal information, change passwords, set language and time zone, manage email settings, and more.

##  User Interface Tour

Upon logging into Steedos Platform, you will be greeted with an intuitive homepage that provides quick access to the most important information, including tasks, recently viewed records, and custom components. The navigation bar is located at the top of the page, offering access to different modules and applications. On the left is the App Launcher, allowing you to easily switch and access different applications. The footer at the bottom of the page provides additional resources and help links.

![Object Page](/../static/img/zh-CN/listviews.png)

## Data Management

### Browsing and Searching Records

Effectively browsing and searching records is a crucial part of daily work in the Salesforce platform. Here is a detailed guide on how to browse and search records in Salesforce:

#### Browsing Records

1. **Accessing Objects**: In Salesforce, data is organized into different objects like "Contacts", "Accounts", and "Opportunities". To browse records of a specific object, select the respective object from the navigation menu.

2. **Using List Views**: Each object has one or more list views that display collections of records. You can use existing list views like "My Open Opportunities" or create custom views to display records that meet specific criteria.

3. **Viewing Record Details**: By clicking on the name of a record, you can view its detailed information. On the detail page, you can see all the relevant fields and other records associated with it.

#### Searching Records

1. **Using Global Search**: Enter keywords in the search bar at the top of the page to quickly search the entire Salesforce database. Global search returns all relevant records, including contacts, accounts, opportunities, etc.

2. **Filtering Search Results**: After searching, you can further narrow down the results using filters. For example, you can filter by object type, creation date, or other custom criteria.

3. **Using Advanced Search**: For more complex search needs, you can use the advanced search feature. This allows you to build detailed queries based on multiple criteria, such as finding all customers in a specific region with revenue exceeding a certain amount.

With these browsing and searching functionalities, Salesforce users can quickly find the information they need, thus improving work efficiency and data management capabilities.


### Record Creation and Management

In Salesforce Platform, records are the fundamental units for storing information, such as customer details, sales opportunities, or service cases. Each record belongs to a specific object, which is analogous to a table in a database.

#### Creating Records
Creating a record is straightforward:
1. Select the object where you want to add a record from the navigation menu.
2. Click the "New" button on the object interface.
3. Fill in the necessary information in the pop-up form.
4. Click the "Save" button, and the new record will be added to the system.

#### Managing Records
Managing records is equally intuitive:
1. Use the search bar to quickly find specific records.
2. Refine search results with filters and sorting functions.
3. Select records for editing or deletion.
4. Batch operations allow you to perform actions on multiple records simultaneously, such as bulk deletion.

### Searching for Records

The system provides a simple and easy way to search for records, helping users to quickly retrieve business data. It also allows the extension of object search fields through "setting search items" to meet users' custom search needs.

![](/../static/img/zh-CN/search_records.gif)

> Why can't I find the data I want to see sometimes?
>
> * Please first check whether your search keywords are accurate.
> * You can only search for data you have permission to view. If you think you should see data but can't find it, you may also try contacting the administrator to check if there is a permissions configuration issue.

### Viewing Records

**Data Viewing**

On the record details interface, you can view detailed information about record data and related business objects. You can also perform operations such as editing and deleting. It should be noted that users can only view, edit, and delete related data within their permission scope. The menu at the top of the page allows you to view data records of other business objects related to it, such as viewing related payment list records for a contract, enabling users to penetrate directly from contract information to corresponding payment records.

![](/../static/img/zh-CN/record_related.png)

#### List View

The main interface of the object primarily displays the object list view, listing the values of multiple field records of various objects in a tabular form on the page.

You can click on the list view dropdown menu to switch and select which list view data you want to see. It also supports user-defined personalized list views on the front end.

![Scrolling Pagination](/../static/img/zh-CN/create_listviews.gif)

When there are many list data, users can set the number of items displayed per page at the top of the page. Steedos Platform uses a more user-friendly approach, allowing everyone to view list data more naturally.

### Data Creation

The "New" button in the upper right corner of the main object interface is used for creating object records. Clicking it will pop up a window to fill in record information.

### Data Editing

We have done a lot of work to enhance the user experience when editing data in Steedos Platform, supporting various record editing modes, especially greatly improving user operation efficiency in quick editing and batch editing records.

Generally, to edit a record, you can enter the record detail interface, where you can see the edit button in the upper right corner. Clicking it will pop up an editing window to modify record information.

You can also click the edit button in the dropdown menu on the right side of the record you want to edit in the list to pop up an editing window and modify record information.

In addition, we list the subtable information related to this business record directly under the record detail interface, where you can directly create or edit these related subtable records. For example, in the contract record detail interface, you can directly add or edit the payment records associated with this contract record.

### Data Deletion

Similar to editing records, you can usually find and click the delete button in the dropdown menu of each data in the object list interface, or enter the record detail interface and click the delete button in the upper right corner to perform the delete record operation.

Also, we provide a batch record deletion feature. In the object list view interface, after selecting multiple records, click the delete button on the page to perform batch operations on the data.

### Attachment Upload

If the attachment feature is enabled in object settings, users can add attachments to records.

Clicking "related" will show the attachment list of the current record.

* Multiple attachments can be added to a record.
* Attachments support version control, and the system will keep every version of the attachment for reference.

### Field History

If the "Track Field History" feature is enabled in the object, the system will automatically record the modification history of data in fields. Once this feature is enabled, when displaying object records, if the current user has the "modifyAllRecords" permission for the current object, the "Related Field History" will also be displayed, allowing you to view the field modification history of this record. Users without the "modifyAllRecords" permission will not see the "Related Field History" records.

![](/../static/img/zh-CN/audit_records.png)

For system administrators or other users set with `permission_sets = admin`, in Settings - Advanced - Field History, you can see the field modification history records of all objects that have enabled "Track Field History".

### Data Import and Export

Salesforce Platform offers flexible data import and export capabilities to support bulk processing and migration of data.

#### Data Import
1. Select the "Import" function on the object interface.
2. Upload a CSV file and match the columns in the CSV file with the object fields.
3. The system will validate the data and display a preview.
4. Once confirmed, click "Import" to complete the bulk addition of data.

#### Data Export
1. Select the "Export" function on the object interface.
2. Choose the records you wish to export.
3. Determine the fields and format for export.
4. Click "Export" to save the records as a CSV file.
