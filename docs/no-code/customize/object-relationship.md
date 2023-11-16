---
sidebar_position: 3
---

# Object Relationships

Steedos's robust data model allows you to build complex data structures by defining relationships between objects. These relationships are the foundation for connecting various data points and sharing data across the entire platform.

## Supported Object Relationships

Object relationships define how different objects (or data tables) are connected. In Steedos, you can set up three main types of relationships: Lookup Relationships, Master-Detail Relationships, and Many-to-Many Relationships through Junction Objects.

##### Lookup Relationships

- **Description**: A lookup relationship is the simplest type of relationship between two objects, similar to a foreign key relationship in a database.
- **Usage**: Use when two objects are related but not strictly dependent on each other. For example, a contact may be associated with an account but can also exist independently.

##### Master-Detail Relationships

- **Description**: A master-detail relationship is stricter, where the lifecycle of the detail object depends on the master object.
- **Usage**: Used when the deletion of the master object should also result in the deletion of all related detail objects. For instance, order items depend on the order.

##### Many-to-Many Relationships

- **Description**: By defining relationship fields as array-type fields, a many-to-many relationship can be established between two objects.
- **Usage**: Array-type fields can bind multiple records simultaneously. For example, create a "assignees" field for a task, configure it as multi-select, so that one task can be assigned to multiple assignees. Each assignee will also have their own task list.


### Configuring Object Relationships

By creating Lookup Relationship fields and Master-Detail Relationship fields, you can set up relationships between objects.

1. **Create Relationship Field**: In the object's field settings, choose to add a new field and select the type of relationship.
2. **Set Relationship Properties**: Depending on the type of relationship, configure necessary properties, such as related objects, cascade delete rules, etc.
3. **Update Page Layouts**: Ensure the new relationship field is added to the page layouts of the related objects.
4. **Set Permissions**: Update user profiles and permission sets as needed to access the new relationship fields.

By correctly configuring object relationships, you can ensure data integrity, optimize user experience, and make reports and dashboards more powerful.
