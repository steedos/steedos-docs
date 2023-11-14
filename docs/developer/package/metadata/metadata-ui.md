---
title: UI Metadata
---

## Overview

Define ui-related metadata

- Applications
- Tabs
- List Views
- Page Layouts
- Custom Buttons

## Applications
Application.app.yml  
You can set the application's name, display name, application icon, and the objects and tabs displayed within the application.
```yaml
name: Contract
code: contracts
description: Manage contracts and payments.
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

| Property Name | Property Type | Description |
|----|----|----|
| name | text | Name |
| code | text | API Name |
| icon_slds | lookup | Icon |
| visible | boolean | Enable |
| description | textarea | Description |
| tabs | lookup | Tabs |
| objects | lookup | Desktop Main Menu |
| mobile_objects | lookup | Mobile Main Menu |
| is_creator | boolean | Display in desktop menu |
| mobile | boolean | Display in mobile menu |
| icon | text | Old Version Icon |
| sort | number | Sort Order |
| url | url | External Link |
| is_use_ie | boolean | Open with IE (Requires Steedos Desktop Client) |
| is_use_iframe | boolean | Open in iframe |
| is_new_window | boolean | Open in New Window |
| on_click | textarea | Link Script |
| auth_name | text | Auth Domain |
| secret | text | API Key |
| oauth2_enabled | boolean | Enable OAuth2 |
| oauth2_callback_url | text | Callback URL |
| oauth2_scopes | select | Scopes |
| oauth2_logout_enabled | boolean | Enable Single Sign-out |
| oauth2_logout_url | url | Single Sign-out URL |
| oauth2_home_url | url | App Homepage |
| oauth2_logo | image | App Logo |
| oauth2_client_secret | text | App Secret |
| saml_enabled | boolean | Enable SAML |
| saml_entity_id | text | Entity Id |
| saml_issuer | text | Issuer |
| saml_idp_cert | text | IDP Cert |
| saml_acs_url | url | ACS Url |
| saml_name_id_format | text | Name |
| saml_logout_enabled | boolean | Enable Single Sign-out |
| saml_logout_url | url | Single Sign-out URL |
| saml_logout_block | select | Single Sign-out Binding |
| is_system | boolean | System |
| from_code_id | text | from_code_id |

## Tabs
Tab.tab.yml  
Tabs can be bound to an object or to a URL or a custom page.
```yaml
name: contract_analysis
desktop: true
icon: dashboard
label: Contract Analysis
mobile: true
page: contract_analysis
type: page
```

| Property Name | Property Type | Description |
|----|----|----|
| label | text | Display Name |
| name | text | API Name |
| icon | lookup | Icon |
| parent | lookup | Parent Tab |
| type | select | Type |
| mobile | boolean | Display in mobile menu |
| desktop | boolean | Display in desktop menu |
| frame_height | number | Tab Frame Height |
| has_sidebar | boolean | Display Sidebar Panel |
| object | lookup | Object |
| url | url | External Link |
| is_new_window | boolean | Open in New Window |
| page | lookup | Page |
| action_overrides | text | Action Override List Assigned to Tab |
| description | textarea | Description |
| is_system | boolean | System |

## List Views
Listview.listview.yml  
Defines the list display of an object, including: displayed columns, filter conditions, sort rules, default search fields.
```yaml
name: all
label: All Contracts
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

| Property Name | Property Type | Description |
|----|----|----|
| label | text | Display Name |
| name | text | API Name |
| object_name | master_detail | Object |
| filter_scope | lookup | Filter Scope |
| shared | boolean | Share View to Workspace |
| show_count | boolean | Display Entry Count |
| type | select | View Type |
| scrolling_mode | select | Scrollbar Style |
| columns | grid | Displayed Columns |
| columns.$ | object | Displayed Column |
| columns.$.field | lookup | Field |
| columns.$.width | text | Width |
| filter_fields | lookup | Default Filter Fields |
| sort | grid | Default Sort Rules |
| sort.$ | object | Order |
| sort.$.field_name | lookup | Sort Field |
| sort.$.order | select | Sort Order |
| filters | grid | Filters |
| filters.$ | object | Filter |
| filters.$.field | lookup | Field |
| filters.$.operation | lookup | Operator |
| filters.$.value |  | Value |
| filter_logic | text | Filter Logic |
| mobile_columns | grid | Mobile Displayed Columns |
| mobile_columns.$ | object | Mobile Displayed Column |
| mobile_columns.$.field | lookup | Field |
| sort_no | number | Sort Number |

## Page Layouts
ObjectName.PageLayout.layout.yml  
Defines the record display of an object, including: profile, action buttons, displayed fields, related subtables.
```
name: customer
buttons:
  - button_name: standard_new
  - button_name: standard_edit
  - button_name: standard_delete
sections:
  - section_name: base_info
    fields:
      - field_name: name
      - field_name: address
      - field_name: contact
      - field_name: telephone
      - field_name: email
  - section_name: contract_info
    fields:
      - field_name: contract_no
      - field_name: contract_type
      - field_name: contract_start_date
      - field_name: contract_end_date
```

| Property Name | Property Type | Description |
|----|----|----|
| label | text | Display Name |
| name | text | API Name |
| object_name | master_detail | Object |
| buttons | lookup | Action Buttons |
| buttons.$ | object | Button |
| buttons.$.button_name | lookup | Button |
| sections | grid | Layout Sections |
| sections.$ | object | Section |
| sections.$.section_name | lookup | Section Name |
| sections.$.fields | grid | Displayed Fields |
| sections.$.fields.$ | object | Displayed Field |
| sections.$.fields.$.field_name | lookup | Field |

## Custom Buttons
Button.button.yml  
Custom button definitions.
```yaml
name: standard_new
label: New
type: add
order: 10
icon: new_record
visible: true
```

| Property Name | Property Type | Description |
|----|----|----|
| label | text | Display Name |
| name | text | API Name |
| type | select | Button Type |
| order | number | Display Order |
| icon | lookup | Icon |
| visible | boolean | Display |
| action | textarea | Button Action |
| permission_set | lookup | Permission |
| related_list | lookup | Related List |
| description | textarea | Description |
| group | text | Button Group |
| is_system | boolean | System |

---
