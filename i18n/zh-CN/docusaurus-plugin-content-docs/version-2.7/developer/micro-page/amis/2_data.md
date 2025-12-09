# 数据域与数据链

## 基础概念：数据域和数据链
**数据域、数据链**概念，是 amis 中最重要的概念之二。它确保了组件间的数据交互和管理的一致性和可预测性。可以把它比作编程中的作用域概念，其中父组件的数据域对其子组件可见，类似于变量在其作用域内可见一样。以下是一个简化的解释：

在 amis 中，组件被组织成一棵树状结构，每个组件都可以拥有自己的数据域。数据域可以理解为一个存储数据的容器，它决定了哪些数据在组件树的特定部分可用。

![amis-data-scope-data-link](/img/amis/amis-data-scope-data-link.png)

> 参考文档： [amis 数据域、数据链](https://aisuda.bce.baidu.com/amis/zh-CN/docs/concepts/datascope-and-datachain)

## 具备数据域的组件

- App
- Combo
- Cards
- Chart
- CRUD
- CRUD2
- Dialog
- Drawer
- List
- Page
- PaginationWrapper
- Service
- Wizard
- InputArray
- Table
- Table2


## 1. 初始化数据域
数据域可以通过两种主要方式进行初始化

### 组件初始化接口
为组件分配一个 **initApi 属性**，指示AMIS从指定端点获取数据，并用响应填充组件的数据域。
组件中可以通过指定 initApi 方式获取基础数据，假设我们有 API 接口： /amis/api/initData
```json
{
  "type": "page",
  "initApi": "/amis/api/initData",
  "body": "Hello ${text}"
}
```
参考

- Page 组件：  [Page 组件，初始化数据](https://aisuda.bce.baidu.com/amis/zh-CN/components/page#%E9%A1%B5%E9%9D%A2%E5%88%9D%E5%A7%8B%E5%8C%96%E8%AF%B7%E6%B1%82)
- API ： [amis API](https://aisuda.bce.baidu.com/amis/zh-CN/docs/types/api?page=1)

### 显式数据属性配置
静态数据来自于定义组件时配置的数据。
比如当定义一个 Page 组件时，data 属性可以定义被子组件使用的数据
```json
{
  "type": "page",
  "body": [
    {
      "type": "tpl",
      "tpl": "我是${name}，今年 ${age} 岁",
      "id": "u:3a18f25bc36b"
    }
  ],
  "data": {
    "age": 18,
    "name": "李刚"
  },
  "id": "u:randomid"
}
```

> 在同时配置 **初始化接口** 和 **data属性** 时，数据域将会合并data属性值和初始化接口返回的数据


## 2. 更新数据域
部分组件的某些交互或行为会对当前组件的数据域进行更新：

```json
{
  "type": "page",
  "body": {
    "type": "form",
    "api": "/amis/api/mock2/form/saveForm",
    "body": [
      {
        "type": "input-text",
        "name": "name",
        "label": "姓名："
      },
      {
        "type": "input-text",
        "name": "age",
        "label": "年龄："
      },
      {
        "type": "static-tpl",
        "tpl": "生成的id为：${id}"
      }
    ]
  }
}
```
/api/saveForm接口会保存当前表单提交的数据，并返回后端服务生成的id，并返回到前端，格式如下;
```json
{
  "status": 0,
  "msg": "保存成功",
  "data": {
    "id": 1
  }
}
```
这时 amis 将会把data数据与当前form组件的数据域进行**merge**，form组件中的static-tpl组件会根据更新后的数据域，显示id为1。
> 具有类似特征的组件还有Formula等

## 3. 更新数据链

在 AMIS 中，顶层数据域的更新会触发具有数据域的子组件同步更新，以确保数据的一致性。然而，这种全面更新可能会带来不必要的性能损耗。例如，仅更新顶层的 `name` 变量，就会导致所有子组件重新刷新。为了优化这一过程，AMIS 默认会检测两级数据域（直接上层和上上层）的变化来决定是否更新当前层数据。这种机制存在两个潜在问题：

1. **非必要更新**：当前组件可能并不需要响应上层数据的变化，这时候的刷新操作是多余的。
2. **更新不足**：当前组件可能需要响应更高层数据的变化，但默认的检测机制无法获取到最新值。

:::info 引入 `trackExpression` 属性

为了解决这些问题，从 3.2.0 版本开始，AMIS 引入了 `trackExpression` 属性，允许开发者主动配置组件需要关注的上层数据。这样，我们可以：

- 通过将 `trackExpression` 设置为 `"none"`，表明当前组件不追踪任何数据变化。
- 通过将 `trackExpression` 设置为 `"${xxxVariable}"`，指定 `xxxVariable` 变化时更新当前组件的数据链。

`trackExpression` 支持复杂的表达式语法，允许监听多个变量（如 `"${xxx1},${xxx2}"`）或编写条件表达式（如 `"${xxx ? xxx : yyy}"`）。AMIS 会根据表达式的计算结果来决定是否更新数据链。


注意事项：
- 避免在表达式中使用随机函数或当前时间等会导致每次计算结果不同的因素，以避免不必要的数据链更新。
- 如果变量是数组或对象，建议将其转换为 JSON 字符串（如 `${xxxObject | json}`），以提高变化检测的准确性。
- 由于 `trackExpression` 是用于监控上层数据，因此不应在表达式中引用当前层的数据变量。
:::




## 4. 其他

### URL 参数
url 中的Query查询参数会进入顶层数据域，比如如果微页面所在页面为 https://abcd.com/yyyyy?bookId=29891 ， 则 bookId 会在数据域顶层。（顶层数据域也意味着所有组件都能使用 bookId 变量）



