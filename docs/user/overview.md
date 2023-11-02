---
sidebar_label: Overview
sidebar_position: 10
---

# Steedos User Guide

Steedos Platform is designed to empower users with a suite of tools that streamline the creation, management, and optimization of business applications. With its user-friendly interface and robust features, Steedos Platform enables you to harness the power of low-code development to drive innovation and efficiency within your organization.

## Overview

We are thrilled to have you on board and are committed to providing you with the tools and support you need to succeed. This user manual will guide you through the basics of the Steedos Platform, helping you get started with confidence and ease.

Let's embark on this journey together and unlock the full potential of low-code development with Steedos Platform!

### Basic Concepts and Terminology

- **Record**: A record is a unit of information stored in Steedos, such as a customer, contact, or sales opportunity.
- **Object**: An object is a container for records, defining the structure and behavior of the records. Standard objects include "Account," "Contact," and "Opportunity," and users can also create custom objects.
- **Field**: A field is an attribute within an object, used to store specific information, such as a customer's name or address.
- **List View**: A list view is a collection of records that allows users to filter and view records based on specific criteria.
- **Report**: A report is an analysis and summary of Steedos data, which can be displayed as charts or tables.
- **Dashboard**: A dashboard is a set of visual reports used to present key metrics and trends at a glance.

## Getting Started

### Login and Navigation
To start using the Steedos Platform, users need to visit the specific URL provided by their company and log in using the assigned username and password. After logging in, users will see the main interface and can access different modules and functions through the navigation bar.

### Personalizing the User Interface
Users can personalize the interface according to their preferences. This includes adjusting the home page layout, choosing items to display on the navigation bar, creating custom list views, etc.

### Managing Personal Information and Settings
Users can manage their personal information and settings by clicking on the profile icon in the top right corner of the screen. Here, users can update personal information, change passwords, set language and time zone, manage email settings, and more.

##  User Interface Tour

Upon logging into Steedos Platform, you will be greeted with an intuitive homepage that provides quick access to the most important information, including tasks, recently viewed records, and custom components. The navigation bar is located at the top of the page, offering access to different modules and applications. On the left is the App Launcher, allowing you to easily switch and access different applications. The footer at the bottom of the page provides additional resources and help links.

![Object Page](/../static/img/zh-CN/listviews.png)

## Data Management

### Browsing and Searching Records

Effectively browsing and searching records is a crucial part of daily work in the Steedos platform. Here is a detailed guide on how to browse and search records in Steedos:

#### Browsing Records

1. **Accessing Objects**: In Steedos, data is organized into different objects like "Contacts", "Accounts", and "Opportunities". To browse records of a specific object, select the respective object from the navigation menu.

2. **Using List Views**: Each object has one or more list views that display collections of records. You can use existing list views like "My Open Opportunities" or create custom views to display records that meet specific criteria.

![Scrolling Pagination](/../static/img/zh-CN/create_listviews.gif)

3. **Viewing Record Details**: By clicking on the name of a record, you can view its detailed information. On the detail page, you can see all the relevant fields and other records associated with it.

![](/../static/img/zh-CN/record_related.png)



#### Searching Records

1. **Using Quick Search**: Enter keywords in the search bar at the top of the page to quickly search the entire Steedos database. Global search returns all relevant records, including contacts, accounts, opportunities, etc.

2. **Using Advanced Search**: For more complex search needs, you can use the advanced search feature. This allows you to build detailed queries based on multiple criteria, such as finding all customers in a specific region with revenue exceeding a certain amount.

With these browsing and searching functionalities, Steedos users can quickly find the information they need, thus improving work efficiency and data management capabilities.

![](/../static/img/zh-CN/search_records.gif)

### Record Creation and Management

In Steedos Platform, records are the fundamental units for storing information, such as customer details, sales opportunities, or service cases. Each record belongs to a specific object, which is analogous to a table in a database.

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

### Attachments

If the attachment feature is enabled in object settings, users can add attachments to records.

Clicking "related" will show the attachment list of the current record.

* Multiple attachments can be added to a record.
* Attachments support version control, and the system will keep every version of the attachment for reference.

### Field History

If the "Track Field History" feature is enabled in the object, the system will automatically record the modification history of data in fields. Once this feature is enabled, when displaying object records, if the current user has the "modifyAllRecords" permission for the current object, the "Related Field History" will also be displayed, allowing you to view the field modification history of this record. Users without the "modifyAllRecords" permission will not see the "Related Field History" records.

![](/../static/img/zh-CN/audit_records.png)

For system administrators or other users set with `permission_sets = admin`, in Settings - Advanced - Field History, you can see the field modification history records of all objects that have enabled "Track Field History".

### Data Import and Export

Steedos Platform offers flexible data import and export capabilities to support bulk processing and migration of data.

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
