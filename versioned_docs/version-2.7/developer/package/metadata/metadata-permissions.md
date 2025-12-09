---
title: Permission Metadata
---

Define metadata related to permissions.

## Profile .profile.yml

The profile only specifies a name. After defining the profile, you can define the access rights of this profile to specific objects in object permissions.

A user can only belong to one profile. The metadata cannot specify the specific profile of a specific user. System administrators can set the user's profile in the user management interface.

The system has 4 default profiles:

* admin: System administrator, by default has the highest permissions for all objects
* user: Regular users, usually have create, delete, and modify permissions for most objects
* customer: External customer, by default has no permissions
* supplier: External supplier, by default has no permissions

```yaml
name: user
license: platform
```

| Property Name | Type | Meaning |
|----|----|----|
| name | text | API name |
| label | text | Display name |
| type | select | Category |
| license | lookup | License |
| assigned_apps | lookup | Authorized applications |
| users | lookup | Members |
| is_system | boolean | System |
| password_history | lookup | Enforce password history |
| max_login_attempts | select | Maximum invalid login attempts |
| lockout_interval | select | Lockout duration |
| enable_MFA | boolean | Multi-factor authentication (requires SMS service activation) |
| logout_other_clients | boolean | Singleton login |
| login_expiration_in_days | number | Login expiration time (days) |
| phone_logout_other_clients | boolean | Mobile App Singleton Login |
| phone_login_expiration_in_days | number | Mobile App Login expiration time (days) |

Supplementary Note:

[...details of the properties as translated above...]

## Permission Set .permissionset.yml

The permission set only specifies a name. After defining the permission set, you can define the access rights of this permission set to specific objects in object permissions.

A user can have multiple permission sets, with the final rights being the result of an overlay.

The metadata has not stipulated the permission set and has not been bound to a specific user. System administrators can configure the list of users applicable to this permission set in the settings interface.

```yaml
name: contract_manager
label: Contract Manager
type: permission_set
```

The system has 2 default permission sets:

* organization_admin: Branch administrator, used to additionally increase permissions for branch administrators.
* workflow_admin: Workflow administrator, used to additionally increase permissions for workflow administrators.

Because a profile is a special type of permission set, they have the same metadata model, and are identified as belonging to the profile or ordinary permission set through the `type` attribute. The following table describes which metadata properties belong to which permission set,
| Attribute Name | Profile | Permission Set | Attribute Meaning |
|----|----|----|----|
| name | Y | Y | API Name |
| label | Y | Y | Display Name |
| type | Y | Y | Category |
| license | Y | Y | License |
| assigned_apps | Y | Y | Authorized Apps |
| users | Y | Y | Members |
| is_system | Y | Y | System |
| password_history | Y | N | Enforce Password History |
| max_login_attempts | Y | N | Max Invalid Login Attempts |
| lockout_interval | Y | N | Lockout Duration |
| login_expiration_in_days | Y | N | Login Expiry Time |
| phone_login_expiration_in_days | Y | N | Mobile App Login Expiry Time |
| logout_other_clients | Y | N | Singleton Login |
| phone_logout_other_clients | Y | N | Mobile App Singleton Login |
| enable_MFA | Y | N | Multi-factor Authentication |

## Object Permissions .permission.yml

Set the access permissions for a particular profile (or permission set) to the current object.

```yaml
name: Contract.User
allowCreate: true
allowDelete: true
allowEdit: true
allowRead: true
modifyAllRecords: false
modifyCompanyRecords: false
permission_set_id: user
viewAllRecords: false
viewCompanyRecords: false
```

| Attribute Name | Attribute Type | Attribute Meaning |
|----|----|----|
| name | formula | Name |
| permission_set_id | master_detail | Permission Set |
| object_name | lookup | Object |
| allowRead | boolean | Allow Viewing |
| allowCreate | boolean | Allow Creation |
| allowEdit | boolean | Allow Editing |
| allowDelete | boolean | Allow Deletion |
| viewAllRecords | boolean | View All Records |
| modifyAllRecords | boolean | Modify All Records |
| viewCompanyRecords | boolean | View Current Branch |
| modifyCompanyRecords | boolean | Modify Current Branch |
| viewAssignCompanysRecords | lookup | View Specified Branch |
| modifyAssignCompanysRecords | lookup | Modify Specified Branch |
| allowReadFiles | boolean | Allow Viewing Attachments |
| allowCreateFiles | boolean | Allow Creating Attachments |
| allowEditFiles | boolean | Allow Editing Attachments |
| allowDeleteFiles | boolean | Allow Deleting Attachments |
| viewAllFiles | boolean | View All Attachments |
| modifyAllFiles | boolean | Modify All Attachments |
| disabled_list_views | lookup | Disable List View |
| disabled_actions | lookup | Disable Actions |
| unreadable_fields | lookup | Invisible Fields |
| uneditable_fields | lookup | Non-editable Fields |
| unrelated_objects | lookup | Disable Related Objects |
| is_system | boolean | System |

## Field Permissions .permission.yml

Set the access permissions for a specific profile (or permission set) to the fields of the current object. It shares the configuration file with object permissions. The related configurations are saved in the `field_permissions` attribute.

```yaml
name: Contract.User
allowCreate: true
allowDelete: true
allowEdit: true
allowRead: true
modifyAllRecords: false
modifyCompanyRecords: false
permission_set_id: user
viewAllRecords: false
viewCompanyRecords: false
field_permissions:
  - field: name
    readable: true
    editable: true
  - field: owner
    readable: false
    editable: true
  - field: created
    readable: true
    editable: false
  - field: created_by
    readable: true
    editable: false
  - field: modified
    readable: true
    editable: false
  - field: modified_by
    readable: true
    editable: false
  - field: locked
    readable: false
    editable: false
  - field: company_id
    readable: false
    editable: false
  - field: company_ids
    readable: false
    editable: false
  - field: instance_state
    readable: false
    editable: false
  - field: amount__c
    readable: true
    editable: true
```

| Attribute Name | Attribute Type | Attribute Meaning |
|----|----|----|
| name | text | Api Name |
| permission_set_id | lookup | Permission Set |
| permission_object | master_detail | Object Permission |
| object_name | lookup | Object |
| field | lookup | Field |
| readable | boolean | Allow Viewing |
| editable | boolean | Allow Editing |
| is_system | boolean | System |

## Restriction Rules .restrictionRule.yml

Configure restriction rules on the object to shrink users' record-level view permissions on business objects. Records that meet this filter condition are always prohibited from being viewed by users. This rule is not configured based on the profile (or permission set), but it can judge the profile (or permission set) to which the current user belongs in the specified entry criteria.

```yaml
name: test
entry_criteria: '{{$user.roles.indexOf("salesman") > -1}}'
object_name: contracts__c
record_filter: '{{[["profile__c", "=", "customer"], "or", ["owner", "=", $user.userId]]}}'
```

| Attribute Name | Attribute Type | Attribute Meaning |
|----|----|----|
| name | text | Api Name |
| object_name | lookup | Object |
| active | boolean | Active |
| entry_criteria | textarea | Specified Entry Criteria |
| record_filter | textarea | Record Filter |
| description | textarea | Description |
| is_system | boolean | System |

## Sharing Rules .shareRule.yml

Configure sharing rules on the object to expand users' record-level view permissions on business objects. Records that meet this rule are always viewable by users. This rule is not configured based on the profile (or permission set), but it can judge the profile (or permission set) to which the current user belongs in the specified entry criteria.

```yaml
name: test
active: true
entry_criteria: '{{$user.roles.indexOf("salesman") > -1}}'
object_name: contracts__c
record_filter: '{{[["company_id", "=", $user.company_id],["profile__c", "=", "customer"]]}}'
```

| Attribute Name | Attribute Type | Attribute Meaning |
|----|----|----|
| name | text | Api Name |
| object_name | lookup | Object |
| active | boolean | Active |
| entry_criteria | textarea | Specified Entry Criteria |
| record_filter | textarea | Record Filter |
| description | textarea | Description |
| is_system | boolean | System |
