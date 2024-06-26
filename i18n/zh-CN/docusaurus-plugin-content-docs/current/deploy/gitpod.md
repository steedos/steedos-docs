---
title: 远程环境试用
sidebar_position: 3
---

借助 [Gitpod](https://gitpod.io/)，只需点击鼠标，即可开通一套远程开发环境。

## 注册Steedos ID账户

请使用企业邮箱，在[华炎统一身份认证平台](https://id.steedos.cn/) 注册账户，注册过程中需要邮箱验证，验证注册完成后，注册成功后即可使用统一账号登录包含华炎官网商城以及Gitpod启动后的云服务初始化等远程服务。

 ![](https://console.steedos.cn/api/files/images/63298b0c718ce4003ea78f0c)

## 登录Gitpod账户

访问[Gitpod.io平台](https://gitpod.io/)，进行注册登录，若浏览器记住Github账号信息时，点击“Continue with Github”直接跳转进Github进行单点登录。

## 启动Gitpod远程开发环境

访问 [Steedos模板项目](https://github.com/steedos/steedos-project-template) ，也可以在登录Github环境后，找到公开的“steedos-project-template”点击右上角派生(Fork)按钮，可以把项目复制到自己的账户下。

项目**派生(Fork)**成功后，可以通过修改当前项目url使用Gitpod.io启用开发环境。例如修改项目url为：https://gitpod.io#github.com/steedos/steedos-project-template 

 ![](https://console.steedos.cn/api/files/files/667b9508273904003da17d55)
 
启动远程开发环境后会自动执行以下操作，它可以节省开发人员大量时间：

* 自动分配远程服务器资源。
* 自动从网络下载并加载SteedosDocker镜像。
* 自动安装和配置MongoDB数据库，并以集群模式启动数据库。
* 自动安装、配置和启动Redis数据库。
* 自动安装必要的VS Code插件，包括元数据同步、简体中文语言包等。
* 自动安装项目依赖的NPM包。
* 自动执行 `yarn start` 启动项目。

## 访问Steedos

远程开发环境启动完成，会自动弹出浏览器，如果未弹出，可能被拦截。

可以手动在浏览器中输入访问地址，只需要在 Gitpod 网址前加上端口号即可。

比如Gitpod访问地址为`https://gold-stingray-81a30kah.ws-us114.gitpod.io/`，我们只要输入地址 `https://5000-gold-stingray-81a30kah.ws-us114.gitpod.io/`即可访问刚运行起来的项目。