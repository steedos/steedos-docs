# 公式

### 💡 公式语法

公式字段的计算主体是一个 **公式表达式**。表达式必须被 **`${`** 和 **`}`** 字符包裹。

**基本结构：** `${[公式正文]}$`


### 公式正文语法规则

公式正文是位于 `${` 和 `}` 之间的内容，它遵循 JavaScript 表达式语法，支持以下类型：

#### A. 变量引用（字段引用）

在华炎魔方中，**变量名**即为对象的 **API 字段名**。

| 引用类型 | 示例 | 华炎魔方应用场景 |
| :--- | :--- | :--- | 
| **基础引用** | `price * quantity` | 引用当前记录的 `price` 和 `quantity` 字段。 |
| **属性访问** | `customer.name` | 通过 Lookup 字段 `customer` 引用关联客户记录的 `name` 属性。 |
| **索引访问** | `items[0].unit_price` | 引用 `items` 数组中第一个元素的 `unit_price`。 |

#### B. 字面量 (Literal Values)

| 类型 | 示例 | 描述 |
| :--- | :--- | :--- | 
| **数字** | `123`, `123.23` | 用于计算。 |
| **字符串** | `'销售订单'`, `"草稿"` | 必须使用单引号或双引号包裹。 |
| **布尔值** | `true`, `false` | 用于逻辑判断。 |
| **空值** | `null`, `undefined` | 用于检查字段是否为空。 |


#### C. 运算符

公式正文支持完整的 JavaScript 二元和三元运算符。

| 类型 | 运算符 | 示例 |
| :--- | :--- | :--- | 
| **算术** | `+`, `-`, `*`, `/`, `**` (幂) | `(price * 0.8) ** 2` |
| **比较** | `==`, `!=`, `===`, `!==` | `status === 'Completed'` |
| **大小** | `<`, `<=`, `>`, `>=` | `amount >= 10000` |
| **逻辑** | `&&` (且), `\|\|` (或), `? :` (三元) | `amount > 1000 && is_active ? '是' : '否'` |



## ⚙️ 函数调用

在公式正文中，可以直接调用**内置函数**来实现复杂的逻辑、数据转换和格式化。

**调用格式：** `FUNCTION_NAME(argument1, argument2, ...)`

| 分类 | 常用函数 | 示例 |
| :--- | :--- | :--- | 
| **逻辑** | `IF`, `ISBLANK` | `${IF(ISBLANK(memo), '无', memo)}$` |
| **日期** | `DATE_FORMAT`, `DATE_DIFF`, `TODAY` | `${DATE\_DIFF(TODAY(), due\_date, 'day')}$` |
| **文本** | `CONCAT`, `SUBSTR`, `UPPER` | `${CONCAT(code, '-', name)}$` |
| **数学** | `ROUND`, `MIN`, `SUM` | `${ROUND(amount * 0.15, 2)}$` |

### 示例：计算含税总价

| 字段 API 名称 | 示例值 |
| :--- | :--- | :--- | 
| `price` | 100 |
| `quantity` | 5 |
| `tax_rate` | 0.13 |

**公式：** `${(price * quantity) * (1 + tax\_rate)}$`

**返回类型：** **数字** (带两位小数)



## 1. 逻辑函数

### IF

* **语法**：`IF(condition, consequent, alternate)`
* **参数**

  * `condition: expression` 条件表达式（如：`语文成绩 > 80`）
  * `consequent: any` 条件为真时返回值
  * `alternate: any` 条件为假时返回值
* **返回**：`any`
* **说明**：满足 `condition` 返回 `consequent`，否则返回 `alternate`，支持嵌套。
* **等价写法**：`condition ? consequent : alternate`

### AND

* **语法**：`AND(expression1, expression2, ...expressionN)`
* **参数**：`conditions: ...expression` 多个条件表达式
* **返回**：`boolean`
* **说明**：全部为真返回 `true`，否则 `false`。
* **等价写法**：`a && b && ...`

### OR

* **语法**：`OR(expression1, expression2, ...expressionN)`
* **参数**：`conditions: ...expression`
* **返回**：`boolean`
* **说明**：任意为真返回 `true`，否则 `false`。
* **等价写法**：`a || b || ...`

### XOR

* **语法**：`XOR(condition1, condition2, ...conditionN)`
* **参数**：`condition: ...expression`
* **返回**：`boolean`
* **说明**：多个条件中为真的个数为**奇数**时返回 `true`。
* **示例**：`XOR(语文成绩 > 80, 数学成绩 > 80, 英语成绩 > 80)`

### IFS

* **语法**：`IFS(condition1, result1, condition2, result2, ...conditionN, resultN)`
* **参数**

  * `condition: ...expression` 条件
  * `result: ...any` 返回值
* **返回**：`any`（命中第一个条件的结果；均未命中返回 `false`）
* **说明**：相当于多段 `else if` 的合并，参数需按「条件/结果」成对传入。
* **示例**：`IFS(语文成绩 > 80, "优秀", 语文成绩 > 60, "良", true, "继续努力")`

---

## 2. 数学函数

### ABS

* **语法**：`ABS(num)` → `number`
* **说明**：绝对值。

### MAX / MIN / SUM / AVG

* **语法**

  * `MAX(num1, ...numN)` 或 `MAX([num1, ...])`
  * `MIN(num1, ...numN)` 或 `MIN([num1, ...])`
  * `SUM(num1, ...numN)` 或 `SUM([num1, ...])`
  * `AVG(num1, ...numN)` 或 `AVG([num1, ...])`
* **返回**：`number`
* **说明**：最大/最小/求和/平均；单参且为数组时处理数组。

### INT

* **语法**：`INT(num)` → `number`
* **说明**：向下取整为最接近的整数。

### MOD

* **语法**：`MOD(num, divisor)` → `number`
* **说明**：取余（被除数/除数）。

### PI

* **语法**：`PI()` → `number`
* **说明**：圆周率常量。

### ROUND / FLOOR / CEIL

* **语法**

  * `ROUND(num[, numDigits=2])`
  * `FLOOR(num[, numDigits=2])`
  * `CEIL(num[, numDigits=2])`
* **返回**：`number`
* **说明**：四舍五入/向下取整/向上取整到指定小数位。

### SQRT

* **语法**：`SQRT(num)` → `number`
* **说明**：开平方（`num` 应为非负数）。

### DEVSQ / AVEDEV / HARMEAN / LARGE

* **语法**

  * `DEVSQ(num1, ...numN)`：偏差平方和
  * `AVEDEV(num1, ...numN)`：平均绝对偏差
  * `HARMEAN(num1, ...numN)`：调和平均
  * `LARGE(array, k)`：第 `k` 大
* **返回**：`number`

### UPPERMONEY

* **语法**：`UPPERMONEY(num)` → `string`
* **说明**：转中文大写金额。

### RAND

* **语法**：`RAND()` → `number`
* **说明**：返回 `[0, 1)` 随机数；每次触发计算会变化。
* **示例**：`RAND() * 100`

### LAST

* **语法**：`LAST(array)` → `any`
* **说明**：取数组最后一个元素。

### POW

* **语法**：`POW(base, exponent)` → `number`
* **说明**：指数幂；参数不合法可能返回 `base`，结果不合法返回 `NaN`。

---

## 3. 文本函数

### LEFT / RIGHT / MID

* **语法**

  * `LEFT(text, len)`：左侧截取
  * `RIGHT(text, len)`：右侧截取
  * `MID(text, from, len)`：从 `from` 起截取 `len`
* **返回**：`string`

### LEN / LENGTH

* **语法**

  * `LEN(text)` → `number`：文本长度
  * `LENGTH(textArr)` → `Array<number>`：批量计算长度

### ISEMPTY

* **语法**：`ISEMPTY(text)` → `boolean`
* **说明**：判断文本是否为空。

### CONCATENATE

* **语法**：`CONCATENATE(text1, ...textN)` → `string`
* **说明**：拼接文本。

### CHAR

* **语法**：`CHAR(code)` → `string`
* **示例**：`CHAR(97)` 等价 `"a"`。

### LOWER / UPPER / UPPERFIRST / CAPITALIZE

* **语法**

  * `LOWER(text)`：转小写
  * `UPPER(text)`：转大写
  * `UPPERFIRST(text)`：首字母大写
  * `CAPITALIZE(text)`：标题化（如 `star` → `Star`）

### PADSTART

* **语法**：`PADSTART(text, num, pad)` → `string`
* **示例**：`PADSTART("6", 2, "0")` → `"06"`

### ESCAPE / STRIPTAG / TRIM / LINEBREAK

* **语法**

  * `ESCAPE(text)`：HTML 转义
  * `STRIPTAG(text)`：去除 HTML 标签
  * `TRIM(text)`：去前后空格
  * `LINEBREAK(text)`：换行转 `<br/>`

### TRUNCATE

* **语法**：`TRUNCATE(text, maxLen)` → `string`
* **示例**：`TRUNCATE("amis.baidu.com", 6)` → `"amis..."`

### BEFORELAST / SPLIT / JOIN

* **语法**

  * `BEFORELAST(text, delimiter)`：取最后一次分隔符之前内容
  * `SPLIT(text, delimiter)` → `Array<string>`：分割
  * `JOIN(arr, separator)` → `string`：数组转字符串
* **示例**：`SPLIT("a,b,c", ",")` → `["a","b","c"]`

### STARTSWITH / ENDSWITH / CONTAINS

* **语法**

  * `STARTSWITH(text, startString)` → `boolean`
  * `ENDSWITH(text, endString)` → `boolean`
  * `CONTAINS(text, searchText)` → `boolean`

### REPLACE / SEARCH / BASENAME / UUID

* **语法**

  * `REPLACE(text, search, replace)`：全量替换
  * `SEARCH(text, search, start)` → `number`：返回命中位置
  * `BASENAME(path)` → `string`：返回文件名
  * `UUID(length=32)` → `string`：生成 UUID 字符串

---

## 4. 日期函数

### DATE / TODAY / NOW

* **语法**

  * `DATE(value)`：创建日期对象（字符串或数值；月份从 0 开始）
  * `TODAY()`：今天日期
  * `NOW()`：当前日期时间

### TIMESTAMP

* **语法**：`TIMESTAMP(date[, format="X"])` → `number`
* **说明**：时间戳；毫秒用 `'x'`，秒用 `'X'`。

### WEEKDAY / WEEK

* **语法**

  * `WEEKDAY(date[, type=1])` → `number`
  * `WEEK(date[, isISO])` → `number`
* **说明**：星期几 / 当年第几周。

### DATETOSTR / STRTODATE

* **语法**

  * `DATETOSTR(date, format)` → `string`：格式化日期
  * `STRTODATE(value[, format=""])` → `date`：字符串转日期

### DATERANGESPLIT

* **语法**：`DATERANGESPLIT(dateRange, key[, format[, delimiter=',']])`
* **说明**：从日期范围字符串取开始/结束。

### STARTOF / ENDOF

* **语法**

  * `STARTOF(date[, unit="day"][, format])`
  * `ENDOF(date[, unit="day"][, format])`
* **说明**：取指定粒度的起始/结束。

### YEAR / MONTH / DAY / HOUR / MINUTE / SECOND

* **语法**：`YEAR(date)` 等 → `number`
* **说明**：提取年月日时分秒。

### YEARS / DAYS / HOURS / MINUTES

* **语法**：`DAYS(endDate, startDate)` 等 → `number`
* **说明**：计算时间差。

### DATEMODIFY

* **语法**：`DATEMODIFY(date, num, unit)` → `date`
* **说明**：日期加减（年/月/天等）。

### ISBEFORE / ISAFTER / ISSAMEORBEFORE / ISSAMEORAFTER / BETWEENRANGE

* **语法**

  * `ISBEFORE(a, b[, unit="day"])`
  * `ISAFTER(a, b[, unit="day"])`
  * `ISSAMEORBEFORE(a, b[, unit="day"])`
  * `ISSAMEORAFTER(a, b[, unit="day"])`
  * `BETWEENRANGE(date, [start, end][, unit="day"][, inclusivity="[]"])`
* **返回**：`boolean`

---

## 5. 数组函数

### COUNT

* **语法**：`COUNT(arr)` → `number`
* **说明**：数组长度。

### ARRAYMAP / ARRAYFILTER / ARRAYFIND / ARRAYFINDINDEX

* **语法**

  * `ARRAYMAP(arr, item => expr)` → `Array<any>`
  * `ARRAYFILTER(arr, item => expr)` → `Array<any>`
  * `ARRAYFIND(arr, item => expr)` → `any`
  * `ARRAYFINDINDEX(arr, item => expr)` → `number`
* **说明**：需配合箭头函数，且仅支持**单表达式**写法。

### ARRAYSOME / ARRAYEVERY / ARRAYINCLUDES

* **语法**

  * `ARRAYSOME(arr, item => expr)` → `boolean`
  * `ARRAYEVERY(arr, item => expr)` → `boolean`
  * `ARRAYINCLUDES(arr, item)` → `boolean`

### COMPACT / CONCAT / UNIQ

* **语法**

  * `COMPACT(arr)`：过滤 `false/null/0/""`
  * `CONCAT(arr1, arr2, ...)`：数组合并
  * `UNIQ(arr[, field])`：数组去重（可按字段）

---

## 6. 编码函数

### ENCODEJSON / DECODEJSON

* **语法**

  * `ENCODEJSON(obj)` → `string`
  * `DECODEJSON(str)` → `object`

---

## 7. 其他函数

### GET

* **语法**：`GET(obj, path[, defaultValue])` → `any`
* **说明**：按路径取值；取不到返回 `defaultValue`。

### ISTYPE

* **语法**：`ISTYPE(value, type)` → `boolean`
* **说明**：类型判断，支持：`string`、`number`、`array`、`date`、`plain-object`。
