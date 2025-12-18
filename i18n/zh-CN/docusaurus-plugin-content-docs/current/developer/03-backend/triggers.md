
# 对象触发器 (Object Triggers)

在 Steedos 3.0 中，触发器开发变得极其便捷。您无需通过复杂的代码文件部署，直接在 **系统界面** 上即可为对象编写后端逻辑代码。

触发器主要用于处理比工作流更复杂的业务需求，例如：跨对象的数据校验、级联更新、或者在数据查询前后进行拦截过滤。

---

## 1. 触发器类型与生命周期

根据执行时机与数据库操作的关系，Steedos 触发器分为 **事件前触发** 和 **事件后触发**。

### A. 事件前触发 (拦截与校验)

以 `before` 前缀命名的函数，在数据进入数据库 **之前** 执行。

* **核心用途**：用于校验用户录入的数据是否正确，或者结合权限控制当前操作。
* **错误处理**：如果逻辑中抛出错误（`throw new Error`），数据库操作将被拦截并回滚，错误信息会直接反馈到前端操作页面。
* **支持事件**：
* `beforeInsert`：新增记录前触发。
* `beforeUpdate`：修改记录前触发。
* `beforeDelete`：删除记录前触发（可用于防止误删保护数据）。
* `beforeFind`：执行查询前触发（常用于在底层强制增加过滤条件）。



### B. 事件后触发 (副作用与关联操作)

以 `after` 前缀命名的函数，在数据库操作成功 **之后** 执行。

* **核心用途**：用于执行关联的异步事件。例如：任务创建完成后发送通知给指定人员，或者更新相关联的其他对象数据。
* **支持事件**：
* `afterInsert`：记录创建成功后触发。
* `afterUpdate`：记录修改成功后触发。
* `afterDelete`：记录删除成功后触发。



---

## 2. 管理触发器

管理员可以在对象设置中直接管理触发器。

### 进入入口

1. 点击右上角 **“⚙ 设置”**，进入设置应用。
2. 选择菜单 **“对象设置”** > **“对象”**。
3. 点击需要配置的对象（例如“合同”）。
4. 在对象详情页的 **“对象触发器”** 子表栏中，您可以进行新建、编辑、删除操作。

---

## 3. 创建触发器

### 配置步骤

1. 在对象触发器子表中，点击 **“新建”**。
2. 填写基础信息：
* **API 名称**：触发器的唯一标识符（如 `validate_pay_amount`）。
* **已启用**：勾选后立即生效。
* **运行时 (Events)**：选择触发的时机，如 `beforeInsert`、`afterUpdate`。


3. **代码内容**：在脚本编辑框中输入 JavaScript 代码。
4. 点击 **“保存”**。

---

## 4. 代码编写指南

在界面编写触发器时，系统自动注入了 `ctx`、`global` 等上下文变量。

### 4.1 核心上下文 `ctx`

`ctx` 包含当前请求的所有信息。

#### `ctx.params` (常用变量)

通过 `const { doc, previousDoc } = ctx.params` 获取数据变更内容：

| 变量 | 类型 | 用途说明 |
| --- | --- | --- |
| **isInsert / isUpdate** | Boolean | 判断当前操作类型。 |
| **isDelete / isFind** | Boolean | 判断当前操作类型。 |
| **isBefore / isAfter** | Boolean | 判断当前处于事件前还是事件后。 |
| **doc** | JSON | **新数据**。准备写入或已写入的记录内容。 |
| **previousDoc** | JSON | **旧数据**。修改或删除前的原始记录（仅 update/delete 存在）。 |
| **id** | String | 记录的唯一标识符。 |
| **query** | JSON | 查询参数（仅在 `beforeFind` 存在）。 |
| **data** | Array | 查询结果集（仅在 `afterFind` 存在）。 |

#### `ctx` 核心方法

* **`ctx.getObject(objectName)`**：获取对象实例，用于执行跨对象的增删改查。
* **`ctx.broker`**：Moleculer Broker 实例，用于调用系统其他微服务 Action。

---

## 5. 实战示例：付款金额校验

**需求**：在“付款”对象发起申请时，校验付款金额不能超过关联合同的总金额。

* **触发对象**：付款 (`payments`)
* **运行时**：`beforeInsert`, `beforeUpdate`

**代码实现**：

```javascript
// 1. 获取当前提交的付款单数据
const { doc } = ctx.params;
const { amount, contractId } = doc;

// 2. 如果没有关联合同，跳过校验
if (!contractId) return;

// 3. 获取关联的合同记录 (需使用 await)
const contractsObj = ctx.getObject("contracts");
const contractDoc = await contractsObj.findOne(contractId);

if (!contractDoc) {
    throw new Error("未找到关联的合同记录");
}

// 4. 校验逻辑
if (amount > contractDoc.amount) {
    // 5. 抛出错误，系统会拦截保存操作并弹出此提示
    throw new Error("付款金额不能大于合同金额");
}

```

---

## 6. 调试与日志

您可以使用标准 `console.log` 进行调试。日志输出将显示在 Steedos 服务的后台控制台（Docker 日志或 PM2 日志）中。

```javascript
console.log("触发器执行中，当前操作 ID 为：", ctx.params.id);

```
