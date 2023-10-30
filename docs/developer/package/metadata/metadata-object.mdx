---
title: Object Metadata
---

## Object .object.yml

Defines object name, display name, basic object information, and feature toggles.

```yaml
name: contracts
enable_api: true
enable_audit: true
enable_chatter: false
enable_events: false
enable_files: true
enable_inline_edit: true
enable_instances: false
enable_notes: false
enable_search: true
enable_tasks: false
enable_trash: true
enable_workflow: true
enable_enhanced_lookup: true
icon: contract
is_enable: true
label: Contract
```

| Property Name | Type | Meaning |
|----|----|----|
| datasource | master_detail | Data Source |
| label | text | Display Name |
| name | text | API Name |
| icon | lookup | Icon |
| is_enable | boolean | Enabled |
| in_development | select | Development Status |
| enable_search | boolean | Allow Search |
| enable_files | boolean | Allow File Upload |
| enable_tasks | boolean | Allow Task Addition |
| enable_notes | boolean | Allow Adding Notes |
| enable_events | boolean | Allow Event Addition |
| enable_api | boolean | Allow API Access |
| enable_workflow | boolean | Allow Object Workflow Configuration |
| enable_instances | boolean | Allow Viewing Applications |
| enable_chatter | boolean | Allow Comments |
| enable_audit | boolean | Record Field History |
| enable_inline_edit | boolean | Allow Single Field Edit |
| enable_tree | boolean | Enable Tree View of Records |
| enable_enhanced_lookup | boolean | Enable Popup Window Lookup Mode |
| table_name | text | Database Table Name |
| description | textarea | Notes |
| owner | lookup | Owner |
| is_system | boolean | System |
| fields_serial_number | number | Serial number for new fields on object increments by +10 |
| is_deleted | boolean | Deleted |
| created_by | lookup | Created by |
| modified_by | lookup | Modified by |
| form | object | Form Events |
| form.onValuesChange | code | When data changes |
| form.initialValues | code | When data initializes |
| form.beforeDelete | code | Before data deletion |
| form.afterDelete | code | After data deletion |
| form.beforeView | code | Before record display |
| form.afterView | code | After record display |

Additional notes:

- **datasource**: Data source, there's a "default data source" and "external data source (like Oracle)". The default is "default data source".
- **name**: API Name, used for calling this field in form events, triggers, etc.
- **icon**: Icon, corresponding to salesforce's [Standard Icons](https://www.lightningdesignsystem.com/icons/#standard).
- **is_enable**: Enabled, whether the object is enabled or not.
- **in_development**: Development status, options include "In Development (only accessible by admin)" and "Deployed".
- **enable_search**: Allows global search.
- **enable_files**: Enables attachment uploads on the details page.
- **enable_tasks**: Enables task subtable on the details page.
- **enable_notes**: Enables memo subtable on the details page.
- **enable_events**: Enables calendar subtable on the details page.
- **enable_api**: If disabled, the object's actions won't be converted to REST APIs.
- **enable_workflow**: To set approval process, this property must be enabled.
- **enable_instances**: Enables approval subtable on the details page.
- **enable_chatter**: Enables comment subpage on the details page.
- **enable_audit**: Enables audit log subtable on the details page, which records field modification history.
- **enable_inline_edit**: Enables field editing from the list view.
- **enable_tree**: Enables tree view of records on the list page.
- **enable_trash**: If true, the deleted data of this object will move to the recycle bin. If false, it will be deleted permanently.
- **enable_enhanced_lookup**: When enabled, fields on related tables that reference this object will use a popup window for selection, otherwise, they use a dropdown list.
- **table_name**: Name of the database table when referring to an external data source.
- **description**: Notes about the object.
- **is_system**: Indicates if the object is a built-in standard object of the system.
- **is_deleted**: Indicates if the object is deleted.
- **form**: Form events
- **form.onValuesChange**: Function executed when data changes.
- **form.initialValues**: Function executed during data initialization.
- **form.beforeDelete**: Function executed before data deletion.
- **form.afterDelete**: Function executed after data deletion.
- **form.beforeView**: Function executed before record display.
- **form.afterView**: Function executed after record display.

## Field .field.yml

Defines field name, field type, and specific attributes.

```yaml
name: await_proceeds
type: summary
data_type: number
filterable: false
group: Payment Information
index: false
is_name: false
is_wide: false
label: Accumulated Payments (Pending Payments)
hidden: false
omit: false
precision: 18
required: false
scale: 2
searchable: false
sort_no: 500
sortable: true
summary_field: amount
summary_filters:
  - field: contract_receipts_state
    operation: '='
    value: unreceived
summary_object: finance_receive
summary_type: sum
```

### Common Attributes

| Property | Type | Meaning |
|----|----|----|
| object | master_detail | Affiliated Object |
| label | text | Display Name |
| name | text | API Name |
| type | select | Field Type |
| defaultValue | text | Default Value |
| group | text | Field Group |
| sort_no | number | Sorting Number |
| is_name | boolean | Name Field |
| required | boolean | Mandatory |
| is_wide | boolean | Wide Field |
| hidden | boolean | Ignore this Field |
| omit | boolean | Ignore this Field |
| unique | boolean | Unique Index Field |
| index | boolean | Create Field Index |
| sortable | boolean | Sortable |
| searchable | boolean | Searchable |
| filterable | boolean | Default Field for Advanced Search |
| visible_on | textarea | Field Display Formula |
| depend_on | text[] | Dependent Fields |
| inlineHelpText | textarea | Tip Text |
| description | textarea | Description |

Additional Notes:
- **name**: API Name, this field's name used in form events, triggers, etc.
- **is_name**: Name Field, marking this option means this field will replace the default 'name' field as the "Name Field". By default, an object uses the field named 'name' as its "Name Field". Clicking on the "Name Field" will navigate to the record detail page.
- **is_wide**: Wide Field, a standard field occupies one column on the details page, a wide field spans two columns.
- **hidden**: This field is always ignored and neither displayed nor loaded on both the creation/edit forms and the list/detail views. Typically used for system-level hidden fields.
- **omit**: Same as hidden.
- **unique**: Setting this option will automatically generate a unique index for the field.
- **index**: Creates an index. If set to true, it will automatically create an index for the database field.
- **searchable**: Can be globally searched.
- **filterable**: Default Field for Advanced Search.
- **visible_on**: Field display formula.
- **depend_on**: When the value of the dependent field changes, the value of this field will be cleared.
- **inlineHelpText**: Tip text displayed next to the field name on the detail page.

### External Data Source Related

| Property | Type | Meaning |
|----|----|----|
| column_name | text | Database Field Name |
| primary | boolean | Primary Key |
| generated | boolean | Auto-increment |

Additional Notes:
- **column_name**: Database field name, only supports relational databases.
- **primary**: Primary key. Set the field as the primary key by ticking the "Primary Key" checkbox in the "External Data Source" column. Only supports relational databases.
- **generated**: Field auto-increment, only supports relational databases.
### Field Type Related

| Property Name | Type | Meaning | Field Type |
|----|----|----|----|
| reference_to | lookup | Referenced Object | lookup/master_detail |
| reference_to_field | string | Referenced Field | lookup/master_detail |
| multiple | boolean | Multi-choice | lookup/master_detail/select |
| write_requires_master_read | boolean | Subtable Permission Switch | master_detail |
| filtersFunction | textarea | Filter Function | lookup/master_detail |
| optionsFunction | textarea | Option Function | lookup/master_detail/select |
| depend_on | text[] | Dependent Fields | lookup/master_detail/select |
| reference_limit | number | Display Option Limit | lookup/master_detail |
| showIcon | boolean | Display Icon or Not | lookup/master_detail |
| precision | currency | Precision (Number Length) | number/currency/percent |
| scale | currency | Decimal Places | number/currency/percent |
| min | number | Minimum Value | number/currency/percent/text/textarea |
| max | number | Maximum Value | number/currency/percent/text/textarea |
| rows | currency | Text Rows | textarea |
| options | grid | Selection | select |
| options.$ | object | Options |
| options.$.label | text | Display Name |
| options.$.value | text | Option Value |
| options.$.color | text | Background Color |
| options.$.description | text | Description |
| formula | textarea | Formula | formula/autonumber |
| data_type | select | Data Type | formula/select |
| formula_blank_value | select | Blank Field Handling | formula |
| summary_object | lookup | Object to Summarize | summary |
| summary_type | select | Summarization Type | summary |
| summary_field | lookup | Field to Aggregate | summary |
| summary_filters | grid | Filter Conditions | summary |
| summary_filters.$ | object | Filter Criteria |
| summary_filters.$.field | lookup | Field |
| summary_filters.$.operation | lookup | Operator |
| summary_filters.$.value | text | Value |
| show_as_qr | boolean | Display as QR Code | url |

#### Supplementary Explanation of Option-Related Type Properties

- **reference_to**: Referenced object. Only the "related table" and "master/subtable" field types support this property.
- **reference_to_field**: Field of the referenced object. The default value is the primary key `_id`. It represents which field value of the object should be saved as the value of the related table in the database. Only the "related table" and "master/subtable" field types support this property.
- **multiple**: Multi-choice. When enabled, multiple values can be saved. Only the "related table", "master/subtable", and "select box" field types support this property.
- **write_requires_master_read**: This switch means "when a user has read permission for the master record, they can add, modify, or delete a subtable record." By default, only users with both read and write permissions for the master record can create, edit, or delete subtable records. Checking this property allows users with only read permission for the master record to create, edit, or delete sub-records. Only the "master/subtable" field type applies to this property.
- **filtersFunction**: Filter function. The return value of this function defines the filter conditions for the related table (lookup) and master/subtable (master_detail) field types.
- **optionsFunction**: Option function. The return value of this function defines the option values for the select box (select), related table (lookup), and master/subtable (master_detail) field types.
- **options**: Selections. Define the dropdown options for the "select box" field type. Only the "select box" field type supports this property...
- **options.$**: Selections.
- **options.$.label**: Display Name.
- **options.$.value**: Option Value.
- **options.$.color**: Background Color.
- **options.$.description**: Description.
- **reference_limit**: Display option limit. When displayed as dropdown options, by default only 10 options will be listed for selection. Only the "related table", "master/subtable", and "select box" field types support this property.
- **showIcon**: Whether to display an icon. Each object can have an icon configured. By default, the related table field will display the icon of the referenced object in the options. Configuring this property value as false can hide the icon in the options. Only the "related table", "master/subtable", and "select box" field types support this property.
- **depend_on**: Dependent fields. When the value of the dependent field changes, it will not only clear the value of this field but also trigger the `optionsFunction` and `filtersFunction` functions to re-execute. This is typically used to implement cascading functionality in form fields.

#### Supplementary Explanation of Formula-Related Properties

- **formula**: Formula. Automatically calculates the field value through a user-defined algorithm. Only the "formula" and "autonumber" field types support this property.
- **data_type**: Data type. Defines the value type saved in the database. Only the "formula" and "select box" field types support this property.
- **formula_blank_value**: Blank field handling. "zeroes" means treating blank fields as zero, while "blanks" means treating them as blank. The default is "zeroes". Only the "formula" field type supports this property.

#### Supplementary Explanation of Summarization-Related Properties

- **summary_object**: Object to summarize. Only the "cumulative summarization" field type supports this property.
- **summary_type**: Summarization type. Contains five choices: COUNT, SUM, MIN, MAX, AVG. Only the "cumulative summarization" field type supports this property.
- **summary_field**: Field to aggregate. Defines which field to aggregate during summarization, such as summarizing contract amounts. Only the "cumulative summarization" field type supports this property.
- **summary_filters**: Filter conditions. Defines which records need to be summarized during summarization, only summarizing records that meet this filter condition. Only the "cumulative summarization" field type supports this property.
- **summary_filters.$**: Filter criteria.
- **summary_filters.$.field**: Field.
- **summary_filters.$.operation**: Operator.
- **summary_filters.$.value**: Value.

#### Supplementary Explanation of Numeric-Related Properties

- **precision**: Precision (number length). Defines the precision of the numeric field type. Only the "number", "currency", and "percentage" field types support this property.
- **scale**: Decimal places. Defines the number of decimal places for the numeric field type. Only the "number", "currency", and "percentage" field types support this property.
- **min**: Minimum value. Defines the minimum allowable value for the numeric field type. Only the "number", "currency", and "percentage" field types support this function. When used for text field types, it represents the minimum allowable character length.
- **max**: Maximum value. Defines the maximum allowable value for the numeric field type. Only the "number", "currency", and "percentage" field types support this function. When used for text field types, it represents the maximum allowable character length.

#### Supplementary Explanation of Other Related Properties

- **rows**: Number of text rows. Defines the number of rows displayed for the "textarea" field type. Only the "textarea" field type supports this property.
- **show_as_qr**: Display as QR code. When enabled, the field will display a QR code based on its value. Only the "URL" field type supports this property.
