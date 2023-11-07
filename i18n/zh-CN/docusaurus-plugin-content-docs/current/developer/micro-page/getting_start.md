---
sidebar_position: 0.2
---

# 快速上手

在本节中，我们将通过示例来介绍如何搭建一个简单的微页面（以应用程序微页面为例），还说明了如何查看组件当前数据。
> 在这个示例中，不用写后端代码，就可以搭建一个自定义页面

> 前提条件
> - 华炎魔方平台
> - 了解华炎魔方 GraphQL 的使用： [华炎魔方 GraphQL 介绍](https://docs.steedos.cn/zh-CN/developer/api/graphql-api)

其中将使用 GraphQL 接口来获取数据，并通过控件将数据内容显示到页面上。

### 创建微页面
目标：创建一个“应用程序”微页面

- 打开设置页面，然后选择 用户界面 -> 微页面 这一菜单
- 选择类型为 “应用程序页面”，点击 “保存” 按钮
- 保存后网页将会自动跳转到新建的微页面详情页
- 点击 右上角“设计器”按钮，进入微页面的设计器。

![gs-00.gif](/img/amis/gs-00.gif)

<br/>
<br/>

### 设计微页面

### 1、配置发送 HTTP 请求

- 从左侧选择拖入 Service 到页面设计器中
> 使用 Service 组件的目的是为了发送 /graphql 的查询 HTTP 请求到华炎魔方后台服务，然后其请求的结果数据可以被子组件使用

- 选中 Service 组件（注意选择时选外层的 Service，不要选择Service内层的“内容”组件）
- 配置发送的 HTTP 请求内容
- 选择 POST 方法，并填入地址发送地址为： /graphql ，发送格式设置为 json
- 配置 /graphql 发送的方法 query 参数
- 保存并发布

```graphql
{
  rows:project(filters: [], top: 5, skip: 0, sort: "created desc"){
  	_id,name,project_code,project_manager,status,deadline,account,open_tasks,open_issues, created
  },
  count:project__count(filters:[])
}
```
![gs-01.gif](/img/amis/gs-01.gif)


<br/>

### 2、检查是否获取数据
目标：检查 HTTP 请求发送情况，并检查组件的数据域
> 这里将会使用到 amis 的调试方式，开启 amis 的调试方式如文档：[amis 调试](https://aisuda.bce.baidu.com/amis/zh-CN/docs/extend/debug#%E5%BC%80%E5%90%AF%E6%96%B9%E6%B3%95) 。这里将会使用第3种，在url上附上amisDebug=1的方式

返回到微页面对象的详情记录页面，点击查看可以查看微页面的显示内容：
这里演示了如何实时检查控件的当前数据

![gs-02.gif](/img/amis/gs-02.gif)

<br/>

### 3、通过文本控件展示数据内容
> 这里将会使用到amis模板，可见： [amis 模板](https://aisuda.bce.baidu.com/amis/zh-CN/docs/concepts/template)

- 在设计器中更改文本控件模板，保存并发布
- 回到查看页面，进行查看


![gs-03.gif](/img/amis/gs-03.gif)

<br/>

### 4、通过表格控件（table）展示数据
> 获取的每条记录数据包括字段：
> - 项目名称 name
> - 项目代码 project_code
> - 创建时间 created


- 拖拽表格控件，到 Service 内容中。注意，不能拖放到根目录
- 编辑列映射，编辑数据 Source 来源
- 保存并发布
- 回到查看页面检查是否正常


![gs-04.gif](/img/amis/gs-04.gif)


## 开启调试


amis 内置了调试工具，可以查看组件内部运行日志、查看数据，方便分析问题，目前在文档右侧就有显示。

* 在任意微页面的地址栏 URL 查询参数中加上 amisDebug=1 ，即可开启。
* 比如 `http://xxx.com/view` 改为 `http://xxx.com/view?amisDebug=1`

> 参考文档：[amis 调试工具](https://aisuda.bce.baidu.com/amis/zh-CN/docs/extend/debug#%E5%BC%80%E5%90%AF%E6%96%B9%E6%B3%95)



![开启调试](/img/amis/amis-debug.gif)

