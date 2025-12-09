触发器
===

开发插件时，可以编写 .trigger.js 触发器来监听事件，触发器是一个函数，当事件发生时，触发器会被调用。
## 触发器定义

触发器文件名称以.trigger.js结尾，格式如下：

```js
module.exports = {
    listenTo: '对象API名称',
    beforeInsert: [async] Function,
    beforeUpdate: [async] Function,
    beforeDelete: [async] Function,
    beforeFind: [async] Function,
    afterInsert: [async] Function,
    afterUpdate: [async] Function,
    afterDelete: [async] Function,
}
```

### listenTo

对象名称，选填。如果没有定义此属性，则取文件名中第一个 . 之前的文字作为listenTo的值，支持通过通配符指向多个对象。

### 事件前触发

事件前触发的触发器，可以用于校验用户录入的数据是否正确，如果有问题，可以抛错，错误信息会反馈到前端操作页面；还可以结合权限控制当前操作等。

事件前触发的触发器函数都是以before前缀命名。

* beforeInsert
* beforeUpdate
* beforeDelete
* beforeFind

### 事件后触发

事件后触发的触发器，可以用于执行关联的事件，比如任务创建完成后发送通知给指定人员。

事件前触发的触发器函数都是以after前缀命名。

* afterInsert
* afterUpdate
* afterDelete


### 参数说明

所有脚本函数均为无参函数，所属数据可从`this`中获取，`this`结构如下

* `id`: 记录的唯一标识\[string\],
* `userId`: 当前用户唯一标识\[string\],
* `spaceId`: 当前工作区\[string\],
* `doc`: 需要新增/修改的记录内容\[json\],
* `previousDoc`: 修改/删除前的记录\[json\], //仅afterUpdate, afterDelete时存在此属性
* `objectName`: 当前对象名称\[string\],
* `datasource_name`: 数据源名称\[string\],
* `getObject`: function(object_name: string)
* `query`: 查询数据相关参数\[json\], //仅beforeFind时存在此属性

### 触发器函数的返回值

- 如果返回的是`false`，则中断操作，例如在before.insert里return false, 则不执行insert操作。
- 如果在触发器中`throw Error`，也会中断操作。错误信息会显示在前台。

## 触发器示例

```javascript
beforeInsert: async function () {
    var doc = this.doc
    if (doc.code) {
        let count = await this.getObject('picklists').count({ filters: [['space', '=', doc.space], ['code', '=', doc.code]] })
        if (count > 0) {
            throw new Error("唯一编码不能重复");
        }
    }
},
```

请参考示例项目 [with-object-trigger](https://github.com/steedos/steedos-examples/tree/main/with-object-trigger) 了解更多。

## 注意事项

* 同一个对象的同一个事件，可以在不同软件包中定义多个触发器。
* 触发器所在的软件包中必须含有其对应的对象文件或者继承的对象文件。
* 自定义对象触发器文件名不能携带 __c , 在触发器文件中需要手动配置listenTo的值：对象 API 名称。
