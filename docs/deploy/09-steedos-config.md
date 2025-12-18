# Environment Variables

This page provides a guide on how to configure your self-hosted Steedos instance using environment variables.

---

## Required Configurations

These variables are essential for the core operation of the platform, database connectivity, and microservice communication.

```bash
# Platform
PORT=80
ROOT_URL=http://localhost

# Database
MONGO_URL=mongodb://127.0.0.1:27017/steedos
# Required for real-time features and triggers
MONGO_OPLOG_URL=mongodb://127.0.0.1:27017/local

# Microservices Communication (https://moleculer.services/docs/0.14/networking.html)
TRANSPORTER=redis://127.0.0.1:6379

# Caching (https://moleculer.services/docs/0.14/caching.html)
CACHER=redis://127.0.0.1:6379/1

```

---

## Login Screen

Configure parameters related to the login interface, such as registration permissions, password recovery, and tenant creation.

```bash
# Enable account creation. Defaults to true if the database is empty.
STEEDOS_TENANT_ENABLE_REGISTER=true  
# Enable password recovery; displays a "Forgot Password" link. Defaults to false.
STEEDOS_TENANT_ENABLE_FORGET_PASSWORD=true  
# Enable tenant creation. Defaults to true only when the database is empty.
STEEDOS_TENANT_ENABLE_CREATE_TENANT=false 
# Enable password-based login. Defaults to true.
STEEDOS_TENANT_ENABLE_PASSWORD_LOGIN=true 
# Force email binding; requires users to verify email after login. Defaults to false.
STEEDOS_TENANT_ENABLE_BIND_EMAIL=false 
# Force mobile binding; requires users to verify mobile number after login. Defaults to false.
STEEDOS_TENANT_ENABLE_BIND_MOBILE=false 
# Enable login via email verification code. Defaults to false.
STEEDOS_TENANT_ENABLE_EMAIL_CODE_LOGIN=false 
# Enable login via mobile verification code. Defaults to false.
STEEDOS_TENANT_ENABLE_MOBILE_CODE_LOGIN=false 
# Secret for token signing; a new value is generated on every restart if left empty.
STEEDOS_TENANT_TOKEN_SECRET=  
# Access token expiration. Default is 90d.
STEEDOS_TENANT_ACCESS_TOKEN_EXPIRES_IN= 
# Refresh token expiration. Default is 7d.
STEEDOS_TENANT_REFRESH_TOKEN_EXPIRES_IN=  

```

---

## Metadata Synchronization

Variables for connecting to a metadata server for configuration syncing.

```bash
METADATA_SERVER=http://localhost:5000
METADATA_APIKEY=

```

---

## Attachment Storage

Steedos supports multiple storage backends for files and attachments.

### Local File System

```bash
STEEDOS_CFS_STORE=local
STEEDOS_STORAGE_DIR=/steedos-storage

```

### S3 (Amazon AWS, Aliyun, Minio)

Attachments can be stored on any S3-compatible service.

```bash
STEEDOS_CFS_STORE=S3
STEEDOS_CFS_AWS_S3_ENDPOINT=https://s3.cn-northwest-1.amazonaws.com.cn
STEEDOS_CFS_AWS_S3_REGION=cn-northwest-1
STEEDOS_CFS_AWS_S3_SIGNATURE_VERSION=v4
STEEDOS_CFS_AWS_S3_BUCKET=steedos
STEEDOS_CFS_AWS_S3_ACCESS_KEY_ID=xxxxxxxx
STEEDOS_CFS_AWS_S3_SECRET_ACCESS_KEY=xxxxxxxx

```

### Public Attachment Download

By default, files require authentication. Use this to allow anonymous access for specific types.

```bash
# Options: avatars, images, files. Default is 'avatars'.
STEEDOS_CFS_DOWNLOAD_PUBLIC=avatars,images 

```

---

## Push Notifications

Configuration for mobile push services (APNs, Huawei, Xiaomi).

```bash
# iOS APNs
STEEDOS_PUSH_APN_DATA=

# Huawei (HMS)
STEEDOS_GCM_APIKEY=xxx
STEEDOS_GCM_PROJECT_NUMBER=xxx
STEEDOS_PUSH_HUAWEI_APPID=
STEEDOS_PUSH_HUAWEI_APPPKGNAME=
STEEDOS_PUSH_HUAWEI_APPSECRET=

# Xiaomi (MiPush)
STEEDOS_GCM_APIKEY=xxx
STEEDOS_GCM_PROJECT_NUMBER=xxx
STEEDOS_PUSH_MI_APPSECRET=
STEEDOS_PUSH_MI_PRODUCTION=

```

---

## Email Configuration

Configure SMTP parameters for system-generated emails.

```bash
STEEDOS_EMAIL_FROM=Steedos <noreply@example.com>
STEEDOS_EMAIL_URL=smtps://user:pass@smtp.example.com:465/
STEEDOS_EMAIL_HOST=smtp.example.com
STEEDOS_EMAIL_PORT=465
STEEDOS_EMAIL_USERNAME=xxxxx
STEEDOS_EMAIL_PASSWORD=xxxxx
STEEDOS_CRON_MAILQUEUE_INTERVAL=3000 # Mail queue interval in milliseconds

```

---

## SMS Configuration

Currently supports Tencent Cloud SMS services.

```bash
STEEDOS_SMS_QCLOUD_SDKAPPID=xxxxxx
STEEDOS_SMS_QCLOUD_APPKEY=xxxxxx
STEEDOS_SMS_QCLOUD_SIGNNAME=【Steedos】 # SMS Signature template name
STEEDOS_CRON_SMSQUEUE_INTERVAL=3000 # SMS queue interval in milliseconds

```

---

## OIDC Authentication

**Enterprise Edition**: Connect to OpenID Connect providers like Keycloak.

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

---

## Cron Jobs

Define the frequency and execution intervals for background tasks.

```bash
# Interval for database indexing (Cron syntax).
STEEDOS_CRON_BUILD_INDEX="0 0 * * * *"

# Execution interval for workflow rules; time-based actions rely on this.
STEEDOS_CRON_WORKFLOW_RULE='*/1 * * * *'

# Polling interval for mail queue (ms).
STEEDOS_CRON_MAILQUEUE_INTERVAL=10000

# Polling interval for push notifications (ms).
STEEDOS_CRON_PUSH_INTERVAL=1000

# Polling interval for webhooks (ms).
STEEDOS_CRON_WEBHOOKQUEUE_INTERVAL=10000

# Polling interval for real-time messaging (ms).
STEEDOS_CRON_MESSAGINGQUEUE_INTERVAL=1000

# Polling interval for object process synchronization (ms).
STEEDOS_CRON_INSTANCERECORDQUEUE_INTERVAL=10000

```

---

## Account Settings

Configure validation rules for user accounts and mobile numbers.

```yaml
accounts:
  mobile_phone_locales: ['zh-CN']
  mobile_regexp: '^[0-9]{11}$'
    is_username_skip_minrequiredlength: true
    UTF8_Names_Validation: '[A-Za-z0-9-_.\u00C0-\u017F\u4e00-\u9fa5]'

```

* **mobile_phone_locales**: Priority locale for mobile numbers (e.g., `zh-CN`).
* **mobile_regexp**: Regex for validating mobile phone formats.
* **is_username_skip_minrequiredlength**: Whether to bypass the 6-character minimum username length.
* **UTF8_Names_Validation**: Regex rule for valid usernames.

---

## Password Policy Configuration

Password complexity is controlled via regex and custom functions.

```yaml
public:
  password:
    policy: ^[A-Za-z0-9]{8,}$
    policyError: "Password must be at least 8 characters long"
    policies:
      - policy: 123
        policyError: "Password must contain '123'"
      - policy: 456
        policyError: "Password must contain '456'"
    policyFunction: !
      function(password){
        if(password === '12345678'){
          throw new Error('Password cannot be 12345678');
        }
      }

```

* **public.password.policyFunction**: A custom validation function (takes 1 parameter: `password`). Throw an error if the validation fails.
* **public.password.policies**: An array of regex objects and their corresponding error messages. Multiple rules can be enforced simultaneously.