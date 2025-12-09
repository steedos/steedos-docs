---
title: Environment Variables
---

This page provides instructions on how to configure your self-hosted Steedos instance.


## Required Configuration

```bash
# Platform
PORT=80
ROOT_URL=http://localhost

# Database
MONGO_URL=mongodb://127.0.0.1:27017/steedos
MONGO_OPLOG_URL=mongodb://127.0.0.1:27017/local

# Microservices communication [https://moleculer.services/docs/0.14/networking.html](https://moleculer.services/zh/docs/0.14/networking.html)
TRANSPORTER=redis://127.0.0.1:6379

# Caching https://moleculer.services/zh/docs/0.14/caching.html
CACHER=redis://127.0.0.1:6379/1

```

## Login Screen

Configure login screen related parameters, such as whether registration is allowed, whether password modification is permitted, whether company creation is allowed.

```bash
# Allow account creation, default is true when the database is empty
STEEDOS_TENANT_ENABLE_REGISTER=true  
# Allow password recovery, setting to true will display a link to retrieve the password, default is false.
STEEDOS_TENANT_ENABLE_FORGET_PASSWORD=true  
# Allow creation of companies, by default only allowed when the database is empty
STEEDOS_TENANT_ENABLE_CREATE_TENANT=false 
# Allow password login, enabled by default for both registration and login. Default is true
STEEDOS_TENANT_ENABLE_PASSWORD_LOGIN=true 
# Mandatory email binding, email input and verification required after login. Default is false
STEEDOS_TENANT_ENABLE_BIND_EMAIL=false 
# Mandatory mobile number binding, mobile number input and verification required after login. Default is false
STEEDOS_TENANT_ENABLE_BIND_MOBILE=false 
# Allow login using email verification code, default method for both registration and login when enabled.
STEEDOS_TENANT_ENABLE_EMAIL_CODE_LOGIN=false 
# Allow login using mobile verification code, default method for both registration and login when enabled.
STEEDOS_TENANT_ENABLE_MOBILE_CODE_LOGIN=false 
# Default is a 43-character string, a new value is generated each time the service is restarted
STEEDOS_TENANT_TOKEN_SECRET=  
# Default is 90d
STEEDOS_TENANT_ACCESS_TOKEN_EXPIRES_IN= 
# Default is 7d
STEEDOS_TENANT_REFRESH_TOKEN_EXPIRES_IN=  
```

# Metadata Synchronization

```bash
METADATA_SERVER=http://localhost:5000
METADATA_APIKEY=
```

## Attachment Storage

Configure parameters related to attachment storage.

### Local File System

```bash
STEEDOS_CFS_STORE=local
STEEDOS_STORAGE_DIR=/steedos-storage
```

### S3

Attachments can be stored on servers supporting the S3 protocol, including AWS, Alibaba Cloud, Tencent Cloud storage services, or privately deployed minio services.

```bash
STEEDOS_CFS_STORE=S3
STEEDOS_CFS_AWS_S3_ENDPOINT=http://minio:9000
STEEDOS_CFS_AWS_S3_FORCE_PATH_STYLE=true
STEEDOS_CFS_AWS_S3_BUCKET=steedos-prod
STEEDOS_CFS_AWS_S3_ACCESS_KEY_ID=${MINIO_ROOT_USER:-steedos} 
STEEDOS_CFS_AWS_S3_SECRET_ACCESS_KEY=${MINIO_ROOT_PASSWORD:-steedos123}
```

### Attachment Anonymous Download

By default, uploaded avatars, images, and attachments in the system require login for download.

The following variable can be set for anonymous downloads.

```bash
# Options include avatars, images, files, default is avatars
STEEDOS_CFS_DOWNLOAD_PUBLIC=avatars,images 
```

## Push Notifications

Configure parameters for mobile push notifications, used for receiving notification messages on the Steedos mobile app.

```bash
# iOS
STEEDOS_PUSH_APN_DATA=

# Andriod
STEEDOS_GCM_APIKEY=
STEEDOS_GCM_PROJECT_NUMBER=

# Huawei
STEEDOS_PUSH_HUAWEI_APPID=
STEEDOS_PUSH_HUAWEI_APPPKGNAME=
STEEDOS_PUSH_HUAWEI_APPSECRET=

# Xiaomi
STEEDOS_PUSH_MI_APPSECRET=
STEEDOS_PUSH_MI_PRODUCTION=
```

## Email Configuration

Configure SMTP service parameters for system push emails.

```bash
STEEDOS_EMAIL_FROM=
STEEDOS_EMAIL_URL=
STEEDOS_EMAIL_HOST=
STEEDOS_EMAIL_PORT=
STEEDOS_EMAIL_USERNAME=
STEEDOS_EMAIL_PASSWORD=
STEEDOS_EMAIL_SECURE=
STEEDOS_EMAIL_SIGNNAME=
```

## OIDC Authentication

Enterprise Edition: Configure parameters for OpenID Connect single sign-on, can connect to Keycloak server.

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

## Scheduled Tasks

Configure the properties for scheduled tasks.

```bash
# Time to execute database indexing, like “0 0 * * * *” above means indexing operation is performed once every hour. Existing indexes are not recreated.
STEEDOS_CRON_BUILD_INDEX="0 0 * * * *"

# Execution time for workflow rule queue, time-based workflow actions depend on this configuration, like “*/10 * * * * *” above means it's executed every 1 minutes.
STEEDOS_CRON_WORKFLOW_RULE='*/1 * * * *'

# Polling interval for the mail queue, in milliseconds.
STEEDOS_CRON_MAILQUEUE_INTERVAL=10000

# Polling interval for the push notification queue, in milliseconds.
STEEDOS_CRON_PUSH_INTERVAL=1000

# Polling interval for the webhook queue, in milliseconds.
STEEDOS_CRON_WEBHOOKQUEUE_INTERVAL=10000

# Polling interval for the instance record queue, in milliseconds.
STEEDOS_CRON_INSTANCERECORDQUEUE_INTERVAL=10000

# Polling interval for the SMS queue, in milliseconds.
STEEDOS_CRON_SMSQUEUE_INTERVAL=1000

# Polling interval for the object webhooks queue, in milliseconds.
STEEDOS_CRON_OBJECTWEBHOOKSQUEUE_INTERVAL=10000

# Polling interval of the object & workflow synchronization queue, in milliseconds.
STEEDOS_CRON_INSTANCERECORDQUEUE_INTERVAL=10000
```

## Developer Options 

```bash
STEEDOS_GRAPHQL_ENABLE_CONSOLE=true
STEEDOS_UNPKG_URL=https://unpkg.steedos.cn
STEEDOS_AMIS_VERSION=2.9.0
STEEDOS_PUBLIC_PAGE_ASSETURLS=http://127.0.0.1:8080/@steedos-widgets/amis-object/dist/assets-dev.json
STEEDOS_ENABLE_PROCESS_TRIGGER=true
```

## Account-related

Configure parameters related to accounts.

```yaml
accounts:
  mobile_phone_locales: ['zh-CN']
  mobile_regexp: '^[0-9]{11}$'
  is_username_skip_minrequiredlength: true
  UTF8_Names_Validation: '[A-Za-z0-9-_.\u00C0-\u017F\u4e00-\u9fa5]'
```

* mobile_phone_locales: This parameter takes precedence. Mobile phone localization, setting it to `zh-CN` means using the 11-digit mobile number in China. To support mobile numbers from other countries, please refer to [validator](https://www.npmjs.com/package/validator).
* mobile_regexp: Regular expression for mobile phone format, using a regular expression to describe the correct mobile phone format.
* is_username_skip_minrequiredlength: Whether to skip the minimum character requirement for usernames, which is typically 6 characters by default.
* UTF8_Names_Validation: Regular expression for username rules.

When multiple password rules are configured, they will take effect simultaneously. The rules in the example above are effective at the same time.
