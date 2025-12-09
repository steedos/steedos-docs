# Triggers

When developing plugins, you can write `.trigger.js` triggers to listen for events. A trigger is a function that is called when an event occurs.

## Trigger Definition

The trigger file name ends with `.trigger.js`, and the format is as follows:

```js
module.exports = {
    listenTo: 'object API name',
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

The name of the object, optional. If this property is not defined, the text before the first `.` in the file name is used as the value of `listenTo`. Supports targeting multiple objects with wildcards.

### Before Event Triggers

Triggers before events can be used to verify whether the data entered by the user is correct. If there are problems, errors can be thrown, and the error messages will be fed back to the front-end operation page. They can also be combined with permission control for the current operation.

Triggers before events are all named with the `before` prefix.

* beforeInsert
* beforeUpdate
* beforeDelete
* beforeFind

### After Event Triggers

Triggers after events can be used to execute associated events, such as sending notifications to specified personnel after a task is created.

Triggers after events are all named with the `after` prefix.

* afterInsert
* afterUpdate
* afterDelete

### Parameter Explanation

All script functions are parameterless, and the relevant data can be obtained from `this`, which has the following structure:

* `id`: Unique identifier of the record \[string\],
* `userId`: Unique identifier of the current user \[string\],
* `spaceId`: Current workspace \[string\],
* `doc`: Content of the record to be added/modified \[json\],
* `previousDoc`: Record before modification/deletion \[json\], // only exists in afterUpdate, afterDelete
* `object_name`: Current object name \[string\],
* `datasource_name`: Data source name \[string\],
* `getObject`: function(object_name: string)
* `query`: Query data related parameters \[json\], // only exists in beforeFind

### Return Value of Trigger Functions

- If `false` is returned, the operation is interrupted, e.g., returning false in before.insert will cancel the insert operation.
- Throwing an `Error` in a trigger will also interrupt the operation. The error message will be displayed on the front end.

## Trigger Example

```javascript
beforeInsert: async function () {
    var doc = this.doc
    if (doc.code) {
        let count = await this.getObject('picklists').count({ filters: [['space', '=', doc.space], ['code', '=', doc.code]] })
        if (count > 0) {
            throw new Error("Unique code cannot be duplicated");
        }
    }
},
```

For more information, please refer to the example project [with-object-trigger](https://github.com/steedos/steedos-examples/tree/main/with-object-trigger).

## Notes

* Multiple triggers for the same event on the same object can be defined in different software packages.
* The software package containing the trigger must include the corresponding object file or inherited object file.
* Custom object trigger file names cannot carry `__c`. In the trigger file, you need to manually configure the value of `listenTo`: the object API name.
