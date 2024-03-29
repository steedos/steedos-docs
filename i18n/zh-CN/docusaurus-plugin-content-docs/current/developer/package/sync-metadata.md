---
title: 同步元数据
sidebar_position: 50
---

通过 VS Code 插件，可以将可视化开发的元数据同步为项目源码，实现元数据的版本管理，并进一步利用传统开发中的DevOps工具实现团队开发和自动化。

## 配置元数据同步

以下是要使用元数据同步功能需要在本地开发环境中进行的必要配置操作，在我们推荐的远程开发环境中可以跳过这些配置过程 ，因为我们已经在Gitpod远程开发环境中预先处理好了这些配置。

### 安装steedos命令

安装或更新Steedos CLI命令工具

```bash
npm i steedos-cli --global
```

### 安装 vs code 及插件

[参考官方文件下载并安装 VS Code](https://code.visualstudio.com/)。

打开 VS Code，在扩展商城中搜索 Steedos，选择`Steedos Extension Pack`”，并点击`Install`”开始安装，默认该扩展会同时安装“Steedos CLI Integration”扩展，所以不需要单独安装CLI扩展。

 ![](https://console.steedos.cn/api/files/images/QEtoyPozXdRDbWocP)

### 配置环境变量

建议在 `.env.local` 中配置本地环境变量。环境变量中可能会有 API_KEY等保密信息，而此文件默认不会被提交到 git 仓库中。

创建或修改 `.env.local` 文件，设置环境变量。

```bash
METADATA_SERVER=#Steedos服务器URL
METADATA_APIKEY=#Steedos API Key
```


参数说明如下：

* `METADATA_SERVER`: 元数据服务器的网址，如果是本地开发环境，可以配置为 http://IP地址:端口号 ；如果使用Steedos云服务，需配置 https 协议.
* `METADATA_APIKEY`: 如果是云服务，可以直接在云服务记录中复制；如果是本地开发环境，需要复制在“设置”应用的“高级设置->API Key”菜单下创建的API Key。

## 同步元数据

### 浏览并下载元数据

前述配置完成后，在 VS Code 的左侧工具栏会出现下图的图标，单击该图标，则会自动展示可以下载的元数据清单，您只需要点击所需文件的右边下载图标便可将其下载到本地文件。

需要注意的是，如果本地已经存在改文件则会直接覆盖，所以下载元数据前，应先将现有代码提交到git仓库，以便查看本次下载修改的文件。

 ![](https://console.steedos.cn/api/files/images/8o3JqQDox4Gijxorn)如果未配置元数据同步相关的环境变量的话，点击右上角的刷新按钮、下载按钮等都会报错`Please run command, steedos source:config`，我们只要按上面“配置环境变量”小节把相关环境变量配置上，或者在项目命令行上运行指令`steedos source:config`在向导中配置相关环境变量即可。

### 上传元数据

如果从 git 仓库更新到其他人修改的元数据，或是直接修改了元数据的配置文件，可以通过上传命令将元数据上传到Steedos服务器中。

在项目文件夹中选择需要上传的元数据，点击右键，并选择`Steedos: Deploy Source` 菜单。

 ![](https://console.steedos.cn/api/files/images/ju5NqucSwB3H6EtKu)使用SteedosVS Code代码同步插件不但可以通过“Deploy Source”来把本地的代码发布到数据库中，也可以通过“Retrieve Source”操作来把在界面上可视化开发的元数据同步成代码下载到本地，对于可以通过在界面上进行可视化开发来维护的元数据，我们推荐开发人员不要在本地VS Code中开发，以尽量保证系统中的元数据配置始终来源于同一个方向，这样可以避免元数据重复等问题的发生。

### 同步指定文件或文件夹

元数据已经同步到本地后，可以浏览项目文件夹，点击对应的元数据文件或文件夹，上传或下载对应元数据。

 ![](https://console.steedos.cn/api/files/images/t8sHRTEsPFr2PL8JZ)

### 设置元数据同步路径

需要注意的是默认情况下上面的操作会把代码同步到默认软件包`steedos-app`目录中，如果需要把界面上配置的元数据同步到`steedos-packages`文件夹下的软件包目录中，我们需要先配置下以下环境变量来变更默认软件包的位置，或者您也可以按上面“切换默认软件包”小节提到的使用VSCODE编辑器的“查看→命令面板”中的`setDefaultPackagePath`命令来自动创建相关环境变量：

```bash
[package]
DEFAULT_PACKAGE_PATH=steedos-packages/xxx #配置为相关软件包目录
```

在配置该环境变量后，再点击Steedos插件面板上相关元数据右侧的下载按钮即可把代码同步到`xxx`这个软件包的目录下，而不是同步到默认软件包目录下。

同样的在配置上面默认软件包环境变量后，只能在该软件包目录下的文件或文件夹上才可以执行`Deploy Source`，`Retrieve Source`等右键操作。
