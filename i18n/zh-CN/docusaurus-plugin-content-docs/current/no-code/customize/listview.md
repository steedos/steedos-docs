# 列表视图

列表视图是用来定义前台数据列表展示的数据，您可以自定义需要显示的字段，从不同的维度定义视图展示不一样的数据，设定筛选条件和排序规则等参数。

例如“报价(offer)”对象，可以定义所有报价、我的报价等多个视图。 用户在界面上可以很方便快捷的切换列表视图、添加筛选条件、查找数据、新建视图等等。

## 如何创建列表视图

新建的对象默认有两个列表视图，分别是：所有和最近查看。默认展示的数据只有“名称”一个字段。当用户需要添加新视图的时候，可以进入对象详情界面找到“列表视图”-->“新建”弹出“新建 列表视图”窗口。填写必填项显示名称“所有报价”、API名称“offer_view”、对象“报价”、过滤范围“工作区”、并把需要显示的列添加上去，设置它的宽度和是否换行。

* **显示名称**：最终视图在界面中展示的名称。
* **API名称**：该名称作为API名称是唯一标识符，只能包含小写字母、数字，必须以字母开头，不能以下划线字符结尾或包含两个连续的下划线字符。
* **对象**：该视图所属的对象，默认为当前对象。
* **过滤范围**：有“工作区”和“我的”两个范围供用户选择，默认为“工作区”，用户也可以调整修改为“我的”，两者的区别在于“工作区”以当前整个工作区作为数据查找范围，而“我的”则只显示owner为当前登录用户的相关数据；
* **显示条目数**：在视图名称右侧显示该视图一共有多少条数据。
* **显示的列**：选择您需要展示的字段，并设置它的宽度和是否换行，点击下方的“新增一行”可以添加新的字段，若没有勾选 “是否换行”，表格中文字将始终显示为单行且超出部分显示省略号；
* **默认过滤的字段**：过滤用户选择的字段不显示在视图中。
* **默认排序规则**：选择您需要排序的字段，并指定排序方式（正序或者倒序），如果未配置，将按创建时间倒序来显示列表数据。
* **手机端显示的列**：选择手机端需要展示的字段。
* **排序号**：各个列表视图按排序号由小到大显示在列表左上角的弹窗中。


”所有“列表视图对应的API名称为 `all` , 该视图俗称 `all 视图` 。

* 当我们进入对象列表页时，如果没有新增列表视图或者修改已有列表视图的排序号, 默认显示的就是 `all 视图`；
* 当一个”相关表“类型字段展示选项的模式是弹出窗口查找模式，弹出窗口中的列表视图就是 `all 视图` ；
* 当给对象配置了一个”主表子表“类型字段，该对象详细记录页中的相关子表显示的就是 `all 视图` 。

### 调整显示的列

可以调整在列表视图中显示的列字段。

* 不显示某字段

如果不想显示某字段，删除这一显示的列即可。

* 调整字段显示顺序

如果想要调整列字段的显示先后顺序

* 增加显示字段

如果想要增加显示某字段，则点击“+ 新建”，并在新增的这一行选择字段，可以设置宽度，也可以拖动调整显示顺序。

### 调整默认过滤字段

默认过滤字段，是指列表视图右侧过滤器界面中的默认显示字段。将常用于过滤数据的字段设置为默认过滤字段后，用户即可在视图中更方便地进行过滤。

可以选择多个过滤字段，拖拉调整显示的次序。

### 调整默认排序规则

可以设置按多个字段的正序或倒叙显示列表视图中的数据。如果不设置默认排序规则，将按创建时间倒序来显示列表数据。

可以新建多条排序规则，并选择字段即排序方式。通过拖拉行，调整多个规则的先后顺序。

### 调整手机端显示的列

如果不特别设置手机端显示的列，则在Steedos的手机端，会默认显示“显示的列”中最前面的4个字段。也可以自主设置，来调整在手机端上需要显示的字段。

### 如何添加过滤条件
 
 列表视图的过滤条件并不是在后台对象设置中配置，而是在前台用户界面的对象列表视图右侧的过滤器中配置，上述截屏动画描述了给“任务”对象的自定义列表视图“紧急任务”添加过滤条件并保存为列表视图默认过滤条件的过程。


## 列表视图元数据

可视化界面创建的元数据，可以同步为源码。也可以直接在项目中用源码定义列表视图。

### 定义列表视图

要用代码开发对象上自定义列表视图，需要先在对象元数据文件夹中新建 listviews 文件夹用于放置列表视图相关元数据，然后创建 `列表视图名.listview.yml` 文件并补充属性内容。以下示例描述了给任务对象拓展了一个”`important_tasks`“的列表视图。该列表视图只出示被标记了”重要“的任务。

文件路径： `/steedos-packages/app-extend/main/default/objects/tasks/listviews/important_tasks.listview.yml`

```yaml
name: important_tasks
columns:
  - field: name
  - field: assignees
  - field: important_tasks
filter_scope: space
label: 重要任务
shared: true
# filters: [["important_tasks","=",true]]
filters: !<tag:yaml.org,2002:js/function> |-
  function (){
      return [["important","=",true]];
  }
sort:
  - field_name: 'due_date'
    order: desc
```

示例中属性含义：

* name: `string` API 名称；
* columns: `array` 列表显示的字段；
* filter_scope: `string`过滤范围；
* label: `string`  视图显示名称；
* shared: `Boolean` 是否共享；
* filters:  `array、function`  过滤条件；
* sort: `array`  排序。

### 过滤条件

上面“如何添加过滤条件”部分描述了如何在前台界面给一个列表视图添加过滤条件，过滤条件添加好后可以通过代码同步工具。

从界面上同步下来的过滤条件格式如下所示：

```yml
filters:
  - field: start__c
    operation: between
    value: this_month
```

这是一个对象数组，它只能有一层过滤条件，无法实现复杂的过滤条件功能。

我们可以在代码中修改同步过来的过滤条件来实现复杂的过滤功能，当然我们也可以直接在代码中给列表视图添加过滤条件。

上面的过滤条件我们一般在代码中可以简写为：

```yml
filters: [["start__c", "between", "this_month"]]
```

## 日历视图

列表视图支持以日历的形式展示，只要在元数据代码中把它的 `type` 属性定义为 `calendar` 即可被识别为“日历视图”。

### 基本功能

以下是一个基本功能的日历视图元数据定义：

```yml
name: calendar
type: calendar
filter_scope: space
label: 日历视图
options:
  startDateExpr: start__c
  endDateExpr: end__c
  textExpr: name
  allDayExpr: is_all_day__c
  title:
    - name
    - start__c
    - end__c
  currentView: day
  firstDayOfWeek: 1
  startDayHour: 8
  endDayHour: 18
```

- type: 只能配置为 `calendar` 才能被识别为日历视图
- options: 日历视图相关参数，详情请参阅其官网文档 [DevExtreme JavaScript Scheduler](https://js.devexpress.com/Documentation/Guide/UI_Components/Scheduler/Getting_Started_with_Scheduler/)
  - startDateExpr: 起始时间字段
  - endDateExpr: 结束时间字段
  - textExpr: 名称字段
  - allDayExpr: 全天事件字段，必须为boolean类型字段
  - title: 鼠标放置在相关事件区域内时要显示哪些字段的信息
  - currentView: 日历视图默认打开哪种模式的视图，day, week, month, agenda
  - firstDayOfWeek: 一周的第一天，0表示周日，1表示周一
  -startDayHour: 日历从几点开始显示一天的时间线
  -endDayHour: 日历从几点结束显示一天的时间线

### 视图模式

可以在options配置中指定views属性指定要显示哪些日历视图模式，目前支持以下视图模式：

- 日 day：按天显示日历面板。
- 周 week： 按周显示日历面板。
- 月 month： 按月显示日历面板。
- 列表 agenda：显示为日程列表。

以下配置默认显示周模式视图，只允许在“日”和“周”两个模式中切换视图模式，不显示“月”和“列表”模式。

```yml
name: calendar
type: calendar
filter_scope: space
label: 日历视图
options:
  currentView: week
  views:
    - day
    - month
```

以下配置额外为日和周模式视图配置参数，相关属性说明请参阅其官网 [Scheduler View Types](https://js.devexpress.com/Documentation/Guide/UI_Components/Scheduler/Views/View_Types/)。

```yml
name: calendar
type: calendar
filter_scope: space
label: 日历视图
options:
  views:
    - type: day
      maxAppointmentsPerCell: unlimited
    - type: week
      maxAppointmentsPerCell: unlimited
    - month
    - agenda
```

### 过滤条件

日历视图不支持在界面上配置过滤条件，但是可以在代码中配置，其功能及规范与普通列表视图是一样的。

给日历视图配置以下过滤条件可以在视图中只显示当前登录用户自己创建的业务数据。

```yml
filters:
  - - owner
    - '='
    - '{userId}'
```

### 分组

日历视图还支持按分组来显示日历事件，可以参阅其官网 [Group Appointments by Resources](https://js.devexpress.com/Documentation/Guide/UI_Components/Scheduler/Resources/Group_Appointments_by_Resources/) 查看详细功能说明。

以下列表视图元数据配置内容演示了如何在Steedos中实现按“会议室”来分组显示日历面板。

```yaml
name: calendar_view
type: calendar
label: 日历视图
filter_scope: space
sort:
  - - created
    - desc
filters:
  - - owner 
    - = 
    - '{userId}'
  - or 
  - - staff__c
    - = 
    - '{userId}'
options:
  startDateExpr: start__c
  endDateExpr: end__c
  textExpr: name
  views:
    - type: day
      maxAppointmentsPerCell: unlimited
      groups:
        - _room
    - type: week
      maxAppointmentsPerCell: unlimited
    - month
    - agenda
  title:
    - name
    - meeting_room__c
    - start__c
    - end__c
  currentView: day
  firstDayOfWeek: 1
  startDayHour: 8
  endDayHour: 18
  resources:
    - fieldExpr: _room
      valueExpr: _id
      displayExpr: name
      label: 会议室
      dataSource:
        store:
          type: odata
          version: 4
          url: "/api/v4/meeting_room__c?$orderby=name"
          withCredentials: false
```

以下几个属性配置是分组相关配置的重点

- 在 `options.views` 属性中明确标记“日”视图按名为 `_room` 的数据源来分组。
- 在 `options.resources` 属性中定义一个名为 `_room` 的数据源，并且该数据源从Steedos标准的 OData API 接口中获取数据。
- 在 `options.title` 属性中额外把当前对象的分组关联字段 ”所属会议室 meeting_room__c“ 显示在标题上。
