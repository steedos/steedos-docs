# 对象触发器

在Steedos中，用户可以为每一个对象创建触发器。触发器主要用于实现用户实际业务需求。

比如：发起付款时校验付款金额不能大于合同金额、付款后更新合同的付款状态为已付款。

#### 管理触发器

使用触发器提高开发效率。在某个对象管理详细页的对象触发器子表栏，您可以：

* 创建触发器
* 单击触发器名称旁边的编辑来修改触发器
* 单击触发器名称旁边的删除来删除触发器
* 单击触发器名称以查看更多详细信息

### 创建触发器

* 在“设置”应用中点击“对象设置”-“对象”并点击某条详细记录，在对象详细信息页面找到对象触发器子表，单击新建。
* 为触发器输入API名称，该名称作为API名称是唯一标识符，只能包含小写字母、数字，必须以字母开头，不能以下划线字符结尾或包含两个连续的下划线字符。
* 按需选择运行时，可多选。
* 如果想立即启用请勾选上已启用。
* 在内容框中输入JS代码。
* 设置完成后点击保存。

#### 使用触发器

* 要使用触发器，请先确保触发器已经启用。
* 可以通过记录的增删改查测试验证规则效果。

#### 代码编写提示

* 触发器提供了可直接使用的变量 `global`、`objects`、`ctx`、`services`。
* `global._`：[一个现代的JavaScript实用程序库，提供模块化、性能和附加功能](https://lodash.com/docs/)。
* `global.moment`：[用于解析、验证、操作和格式化日期的 JavaScript 日期库](https://momentjs.com/docs/)。
* `global.validator`：[字符串验证器和清理程序库](https://www.npmjs.com/package/validator)。
* `objects`提供对象元数据，可执行对象的增删改查，如查询已归档的合同：
```javascript
const contractDocs = await objects.contracts.find({ filters: [ ["is_archived", "=", true] ]});
```
* `ctx.params`：在触发器执行函数中，您可以使用 "ctx.params" 获取以下变量。

| 变量        | 用途                                                                           |
| ----------- | ------------------------------------------------------------------------------ |
| isInsert    | 如果此触发器由插入操作触发（来自 Steedos 用户界面、服务或 API），则返回 true。 |
| isUpdate    | 如果此触发器由更新操作触发（来自 Steedos 用户界面、服务或 API），则返回 true。 |
| isDelete    | 如果此触发器由删除操作触发（来自 Steedos 用户界面、服务或 API），则返回 true。 |
| isFind      | 如果此触发器由查询操作触发（来自 Steedos 用户界面、服务或 API），则返回 true。 |
| isBefore    | 如果此触发器在任何记录操作之前触发，则返回 true。                              |
| isAfter     | 如果此触发器在所有记录操作之后触发，则返回 true。                              |
| id          | 记录的唯一标识符 [字符串]。                                                    |
| doc         | 需要添加/修改的记录内容 [json]。                                               |
| previousDoc | 修改/删除前的记录 [json]，在 afterUpdate 或 afterDelete 被触发时存在。         |
| userId      | 当前用户的唯一标识符 [字符串]。                                                |
| spaceId     | 当前工作空间 [字符串]。                                                        |
| objectName  | 当前对象名称 [字符串]。                                                        |
| query       | 查询数据相关参数 [json]，在 beforeFind 被触发时存在。                          |
| data        | 查询结果，在 afterFind 被触发时存在。                                          |

* `ctx.broker`：Broker实例，可用于调用Action。
* `ctx.getObject`：获取对象实例，与objects类似，如查询已归档的合同：
```javascript
const contractDocs = await ctx.getObject("contracts").find({ filters: [ ["is_archived", "=", true] ]});
```
* `ctx.getUser`：获取用户信息：
```javascript
const userSession = await ctx.getUser(userId, spaceId);
```
* `services`：微服务实例。

#### 代码调试

* 使用`console.log`输出调试信息。

### 触发器示例

**发起付款时校验付款金额不能大于合同金额**

* 付款对象新建API名称为`check_pay_amount`的触发器
* 选择运行时为新增记录之前

* 代码：
```javascript
const { doc } = ctx.params;
const { amount, contractId } = doc;
const contractsObj = ctx.getObject("contracts");
const contractDoc = await contractsObj.findOne(contractId);
if (amount > contractDoc.amount) {
    throw new Error("付款金额不能大于合同金额");
}
```