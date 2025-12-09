---
title: Tabs
sidebar_position: 30
---

Tabs in Steedos applications serve as navigation elements, providing an intuitive way to access different objects, views, dashboards, or custom web pages. Here are the steps to create and manage tabs:

## Creating New Tabs

1. **Open Tab Settings**: In the "Settings" of the Steedos interface, search for and select "Tabs".

2. **Create New Tab**: Click the "New" button to create a new tab.

3. **Select Tab Type**: Choose the type of tab you want to create, such as an object tab, external link, or micro page.

4. **Configure Tab Properties**: Specify the label, color, and icon for the tab, as well as the associated object (if applicable).

5. **Set Tab Visibility**: Set the visibility of the tab based on user roles and permissions.

6. **Save and Test**: After configuring, save your settings and test the new tab's functionality within the application.

## Types of Tabs

### Object Tabs

For "Object" type tabs, you need to configure the associated object. When users click this tab in the top navigation, the object's homepage will be displayed.

### External Link Tabs

For "External Link" type tabs, you need to configure the URL to which it will redirect. Here you can enter a relevant address within the system or an absolute external address.

### Micro Page Tabs

When you want to display a developed page within the application, you need to configure this type of tab. However, this type of tab can only configure micro pages without parameters. If parameters are needed, you must use the external link tabs mentioned above.

## Tab Permissions

Tab permissions specify whether a tab is visible in the applications associated with the permission set.

- After a tab is created, by default, it is visible to all profiles/permission sets.
- Administrators can click the `Set Tab Permissions` button on the profile/permission set detail page to set tab permissions universally.
- Default on indicates visibility, default off indicates invisibility.
- Tab permissions use a cumulative permission rule; the permissions of the same tab in different permission sets accumulate. If one is set to default on, then the tab is visible.
