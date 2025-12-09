# 模板渲染

欢迎来到AMIS文档。在本节中，我们将探讨AMIS中的模板渲染功能，这是一个借鉴其他模板引擎的功能，旨在提供渲染文本和数据结构的灵活性。
### 模板字符串：简单与强大的结合
AMIS支持模板字符串，允许您直接在文本中嵌入变量。以下是如何输出简单文本：

```json
{
  "type": "page",
  "data": {
    "text": "World!"
  },
  "body": "Hello ${text}"
}
```
输出为：
```text
Hello World!
```
### 模板字符串
* 在解析模板字符串时，如果遇到 $ 字符，AMIS 会尝试解析该变量并替换模板变量。
例如 ：`name` 变量的值为 `Rick` ，模板为 `my name is ${name}`，则最终模板会被解析为 `my name is Rick`
```json
{
  "type": "page",
  "data": {
    "name": "Rick"
  },
  "body": "my name is ${name}"
}
```
* 支持链式取值：AMIS 支持使用 `.` 进行链式取值，这意味着你可以访问嵌套对象中的属性。比如：
```json
{
  "type": "page",
  "data": {
    "name": "rick",
    "company": {
      "name": "baidu",
      "department": "it"
    }
  },
  "body": {
    "type": "tpl",
    "tpl": "my name is ${name}, I work for ${company.name}"
  }
}
```

### 使用模板字符串渲染HTML
要渲染HTML，请使用相同的数据映射语法：`${xxx}`。如果变量本身包含HTML，请应用`raw`过滤器以正确渲染。

```json
{
  "data": {
    "text": "<b>World!</b>"
  },
  "type": "page",
  "body": "<h1>Hello</h1> <span>${text|raw}</span>"
}
```


### 表达式
支持简单的表达式和公式调用。例如：
```json
{
  "type": "tpl",
  "tpl": "${xxx == 1 ? 'One' : 'Others'}"
}
```
详见表达式章节
### JavaScript模板引擎
AMIS还支持JavaScript模板引擎，内部使用lodash template实现。注意访问数据域变量的区别：使用`data.xxx`而不是`${xxx}`。这个引擎将数据域视为当前代码的执行上下文，需要使用`data.xxx`进行值检索。

语法类似于EJS，`<% ... %>`表示JavaScript语句。熟悉JavaScript使页面渲染变得轻而易举。此外，还有几个JavaScript方法可用，如 `formatDate`、`formatTimeStamp`、`formatNumber`和`countDown`。

:::tip
模板字符串和JavaScript模板引擎不能交替使用。例如：
```json
{
  "type": "tpl",
  "tpl": "${data.xxx === 'a'}" // 错误！
}
{
  "type": "tpl",
  "tpl": "${xxx === 'a'}" // 正确
}
```
:::

## 过滤器


数据过滤器是数据映射功能的一种扩展，允许对获取的数据进行额外处理。

* `基本用法`： `${xxx |filter1 }`，  比如 `{name|trim}`
* `过滤器串联`：可以将多个过滤器串联使用，如 `${xxx | filter1 | filter2 | ...}`，以实现复杂的数据处理流程。
* `函数调用语法`：建议使用函数调用语法进行数据过滤，例如将 `${xxx | html}` 替换为 `${html(xxx)}`。当然可以嵌套调用 `${trim(html(xxx))}`

### 过滤器参数
过滤器中有参数可以写入 ：
`${变量 | 过滤器:参数1:参数2:.....}`
如果我想把输入时间转换为特定格式，则需要指定参数例如：YYY-MM-dd
```json
{
  "type": "page",
  "data": {
    "now": 1586865590
  },
  "body": {
    "type": "tpl",
    "tpl": "now is ${now|date:YYYY-MM-DD}"
  }
}
```

当然也可以多过滤器，多参数：
```
${xxx [|filter1[:arg1][:arg2]...[|filter2...]] }
```

## 过滤器列表文档

过滤器有很多：

> html, raw, json, toJson, toInt, toFloat, date, now, toDate, dateModify, fromNow, number, trim, percent, round, truncate, url_encode, url_decode, default, split, join, sortBy, topAndOther, unique, first, last, nth, pick, objectToArray, plus, minus, times, division, sum, abs, duration, bytes, asArray, lowerCase, upperCase, substring, base64Encode, base64Decode, isTrue, isFalse, isMatch, notMatch, isEquals, notEquals, map, filter

可以见 [AMIS 管网 - 过滤器](https://aisuda.bce.baidu.com/amis/zh-CN/docs/concepts/data-mapping#%E8%BF%87%E6%BB%A4%E5%99%A8)