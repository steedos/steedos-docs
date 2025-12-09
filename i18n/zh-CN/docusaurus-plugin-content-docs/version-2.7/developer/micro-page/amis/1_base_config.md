# 配置与组件

欢迎来到AMIS文档。在这一部分，我们将深入探讨schema的核心概念，这是AMIS中定义组件结构和行为的关键元素。
### 最简单的AMIS配置
一个最基本的AMIS配置示例如下：
```json
{
  "type": "page",
  "body": "Hello World!"
}
```
这是一段JSON配置，其核心在于两个字段：**type**和**body**。**type**字段是AMIS节点中最关键的部分，它指示AMIS当前节点需要渲染的是Page组件。而**body**字段则作为Page组件的属性，负责指导组件如何渲染页面内容。
### 组件的核心：Type与属性
在AMIS中，组件的配置总是由**type**字段（标识当前组件）和其他属性构成。例如：
```json
{
  "type": "xxx",
  ...其他属性
}
```
### 组件树：构建复杂界面的基础
让我们来看一个稍微复杂一点的配置：
```json
{
  "type": "page",
  "body": {
    "type": "tpl",
    "tpl": "Hello World!"
  }
}
```
这个配置通过**type**字段指明body内容区内将渲染一个名为Tpl的组件，它是一个模板渲染组件。在**body**中，除了配置对象，还可以是数组，以此来增加更多的组件，如divider和form组件。

### 树形布局：实现复杂页面的关键
AMIS通过树形结构实现复杂页面的制作，例如：
```
Page
 ├── Toolbar
 │ └─ Form 顶部表单项
 ├── Grid // 用于水平布局
 │ ├─ Panel
 │ │ └─ Tabs
 │ │ └─ Chart
 │ └─ Panel
 │ └─ Chart
 └── CRUD
```
通过这种层次化的组合，AMIS能够轻松实现复杂的布局效果。
