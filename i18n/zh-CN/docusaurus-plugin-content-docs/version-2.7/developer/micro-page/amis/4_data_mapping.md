# 数据映射

数据映射是一种强大的功能，它允许用户通过使用模板字符串，如 `${xxx}` 或 `$xxx`，来获取当前数据链中的变量值。这种方法主要用于模板字符串、自定义 API 请求数据体格式等场景。


### 自定义 API 请求体数据格式
在表单提交接口时，如果 AMIS 默认的请求体数据格式不符合你的预期，你可以使用数据映射来定制所需的数据格式。例如，如果你的后端接口仅支持特定的输入数据
结构，你可以通过配置 API 的 `data` 属性来实现数据格式的自定义。
例如：

```json
{
  "type": "page",
  "body": {
    "type": "form",
    "api": {
      "method": "post",
      "url": "/amis/api/mock2/form/saveForm",
      "data": {
        "userName": "${name}",
        "userEmail": "${email}"
      }
    },
    "body": [
      {
        "type": "input-text",
        "name": "name",
        "label": "姓名："
      },
      {
        "name": "email",
        "type": "input-text",
        "label": "邮箱："
      }
    ]
  }
}
```

### 复杂配置
AMIS 允许使用 & 作为数据映射的键，以展开所配置的变量。这意味着你可以将一个对象中的所有属性展开并拼接在 data 中。
例如：

```json
{
  "type": "page",
  "body": {
    "type": "form",
    "data": {
      "a": "1",
      "b": "2",
      "c": {
        "e": "3",
        "f": "4",
        "g": "5"
      }
    },
    "api": {
      "url": "/amis/api/mock2/form/saveForm",
      "method": "post",
      "data": {
        "name": "${name}",
        "email": "${email}",
        "e": "${c.e}",
        "f": "${c.f}",
        "g": "${c.g}"
      }
    },
    "body": [
      {
        "type": "input-text",
        "name": "name",
        "label": "姓名："
      },
      {
        "name": "email",
        "type": "input-text",
        "label": "邮箱："
      }
    ]
  }
}
```

### 从数组提取值
你可以配置 API 的 data 属性来仅提取数组中的特定变量，并组成新的数组。

```json
{
  "type": "page",
  "body": {
    "type": "form",
    "api": {
      "method": "post",
      "url": "/amis/api/mock2/form/saveForm",
      "data": {
        "items": {
          "$table": {
            "a": "${a}",
            "c": "${c}"
          }
        }
      }
    },
    "body": [
      {
        "type": "input-table",
        "name": "table",
        "label": "table",
        "columns": [
          {
            "label": "A",
            "name": "a"
          },
          {
            "label": "B",
            "name": "b"
          }
        ],
        "value": [
          {
            "a": "a1",
            "b": "b1",
            "c": "c1"
          },
          {
            "a": "a2",
            "b": "b2",
            "c": "c2"
          }
        ]
      }
    ]
  }
}
```

### Namespace
AMIS 支持从不同的命名空间中获取数据，如全局变量、localStorage、sessionStorage 和 cookies。

- window 即全局变量
- ls 即 localStorage， 如果值是 json 对象，可以直接当对象用比如：`${ls:xxxxxlocalStrorageKey.xxxx}`
- ss 即 sessionStorage，同上。
- cookie 即 cookies，同上

比如：

```json
{
  "type": "page",
  "body": "当前页面标题为：<span class='label label-info'>${window:document[title]}</span>"
}
```