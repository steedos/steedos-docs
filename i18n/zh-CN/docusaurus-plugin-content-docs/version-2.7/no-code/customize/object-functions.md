# 对象函数

在Steedos中，用户可以为每一个对象创建函数。函数主要用于实现用户实际业务需求。

比如：用户点击'任务完成'按钮时，调用函数更新任务完成状态。

#### 管理函数

使用函数提高开发效率。在某个对象管理详细页的对象函数子表栏，您可以：

* 创建函数
* 单击函数名称旁边的编辑来修改函数
* 单击函数名称旁边的删除来删除函数
* 单击函数名称以查看更多详细信息

### 创建函数

* 在“设置”应用中点击“对象设置”-“对象”并点击某条详细记录，在对象详细信息页面找到对象函数子表，单击新建。
* 为函数输入API名称，该名称作为API名称是唯一标识符，只能包含小写字母、数字，必须以字母开头，不能以下划线字符结尾或包含两个连续的下划线字符。
* 如果想立即启用请勾选上已启用。
* 在代码框中输入JS代码。
* 如果想函数允许使用API接口访问请勾选上启用API，支持`POST`和`GET`访问，格式为`{ROOT_URL}/api/v1/:objectName/functions/:functionApiName`。
* 可以为函数输入备注。
* 设置完成后点击保存。

#### 使用函数

* 要使用函数，请先确保函数已经启用。
* 可以通过API接口访问来测试函数效果。

#### 代码编写提示

* 函数提供了可直接使用的变量 `global`、`objects`、`ctx`。
* `global._`：[一个现代的JavaScript实用程序库，提供模块化、性能和附加功能](https://lodash.com/docs/)。
* `global.moment`：[用于解析、验证、操作和格式化日期的 JavaScript 日期库](https://momentjs.com/docs/)。
* `global.validator`：[字符串验证器和清理程序库](https://www.npmjs.com/package/validator)。
* `objects`提供对象元数据，可执行对象的增删改查，如查询已归档的合同：
```javascript
const contractDocs = await objects.contracts.find({ filters: [ ["is_archived", "=", true] ]});
```
* `ctx.input`：函数的参数，如果函数启用了API，则包含HTTP请求的`Body`、`Query`、`Params`中的内容。
* `ctx.params.userId`：当前用户ID。
* `ctx.params.spaceId`：当前工作区ID。
* `ctx.broker`：Broker实例，可用于调用Action。
* `ctx.getObject`：获取对象实例，与objects类似，如查询已归档的合同：
```javascript
const contractDocs = await ctx.getObject("contracts").find({ filters: [ ["is_archived", "=", true] ]});
```
* `ctx.getUser`：获取用户信息：
```javascript
const userSession = await ctx.getUser(userId, spaceId);
```

#### 代码调试

* 使用`console.log`输出调试信息。

#### 在函数中调用另一个函数

```javascript
const obj = ctx.getObject("contracts"); // 获取合同对象实例
const input = {}; // 参数
const userSession = await ctx.getUser(userId, spaceId); // 获取用户信息
const result = await obj.runFunction("test", input, userSession); // 调用合同对象的test函数，test是函数的API名称, userSession非必填
return result;
```

#### 函数返回值

函数返回值会作为API接口的data属性值，格式为：
```javascript
{
    "status": 0, // 函数执行状态，0表示成功，非0表示失败
    "msg": "", // 函数执行结果信息
    "data": result // 函数返回值
}
```

### 函数示例

**更新任务状态为已完成**

* 任务对象新建API名称为`task_completed`的函数

* 代码：
```javascript
const { projectTaskId } = ctx.input;
const projectTaskObj = ctx.getObject("project_task");
const projectTaskDoc = {
   has_complete: true,
   completed_date: new Date()
};
const result = await projectTaskObj.update(projectTaskId, projectTaskDoc);
return result;
```

* 任务对象新建`任务完成`按钮
* 按钮中调用接口`{ROOT_URL}/api/v1/project_task/functions/task_completed`并在body中传入projectTaskId