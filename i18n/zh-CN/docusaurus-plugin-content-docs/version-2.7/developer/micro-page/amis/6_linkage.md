# 联动机制

在 AMIS 中，联动机制是实现页面动态交互的重要功能。通过联动，可以根据某些条件控制组件的显示、隐藏、禁用状态，或者触发接口请求。联动配置通常基于表达式来实现。
### 基本联动
基本联动主要涉及组件的显示、隐藏和禁用状态。例如，当一个单选按钮选择特定选项时，某个文本框显示或隐藏；或者当选择某个选项时，另一个文本框变为禁用状态。在表单项联动中，隐藏的表单项值默认不会从当前数据域中删除，但可以通过添加 `clearValueOnHidden` 属性在提交时去除隐藏字段。

假设我们有一个表单，其中包含一个单选按钮（radio）和两个文本框（text1 和 text2）。我们希望实现以下联动效果：

1. 只要当radio选中类型1时，才会显示text1；
2. 当radio选中类型2时，text2将会变为禁用状态

为了实现这个联动效果，我们可以使用表达式来配置联动规则。以下是相应的 JSON 配置示例：
```json
{
  "type": "page",
  "body": {
    "type": "form",
    "body": [
      {
        "type": "radios",
        "name": "foo",
        "label": false,
        "options": [
          {
            "label": "类型1",
            "value": 1
          },
          {
            "label": "类型2",
            "value": 2
          }
        ]
      },
      {
        "type": "input-text",
        "name": "text1",
        "label": false,
        "placeholder": "选中 类型1 时可见",
        "visibleOn": "${foo == 1}"
      },
      {
        "type": "input-text",
        "name": "text2",
        "label": false,
        "placeholder": "选中 类型2 时不可点",
        "disabledOn": "${foo == 2}"
      }
    ]
  }
}
```
在这个配置中：

- `visibleOn` 属性用于控制 text1 文本框的显示。当单选按钮的值为 "type1" 时，text1 文本框将显示。
- `disabledOn` 属性用于控制 text2 文本框的禁用状态。当单选按钮的值为 "type2" 时，text2 文本框将变为禁用状态。

通过这样的配置，我们就实现了一个基本的联动效果，使得表单的行为可以根据用户的选择动态变化。

### 接口联动
接口联动是另一种常见场景，例如，当选择一个下拉选项时，触发另一个下拉选项的接口重新请求，返回不同的选项。这是通过在初始化接口链接中使用数据映射获取参数实现的。当引用的变量值发生变化时，接口会自动重新请求。接口联动通常适用于初始化接口，如表单的 `initApi`、选择组件的 `source` 选项源接口 URL 等。

假设我们有一个表单，其中包含一个下拉选择框（select）和一个级联的下拉选择框（cascader）。我们希望实现以下联动效果：

1. 当用户在第一个下拉选择框中选择一个选项时，级联的下拉选择框会根据所选项触发一个接口请求，动态加载对应的选项。

为了实现这个联动效果，我们可以在级联的下拉选择框的 `source` 属性中使用数据映射来动态构建接口请求。以下是相应的 JSON 配置示例：
```json
{
  "type": "page",
  "body": {
    "title": "",
    "type": "form",
    "mode": "horizontal",
    "body": [
      {
        "label": "选项1",
        "type": "radios",
        "name": "a",
        "inline": true,
        "options": [
          {
            "label": "选项A",
            "value": 1
          },
          {
            "label": "选项B",
            "value": 2
          },
          {
            "label": "选项C",
            "value": 3
          }
        ]
      },
      {
        "label": "选项2",
        "type": "select",
        "size": "sm",
        "name": "b",
        "source": "/amis/api/mock2/options/level2?a=${a}",
        "description": "切换<code>选项1</code>的值，会触发<code>选项2</code>的<code>source</code> 接口重新拉取"
      }
    ],
    "actions": []
  }
}
```
在这个配置中：

- 第一个下拉选择框（select）允许用户选择一个分类。
- 第二个下拉选择框（select）的 `source` 属性使用了数据映射 `${category}` 来动态构建接口请求的 URL。当 `category` 的值发生变化时（即用户在第一个下拉选择框中选择了一个选项），第二个下拉选择框会根据新的 URL 触发接口请求，加载对应分类的项目选项。

通过这样的配置，我们就实现了一个接口联动效果，使得组件的数据可以根据用户的选择动态更新。
#### 配置请求条件
默认情况下，变量变化时总是会请求联动的接口。但可以配置请求条件，只有当当前数据域中某个值符合特定条件时才请求该接口。
假设我们有一个表单，其中包含一个文本输入框（text）和一个下拉选择框（select）。我们希望实现以下联动效果：

- 只有选项1选择B的时候，才触发选项2的source接口重新拉取

通过这样的配置，我们就实现了一个带有请求条件的接口联动效果，使得组件的数据可以根据用户输入的内容和满足的条件动态更新。
```json
{
  "type": "page",
  "body": {
    "title": "",
    "type": "form",
    "mode": "horizontal",
    "body": [
      {
        "label": "选项1",
        "type": "radios",
        "name": "a",
        "inline": true,
        "options": [
          {
            "label": "选项A",
            "value": 1
          },
          {
            "label": "选项B",
            "value": 2
          },
          {
            "label": "选项C",
            "value": 3
          }
        ]
      },
      {
        "label": "选项2",
        "type": "select",
        "size": "sm",
        "name": "b",
        "source": {
          "method": "get",
          "url": "/amis/api/mock2/options/level2?a=${a}",
          "sendOn": "this.a === 2"
        },
        "description": "只有<code>选项1</code>选择<code>B</code>的时候，才触发<code>选项2</code>的<code>source</code>接口重新拉取"
      }
    ],
    "actions": []
  }
}
```


#### 主动触发
有时数据变化会频繁触发接口请求。为了避免这种情况，可以配置主动触发。例如，配置一个搜索按钮，只有点击该按钮时，才会发送关键词值给目标组件，重新拉取选项。

假设我们有一个表单，其中包含一个文本输入框（text）用于输入搜索关键词，和一个按钮（button）。我们希望实现以下联动效果：

1. 用户输入关键词后，不会立即触发搜索。只有当用户点击搜索按钮时，才会根据输入的关键词触发接口请求，动态加载搜索结果。

为了实现这个联动效果，我们可以配置按钮的点击事件来触发接口请求。以下是相应的 JSON 配置示例：
```json
{
  "type": "page",
  "body": {
    "type": "form",
    "name": "my_form",
    "body": [
      {
        "type": "input-text",
        "name": "keyword",
        "addOn": {
          "label": "搜索",
          "type": "button",
          "actionType": "reload",
          "target": "my_form.select"
        }
      },
      {
        "type": "select",
        "name": "select",
        "label": "Select",
        "source": {
          "method": "get",
          "url": "/amis/api/mock2/form/getOptions?waitSeconds=1",
          "data": {
            "a": "${keyword}"
          }
        }
      }
    ]
  }
}
```
在这个配置中：

- 文本输入框（text）允许用户输入搜索关键词。
- 按钮（button）配置了点击事件，当点击时会根据文本输入框中的关键词触发接口请求。
- `actionType` 设置为 "ajax" 表示触发一个 AJAX 请求。
- `api` 属性使用了数据映射 `${keyword}` 来动态构建接口请求的 URL。
- `target` 属性指定了请求结果应该更新的目标组件，这里是名为 "result" 的下拉选择框。

通过这样的配置，我们就实现了一个主动触发的联动效果，使得组件的数据可以根据用户的操作（点击按钮）动态更新。
#### 表单提交返回数据
表单提交后，返回的结果会合并到当前表单数据域。因此，可以基于返回结果实现提交按钮后显示结果的效果。
### 组件间联动
组件间联动可能会跨越不同组件。例如，有一个表单组件和一个列表组件，希望将表单提交的数据用作列表的查询条件并请求列表接口。这时，可以通过设置目标组件的 `name` 属性和表单组件的 `target` 属性来实现联动。

#### 动态目标
在某些情况下，目标组件可能存在多份，通过固定名字无法找到对应的组件。这时，可以使用动态名字，如 `my-service-${id}`，将行数据中的动态 `id` 设置进去。
通过这些联动机制，AMIS 提供了强大的工具来实现页面的动态交互和数据操作，从而构建出既丰富又流畅的用户体验。


