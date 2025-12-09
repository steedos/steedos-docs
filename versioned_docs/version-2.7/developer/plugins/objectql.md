ObjectQL
===

ObjectQL is an object-oriented, cross-database query syntax. Functions written in ObjectQL syntax are compatible with different types of databases.

When developing plugins, the core package `@steedos/objectql` can be directly called to operate the database.

## Adding Data

Supports adding single data and bulk data, with the prefix `direct` indicating that the related operation is executed directly without triggering triggers.

### insert

Adds a single record. This function triggers the configured trigger functions: `beforeInsert`, `afterInsert`. For adding special records like "tasks", notifications are sent to specified individuals.

- **Usage**: `insert(doc, userSession?)`
- **Parameters**:
   - `doc`: `Dictionary<any>` The data you want to insert.
   - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Data after successful insertion.

```js
const { spaceId, userId } = this
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
var now = new Date();
const doc = {
    name: 'Xiao Mei',
    space: spaceId,
    owner: userId,
    created_by: userId,
    modified_by: userId,
    created: now,
    modified: now
};
const result = await objectql.getObject(objectApiName).insert(doc);
console.log('result==>',result)
/*
result==> {
    _id: '84SFjtKFfonskA6CS',
    name: 'Xiao Mei',
    space: 'M6x6ddKvpj9ddcYYm',
    owner: '606d7baa3393516019dbfb39',
    created_by: '606d7baa3393516019dbfb39',
    modified_by: '606d7baa3393516019dbfb39',
    created: 2021-10-27T08:14:47.158Z,
    modified: 2021-10-27T08:14:47.158Z
}
*/
```

If `doc` includes a custom `_id`, it is used; otherwise, an `_id` is generated automatically.

Built-in tool function to generate ID: `objectql.getObject(objectApiName)._makeNewID()`

In trigger functions, `spaceId`, `userId` values can be obtained through `this`.


| Basic Property | Meaning          | Required |
| -------------- | ---------------- | -------- |
| name           | Record name      | yes      |
| space          | Current workspace ID | yes      |
| owner          | Record owner     | yes      |
| created_by     | Creator          | yes      |
| modified_by    | Modifier         | yes      |
| created        | Creation time    | no (automatically maintained) |
| modified       | Modification time | no (automatically maintained) |

### directInsert

Adds a single record. Does not trigger the related trigger functions.

- **Usage**: `directInsert(doc, userSession?)`
- **Parameters**:
   - `doc`: `Dictionary<any>` The data you want to insert.
   - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Data after successful insertion.

```js
const { spaceId, userId } = this
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
var now = new Date();
const doc = {
    name: 'Da Ge',
    space: spaceId,
    owner: userId,
    created_by: userId,
    modified_by: userId,
    created: now,
    modified: now
};
await objectql.getObject(objectApiName).directInsert(doc);
```
## Modifying Data

Supports modifying single data and bulk data, with the prefix `direct` indicating that the related operation is executed directly without triggering triggers.

### update

Updates a single record. This function triggers the configured trigger functions: `beforeUpdate`, `afterUpdate`. For updating special records like "tasks", notifications are sent to specified individuals.

- **Usage**: `update(id, doc, userSession?)`
- **Parameters**:
   - `id`: number | string The ID of the data you want to change.
   - `doc`: `Dictionary<any>` The data you want to update.
   - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Data after successful update.

```js
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
const id = '84SFjtKFfonskA6CS';
const doc = {
    name: "San Mei",
};
const result = await objectql.getObject(objectApiName).update(id, doc);
console.log('result==>', result)
/*
result==> {
    _id: '84SFjtKFfonskA6CS',
    name: 'San Mei',
    space: 'M6x6ddKvpj9ddcYYm',
    owner: '606d7baa3393516019dbfb39',
    created_by: '606d7baa3393516019dbfb39',
    modified_by: '606d7baa3393516019dbfb39',
    created: 2021-10-27T08:14:47.158Z,
    modified: 2021-10-27T08:50:40.918Z
}
*/
```

### directUpdate

Updates a single record. Does not trigger the related trigger functions.

- **Usage**: `directUpdate(id, doc, userSession?)`
- **Parameters**:
    - `id`: number | string The ID of the data you want to change.
    - `doc`: `Dictionary<any>` The data you want to update.
    - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Data after successful update.

```js
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
const id = '84SFjtKFfonskA6CS';
const doc = {
    name: "San Mei-Wan Er",
};
const result = await objectql.getObject(objectApiName).directUpdate(id,doc);
console.log('result==>',result)
/* 
result==> {
    _id: '84SFjtKFfonskA6CS',
    name: 'San Mei-Wan Er',
    space: 'M6x6ddKvpj9ddcYYm',
    owner: '606d7baa3393516019dbfb39',
    created_by: '606d7baa3393516019dbfb39',
    modified_by: '606d7baa3393516019dbfb39',
    created: 2021-10-27T08:14:47.158Z,
    modified: 2021-10-27T08:50:40.918Z
} 
*/
```
## Deleting Data

Supports deleting single data and bulk data, with the prefix `direct` indicating that the related operation is executed directly without triggering triggers.

### delete
Deletes a single record. This function triggers the configured trigger functions: `beforeDelete`, `afterDelete`.
- **Usage**: `delete(id, userSession?)`
- **Parameters**:
    - `id`: number | string The ID of the data you want to delete.
    - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Success: 1, Failure: throws an error message.

```js
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
const id = '84SFjtKFfonskA6CS';
const result = await objectql.getObject(objectApiName).delete(id);
console.log('result==>',result)
// result==> 1
```

### directDelete

Deletes a single record. Does not trigger the related trigger functions.

- **Usage**: `directDelete(id, userSession?)`
- **Parameters**:
    - `id`: number | string The ID of the data you want to delete.
    - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Success: 1, Failure: throws an error message.

```js
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
const id = '9y3QTHCGKwhkTTibg';
const result = await objectql.getObject(objectApiName).directDelete(id);
console.log('result==>',result)
// result==> 1
```
## Finding Data

Provides five methods for finding data and one method for viewing object configuration details

### find

Finds multiple records. This function triggers the configured trigger functions: `beforeFind`, `afterFind`.

- **Usage**: `find(query, userSession?)`
- **Parameters**:
    - `query`: `SteedosQueryOptions` Query data related parameters [json].


### find

Finds multiple records. This function triggers the configured trigger functions: `beforeFind`, `afterFind`.

- **Usage**: `find(query, userSession?)`
- **Parameters**:
    - `query`: `SteedosQueryOptions` Query data related parameters [json].
        - `fields`: Array of field names, optional. For example: `['field1', 'field2']`
        - `filters`: `SteedosQueryFilters` array of query conditions, optional
        - `sort`: string sorting rule, optional
        - `top`: number of records to return, optional
        - `skip`: number of records to skip, often used for pagination, optional.
    - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Array of records. Returns an empty array `[]` if no records are found.

```js
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
const query = {
    fields: ['name', 'created_by','created'],
    filters: [['name','contains','Leader']],
    sort: 'name desc'
};
const result = await objectql.getObject(objectApiName).find(query);
console.log('result==>',result)
/* 
result==> [
  {
    _id: '2iS93Hv8QNcxfMief',
    name: 'Leader Li',
    created: 2021-08-25T06:25:37.183Z,
    created_by: '606d7baa3393516019dbfb39'
  },
  {
    _id: 'zCETjWE6thjWqeyek',
    name: 'Leader Zhang',
    created: 2021-10-27T06:50:16.866Z,
    created_by: '606d7baa3393516019dbfb39'
  }
]
*/
```

### findOne

Finds a single record. This function triggers the configured trigger functions: `afterFindOne`, `beforeFind`.

- **Usage**: `findOne(id, query, userSession?)`
- **Parameters**:
    - `id`: number | string The ID of the record you want to find.
    - `query`: `SteedosQueryOptions` Query data related parameters [json].
        - `fields`: Array of field names, optional. For example: `['field1', 'field2']`
    - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Single record [json].

```js
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
const id = 'ihJqoP3n4mwSDwGxw';
const query = {
    fields: ['name', 'created_by','created'],
};
const result = await objectql.getObject(objectApiName).findOne(id, query);
console.log('result==>',result)
/* 
result==> {
    _id: 'ihJqoP3n4mwSDwGxw',
    name: 'Zhang San',
    created: 2021-04-23T08:48:06.513Z,
    created_by: '606d7baa3393516019dbfb39'
}
*/
```

### directFind

Finds multiple records. Does not trigger related trigger functions.

- **Usage**: `directFind(query, userSession?)`
- **Parameters**:
    - `query`: `SteedosQueryOptions` Query data related parameters [json].
        - `fields`: Array of field names, optional. For example: `['field1', 'field2']`
        - `filters`: `SteedosQueryFilters` array of query conditions, optional
        - `sort`: string sorting rule, optional
        - `top`: number of records to return, optional
        - `skip`: number of records to skip, often used for pagination, optional.
    - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Array of records. Returns an empty array `[]` if no records are found.

```js
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
const query = {
    fields: ['name', 'created_by','created'],
    filters: [['name','contains','Leader']],
    sort: 'name desc',
    top: 1
};
const result = await objectql.getObject(objectApiName).directFind(query);
console.log('result==>',result)
/* 
result==> [
  {
    _id: '2iS93Hv8QNcxfMief',
    name: 'Leader Li',
    created: 2021-08-25T06:25:37.183Z,
    created_by: '606d7baa3393516019dbfb39'
  }
]
*/
```

### aggregate

Finds aggregate records. This function triggers the configured trigger functions: `beforeAggregate`, `afterAggregate`.

Aggregation: Aggregation operations process data records and return computed results. Aggregation combines values from multiple documents and can perform various operations on grouped data to return a single result.

- **Usage**: `aggregate(query, externalPipeline, userSession?)`
- **Parameters**:
    - `query`: `SteedosQueryOptions` Query data related parameters [json].
        - `filters`: `SteedosQueryFilters` array of query conditions, optional
    - `externalPipeline`: Array of MongoDB aggregation pipeline
    - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Array of aggregate records.

```js
// Example 1:
const objectql = require('@steedos/objectql');
const objectApiName = "contacts";
const query = {filters: [["name","contains",'Leader']]};
const externalPipeline = [{ $count: 'leaders_count'}];
const result = await objectql.getObject(objectApiName).aggregate(query, externalPipeline);
console.log('result==>',result)
// leaders_count: Number of contacts whose names contain "Leader".
// result==> [ { leaders_count: 7 } ]

// Example 2:
const objectql = require('@steedos/objectql');
const objectApiName = "accounts"; 
const query = {filters: [["is_customer","=",true]]}; 
const externalPipeline = [{ $group: {_id:'total', total: { '$sum': '$number_of_employees'}}}];
const result = await objectql.getObject(objectApiName).aggregate(query, externalPipeline);
console.log('result==>',result)
// total: Total number of employees in business partners that are customers.
//result==> [ { _id: 'total', total: 450 } ]
```

### directAggregate

Finds aggregate records. Does not trigger related trigger functions.

Aggregation: Aggregation operations process data records and return computed results. Aggregation combines values from multiple documents and can perform various operations on grouped data to return a single result.
- **Usage**: `directAggregate(query, externalPipeline, userSession?)`
- **Parameters**:
    - `query`: `SteedosQueryOptions` Query data related parameters [json].
        - `filters`: `SteedosQueryFilters` array of query conditions, optional
    - `externalPipeline`: Array of MongoDB aggregation pipeline
    - `userSession`: `SteedosUserSession` Current user's login information, optional; if `userSession` is not provided, no permission check is performed.
- **Return Value**: Array of aggregate records.

```js

// Example 1:
const objectql = require('@steedos/objectql');
// contacts: Contact object
const objectApiName = "contacts";
// filters: Names containing "Leader" in contacts
const query = {filters: [["name","contains",'Leader']]};
const externalPipeline = [{ $count: 'leaders_count'}];
const result = await objectql.getObject(objectApiName).directAggregate(query, externalPipeline);
console.log('result==>',result)
// leaders_count: Number of contacts whose names contain "Leader".
// result==> [ { leaders_count: 7 } ]

// Example 2:
const objectql = require('@steedos/objectql');
// accounts: Business partner object
const objectApiName = "accounts"; 
// is_customer: Field name, whether the business partner is a customer
const query = {filters: [["is_customer","=",true]]}; 
// number_of_employees: Field name, number of employees
const externalPipeline = [{ $group: {_id:'total', total: { '$sum': '$number_of_employees'}}}];
const result = await objectql.getObject(objectApiName).directAggregate(query, externalPipeline);
console.log('result==>',result)
// total: Total number of employees in business partners that are customers.
//result==> [ { _id: 'total', total: 450 } ]
```

### toConfig

- **Usage**: `toConfig()`
- **Return Value**: Details of the object configuration.

```js
const objectql = require('@steedos/objectql');
const objectApiName = "contracts";
const result = await objectql.getObject(objectApiName).toConfig();
/* result:   
{ 
  name: 'contracts', 
  fields: {
    name:{
      name: 'name',
      label: 'Title',
      type: 'text',
      required: true,
      ...
    },
    ...
  },
  version: 2,
  list_views: {
    all: {
      name: 'all',
      ...
    }
  },
  actions: xxx,
  triggers: xxx,
  permission_set: xxx,
  ...
} 
*/
```

## About the userSession Parameter

All the above functions can accept an optional `userSession` parameter, representing the current user's login information. If this parameter is provided, the related operation functions will only perform data operations for which the current logged-in user has permission.

For example, the **insert(doc, userSession?)** function will directly execute data insertion operations without performing permission checks if `userSession` is not provided. Conversely, if `userSession` is provided, it will perform related permission checks, and the data insertion operation will only be executed if the current user has creation permissions for the current object.

The **update(id, doc, userSession?)** function is similar; if `userSession` is not provided, it will directly execute data update operations without performing permission checks. Conversely, if `userSession` is provided, it will perform related permission checks, and the data update operation will only be executed if the current user has edit permissions for the current object and the record to be edited.

Similarly, the **find(query, userSession?)** function will return all data satisfying the filter criteria without performing permission checks if `userSession` is not provided. Conversely, if `userSession` is provided, it will perform related permission checks and only return the data that the current logged-in user is authorized to view.

## About Functions with the direct Prefix

The above functions can be divided into two types: those named with the `direct` prefix and those without the `direct` prefix.

Functions named with the `direct` prefix: Executing a `direct` function means directly operating on database records, and it will not trigger related trigger functions, nor will it trigger any workflow rules, formula fields, or recalculations of roll-up summary fields.

Functions not named with the `direct` prefix: After the completion of related operations like **insert/update/find**, etc., these will further trigger the execution of related trigger functions configured on that object, such as `beforeUpdate`, `afterUpdate`, etc.; then, they will trigger the execution of workflow rules that meet the conditions; subsequently, they will also trigger the recalculation of associated formula fields and roll-up summary fields.

## Examples

Below are some examples of using ObjectQL functions in practical programming scenarios.

### Example of Using ObjectQL in Triggers

```js
const auth = require("@steedos/auth");
const generatHtml = (doc)=>{
  ...
}
module.exports = {
    listenTo: 'web_forms',
    afterInsert: async function () {
        let doc = this.doc;
        let generatedHtml = generatHtml(doc);
        if(generatedHtml){
            const object = this.getObject("web_forms");
            const userSession = await auth.getSessionByUserId(this.userId);
            await object.directUpdate(doc._id, {generated_html: generatedHtml}, userSession);
        }
    },
    afterUpdate: async function () {
        // Since there's no this.doc._id in afterUpdate, integrate previousDoc, and when editing a single field, also integrate other fields from previousDoc
        let doc = Object.assign({}, this.previousDoc, this.doc);
        let generatedHtml = generatHtml(doc);
        if(generatedHtml){
            const object = this.getObject("web_forms");
            const userSession = await auth.getSessionByUserId(this.userId);
            await object.directUpdate(doc._id, {generated_html: generatedHtml}, userSession);
        }
    }
}
```

### Example of Using ObjectQL in a Router

```js
const express = require("express");
const router = express.Router();
const core = require('@steedos/core');
const objectql = require('@steedos/objectql');

router.post('/api/contracts/locked/:id', core.requireAuthentication, async function (req, res) {
    const userSession = req.user;
    const isSpaceAdmin = userSession.is_space_admin;
    if(isSpaceAdmin){
        const { id } = req.params;
        await objectql.getObject("contracts").update(id, {
            locked: true
        });
        res.status(200).send({ message: 'Contract successfully archived', success: true });
    }
});
exports.default = router;
```
