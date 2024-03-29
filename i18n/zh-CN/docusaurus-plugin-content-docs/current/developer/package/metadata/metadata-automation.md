---
title: 自动化元数据
---

## 概览

- 对象验证规则
- 工作流规则
- 字段更新
- 工作流通知
- 记录修改（创建、更新、删除）
- 批准过程
- Process
- Flow

### 对象验证规则 object_validation_rules

对象验证规则.validationRule.yml  
用于保存在对象上配置的验证规则，验证规则主要用于验证该对象的数据是否符合特定的规则。当用户对于对象的某个字段的更改不符合用户创建的验证规则时，用户输入的信息无法提交保存。

```yaml
name: test
active: true
description: 对象验证规则说明
error_condition_formula: 1==1
error_message: 错误消息提示
```

| 字段名 | 字段类型 | 字段含义 |
|----|----|----|
| name | text | 规则名 |
| object_name | master_detail | 所属对象 |
| active | boolean | 已启用 |
| description | textarea | 说明 |
| error_condition_formula | textarea | 错误条件公式 |
| error_message | textarea | 错误消息 |

### 工作流规则 workflow_rule

object_name.workflow.yml  
用于保存管理员在流程自动化配置中配置的工作流规则

```yaml
rules:
  - name: test
    active: true
    description: 描述信息
    formula: 1=1
    label: 测试工作流规则
    object_name: testobject__c
    trigger_type: onCreateOrTriggeringUpdate
    updates_field_actions: []
    workflow_notifications_actions: []
fieldUpdates: []
notifications: []
```

| 字段名 | 字段类型 | 字段含义 |
|----|----|----|
| object_name | lookup | 对象 |
| name | text | API 名称 |
| label | text | 显示名称 |
| active | boolean | 启用 |
| trigger_type | select | 评估条件 |
| formula | textarea | 公式 |
| updates_field_actions | lookup | 字段更新 |
| workflow_notifications_actions | lookup | 工作流通知 |
| description | textarea | 描述 |


### 字段更新 action_field_updates

object_name.workflow.yml   
用于保存管理员在流程自动化配置中配置的字段更新信息。

```yaml
fieldUpdates:
  - name: fieldupdate
    description: 描述
    field_name: name
    formula: '{ ''名称全称'' }'
    label: 字段更新测试
    object_name: testobject__c
    operation: formula
    reevaluate_on_change: true
    target_object: testobject__c
    undirect: true
```

| 字段名 | 字段类型 | 字段含义 |
|----|----|----|
| name |  text | API 名称 |
| label |  text | 显示名称 |
| object_name |  lookup | 对象 |
| target_object |  lookup | 要更新的对象 |
| field_name |  lookup | 要更新的字段 |
| operation |  lookup | 新字段值类型 |
| formula |  textarea | 公式 |
| literal_value |  text | 指定新字段值 |
| notify_assignee |  boolean | 通知被分配人(仅修改拥有者时由此选项) |
| description |  textarea | 描述 |
| reevaluate_on_change |  boolean | 字段更改后重新评估工作流规则 |
| undirect |  boolean | 触发对象触发器、工作流规则、字段验证规则 |

### 工作流通知 workflow_notifications

object_name.workflow.yml   
用于保存管理员在流程自动化配置中配置的工作流通知信息

```yaml
notifications:
  - name: worktalk
    assigned_user_field: []
    body: '{ ''哈哈哈哈'' }'
    label: 工作流通知测试
    object_name: testobject__c
    title: '{ ''标题公式'' }'
```

| 字段名 | 字段类型 | 字段含义 |
|----|----|----|
| name | text | API 名称 |
| label | text | 显示名称 |
| object_name | lookup | 对象 |
| title | textarea | 标题公式 |
| body | textarea | 正文公式 |
| assigned_users | lookup | 指定具体人员 |
| assigned_user_field | lookup | 指定对象上的用户字段 |

**注意：** 工作流规则、字段更新、工作流通知这三个元数据在同一个文件下！


### 批准过程 process_definition
用于保存管理员在设置应用中配置的批准过程信息。

```yaml
name: process_definition
label: Approval Processes
hidden: true
icon: approval
enable_inline_edit: false
```

| 字段名 | 字段类型 | 字段含义 |
|----|----|----|
| name | text | API 名称 |
| label | text | 显示名称 |
| object_name | lookup | 对象 |
| description | textarea | 描述 |
| order | number | 序号 |
| active | boolean | 启用 |
| entry_criteria | textarea | 指定条目条件 |
| record_editability | select | 记录可编辑性属性 |
| allow_recall | boolean | 允许提交人取消申请 |
| initial_submission_record_lock | select | 锁定记录 |
| initial_submission_updates_field_actions | lookup | 字段更新 |
| initial_submission_workflow_notifications_actions | lookup | 工作流通知 |
| final_approval_record_lock | select | 锁定记录 |
| final_approval_updates_field_actions | lookup | 字段更新 |
| final_approval_workflow_notifications_actions | lookup | 工作流通知 |
| final_rejection_record_lock | select | 锁定记录 |
| final_rejection_updates_field_actions | lookup | 字段更新 |
| final_rejection_workflow_notifications_actions | lookup | 工作流通知 |
| recall_record_lock | select | 锁定记录 |
| recall_updates_field_actions | lookup | 字段更新 |
| recall_workflow_notifications_actions | lookup | 工作流通知 |

| 权限属性 | user | admin |
|----|----|----|
| allowCreate | false | true |
| allowDelete | false | true |
| allowEdit | false | true |
| allowRead | true | true |
| modifyAllRecords | false | true |
| viewAllRecords | true | true |