# 表达式

在 AMIS 中，表达式是一个强大的工具，它允许用户在不同的场景中动态地处理数据。表达式可以用于模板变量的取值、API 地址参数的取值、数据映射、组件的显示与隐藏条件、表单默认值等等。AMIS 支持两种表达式语法：一种是纯 JavaScript 表达式，另一种是使用 ${} 包裹的表达式。


## 表达式语法

表达式是动态数据处理的核心，它由三个基本部分组成：开始字符 `${`，表达式正文，以及结束字符 `}`。表达式正文遵循一系列语法规则，包括：
### 变量与属性访问

- 单一变量：`xxx变量`
- 对象属性访问：`xxx变量.xxx属性` 或 `xxx变量[xxx属性]`
### 基本数据类型

- 布尔值：`true` 或 `false`
- 空值：`null`
- 未定义：`undefined`
- 数字：整数 `123` 或 浮点数 `123.23`
- 字符串：双引号 `"string"` 或 单引号 `'string'`
- 字符模板：``my name is ${name}``
- 数组：`[1, 2, 3]`
- 对象：`{a: 1, b: 2}` 或 结合使用如 `{a: 1, b: [1, 2, 3], [key]: yyy变量}`
### 表达式运算

- 三元表达式：`xx变量 == 1 ? 2 : 3`
- 二元表达式：逻辑运算 (`&&`, `||`), 比较运算 (`==`, `!=`, `===`, `!==`, `<`, `<=`, `>`, `>=`), 算术运算 (`+`, `-`, ``*, `/`, ```), 位运算 (`|`, `^`, `&`, `<<`, `>>`, `>>>`)
- 一元表达式：逻辑非 (`!xx变量`), 位非 (`~xx变量`), 一元加减 (`+xx变量`, `-xx变量`)
### 函数与箭头函数

- 函数调用：`SUM(1, 2, 3)`
- 箭头函数：`() => abc`（仅支持单表达式）注这个箭头函数只支持单表达式，不支持多条语句。主要配置其他函数使用如：ARRAY_MAP(arr, item => item.abc)


### 括号与运算优先级

- 括号：`(10 - 2) * 3` 用于修改运算优先级

### 特殊变量名
默认变量名不支持特殊字符比如 `${ xxx.yyy }` 意思取 xxx 变量的 yyy 属性，如果变量名就是 xxx.yyy 怎么获取？这个时候需要用到转义语法，如：`${ xxx\.yyy }`


AMIS 还集成了许多内置函数

- 逻辑函数：IF、AND、OR、XOR、IFS
- 数学函数：ABS、MAX、MIN、SUM、INT、MOD、PI、ROUND、FLOOR、CEIL、SQRT、AVG、DEVSQ、AVEDEV、HARMEAN、LARGE、UPPERMONEY、RAND、LAST
- 文本函数：LEFT、RIGHT、LEN、LENGTH、ISEMPTY、CONCATENATE、CHAR、LOWER、UPPER、UPPERFIRST、PADSTART、CAPITALIZE、ESCAPE、TRUNCATE、BEFORELAST、SPLIT、TRIM、STRIPTAG、LINEBREAK、STARTSWITH、ENDSWITH、CONTAINS、REPLACE、SEARCH、MID、BASENAME
- 日期函数：DATE、TIMESTAMP、TODAY、NOW、WEEKDAY、WEEK、DATETOSTR、DATERANGESPLIT

以及更多函数可以在 [这里](https://aisuda.bce.baidu.com/amis/zh-CN/docs/concepts/expression#%E6%95%B0%E7%BB%84) 找到

这些函数可以嵌套使用，参数支持常量及变量，极大地增强了表达式的功能性和灵活性。

### 示例：处理文本
假设我们有一个变量 `userName`，其值为 `"john_doe"`，我们想要进行以下操作：

1. 将文本转换为大写。
2. 替换 `"_"` 为 `" "`.
3. 将结果添加到 `"Welcome, "` 后面。

使用 AMIS 表达式，我们可以这样写： `${"Welcome, " + REPLACE(UPPER(userName), "_", " ")}`
配置为
```json
{
  "type": "page",
  "data": {
    "userName": "john_doe"
  },
  "body": [
    "${\"Welcome,\" + REPLACE(UPPER(userName), \"_\", \".\")}"
  ]
}
```

这个表达式首先使用 `UPPER` 函数将 `userName` 转换为大写，然后使用 `REPLACE` 函数将 `"_"` 替换为 `" "`。最后，将处理后的文本添加到 `"Welcome, "` 后面。执行上述表达式后，最终结果将是：

`Welcome, JOHN DOE`


这个例子展示了如何使用 AMIS 表达式和函数来进行简单的文本处理。




