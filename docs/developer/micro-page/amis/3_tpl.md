# Template Rendering

Welcome to the AMIS documentation. In this section, we will explore the template rendering feature in AMIS, which is a function borrowed from other template engines, aimed at providing flexibility in rendering text and data structures.

### Template Strings: A Combination of Simplicity and Power
AMIS supports template strings, allowing you to embed variables directly into the text. Here's how to output simple text:

```json
{
  "type": "page",
  "data": {
    "text": "World!"
  },
  "body": "Hello ${text}"
}
```

The output will be:

```text
Hello World!
```

### Template Strings
* When parsing template strings, if the $ character is encountered, AMIS will attempt to parse the variable and replace the template variable.
For example, if the value of the `name` variable is `Rick`, and the template is `my name is ${name}`, then the final template will be parsed as `my name is Rick`.

```json
{
  "type": "page",
  "data": {
    "name": "Rick"
  },
  "body": "my name is ${name}"
}
```

* Supports chained value access: AMIS supports using `.` for chained value access, meaning you can access properties within nested objects. For example:

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

### Rendering HTML with Template Strings
To render HTML, use the same data mapping syntax: `${xxx}`. If the variable itself contains HTML, apply the `raw` filter for correct rendering.

```json
{
  "data": {
    "text": "<b>World!</b>"
  },
  "type": "page",
  "body": "<h1>Hello</h1> <span>${text|raw}</span>"
}
```

### Expressions
Supports simple expressions and formula calls. For example:

```json
{
  "type": "tpl",
  "tpl": "${xxx == 1 ? 'One' : 'Others'}"
}
```

See the expressions chapter for details.

### JavaScript Template Engine
AMIS also supports the JavaScript template engine, internally using lodash template. Note the difference in accessing data scope variables: use `data.xxx` instead of `${xxx}`. This engine treats the data scope as the current code execution context, requiring `data.xxx` to retrieve values.

The syntax is similar to EJS, `<% ... %>` indicates JavaScript statements. Familiarity with JavaScript makes page rendering a breeze. Additionally, several JavaScript methods are available, such as `formatDate`, `formatTimeStamp`, `formatNumber`, and `countDown`.

:::tip
Template strings and the JavaScript template engine cannot be used interchangeably. For example:

```json
{
  "type": "tpl",
  "tpl": "${data.xxx === 'a'}" // Wrong!
}
{
  "type": "tpl",
  "tpl": "${xxx === 'a'}" // Correct
}
```
:::

## Filters

Data filters are an extension of the data mapping feature, allowing for additional processing of retrieved data.

* `Basic Usage`: `${xxx |filter1 }`, for example `{name|trim}`
* `Filter Chaining`: Multiple filters can be chained, such as `${xxx | filter1 | filter2 | ...}`, to implement complex data processing flows.
* `Function Call Syntax`: It is recommended to use function call syntax for data filtering, for example, replacing `${xxx | html}` with `${html(xxx)}`. Of course, nested calls like `${trim(html(xxx))}` are possible.

### Filter Parameters
Filters can have parameters written into them:
`${variable | filter:parameter1:parameter2:.....}`
If I want to convert the input time to a specific format, I need to specify parameters such as: YYYY-MM-DD

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

Of course, you can also use multiple filters with multiple parameters:

```
${xxx [|filter1[:arg1][:arg2]...[|filter2...]] }
```

## Filter List Documentation

There are many filters:

> html, raw, json, toJson, toInt, toFloat, date, now, toDate, dateModify, fromNow, number, trim, percent, round, truncate, url_encode, url_decode, default, split, join, sortBy, topAndOther, unique, first, last, nth, pick, objectToArray, plus, minus, times, division, sum, abs, duration, bytes, asArray, lowerCase, upperCase, substring, base64Encode, base64Decode, isTrue, isFalse, isMatch, notMatch, isEquals, notEquals, map, filter

For more details, see [AMIS Official Website - Filters](https://aisuda.bce.baidu.com/amis/zh-CN/docs/concepts/data-mapping#%E8%BF%87%E6%BB%A4%E5%99%A8)
