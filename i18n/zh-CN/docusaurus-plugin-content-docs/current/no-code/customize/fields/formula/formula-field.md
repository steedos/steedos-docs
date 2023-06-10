---
sidebar_position: 1.5
---

# 如何创建公式字段

 ![](https://console.steedos.cn/api/files/images/tHr5Fzev7ykx3sAbq)

* 按照与创建自定义字段相同的方式开始构建一个公式字段，字段类型选择公式。
* 选择公式的数据类型。根据计算的输出值为您的公式选择适当的数据类型。
* 选择数值、金额或百分比数据类型的小数位数，数字长度最长为18位数。
* 如果您的公式引用任何数字、金额或百分比字段，则应选择一个选项以处理空白字段。
* 可以在公式中引用当前对象上的“相关表”或“主表/子表”字段来实现跨对象公式。
* 可以在公式中输入_id来引用当前记录的id值。
* 可以在公式中输入$user变量来引用当前登录用户的相关信息。
* 也可在描述框中输入公式字段描述，单击保存完成操作。


### 重算公式值

对于已经存在的历史记录数据，很多情况下公式字段值不会重新计算，此时您应该选择公式字段后台详细配置页面上的“重算公式值”按钮来手动重新计算该值。这些情况包括但是不限于以下情况：

* 更改公式字段定义（如小数位数，公式内容，数据类型、空白字段处理等）。
* 更改在公式内容中引用字段的相关属性，比如更改其字段类型、小数位数，更改其公式字段的数据类型、公式表达式或其他属性等。

> 在正式环境中请谨慎修改对象的某些字段属性，比如字段类型，字段公式表达式，下拉选择框可选项列表等，因为对于已经存在的历史记录数据可能不会重新触发字段值重算，对于公式字段值，只能通过手动操作这里的“重算公式值”按钮来修正历史数据。


### 使用日期和日期时间公式字段的提示

* 日期和日期时间字段不能交替使用。名称本身不能表示某个字段是日期还是日期时间。例如，创建日期和上次修改日期是日期时间字段，而上次活动日期是日期字段。使用 DATEVALUE 函数可将日期时间字段转换为日期字段。
* 将加和减运算符与日期或日期时间字段结合使用来计算持续时间。例如，从一个日期中减去另一个日期来计算两者之间相差的天数。同样，您可以从一个日期时间中减去另一个日期时间，获得以数字表示的两者之间相差的天数。有关建议的使用方法，请参阅[NOW或TODAY](datetime)。
* 将加和减运算符与数字结合使用，返回其他日期或日期时间。例如，`CreatedDate + 5` 计算记录的创建日期之后五天的日期和时间。注意，表达式返回的数据类型与给定的数据类型相同；日期字段加上或减去某个数字会返回日期，日期时间字段加上或减去某个数字会返回日期时间。
* 在使用小数计算日期时，公式会忽略小数点后的所有数字。例如：
* 公式TEXT(TODAY())将返回当天的日期字符串，比如2020-09-30, TODAY是按utc时间取日期，这点跟TODAY()一样。
  * 公式TODAY() + 1将返回当天日期+1天的日期值，即可以直接用+号运行运算。
  * 公式TODAY() + 0.7将返回当天的日期值，而不是+1天的日期值，因为日期计算时小数部分会被忽略只取整数部分，公式TODAY() + 1.2将返回当天日期+1天的日期值。
  * 公式TODAY() + 1.5 + 0.5或TODAY() + 0.5 + 1.5将返回当天日期+1天，而不是+2天的日期值，因为日期计算时所有的小数都部分都会被忽略不会累加，正确的写法是用括号让数值先计算：TODAY() + (1.5 + 0.5)。
  * 公式NOW() + 1.1将返回当前时间增加1.1天后的时间值，即增加1天2小时24分（1天的0.1）。就是说时间类型是支持小数点计算的，单位是天。
  * 公式T1 - T2，如果以上两个日期时间字段值之差是 5.52，将意味着两个值分隔 5 天、12 小时（1 天的 0.5）和 28 分钟（1 天的 0.02）。
    要先计算两个小数的值，应该用括号将它们组合在一起。例如：
  * TODAY() + 0.5 + 0.5 与 TODAY() + 0 + 0 相同，即今天的日期。
  * TODAY() + (0.5+0.5) 与 TODAY() + 1 相同，即明天的日期。
    关于时区，请参考在公式中使用日期、日期时间和时间值

### 使用数字公式字段的提示

* 在公式中使用百分比字段时，使用百分比的小数形式。例如，`IF(Probability =1...)` 表示 100% 可能性，`IF(Probability =0.9...)`表示 90% 可能性。
* 在公式中将自动编号字段作为文本字段引用。
* 您的公式的输出值必须小于 18 位数。
* 公式中可以包含数字、百分比和货币的混合：`AnnualRevenue / NumberOfEmployees`。
* 公式运算时把公式引用的其他字段作为变量传入以及华炎魔方界面显示公式字段时，都会识别字段上设置的小数位数，并使用四舍五入平分规则处理公式字段值。例如，12.345 变为 12.35 和 −12.345 变为 -12.35。但是公式字段本身的输出值不受这里设置的小数位数影响，所以公式中应该使用。
* ROUND函数来处理计算结果的小数位数。
* 要视任意空白字段为零值，请选择将空白字段视为零。要将这些字段留空，请选择将空白字段视为空白，在华炎魔方低代码中该属性默认为“空白字段视为零”。


### 使用文本公式字段的提示

* 要在公式字段中插入文本，用引号将文本引起来。例如，要显示“CASE: 123”，使用本公式 `“CASE: “& CaseNumber__c.`
* 在引号或反斜线之前使用反斜线 ( \\ ) 字符，可在您的输出值中将其插入为文字值。例如，公式中的`“Trouble\ \Case \"Ticket\": ”` 会在详细信息页面显示 `Trouble\Case “Ticket”:`（暂不支持，即目前无法在公式中编写带引号或反斜线的字符串）

### 使用布尔公式字段的提示

部分函数是不支持输出boolean类型值的，已知不支持的函数有BLANKVALUE、CASE、IF。

比如以下公式配置会报错：

```javascript
IF(location_type = 'Van', true, false)
```


应该使用`ocation_type = 'Van'`来简化该公式。

同样的，以下公式配置也会报错：

```javascript
CASE(Days_Open__c, 1,  true,false)
```


应该使用`Days_Open__c = 1`来简化该公式。


### 使用选项列表公式字段的提示

在公式中使用select字段类型时，有单选和多选两种，分别对应到公式中的单选选项列表`picklist`和多选选项列表`multipicklist`这两种数据类型，只有少量公式函数支持这两种数据类型。

#### 支持单选选项列表的函数

* ISPICKVAL: 将选项列表的值与单个值进行比较。
* CASE：将选项列表的值与多个值进行比较。
* TEXT：返回选项列表值的 API 名称，以便您可在支持文本值的函数（例如 CONTAINS）中使用对值的引用（即使显示值已更改）。
* ISBLANK：判断字段值是否为空。

#### 支持多选选项列表的函数

* INCLUDES：决定多选选项列表字段中选择的任何值是否等于您所指定的文本文字。
* ISBLANK：判断字段值是否为空。


### $user 

可以在公式中输入`$user` 变量来引用当前登录用户的相关信息，作为跨对象公式的一种，你也应该在其后用点符号来扩展引用链，`$user`指向的是`space_users`表而不是`users`表，所以只能从 space_users 表中外键字段开始扩展其引用链，比如`$user.organization.owner.name`，更多可扩展属性请参考 [space_users对象源码](https://github.com/steedos/steedos-platform/blob/master/packages/standard-objects/space_users.object.yml)。

### $userSession

在公式中输入`$userSession` 变量是引用当前登录用户信息的另一种方式，与 `$user` 变量不同，它是一个指向userSession的变量，而 `$user` 是一个指向`space_users`表的跨对象公式。

比如`$userSession.roles`可以获取当前用户所属权限集，`$userSession.is_space_admin`可以获取当前用户是否是工作区管理员。

### 关于公式级联触发的提示

* 在一个公式字段A被另一个公式字段B引用的情况下，当某种原因触发字段A更新重算后，会级联触发公式字段B也更新重算。
* 当多个公式字段之间存在多层级联引用的情况下，其中一个字段被触发更新重算的话，会逐层触发级联更新重算。
* 如果累计汇总字段汇总的是一个公式字段，那么当公式字段值变更时，会触发该汇总字段重新汇总更新值。
* 如果累计汇总字段被一个公式字段引用，那么当汇总字段被更新时，也会触发该公式字段更新重算。

```yaml
公式字段之间如果出现循环引用的话，华炎魔方是能智能识别并阻止相关字段配置生效的。
```