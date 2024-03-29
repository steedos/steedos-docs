---
sidebar_position: 10
sidebar_label: 分部级权限
---

# 分部

对于集团企业，可以将下属单位设定为"单位级"，称为“分部”。每个分部可以设定单独的管理员，分部管理员只能修改本分部的组织机构。各个分部组织下可以创建部门级组织。

:::tip
此功能需要企业版授权才能使用。
:::

每个用户可以设定多个分部，其中选中的第一个分部为主分部。当员工被添加到部门级组织时，员工的所属分部会自动被设置为部门对应的分部。

进入公司设置，点击“分部”后，点击页面右上角的“新建”按钮来创建新的分部，新建时输入分部名称，并关联对应的部门。

## 设置分部权限

在对象权限记录的新建或编辑界面可以设置指定简档或权限集下的用户对该对象的分部级操作权限。

* 查看本分部：勾选后，该权限集下的用户除了可以查看所有者为自己的对象记录外，还可以额外查看自己所属分部下的对象记录。
* 修改本分部：勾选后，该权限集下的用户除了可以修改所有者为自己的对象记录外，还可以额外修改自己所属分部下的对象记录。
* 查看指定分部：选择希望额外授予查看权限的分部，可选择多个分部，表示该权限集下的用户除了可以查看所有者为自己的对象记录外，还可以额外查看这里授权的分部下的对象记录。
* 修改指定分部：选择希望额外授予修改权限的分部，可选择多个分部，表示该权限集下的用户除了可以修改所有者为自己的对象记录外，还可以额外修改这里授权的分部下的对象记录。

假设在某个魔方项目中有以下几个分部，我们按南部和北部的地理位置来划分业务区域：

* 总部：上海总公司
* 南部：南京分公司、杭州分公司，苏州公公司
* 北部：北京分公司、天津分公司、武汉分公司

在该项目中需要通过权限配置来实现以下业务需求：

* 业务管理员可以查看和修改本公司所有合同数据；
* 在总公司设立业务总监，可以额外查看全公司所有合同数据但不可以修改它们；
* 在总公司设立南部分公司业务总监，分管南部所有分公司的合同数据，额外授予其查看和修改其分管分公司内的合同数据；
* 在总公司设立北部分公司业务总监，分管北部所有分公司的合同数据，额外授予其查看和修改其分管分公司内的合同数据；

按以上业务需求，我们首先需要在“设置”应用中进入“公司设置→权限集”页面新建以下权限集：

* 业务管理员：包括总公司和分公司在内的所有业务管理员都需要加到该权限集成员中。
* 业务总监：总公司业务总监需要加到该权限集中。
* 南部业务总监：分管南部分公司业务的业务总监需要加到该权限集中。
* 北部业务总监：分管北部分公司业务的业务总监需要加到该权限集中。

接下来我们分别在上面新建的几个权限集的详细页面配置合同对象的对象权限：

* 业务管理员：勾选“允许查看”、“允许创建”、“允许编辑”、“允许删除”、“查看本分部”、“修改本分部”选项。
* 业务总监：跟上面业务管理员一样配置，但是额外勾选“查看所有记录”选项。
* 南部业务总监：跟上面业务管理员一样配置，但是额外配置“查看指定分部”和“修改指定分部”选项，选择其分管的分公司。
* 北部业务总监：跟上面业务管理员一样配置，但是额外配置“查看指定分部”和“修改指定分部”选项，选择其分管的分公司。

按以上配置方法配置完各个权限集的对象权限后，我们就完整实现了上面提到的分部级权限相关需求。


