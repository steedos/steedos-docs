---
title: User Guide
sidebar_position: 1
---

Introduction to the features of Steedos Platform.

## Overview of Steedos Platform Interface

### Navigation Menu

![Navigation](/../static/img/zh-CN/navigate.png)

1. Click to pop up the application grid, where you can switch to other applications.
2. Click on tabs to switch between objects and functions.
3. Company LOGO.
4. Access to help resources and training.
5. "Settings" menu, if you have administrative rights, you can customize Steedos Platform for your organization.
6. Notification alerts.
7. Access user-specific custom settings from your profile.

> If you can't find the app you want to enter, or there are no objects you want to see in the top object navigation, it could be due to permission configuration issues. Steedos Platform allows permission configurations at various levels - applications, objects, object list views, object records, each field in object records, etc., so different users can only see the data they are authorized to view.

**Object Page**

![Object Page](/../static/img/zh-CN/listviews.png)

1. Dropdown menu for list views under the current object. It lists only the list view options that the current user has permission to see. You can click to switch list views.
2. View mode switch: the current mode is grid mode; you can switch to column view mode (list on the left, details page on the right).
3. List view operation menu: allows for creating, copying, renaming, deleting, and setting sharing, filtering, sorting, and display columns for the list view.
4. Search menu: click to pop up a search area where you can search data based on fields.
5. Click to download data of the object list view.
6. Object data refresh button.
7. Data query search area.

**Detail Page**

![Detail Page](/../static/img/zh-CN/record_detail.png)

1. Icon and name of the object to which the current record belongs, as well as the name of the record.
2. Operation buttons such as edit, delete, etc., based on the current record, listing only the buttons that the current user has permission to operate.
3. Record detailed information, showing only the field information that the current user has permission to see.
4. Related lists associated with the current record, showing only the related lists that the current user has permission to see.

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
