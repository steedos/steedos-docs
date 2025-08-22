---
title: 界面元数据
---

## 概览

- 应用
- 选项卡
- 列表视图
- 自定义按钮

## 应用
应用.app.yml  
可以设置应用的名称、显示名称、应用图标，以及在应用中显示的对象、选项卡清单。
```yaml
name: 合同
code: contracts
description: 管理合同及收付款。
icon_slds: contract_line_item
mobile: true
mobile_objects:
    - contracts
    - finance_invoice
    - finance_receive
    - finance_receipt
    - finance_payment
    - contract_types
oauth2_enabled: false
oauth2_logout_enabled: false
objects:
    - contracts
    - finance_invoice
    - finance_receive
    - finance_receipt
    - finance_payment
    - contract_types
saml_enabled: false
saml_logout_enabled: false
sort: 50
tabs:
    - contract_analysis
visible: true
```

| 属性名 | 属性类型 | 属性含义 |
|----|----|----|
| name | text | 名称 |
| code | text | API 名称 |
| icon_slds | lookup | 图标 |
| visible | boolean | 启用 |
| description | textarea | 描述 |
| tabs | lookup | 选项卡 |
| objects | lookup | 桌面主菜单 |
| mobile_objects | lookup | 手机主菜单 |
| is_creator | boolean | 显示在桌面菜单中 |
| mobile | boolean | 显示在手机菜单中 |
| icon | text | 旧版图标 |
| sort | number | 排序 |
| url | url | 外部链接 |
| is_use_ie | boolean | 使用IE打开(需使用Steedos桌面客户端) |
| is_use_iframe | boolean | 使用iframe打开 |
| is_new_window | boolean | 在新窗口打开 |
| on_click | textarea | 链接脚本 |
| auth_name | text | 验证域名 |
| secret | text | API 密钥 |
| oauth2_enabled | boolean | 启用 OAuth2 |
| oauth2_callback_url | text | 回调 URL |
| oauth2_scopes | select | 范围 |
| oauth2_logout_enabled | boolean | 启用单点注销 |
| oauth2_logout_url | url | 单点注销 URL |
| oauth2_home_url | url | 应用首页 |
| oauth2_logo | image | 应用 Logo |
| oauth2_client_secret | text | 应用密钥 |
| saml_enabled | boolean | 启用 SAML |
| saml_entity_id | text | Entity Id |
| saml_issuer | text | Issuer |
| saml_idp_cert | text | IDP Cert |
| saml_acs_url | url | ACS Url |
| saml_name_id_format | text | 名称 |
| saml_logout_enabled | boolean | 启用单点注销 |
| saml_logout_url | url | 单点注销 URL |
| saml_logout_block | select | 单点注销绑定 |
| is_system | boolean | 系统 |
| from_code_id | text | from_code_id |


## 选项卡
选项卡.tab.yml  
选项卡可以绑定到一个对象，也可以绑定到一个网址或是自定义页面。
```yaml
name: contract_analysis
desktop: true
icon: dashboard
label: 合同分析
mobile: true
page: contract_analysis
type: page
```

| 属性名 | 属性类型 | 属性含义 |
|----|----|----|
| label | text | 显示名称 |
| name | text | API 名称 |
| icon | lookup | 图标 |
| parent | lookup | 上级选项卡 |
| type | select | 类型 |
| mobile | boolean | 显示在手机菜单中 |
| desktop | boolean | 显示在桌面菜单中 |
| frame_height | number | 选项卡框架的高度 |
| has_sidebar | boolean | 显示侧边栏面板 |
| object | lookup | 对象 |
| url | url | 外部链接 |
| is_new_window | boolean | 在新窗口打开 |
| page | lookup | 页面 |
| action_overrides | text | 分配给选项卡的操作替代列表 |
| description | textarea | 描述 |
| is_system | boolean | 系统 |

## 列表视图
列表视图.listview.yml    
定义对象的列表显示，包括：显示的列、过滤条件、排序规则、默认搜索字段。
```yaml
name: all
label: 所有合同
columns:
  - field: 'no'
    width: '150'
    wrap: true
  - field: name
    width: '220'
    wrap: true
  - field: contract_type
    width: '150'
    wrap: true
  - field: amount
    width: '150'
    wrap: true
  - field: signed_date
    width: '150'
    wrap: false
  - field: owner
    width: '150'
    wrap: false
  - field: created
    width: '150'
    wrap: false
filter_fields:
  - contract_type
  - signed_date
  - othercompany
  - instance_state
  - owner
filter_scope: space
filters:
  - is_default: true
    field: instance_state
    operation: <>
    value:
      - terminated
    is_required: false
shared: true
show_count: false
sort:
  - field_name: 'no'
    order: desc
```

| 属性名 | 属性类型 | 属性含义 |
|----|----|----|
| label | text | 显示名称 |
| name | text | API 名称 |
| object_name | master_detail | 对象 |
| filter_scope | lookup | 过滤范围 |
| shared | boolean | 共享视图到工作区 |
| show_count | boolean | 显示条目数 |
| type | select | 视图类型 |
| scrolling_mode | select | 滚动条样式 |
| columns | grid | 显示的列 |
| columns.$ | object | 显示的列 |
| columns.$.field | lookup | 字段 |
| columns.$.width | text | 宽度 |
| filter_fields | lookup | 默认过滤字段 |
| sort | grid | 默认排序规则 |
| sort.$ | object | Order |
| sort.$.field_name | lookup | 排序字段 |
| sort.$.order | select | 排序方式 |
| filters | grid | 过滤器 |
| filters.$ | object | Filter |
| filters.$.field | lookup | 字段 |
| filters.$.operation | lookup | 运算符 |
| filters.$.value |  | 值 |
| filter_logic | text | 过滤逻辑 |
| mobile_columns | grid | 手机端显示的列 |
| mobile_columns.$ | object | 手机端显示的列 |
| mobile_columns.$.field | lookup | 字段 |
| sort_no | number | 排序号 |


## 自定义按钮
自定义按钮分为 按钮.button.js 和 按钮.button.yml 两个文件。
```
buttons
├── 按钮.button.js
└── 按钮.button.yml
```
示例：详细记录页”确认“按钮，在指定条件下显示此按钮，点击此按钮新建指定对象的一条记录。  
sure.button.js 文件  
```
module.exports = {
    sure: function(object_name, record_id) {
        var record = this.record;
        var initialValues = {
            name: record.name,
            state: '试用'
        }
        SteedosUI.showModal(stores.ComponentRegistry.components.ObjectForm, {
            name: `standard_new_form`,
            objectApiName: 'hmc__c',
            title: '确认',
            initialValues
        }, null, {
            iconPath: '/assets/icons'
        });
    },
    sureVisible: function(object_name, record_id, permissions, record) {
        if (record.rz_state === "待入职" && record.instance_state === 'approved') {
            return true;
        } else {
            return false;
        }
    }
}
```
sure.button.yml 文件  
```
name: sure
is_enable: true
label: 确认
'on': record_only
type: script
visible: true
```

| 属性名 | 属性类型 | 属性含义 |
|----|----|----|
| name | text | API 名称 |
| label | text | 显示名称 |
| object | master_detail | 所属对象 |
| is_enable | boolean | 启用 |
| visible | boolean | 可见 |
| 'on' | lookup | 显示位置 |
| type | select | 类型 |
| todo | code | 执行的脚本 |