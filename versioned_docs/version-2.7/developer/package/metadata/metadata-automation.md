---
title: Automation Metadata
---

## Overview

Define metadata related to process automation

- Object Validation Rules
- Workflow Rules
- Field Updates
- Workflow Notifications
- Record Modifications (Create, Update, Delete)
- Approval Processes
- Process
- Flow

### Object Validation Rules `object_validation_rules`

object_validation_rules.validationRule.yml  
Used for storing validation rules configured on the object. The validation rules are mainly used to verify whether the object data meets specific rules. When a user's modification to a field of the object does not meet the validation rules created by the user, the user's input cannot be saved.

```yaml
name: test
active: true
description: Description for object validation rules
error_condition_formula: 1==1
error_message: Error message prompt
```

| Field Name | Field Type | Field Meaning |
|----|----|----|
| name | text | Rule Name |
| object_name | master_detail | Belonging Object |
| active | boolean | Enabled |
| description | textarea | Description |
| error_condition_formula | textarea | Error Condition Formula |
| error_message | textarea | Error Message |

### Workflow Rules `workflow_rule`

object_name.workflow.yml  
Used for storing workflow rules configured by administrators in the process automation settings.

```yaml
rules:
  - name: test
    active: true
    description: Description information
    formula: 1=1
    label: Test Workflow Rule
    object_name: testobject__c
    trigger_type: onCreateOrTriggeringUpdate
    updates_field_actions: []
    workflow_notifications_actions: []
fieldUpdates: []
notifications: []
```

| Field Name | Field Type | Field Meaning |
|----|----|----|
| object_name | lookup | Object |
| name | text | API Name |
| label | text | Display Name |
| active | boolean | Enabled |
| trigger_type | select | Evaluation Condition |
| formula | textarea | Formula |
| updates_field_actions | lookup | Field Updates |
| workflow_notifications_actions | lookup | Workflow Notifications |
| description | textarea | Description |

### Field Updates `action_field_updates`

object_name.workflow.yml  
Used to store field update information configured by administrators in the process automation settings.

```yaml
fieldUpdates:
  - name: fieldupdate
    description: Description
    field_name: name
    formula: '{ ''Full Name'' }'
    label: Field Update Test
    object_name: testobject__c
    operation: formula
    reevaluate_on_change: true
    target_object: testobject__c
    undirect: true
```

| Field Name | Field Type | Field Meaning |
|----|----|----|
| name |  text | API Name |
| label |  text | Display Name |
| object_name |  lookup | Object |
| target_object |  lookup | Object to be Updated |
| field_name |  lookup | Field to be Updated |
| operation |  lookup | Type of New Field Value |
| formula |  textarea | Formula |
| literal_value |  text | Specified New Field Value |
| notify_assignee |  boolean | Notify Assignee (only when modifying owner) |
| description |  textarea | Description |
| reevaluate_on_change |  boolean | Re-evaluate Workflow Rules after Field Change |
| undirect |  boolean | Trigger Object Triggers, Workflow Rules, Field Validation Rules |

### Workflow Notifications `workflow_notifications`

object_name.workflow.yml  
Used to store workflow notification information configured by administrators in the process automation settings.

```yaml
notifications:
  - name: worktalk
    assigned_user_field: []
    body: '{ ''Hahaha'' }'
    label: Workflow Notification Test
    object_name: testobject__c
    title: '{ ''Title Formula'' }'
```

| Field Name | Field Type | Field Meaning |
|----|----|----|
| name | text | API Name |
| label | text | Display Name |
| object_name | lookup | Object |
| title | textarea | Title Formula |
| body | textarea | Body Formula |
| assigned_users | lookup | Specify Specific Users |
| assigned_user_field | lookup | Specify User Field on the Object |

**Note:** The Workflow Rules, Field Updates, and Workflow Notifications are in the same file!

### Approval Processes `process_definition`
Used for storing the approval process information configured by administrators in the application settings.

```yaml
name: process_definition
label: Approval Processes
hidden: true
icon: approval
enable_inline_edit: false
```

| Field Name | Field Type | Field Meaning |
|----|----|----|
| name | text | API Name |
| label | text | Display Name |
| object_name | lookup | Object |
| description | textarea | Description |
| order | number | Serial Number |
| active | boolean | Enabled |
| entry_criteria | textarea | Specified Entry Conditions |
| record_editability | select | Record Editability Property |
| allow_recall | boolean | Allow Submitter to Cancel Application |
| initial_submission_record_lock | select | Lock Record |
| initial_submission_updates_field_actions | lookup | Field Updates |
| initial_submission_workflow_notifications_actions | lookup | Workflow Notifications |
| final_approval_record_lock | select | Lock Record |
| final_approval_updates_field_actions | lookup | Field Updates |
| final_approval_workflow_notifications_actions | lookup | Workflow Notifications |
| final_rejection_record_lock | select | Lock Record |
| final_rejection_updates_field_actions | lookup | Field Updates |
| final_rejection_workflow_notifications_actions | lookup | Workflow Notifications |
| recall_record_lock | select | Lock Record |
| recall_updates_field_actions | lookup | Field Updates |
| recall_workflow_notifications_actions | lookup | Workflow Notifications |

| Permission Attributes | user | admin |
|----|----|----|
| allowCreate | false | true |
| allowDelete | false | true |
| allowEdit | false | true |
| allowRead | true | true |
| modifyAllRecords | false | true |
| viewAllRecords | true | true |
