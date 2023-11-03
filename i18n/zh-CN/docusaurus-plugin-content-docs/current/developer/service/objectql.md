---
title: ObjectQL 
sidebar_position: 50
---

# ObjectQL

`ObjectQL` 是一个为与 Steedos 平台内的数据对象进行交互而设计的查询语言。它与用于关系数据库的 SQL 概念相似，ObjectQL 允许用户对存储为对象的结构化数据执行 CRUD 操作（创建，读取，更新，删除）。

ObjectQL 的核心能力是其跨数据库功能。使用 ObjectQL 语法，您可以同时兼容 MongoDB 和传统的 SQL 数据库。这种多功能性允许无缝集成并与不同的数据库技术进行交互，使开发者能够在不更改查询语言或担心底层数据库的特定细微差别的情况下，在各种系统之间执行查询。

## 对象实例

在调用 ObjectQL 函数之前，您必须首先获取对象实例。

- 在微服务中，您可以使用 `this.getObject(<objectApiName>)` 函数来检索对象。
- 当使用 Steedos Admin 的可视化界面定义触发器时，您可以使用 `object.${objectApiName}` 获取对象。

:::tip
要使用 `this.getObject`，请在 `package.service.js` 中设置 `mixins: [require('@steedos/service-package-loader')]`。
:::


## 核心方法

ObjectQL 微服务支持以下微服务操作，这些操作实现了数据操作（创建，读取，更新，删除）并触发相应的触发器。

### .find

查找多个记录。此操作触发配置的触发函数：beforeFind 和 afterFind。

- **用法**： `.find(query, userSession?)`
- **参数**：
  - query：JSON - 查询参数 [JSON]，可选。
    - fields：Array - 要返回的选定字段，例如：['field1', 'field2']。
    - filters：查询过滤器 - 查询过滤器的数组。
    - sort：String - 排序规则，例如：'name desc'。
    - top：Number - 要返回的记录数。
    - skip：Number - 要跳过的记录数，通常用于分页显示。
  - userSession：可选参数，强制检查用户权限。
- **返回**：记录的数组。如果没有找到，则返回空数组 []。

```js
const res = this.getObject('accounts').find(
  {
    fields: ['name', 'owner'],                      
    filters: ['owner', '=', ctx.meta.user.userId],  
    sort: 'name desc'                               
  },
  ctx.meta.user
);
```


### .findOne

findOne 函数检索单个记录。它触发配置的触发函数 beforeFind 和 afterFindOne。

- **用法**： `.findOne(id, query, userSession?)`
- **参数**：
  - id：Number | String - 您希望查询的数据的 ID。
  - query：JSON - 查询参数 [JSON]。可选。
    - fields：Array - 字段名数组。可选。例如：['field1', 'field2']。
  - userSession：可选参数，强制检查用户权限。
- **返回**：单个记录 [JSON]。


```js
const res = this.getObject('accounts').findOne(
  'CChCmkiHrNeTM9jgA',     
  {
    fields: ['name', 'owner'],  
  },
  ctx.meta.user
);
```


### .insert

此函数插入单个记录。它触发配置的触发函数 beforeInsert 和 afterInsert。在插入特殊记录（如“任务”）后，将向指定人员发送通知。

- **用法**： `.insert(doc, userSession?)`
- **参数**：
  - doc：`Dictionary` 您希望插入的数据。它必须包括对象的所有必需字段。
  - userSession：可选参数，强制检查用户权限。
- **返回**：成功插入的数据。

```js
const res = this.getObject('accounts').insert(
  {
    name: '这是插入数据的名称。'
  },
  ctx.meta.user
);
```

名称字段是账户对象的必填字段，对象之间可能存在差异。下表包含了此对象的各个字段（包括必填字段和系统字段）。

|基本属性        |是否必填        |描述         |
| ----        | ----        | ---- |
| name 	      | &#x2714;    | 添加记录到账户对象时必填。不同对象之间必填字段可能有所不同。 |
| id 	        | &#x2716;    | 如果未提供，系统将自动维护。 |
| space 	    | &#x2716;    | 由系统自动维护。 |
| owner 	    | &#x2716;    | 由系统自动维护。 |
| created_by  | &#x2716;    | 由系统自动维护。 |
| modified_by | &#x2716;    | 由系统自动维护。 |
| created	    | &#x2716;    | 由系统自动维护。 |
| modified	  | &#x2716;    | 由系统自动维护。 |


### .update

此功能用于更新单个记录。将触发为此操作配置的 beforeUpdate 和 afterUpdate 触发函数。更新特定记录（例如“任务”）后，将向指定人员发送通知。

- **用法**： `.update(id, doc, userSession?)`
- **参数**：
  - id：Number | String - 您希望更新的记录的 ID。
  - doc：Dictionary - 包含您希望更新的信息。
  - userSession：可选参数，强制检查用户权限。
- **返回**：更新后的数据。

```js
const res = this.getObject('accounts').update(
  'CChCmkiHrNeTM9jgA', 
  {
    name: '这是更新后的名称。'
  },
  ctx.meta.user
);
```


### .delete

此功能用于删除单个记录。它触发配置的触发函数 beforeDelete 和 afterDelete。在删除特定记录（例如“任务”）后，将向指定人员发送通知。

- **用法**： `.delete(id, userSession?)`
- **参数**：
  - id：Number | String - 您希望删除的记录的 ID。
  - userSession：可选参数，强制检查用户权限。
- **返回**：被删除的数据。

```js
const res = this.getObject('accounts').delete(
  'CChCmkiHrNeTM9jgA', 
  ctx.meta.user
);
```


## 执行权限检查

当您使用 `.find`、`.findOne`、`.insert`、`.update`、`.delete` 方法时，ObjectQL 微服务将自动检查用户权限。如果用户没有适当的权限，这些方法将抛出错误。

确保您在调用这些方法时提供了 `userSession` 参数。如果您忘记提供 `userSession`，则 ObjectQL 服务可能不会执行任何权限检查，从而可能导致安全漏洞。

:::warning 注意
未经适当的权限检查，任何数据操作都可能导致数据泄露或不必要的数据修改。请始终在执行这些操作时进行权限验证。
:::

## 执行触发器

不同于直接的数据库操作，ObjectQL 语法操纵数据库的方式是在调用之前和之后执行[触发器](./action-trigger)。

* `beforeInsert`
* `beforeUpdate`
* `beforeDelete`
* `beforeFind`
* `afterFind`
* `afterInsert`
* `afterUpdate`
* `afterDelete`

## 忽略触发器

ObjectQL 语法执行所有触发器并验证用户权限，这当然不如直接访问数据库那样高效。如果您需要批量修改数据或希望绕过对象触发器执行，您可以使用直接的 CRUD 相关函数，参数保持不变。

- `directFind`
- `directInsert`
- `directUpdate`
- `directDelete`
- `directAggregate`

## 查询过滤器语法

Steedos 使用数组格式定义一个或多个过滤标准。例如，以下过滤器用于查询本月创建并分配给当前用户的数据。

```javascript
filters: [["priority", "=", "high"],["owner","=","{userId}"],["created", "=", this_month]]
filters: [["status", "=", ["closed","open"]]]
filters: [["age", "between", [20,30]]]
```

### 操作

* "=": 等于
* "!=": 不等于
* ">": 大于
* ">=": 大于或等于
* "```": 小于
* "```=": 小于或等于
* "startswith": 以...开始
* "contains": 包含...
* "notcontains": 不包含...
* "between": 在范围内，仅支持数字和日期时间类型

### 组合过滤器

可以使用“and”和“or”操作组合多个过滤器。例如：

* `[ [ "value", ">", 3 ], "and", [ "value", "```", 7 ] ]`
* `[ [ "value", ">", 7 ], "or", [ "value", "```", 3 ] ]`

如果没有指定“and”或“or”操作，系统将默认使用“and”操作执行过滤器。因此，以下两种写法将得到相同的结果。

* `[ [ "value", ">", 3 ], "and", [ "value", "```", 7 ] ]`
* `[ [ "value", ">", 3 ], [ "value", "```", 7 ] ]`

### 查询数组值

当操作符为“=”时，条件将自动拆分为使用“or”操作符的多个过滤条件，类似于实现“in”操作功能。因此，以下两种写法将得到相同的结果。

* `[ [ "status", "in", ["closed","open"] ] ]`
* `[ [ "status", "=", "closed" ], "or", [ "status", "=", "open" ] ]`

当操作符为“!=”时，条件将自动拆分为使用“and”操作符的多个过滤条件，所以以下两种写法将得到相同的结果：

* `[ [ "status", "not in", ["closed","open"]] ]`
* `[ [ "status", "!=", "closed" ], "and", [ "status", "!=", "open" ] ]`

当操作符为“between”时，条件将自动转换为对应“>=”和“```=”操作符的过滤条件。因此，以下条件组将产生相同的结果：

* `[ [ "age", "between", [20,30] ] ]` 等同于 `[ [ "age", ">=", 20 ], "and", [ "age", "```=", 30 ] ]`
* `[ [ "age", "between", [null,30] ] ]` 等同于 `[ [ "age", "```=", 30 ] ]`
* `[ [ "age", "between", [20,null] ] ]` 等同于 `[ [ "age", ">=", 20 ] ]`

### 查询日期时间值

对于日期和时间类型的字段，数据库以 UTC 时间保存它们。对于日期类型字段，保存的时间是 00:00:00。

查询日期和时间类型字段时，您需要在执行查询之前将时间转换为 UTC 格式。

例如，如果您想搜索创建日期在北京时间下午1点之前的文档，您需要在执行查询之前将北京时间转换为格林尼治标准时间。

```javascript
[["created","```=","2019-08-06T07:00:00Z"]]
```
