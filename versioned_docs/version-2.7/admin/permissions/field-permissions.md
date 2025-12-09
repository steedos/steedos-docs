---
sidebar_position: 6
---

# Field Permissions

Field permissions specify the access level for each field in an object. 

## What Determines Field Access?

Several factors control whether users can view and edit specific fields in Steedos. You can control users’ access to fields at the record type, user, or field level.

- Field-level security—Further restrict users’ access to fields by setting whether those fields are visible, editable, or read only. These settings override field properties set in the page layout if the field-level security setting is more restrictive.
- Permissions—Some user permissions override field-level security settings. For example, users with the “Edit Read Only Fields” permission can always edit read-only fields regardless of any other settings.
- Lookup and system fields—If you enable the Require permission to view record names in lookup fields setting, you restrict who can view record names in lookup and system fields. Users must have Read access to these records or the View All Lookup Record Names permission to view this data.

## Field-Level Security

Field-level security settings let you restrict users’ access to view and edit specific fields.

Field-level security settings determine which fields a user sees. The most restrictive field access settings of the two always applies. For example, you can have a field that’s required in a page layout but is read-only in the field-level security settings. The field-level security overrides the page layout, so the field remains read-only.

