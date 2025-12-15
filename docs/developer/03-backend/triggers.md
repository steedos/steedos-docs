# 对象触发器 (Object Triggers)

在 Steedos 3.0 中，触发器开发变得更加便捷。您无需通过代码文件部署，直接在**系统界面**上即可为对象编写后端逻辑代码。

触发器主要用于处理比工作流更复杂的业务需求，例如：跨对象的数据校验、级联更新、或者在数据查询前后进行拦截过滤。

## 1\. 管理触发器

管理员可以在对象设置中直接管理触发器。

### 进入入口

1.  点击右上角 **“⚙ 设置”**，进入设置应用。
2.  选择菜单 **“对象设置”** \> **“对象”**。
3.  点击需要配置的对象（例如“合同”）。
4.  在对象详情页的 **“对象触发器”** 子表栏中，您可以进行新建、编辑、删除或查看详情操作。

## 2\. 创建触发器

### 配置步骤

1.  在对象触发器子表中，点击 **“新建”**。
2.  填写基础信息：
      * **API 名称**：触发器的唯一标识符。
          * *规则*：只能包含小写字母、数字，必须以字母开头，不能以下划线结尾或包含连续下划线。
      * **已启用**：勾选后立即生效。
      * **运行时 (Events)**：选择触发的时机（可多选），如 `beforeInsert`（新增前）、`afterUpdate`（修改后）。
3.  **代码内容**：在脚本编辑框中输入 JavaScript 代码。
4.  点击 **“保存”**。

## 3\. 代码编写指南

在界面编写触发器时，系统自动注入了 `ctx`、`global`、`objects` 等上下文变量，您可以直接使用。

### 3.1 核心上下文 `ctx`

`ctx` 是触发器执行时的上下文对象，包含当前请求的所有信息。

#### `ctx.params` (常用变量)

通过 `const { doc, previousDoc } = ctx.params` 可以获取数据变更内容：

| 变量 | 类型 | 用途说明 |
| :--- | :--- | :--- |
| **isInsert** | Boolean | 是否为新增操作。 |
| **isUpdate** | Boolean | 是否为更新操作。 |
| **isDelete** | Boolean | 是否为删除操作。 |
| **isFind** | Boolean | 是否为查询操作。 |
| **isBefore** | Boolean | 是否在数据库操作**之前**触发（常用于校验）。 |
| **isAfter** | Boolean | 是否在数据库操作**之后**触发（常用于关联更新）。 |
| **doc** | JSON | **新数据**。需要添加或修改的记录内容。 |
| **previousDoc**| JSON | **旧数据**。修改或删除前的原始记录（仅在 update/delete 存在）。 |
| **id** | String | 记录的唯一标识符。 |
| **userId** | String | 当前操作用户的 ID。 |
| **spaceId** | String | 当前工作空间 ID。 |
| **objectName** | String | 当前对象名称。 |
| **query** | JSON | 查询参数（仅在 `beforeFind` 存在）。 |
| **data** | Array | 查询结果集（仅在 `afterFind` 存在）。 |

#### 其他 `ctx` 方法

  * **`ctx.getObject(objectName)`**：获取对象实例，用于执行增删改查。
    ```javascript
    // 示例：查询合同对象
    const contractsObj = ctx.getObject("contracts");
    const contract = await contractsObj.findOne(contractId);
    ```
  * **`ctx.getUser(userId, spaceId)`**：获取当前用户的详细会话信息。
  * **`ctx.broker`**：Moleculer Broker 实例，用于调用微服务 Action。

-----

### 3.3 内置工具库 `global`

为了提高开发效率，环境内置了常用的 JavaScript 工具库，无需 `require` 即可直接使用：

  * **`global._` (Lodash)**：
      * 功能：处理数组、数字、对象、字符串等。
      * *文档*：[Lodash Docs](https://lodash.com/docs/)
  * **`global.moment` (Moment.js)**：
      * 功能：强大的日期处理库。
      * *文档*：[Moment.js Docs](https://momentjs.com/docs/)
      * *示例*：`const now = moment().format('YYYY-MM-DD');`
  * **`global.validator`**：
      * 功能：字符串验证（如邮箱、URL格式验证）。
      * *文档*：[Validator Docs](https://www.npmjs.com/package/validator)

## 4\. 实战示例

### 场景：付款金额校验

**需求**：在“付款”对象发起付款申请时，校验付款金额不能超过关联合同的总金额。

  * **触发对象**：付款 (payments)
  * **API 名称**：`check_pay_amount`
  * **运行时**：`beforeInsert` (新增前), `beforeUpdate` (修改前)

**代码实现**：

```javascript
// 1. 获取当前提交的付款单数据
const { doc } = ctx.params;
const { amount, contractId } = doc;

// 2. 如果没有关联合同，跳过校验 (根据业务需求而定)
if (!contractId) {
    return;
}

// 3. 获取关联的合同记录
// 注意：需使用 await 异步等待查询结果
const contractsObj = ctx.getObject("contracts");
const contractDoc = await contractsObj.findOne(contractId);

if (!contractDoc) {
    throw new Error("未找到关联的合同记录");
}

// 4. 校验逻辑：付款金额 > 合同金额
if (amount > contractDoc.amount) {
    // 5. 抛出错误，系统会拦截保存操作并在前端弹出此提示
    throw new Error("付款金额不能大于合同金额");
}
```

## 5\. 调试与日志

在编写过程中，您可以使用标准控制台日志进行调试。
日志输出将显示在 Steedos 服务的后台控制台（Docker Logs 或 PM2 Logs）中。

```javascript
console.log("当前触发器执行中，Doc数据为：", JSON.stringify(ctx.params.doc));
```