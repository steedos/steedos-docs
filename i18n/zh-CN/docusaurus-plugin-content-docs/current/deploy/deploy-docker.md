---
sidebar_label: Docker 部署
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Steedos Docker 部署指南

本文档将指导您如何使用 Docker 在您的 Linux 服务器上部署 Steedos 平台。

## 前提条件

在开始之前，请确保您的系统满足以下要求：

1. 系统版本为Ubuntu22.04并且可以访问外网
2. [Docker](https://docs.docker.com/get-docker/) (版本 20.10.7 或更高版本)
3. [Docker-Compose](https://docs.docker.com/compose/install/) (版本 1.29.2 或更高版本)
4. 确保服务器端口（如 80, 443）已开放，以便外部访问
5. 如果部署 Steedos 企业版，需要先获得许可证

## 部署步骤

### 准备配置文件

创建一个名为 `docker-compose.yml` 的文件，并填入以下内容：

<Tabs queryString="current-edition">
<TabItem label="社区版" value="community_edition">

```yaml
version: "3.9"

services:

  steedos:
    image: steedos/steedos-community:latest
    ports:
      - "80:80"        # Steedos
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
      - "6379:6379"    # Redis
    environment:
      - ROOT_URL=http://127.0.0.1 # 请将此处替换为您的服务器ip
      - NPM_REGISTRY_URL=https://registry.npmmirror.com
    volumes:
      - "./steedos-storage:/steedos-storage"
```

</TabItem>

<TabItem label="企业版" value="enterprise_edition">

```yaml
version: "3.9"

services:

  steedos-enterprise:
    image: steedos/steedos-enterprise:latest
    ports:
      - "80:80"        # Steedos
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
      - "6379:6379"    # Redis
    environment:
      - ROOT_URL=http://127.0.0.1 # 请将此处替换为您的服务器ip
      - STEEDOS_LICENSE= # 请将此处替换为您的 Steedos 企业版许可证
      - NPM_REGISTRY_URL=https://registry.npmmirror.com
    volumes:
      - "./steedos-storage:/steedos-storage"
```

</TabItem>
</Tabs>

请根据您的实际情况调整环境变量和端口。

### 启动容器

在包含 `docker-compose.yml` 文件的目录中，运行以下命令来启动 Steedos 容器：

```bash
docker-compose up -d
```

### 验证部署

部署完成后，您可以通过浏览器访问 `http://127.0.0.1`（或您配置的其他地址）来验证 Steedos 是否成功运行。

## 配置和优化

### 调整服务端口

当部署的服务与本地已有服务存在端口冲突问题时，可以通过配置 docker-compose.yml 文件中的ports属性来修改需要访问的端口，一般修改服务器的映射端口，而不是修改服务的启动端口，例如：

```yaml
version: "3.9"

services:

  steedos:
    image: steedos/steedos-community:latest
    ports:
      - "8080:80"      # Steedos 此时服务的访问端口为8080
      - "27017:27017"  # MongoDB
      - "9001:9001"    # Supervisor
      - "6379:6379"    # Redis
    environment:
      - ROOT_URL=http://127.0.0.1:8080 # 注意此处的端口修改为8080
      - NPM_REGISTRY_URL=https://registry.npmmirror.com
    volumes:
      - "./steedos-storage:/steedos-storage"
```

修改后重启服务，通过修改后的端口访问服务，例如：http://127.0.0.1:8080
```shell
docker-compose restart
```

### 配置环境变量

通过修改 docker-compose.yml 文件中environment属性来增加或修改环境变量，例如：
```yaml
# 配置连接外部数据库
...
    environment:
      - ROOT_URL=http://127.0.0.1
      - NPM_REGISTRY_URL=https://registry.npmmirror.com
      # 连接ip为192.168.0.11的Mongodb数据库，数据库为steedos_data
      - MONGO_URL=mongodb://192.168.0.11:27017/steedos_data 
      # oplog配置连接外部Monodb数据库
      - MONGO_OPLOG_URL=mongodb://192.168.0.11:27017/local 

```

```yaml
# 配置登录界面相关参数
...
    environment:
      # 允许账户创建，默认在数据库为空时为 true
      - STEEDOS_TENANT_ENABLE_REGISTER=true  
      # 允许密码恢复，设置为 true 将显示链接以检索密码，默认为 false。
      - STEEDOS_TENANT_ENABLE_FORGET_PASSWORD=true  
      # 允许创建公司，默认仅在数据库为空时允许
      - STEEDOS_TENANT_ENABLE_CREATE_TENANT=false 
      # 允许密码登录，默认对于注册和登录都是启用的，默认为 true
      - STEEDOS_TENANT_ENABLE_PASSWORD_LOGIN=true 
      # 强制绑定电子邮件，登录后需要输入并验证电子邮件，默认为 false
      - STEEDOS_TENANT_ENABLE_BIND_EMAIL=false 
      # 强制绑定手机号码，登录后需要输入并验证手机号码，默认为 false
      - STEEDOS_TENANT_ENABLE_BIND_MOBILE=false 
      # 允许使用电子邮件验证码登录，需要配置邮件发送参数。
      - STEEDOS_TENANT_ENABLE_EMAIL_CODE_LOGIN=false 
      # 允许使用手机验证码登录，需要配置短信发送参数。
      - STEEDOS_TENANT_ENABLE_MOBILE_CODE_LOGIN=false 

```

```yaml
# 配置附件存储S3，以国内aws宁夏服务器为例
...
    environment:
      - STEEDOS_CFS_STORE=S3
      - STEEDOS_CFS_AWS_S3_ENDPOINT=https://s3.cn-northwest-1.amazonaws.com.cn
      - STEEDOS_CFS_AWS_S3_REGION=cn-northwest-1
      - STEEDOS_CFS_AWS_S3_SIGNATURE_VERSION=v4
      - STEEDOS_CFS_AWS_S3_BUCKET=steedos   # bucket名称
      - STEEDOS_CFS_AWS_S3_ACCESS_KEY_ID=xxxxxxxxx
      - STEEDOS_CFS_AWS_S3_SECRET_ACCESS_KEY=xxxxxxxxx

```

```yaml
# 配置短信发送参数，登录时可以通过手机验证码登录，以腾讯短信为例
...
    environment:
      - STEEDOS_SMS_QCLOUD_SDKAPPID=xxxxxx
      - STEEDOS_SMS_QCLOUD_APPKEY=xxxxxx
      - STEEDOS_SMS_QCLOUD_SIGNNAME=【华炎魔方】 # 此配置为腾讯短信服务中的签名模板名称
      - STEEDOS_CRON_SMSQUEUE_INTERVAL=3000 # 短信定时器，单位：毫秒

```

```yaml
# 配置邮件发送参数，登录时可以通过邮箱验证码登录
...
    environment:
      - STEEDOS_EMAIL_FROM=华炎魔方 <noreply@xxx.com>
      - STEEDOS_EMAIL_URL=smtps://xxxxxxx:xxxxxxxxx@email.xxxx.amazonaws.com:465/
      - STEEDOS_EMAIL_HOST=email.xxxx.amazonaws.com
      - STEEDOS_EMAIL_PORT=465
      - STEEDOS_EMAIL_USERNAME=xxxxx
      - STEEDOS_EMAIL_PASSWORD=xxxxx
      - STEEDOS_CRON_MAILQUEUE_INTERVAL=3000 # 邮件定时器，单位：毫秒

```

更多环境变量配置参考文档：[配置 Steedos 实例](/deploy/steedos-config)


## 更新和维护

### 服务控制台

当服务启动后，会在本地自动创建文件夹steedos-storage存储系统配置信息、数据库文件和附件（默认存本地）

```yaml
steedos-storage
  configuration # 系统配置参数，包含MongoDB数据库连接用户、密码，Supervisor登录账户和密码
  data          # 数据库文件存储路径、备份数据库存储路径
  files         # 本地附件存储路径
  logs          # 本地日志存储路径，包含nginx、mongodb、steedos等服务日志
  ssl           # ssl证书存储路径
  unpkg         # 资产包缓存路径
```

可以通过 http://127.0.0.1:9001 访问 Supervisor 控制台，登录账号密码可以在 steedos-storage/configuration/docker.env 中查看：

```
STEEDOS_SUPERVISOR_USER=steedos
STEEDOS_SUPERVISOR_PASSWORD=xxxxxxxxx
```

成功登录后就可以在浏览器端启动服务、查看相关日志

### 启停、更新服务

当 Steedos 发布新版本时，您可以通过以下步骤更新您的部署：
1. 查看docker服务运行id、状态等信息：

```bash
docker ps
```

2. 停止当前运行的容器：

```bash
docker-compose down
```

> 如果需要同时清理volume数据，可以使用 `docker-compose down -v` 命令。

3. 拉取最新的 Steedos 镜像：

```bash
docker-compose pull
```

4. 重新启动容器：

```bash
docker-compose up -d
```

确保在更新前备份您的数据。

### 连接服务数据库

通过 steedos-storage/configuration/docker.env 文件查看获取数据库连接用户名和密码

```bash
cat steedos-storage/configuration/docker.env
# STEEDOS_MONGODB_USER=root
# STEEDOS_MONGODB_PASSWORD=xxxxxxx
```

docker内部启用的mongo服务默认不允许外部连接，只能通过连接到镜像内部访问

```bash
# 通过docker ps查看并记录服务id，例如为ddassnnssa
# 连接到docker镜像内部
docker exec -it ddassnnssa bash

# 执行mongo
mongo

# 进行登录验证
use admin;
# 替换STEEDOS_MONGODB_USER和STEEDOS_MONGODB_PASSWORD为docker.env中的值
db.auth("STEEDOS_MONGODB_USER","STEEDOS_MONGODB_PASSWORD") 
# db.auth返回值为1 验证成功

# 查看数据库，默认为steedos
use steedos

# 执行mongo语句进行数据库操作
```

更多数据库操作指令参考官方文档：[MongoDB CURD](https://www.mongodb.com/docs/v4.4/crud/)

### 备份数据库

1. 下载备份脚本 [backup.zip](https://www-steedos-com.oss-accelerate.aliyuncs.com/scripts/backup.zip) 到steedos-storage/data/backup中

2. 解压zip文件
```bash
sudo unzip backup.zip
```

3. 修改backup.sh中的环境变量

```bash
HOST="localhost" # MongoDB地址，默认为localhost
PORT="27017"     # MongoDB默认服务端口
SERVICE_NAME=""  # Steedos服务名称，docker ps可查
USERNAME=""      # MongoDB服务名称，docker.env中STEEDOS_MONGODB_USER值
PASSWORD=""      # MongoDB服务名称，docker.env中STEEDOS_MONGODB_PASSWORD值
DATEBASE="admin" # MongoDB验证登录的数据库，默认是admin，不用修改
```

4. 添加备份文件可执行权限

```bash
sudo chmod 700 backup.sh
```

5. 执行备份脚本

```bash
sudo ./backup.sh
# 执行成功后会在本地生成一个以日期时间命名的tag.gz文件，例如：31-07.tar.gz
```

6. 还原数据库

```bash
# 通过docker ps 查看steedos服务运行id，例如为ddassnnssa
docker exec -it ddassnnssa bash

# 进入备份的数据库路径
cd /steedos-storage/data/backup

# 解压备份的压缩文件并进入解压后的文件夹中
tar -xzvf 31-07.tar.gz
cd mongodb-31-07

# 执行mongorestore还原数据库steedos，替换STEEDOS_MONGODB_USER和STEEDOS_MONGODB_PASSWORD为docker.env中的值
mongorestore -d steedos -u STEEDOS_MONGODB_USER -p STEEDOS_MONGODB_PASSWORD --authenticationDatabase=admin --drop steedos

# -d 后面的steedos为还原的目标数据库，也可以自定义值，例如修改steedos_data，就可以将数据库还原到新库steedos_data
mongorestore -d steedos_data -u STEEDOS_MONGODB_USER -p STEEDOS_MONGODB_PASSWORD --authenticationDatabase=admin --drop steedos
```

7. 配置系统定时任务自动备份数据库

通过backup.sh脚本备份的数据库是以日期-时间命名的，因此可以通过ubuntu自带的cron定时任务，周期性的备份数据库，以符合生产环境的需求；

```bash
# Ubuntu系统默认自带cron服务，没有的话通过命令安装
sudo apt-get install cron
sudo service cron start

# 编辑定时任务列表
crontab -e

# 通过vi命令添加下列备份事件：每天23点进行备份，修改path/to为备份脚本实际路径
0 23 * * * /path/to/backup.sh >> /path/to/backup.log 

# 注意很多服务器时区为UTC，需要在配置时减去8小时，例如配置utc时区服务器每天23点定时备份
0 15 * * * /path/to/backup.sh >> /path/to/backup.log 

# 保存后退出，并重启cron服务：
sudo service cron restart
```

## 故障排除

如果在部署过程中遇到问题，请检查以下事项：

- 确保所有环境变量都已正确设置。
- 检查 Docker 容器的日志以获取错误信息。
- 确保服务器端口没有被防火墙阻止。

## 进一步阅读

* [配置 Steedos 实例](/deploy/steedos-config)
