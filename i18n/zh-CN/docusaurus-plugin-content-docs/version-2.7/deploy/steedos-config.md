---
title: 环境变量
---

本页面提供了如何配置您自托管的 Steedos 实例的指南。


## 必需的配置

```bash
# 平台
PORT=80
ROOT_URL=http://localhost

# 数据库
MONGO_URL=mongodb://127.0.0.1:27017/steedos
MONGO_OPLOG_URL=mongodb://127.0.0.1:27017/local

# 微服务通信 (https://moleculer.services/zh/docs/0.14/networking.html)
TRANSPORTER=redis://127.0.0.1:6379

# 缓存 https://moleculer.services/zh/docs/0.14/caching.html
CACHER=redis://127.0.0.1:6379/1

```

## 登录屏幕

配置与登录屏幕相关的参数，例如是否允许注册，是否允许修改密码，是否允许创建公司。

```bash
# 允许账户创建，默认在数据库为空时为 true
STEEDOS_TENANT_ENABLE_REGISTER=true  
# 允许密码恢复，设置为 true 将显示链接以检索密码，默认为 false。
STEEDOS_TENANT_ENABLE_FORGET_PASSWORD=true  
# 允许创建公司，默认仅在数据库为空时允许
STEEDOS_TENANT_ENABLE_CREATE_TENANT=false 
# 允许密码登录，默认对于注册和登录都是启用的。默认为 true
STEEDOS_TENANT_ENABLE_PASSWORD_LOGIN=true 
# 强制绑定电子邮件，登录后需要输入并验证电子邮件。默认为 false
STEEDOS_TENANT_ENABLE_BIND_EMAIL=false 
# 强制绑定手机号码，登录后需要输入并验证手机号码。默认为 false
STEEDOS_TENANT_ENABLE_BIND_MOBILE=false 
# 允许使用电子邮件验证码登录，默认对于注册和登录启用此方法。
STEEDOS_TENANT_ENABLE_EMAIL_CODE_LOGIN=false 
# 允许使用手机验证码登录，默认对于注册和登录启用此方法。
STEEDOS_TENANT_ENABLE_MOBILE_CODE_LOGIN=false 
# 默认是43个字符的字符串，每次服务重启时都会生成新值
STEEDOS_TENANT_TOKEN_SECRET=  
# 默认是90d
STEEDOS_TENANT_ACCESS_TOKEN_EXPIRES_IN= 
# 默认是7d
STEEDOS_TENANT_REFRESH_TOKEN_EXPIRES_IN=  
```

# 元数据同步

```bash
METADATA_SERVER=http://localhost:5000
METADATA_APIKEY=
```

## 附件存储

配置与附件存储相关的参数。

### 本地文件系统

```bash
STEEDOS_CFS_STORE=local
STEEDOS_STORAGE_DIR=/steedos-storage
```

### S3

附件可以存储在支持 S3 协议的服务器上，包括 AWS、阿里云、腾讯云存储服务，或私有部署的 minio 服务。

```bash
STEEDOS_CFS_STORE=S3
STEEDOS_CFS_AWS_S3_ENDPOINT=https://s3.cn-northwest-1.amazonaws.com.cn
STEEDOS_CFS_AWS_S3_REGION=cn-northwest-1
STEEDOS_CFS_AWS_S3_SIGNATURE_VERSION=v4
STEEDOS_CFS_AWS_S3_BUCKET=steedos
STEEDOS_CFS_AWS_S3_ACCESS_KEY_ID=xxxxxxxx
STEEDOS_CFS_AWS_S3_SECRET_ACCESS_KEY=xxxxxxxx
```

### 附件匿名下载

默认情况下，系统中上传的头像、图片和附件需要登录才能下载。

可以设置以下变量进行匿名下载。

```bash
# 选项包括头像、图片、文件，默认为头像
STEEDOS_CFS_DOWNLOAD_PUBLIC=avatars,images 
```

## 推送通知

配置移动推送通知的参数，用于在 Steedos 移动应用上接收通知消息。

```bash
# iOS
STEEDOS_PUSH_APN_DATA=

# 华为
STEEDOS_GCM_APIKEY=xxx
STEEDOS_GCM_PROJECT_NUMBER=xxx
STEEDOS_PUSH_HUAWEI_APPID=
STEEDOS_PUSH_HUAWEI_APPPKGNAME=
STEEDOS_PUSH_HUAWEI_APPSECRET=

# 小米
STEEDOS_GCM_APIKEY=xxx
STEEDOS_GCM_PROJECT_NUMBER=xxx
STEEDOS_PUSH_MI_APPSECRET=
STEEDOS_PUSH_MI_PRODUCTION=
```

## 电子邮件配置

为系统推送电子邮件配置 SMTP 服务参数。

```bash
STEEDOS_EMAIL_FROM=华炎魔方 <noreply@xxx.com>
STEEDOS_EMAIL_URL=smtps://xxxxxxx:xxxxxxxxx@email.xxxx.amazonaws.com:465/
STEEDOS_EMAIL_HOST=email.xxxx.amazonaws.com
STEEDOS_EMAIL_PORT=465
STEEDOS_EMAIL_USERNAME=xxxxx
STEEDOS_EMAIL_PASSWORD=xxxxx
STEEDOS_CRON_MAILQUEUE_INTERVAL=3000 # 邮件定时器，单位：毫秒
```

## 短信配置

为系统配置短信发送，目前支持配置腾讯云短信发送服务。

```bash
STEEDOS_SMS_QCLOUD_SDKAPPID=xxxxxx
STEEDOS_SMS_QCLOUD_APPKEY=xxxxxx
STEEDOS_SMS_QCLOUD_SIGNNAME=【华炎魔方】 # 此配置为腾讯短信服务中的签名模板名称
STEEDOS_CRON_SMSQUEUE_INTERVAL=3000 # 短信定时器，单位：毫秒
```

## OIDC 身份验证

企业版：配置 OpenID Connect 单点登录的参数，可以连接到 Keycloak 服务器。

```bash
# OpenID Connect
STEEDOS_IDENTITY_OIDC_ENABLED=true
STEEDOS_IDENTITY_OIDC_CONFIG_URL=https://id.steedos.cn/realms/master/.well-known/openid-configuration
STEEDOS_IDENTITY_OIDC_CLIENT_ID=steedos-oidc-public
STEEDOS_IDENTITY_OIDC_CLIENT_SECRET=none
STEEDOS_IDENTITY_OIDC_NAME=Steedos ID
STEEDOS_IDENTITY_OIDC_LOGO=
STEEDOS_IDENTITY_OIDC_REQUIRE_LOCAL_ACCOUNT=false
```

## 定时任务

配置定时任务的属性。

```bash
# 执行数据库索引的时间，如“0 0 * * * *”上述意味着每小时执行一次索引操作。现有索引不会重新创建。
STEEDOS_CRON_BUILD_INDEX="0 0 * * * *"

# 工作流规则队列的执行时间，基于时间的工作流操作依赖于此配置，如“*/11 * * * *”上述意味着每分钟行一次。
STEEDOS_CRON_WORKFLOW_RULE='*/1 * * * *'

# 邮件队列的轮询间隔，以毫秒为单位。
STEEDOS_CRON_MAILQUEUE_INTERVAL=10000

# 推送通知队列的轮询间隔，以毫秒为单位。
STEEDOS_CRON_PUSH_INTERVAL=1000

# webhook 队列的轮询间隔，以毫秒为单位。
STEEDOS_CRON_WEBHOOKQUEUE_INTERVAL=10000

# 实时消息队列的轮询间隔，以毫秒为单位。
STEEDOS_CRON_MESSAGINGQUEUE_INTERVAL=1000

# 对象流程同步队列的轮询间隔，以毫秒为单位。
STEEDOS_CRON_INSTANCERECORDQUEUE_INTERVAL=10000
```

## 账户相关

配置账户相关参数。

```yaml
accounts:
  mobile_phone_locales: ['zh-CN']
  mobile_regexp: '^[0-9]{11}$'
    is_username_skip_minrequiredlength: true
    UTF8_Names_Validation: '[A-Za-z0-9-_.\u00C0-\u017F\u4e00-\u9fa5]'
```

* mobile_phone_locales: 此参数优先。手机号本地化，配置为`zh-CN`表示使用中国的11位手机号，要支持其他国家手机号请参考 [validator](https://www.npmjs.com/package/validator)。
* mobile_regexp: 手机号格式正则表达式，使用一个正则表达式来描述正确的手机号格式。
* is_username_skip_minrequiredlength：是否跳过用户名最小位数限制，默认最小为6位。
* UTF8_Names_Validation: 用户名规则正则表达式。


## 密码规则配置

密码的复杂度是通过password.policy 属性来控制的，值为正则表达式。

```yaml
public:
  password:
    policy: ^[A-Za-z0-9]{8,}$
    policyError: "密码不能少于8位"
    policies:
      - policy: 123
        policyError: "密码必须包含123"
      - policy: 456
        policyError: "密码必须包含456"
    policyFunction: !
      function(password){
        if(password === '12345678'){
          throw new Error('密码不能是12345678');
        }
      }
```

- public.password.policyFunction: string Function. 自定义验证函数(1个参数: 用户输入的password), 可通过import等手段引入验证库. 或者直接编写验证规则. 不符合规则时, 直接throw error即可.
- public.password.policies: `Array<{policy: '正则表达式', policyError: '不符合表达式时的提示消息'}>`

配置了多个密码规则时会同时生效，上述示例中配置的规则是会同时生效的。
