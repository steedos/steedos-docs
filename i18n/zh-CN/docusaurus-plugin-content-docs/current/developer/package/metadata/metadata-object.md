---
title: 对象元数据
---

## 对象 .object.yml

定义对象名称、显示名称、对象的基本信息，以及功能开关。

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
label: 合同
```

| 属性名 | 类型 | 含义 |
|----|----|----|
| datasource | master_detail | 数据源 |
| label | text | 显示名 |
| name | text | API 名称 |
| icon | lookup | 图标 |
| is_enable | boolean | 启用 |
| in_development | select | 开发状态 |
| enable_search | boolean | 允许搜索 |
| enable_files | boolean | 允许上传附件 |
| enable_tasks | boolean | 允许添加任务 |
| enable_notes | boolean | 允许添加备注 |
| enable_events | boolean | 允许添加事件 |
| enable_api | boolean | 允许 API 访问 |
| enable_workflow | boolean | 允许配置对象流程 |
| enable_instances | boolean | 允许查看申请单 |
| enable_chatter | boolean | 允许添加留言 |
| enable_audit | boolean | 记录字段历史 |
| enable_inline_edit | boolean | 允许编辑单个字段 |
| enable_tree | boolean | 启用树状结构显示记录 |
| enable_enhanced_lookup | boolean | 启用弹出窗口查找模式 |
| table_name | text | 数据库表名称 |
| description | textarea | 备注 |
| owner | lookup | 拥有者 |
| is_system | boolean | 系统 |
| fields_serial_number | number | 对象上新增字段时排序号以+10方式递进 |
| is_deleted | boolean | 已删除 |
| created_by | lookup | 创建人 |
| modified_by | lookup | 修改人 |
| form | object | 表单事件 |
| form.onValuesChange | code | 数据变化时 |
| form.initialValues | code | 初始化数据 |
| form.beforeDelete | code | 删除数据之前 |
| form.afterDelete | code | 删除数据之后 |
| form.beforeView | code | 记录显示之前 |
| form.afterView | code | 记录显示之后 |

<!--
TODO: 需要排查的部分
| sidebar | object | 左侧列表 |
| relatedList | grid | Related List |
| app_unique_id | text | App Unique ID |
| app_version | text | App Version |
| fields_serial_number | number | fields_serial_number |
| reload_time | datetime | reload_time |

| form.validate | code | 验证数据 |
| form.beforeInsert | code | 新增数据之前 |
| form.beforeUpdate | code | 修改数据之前 |
| form.afterInsert | code | 新增数据之后 |
| form.afterUpdate | code | 修改数据之后 |
| form.errorInsert | code | 新增数据报错之后 |
| form.errorUpdate | code | 修改数据报错之后 |
| form.errorDelete | code | 删除数据报错之后 |
| form.beforeEdit | code | 编辑页面显示之前 |
| form.afterEdit | code | 编辑页面显示之后 |
-->


补充说明：

- **datasource**：数据源，存在“默认数据源”和“外部数据源（oracle等）”，默认值为“默认数据源”。
- **name**：API 名称, 表单事件、触发器等中调用该字段所用的名称。
- **icon**：图标， 对象图标对应 salesforce 中的 [Standard Icons](https://www.lightningdesignsystem.com/icons/#standard) 。
- **is_enable**：启用，该对象是否启用。
- **in_development**：开发状态，有“开发中（仅管理员才可以访问对象）” 和“已部署”两个可选项。
- **enable_search**：允许搜索，全局搜索。
- **enable_files**：允许上传附件，开启后详细页存在附件子表。
- **enable_tasks**：允许添加任务，开启后详细页存在任务子表。
- **enable_notes**：允许添加备注，开启后详细页存在备忘子表。
- **enable_events**：允许添加事件，开启后详细页存在日程子表。
- **enable_api**：允许 API 访问，关闭后,不会将对象服务的actions转化为rest接口
- **enable_workflow**：允许配置对象流程，设置审批流程功能必须开启此属性。
- **enable_instances**：允许查看申请单，开启后详细页存在审批子表。
- **enable_chatter**：允许添加留言，开启后详细页同级菜单栏有留言子页面。
- **enable_audit**：记录字段历史，开启后详细页存在审计日志子表，记录字段修改历史。
- **enable_inline_edit**：允许编辑单个字段，开启后列表页允许编辑字段保存。
- **enable_tree**：启用树状结构显示记录，在记录列表页以树状结构显示记录。
- **enable_trash**:	如果为true,则开启回收站功能，此对象数据删除后，会进入回收站。如果为false，则直接删除 。
- **enable_enhanced_lookup**：启用弹出窗口查找模式，对象上开启该属性时，引用该对象的相关表 lookup/master_detail 字段会以弹出窗口方式显示可选项，反之会以下拉列表形式显示可选项。
- **table_name**：数据库表名称，引用外部数据源的数据库表名称。
- **description**：备注, 该对象备注信息。
- **is_system**：系统，该对象是否是系统内置标准对象。
- **is_deleted**：已删除，该对象是否已删除。
- **form**：表单事件
- **form.onValuesChange**：数据变化时执行的函数
- **form.initialValues**：初始化数据时执行的函数
- **form.beforeDelete**：删除数据之前执行的函数
- **form.afterDelete**：删除数据之后执行的函数
- **form.beforeView**：记录显示之前执行的函数
- **form.afterView**：记录显示之后执行的函数

## 字段 .field.yml

定义字段名称、字段类型以及具体属性。

```yaml
name: await_proceeds
type: summary
data_type: number
filterable: false
group: 收款信息
index: false
is_name: false
is_wide: false
label: 收款累计(待收款)
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

### 通用属性

| 属性名 | 类型 | 含义 |
|----|----|----|
| object | master_detail | 所属对象 |
| label | text | 显示名称 |
| name | text | API 名称 |
| type | select | 字段类型 |
| defaultValue | text | 默认值 |
| group | text | 字段分组 |
| sort_no | number | 排序号 |
| is_name | boolean | 名称字段 |
| required | boolean | 必填 |
| is_wide | boolean | 宽字段 |
| hidden | boolean | 忽略此字段 |
| omit | boolean | 忽略此字段 |
| unique | boolean | 唯一索引字段 |
| index | boolean | 创建字段索引 |
| sortable | boolean | 可排序 |
| searchable | boolean | 可搜索 |
| filterable | boolean | 高级查找默认字段 |
| visible_on | textarea | 字段显示公式 |
| depend_on | text[] | 依赖的字段 |
| inlineHelpText | textarea | 提示文本 |
| description | textarea | 描述 |

补充说明：
- **name**: API 名称, 表单事件、触发器等中调用该字段所用的名称。
- **is_name**: 名称字段, 勾选该属性表示此字段会代替name字段作为“名称字段”。对象上默认以名为name的字段作为”名称字段”,点击“名称字段”会跳转到记录详细页面，支持配置为”名称字段“的字段类型有：文本、多行文本、自动编号、公式、日期、日期时间。
- **is_wide**: 宽字段，普通字段详细页占一列，宽字段占两列。
- **hidden**: 表单上新建、编辑记录的表单上、列表和记录详细界面上都忽略该字段，始终不显示且不加载该字段，通常用于系统级的隐藏字段，比如 locked，is_deleted 等，该属性值会被字段权限配置覆盖变更。
- **omit**: 同hidden。
- **unique**: 字段上配置该属性可以自动生成唯一性索引。
- **index**: 创建索引，设置true时会自动为数据库字段创建索引。
- **searchable**: 可全局搜索字段，默认为false，表示在对象快速搜索及全局搜索功能中不可查询该字段，设置为true表示可以全局搜索，该属性只支持文本、长文本、网址、邮件地址、自动编号、选择框（搜索value，不能搜索label）、公式和HTML文本字段类型。
- **filterable**: 高级查找默认字段，默认为true，表示在高级查找框中显示为默认字段，如果设置为false表示会折叠显示到高级栏中。需要注意的，该字段功能与 searchable 属性有点重复，字段的 searchable 或 filterable 两属性之一值为 true 该字段就不会显示在查找界面的高级栏中，而是显示在默认过滤字段里。
- **visible_on**: 字段显示公式，公式返回true或false来控制此字段是否显示。
- **depend_on**: 依赖的字段，当依赖的字段值变更，此字段值会被清空。
- **inlineHelpText**: 提示文本，详细页该字段显示名称右侧提供一个提示文本的图标。

### 外部数据源相关

| 属性名 | 类型 | 含义 |
|----|----|----|
| column_name | text | 数据库字段名 |
| primary | boolean | 主键 |
| generated | boolean | 自增 |

补充说明：
- **column_name**: 数据库字段名, 仅支持关系型数据库。
- **primary**: 主键, 勾选其“外部数据源”栏的“主键”勾选框来把该字段设置为主键字段，仅支持关系型数据库。
- **generated**: 字段自增， 仅支持关系型数据库。

### 字段类型相关

| 属性名 | 类型 | 含义 | 字段类型 |
|----|----|----|----|
| reference_to | lookup | 引用对象 | lookup/master_detail |
| reference_to_field | string | 引用字段 | lookup/master_detail |
| multiple | boolean | 多选 | lookup/master_detail/select |
| write_requires_master_read | boolean | 子表权限开关 | master_detail |
| filtersFunction | textarea | 过滤器函数 | lookup/master_detail |
| optionsFunction | textarea | 选择项函数 | lookup/master_detail/select |
| depend_on | text[] | 依赖的字段 | lookup/master_detail/select |
| reference_limit | number | 选项显示数量 | lookup/master_detail |
| showIcon | boolean | 是否显示图标 | lookup/master_detail |
| precision | currency | 精度(数字长度) | number/currency/percent |
| scale | currency | 小数位数 | number/currency/percent |
| min | number | 最小值 | number/currency/percent/text/textarea |
| max | number | 最大值 | number/currency/percent/text/textarea |
| rows | currency | 多行文本行数 | textarea |
| options | grid | 选择项 | select |
| options.$ | object | Options |
| options.$.label | text | 显示名 |
| options.$.value | text | 选项值 |
| options.$.color | text | 背景颜色 |
| options.$.description | text | 描述 |
| formula | textarea | 公式 | formula/autonumber |
| data_type | select | 数据类型 | formula/select |
| formula_blank_value | select | 空白字段处理 | formula |
| summary_object | lookup | 要汇总的对象 | summary |
| summary_type | select | 汇总类型 | summary |
| summary_field | lookup | 要聚合的字段 | summary |
| summary_filters | grid | 过滤条件 | summary |
| summary_filters.$ | object | Filter Criteria |
| summary_filters.$.field | lookup | 字段 |
| summary_filters.$.operation | lookup | 运算符 |
| summary_filters.$.value | text | 值 |
| show_as_qr | boolean | 显示为二维码 | url |

#### 选项相关类型属性补充说明

- **reference_to**: 引用对象，只有“相关表”和“主表/子表”字段类型才支持此属性。
- **reference_to_field**: 引用的对象的字段，默认值为主键字段 `_id`，表示要把对象上哪个字段值作为相关表的字段值保存到数据库中，只有“相关表”和“主表/子表”字段类型才支持此属性。
- **multiple**: 多选，启用后可以保存多个值，只有“相关表”、“主表/子表”和“选择框”字段类型才支持此属性。
- **write_requires_master_read**: 该开关表示“当用户对主表记录有读取权限时对子表记录可以增删改”，默认情况下，只允许同时具有主表记录的读取和写入权限的用户创建、编辑和删除子表记录，勾选该属性后表示允许只有主表记录读取权限的用户创建、编辑或删除子记录，只有“主表/子表”字段类型才适用此属性。
- **filtersFunction**: 过滤器函数，该函数返回值定义了 相关表（lookup） 和 主表/子表（master_detail） 字段类型的过滤条件。
- **optionsFunction**: 选择项函数，该函数返回值定义了 选择框（select）、相关表（lookup） 和 主表/子表（master_detail） 字段类型的选项值。
- **options**: 选择项，定义“选择框”字段类型的下拉选项，只有“选择框”字段类型才支持此属性。。。
- **options.$**: 选择项
- **options.$.label**: 显示名
- **options.$.value**: 选项值
- **options.$.color**: 背景颜色
- **options.$.description**: 描述
- **reference_limit**: 选项显示数量，当显示为下拉选项时，默认只会列出10个选项供选择，只有“相关表”、“主表/子表”和“选择框”字段类型才支持此属性。
- **showIcon**: 是否显示图标，每个对象上都可以配置图标，默认情况下相关表字段会在选项上显示引用对象的图标，配置该属性值为false可以隐藏选项上的图标，只有“相关表”、“主表/子表”和“选择框”字段类型才支持此属性。
- **depend_on**: 依赖的字段，当依赖的字段值变更时，不但会清空此字段值，而且会触发 `optionsFunction` 和 `filtersFunction` 函数重新执行，一般用于实现表单字段级联功能。

#### 公式相关属性补充说明

- **formula**: 公式，通过用户定义的算法自动计算字段的值，只有“公式”和“自动编号”字段类型才支持此属性。
- **data_type**: 数据类型，保存到数据库中的值类型，只有“公式”和“选择框”字段类型才支持此属性。
- **formula_blank_value**: 空白字段处理, zeroes表示将空白字段视为零，blanks表示将空白字段视为空白，默认为zeroes，只有“公式”才支持此属性。

#### 汇总相关属性补充说明

- **summary_object**: 要汇总的对象, 只有“累计汇总”字段类型才支持此属性。
- **summary_type**: 汇总类型, 含有COUNT、SUM、MIN、MAX、AVG这五个选择项, 只有“累计汇总”字段类型才支持此属性。
- **summary_field**: 要聚合的字段，定义汇总时需要聚合汇总哪个字段，比如汇总合同金额, 只有“累计汇总”字段类型才支持此属性。
- **summary_filters**: 过滤条件，定义汇总时需要汇总哪些记录，只汇总符合该过滤条件的记录, 只有“累计汇总”字段类型才支持此属性。
- **summary_filters.$**: 过滤条件
- **summary_filters.$.field**: 字段
- **summary_filters.$.operation**: 运算符
- **summary_filters.$.value**: 值

#### 数值相关属性补充说明

- **precision**: 精度(数字长度)，定义数值类型的字段的精度, 只有“数值”、“金额”和“百分比”字段类型才支持此属性。
- **scale**: 小数位数，定义数值类型的字段的小数位数, 只有“数值”、“金额”和“百分比”字段类型才支持此属性。
- **min**: 最小值，定义数值类型的字段允许的最小值，只有“数值”、“金额”和“百分比”字段类型才支持此功能，用于文本类型字段时表示允许的字符最小长度。
- **max**: 最大值，定义数值类型的字段允许的最大值, 只有“数值”、“金额”和“百分比”字段类型才支持此功能，用于文本类型字段时表示允许的字符最大长度。

#### 其他相关属性补充说明

- **rows**: 多行文本行数， 定义“长文本”字段类型显示的文本框行数，默认显示为3行。
- **show_as_qr**: 显示为二维码，只有”网址“”字段类型才支持此属性，开启后该字段值只读时显示为二维码。

<!-- 
TODO: 需要
| custom | boolean | 自定义 | 
- **custom**：自定义，该对象是否是自定义对象。
- **_name**: 字段名


| allowedValues | ["string","boolean","array"] | 允许的值 |
| modal_mode | string | lookup字段弹出框模式: 'dialog' 、 'drawer' |
| table_schema | ["string", "object"] | lookup字段弹出框表格定义，可以定义为列表视图名称或列表属性 |
| firstOption | boolean |  |
最大最小值需要测试 是否支持 支持字符串，数字，金额，日期类型字段。
| min | ["integer", "string"] | 最小长度。支持字符串，数字，金额，日期类型字段 |
| max | ["integer", "string"] | 最大长度。支持字符串，数字，金额，日期类型字段 |
| blackbox | boolean | 不校验字段类型 |
| disabled | boolean | 禁用 |
| reference_sort | object | 排序方式 |
| is_company_only | boolean | 本公司 |
| is_company_limited | ["boolean", "string"] | 本公司 |
| system | string |  |
| fieldDBType | string | 字段数据库类型 |
| collection | string | 对应对象名 |
| language | string | 模板名 |
| create | boolean | 关联时是否允许创建 |
| regEx | object | 正则表达式 |
| filters | ["array","string"] | 过滤条件 |
| relatedList | boolean | 用于表示是否在相关表的详细页面中作为子表显示 |
| picklist | string | 指定字段的选项列表值集 |

以下字段属性由字段权限计算结果自动处理，不再需要在字段配置文件中配置。
| readonly | boolean | 只读 |
| hidden | boolean | 隐藏 |

-->