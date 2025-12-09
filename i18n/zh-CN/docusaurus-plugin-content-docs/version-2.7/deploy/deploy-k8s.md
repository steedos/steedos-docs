---
sidebar_label: Kubernetes 部署
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Steedos Kubernetes 部署指南

本文档将指导您如何在您的 AWS EKS 集群中部署 Steedos 平台。

## 前提条件

在开始之前，请确保您的系统满足以下要求：

1. 操作系统为Ubuntu 22.04 
2. AWS EKS 版本为 1.23
3. [AWS CLI](https://docs.amazonaws.cn/cli/latest/userguide/getting-started-install.html)（安装最新版）
4. [kubectl](https://docs.amazonaws.cn/eks/latest/userguide/install-kubectl.html) (适用于Kubernetes 1.23)
5. 确保AWS服务端口（如 80, 443）已开放，以便外部访问
6. 如果部署 Steedos 企业版，需要先获得许可证

## 部署步骤

### 配置连接EKS集群

1. 创建EKS集群，参考文档：https://docs.aws.amazon.com/zh_cn/eks/latest/userguide/create-cluster.html

2. 配置aws cli和kubectl访问您的eks集群，参考文档：https://docs.aws.amazon.com/zh_cn/eks/latest/userguide/cluster-auth.html

### 准备配置文件

创建一个名为 `deployment.yaml` 的文件，并填入以下内容：

<Tabs queryString="current-edition">
<TabItem label="社区版" value="community_edition">

```yaml
# 命名空间
apiVersion: v1
kind: Namespace
metadata:
  name: community
  labels:
    as-steedos-managed-tenant: community
---
# 数据持久化 PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ebs-claim-community
  namespace: community
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: default
  resources:
    requests:
      storage: "5Gi"
---
# 主应用
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app-name: community
  name: community
  namespace: community
spec:
  replicas: 1
  selector:
    matchLabels:
      app-name: community
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app-name: community
    spec:
      containers:
        - env:
            - name: ROOT_URL
              value: 'http://127.0.0.1'
            - name: NPM_REGISTRY_URL
              value: 'https://registry.npmmirror.com'
          image: 'steedos/steedos-community:latest'
          imagePullPolicy: Always
          name: community
          readinessProbe:
            failureThreshold: 3
            httpGet:
              path: /api/health_check
              port: 80
              scheme: HTTP
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 1
          resources:
            limits:
              cpu: '4'
              ephemeral-storage: 4Gi
              memory: 6Gi
            requests:
              cpu: 200m
              ephemeral-storage: 2Gi
              memory: 1Gi
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          volumeMounts:
            - mountPath: /app/.steedos
              name: steedos-store-pv-mounted-path
              subPath: steedos-data
            - mountPath: /steedos-storage
              name: steedos-store-pv-mounted-path
              subPath: steedos-storage
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
      volumes:
        - name: steedos-store-pv-mounted-path
          persistentVolumeClaim:
            claimName: ebs-claim-community
```

</TabItem>

<TabItem label="企业版" value="enterprise_edition">

```yaml
# 命名空间
apiVersion: v1
kind: Namespace
metadata:
  name: enterprise
  labels:
    as-steedos-managed-tenant: enterprise
---
# 数据持久化 PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ebs-claim-enterprise
  namespace: enterprise
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: resize-sc
  resources:
    requests:
      storage: "5Gi"
---
# 主应用
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app-name: enterprise
  name: enterprise
  namespace: enterprise
spec:
  replicas: 1
  selector:
    matchLabels:
      app-name: enterprise
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app-name: enterprise
    spec:
      containers:
        - env:
            - name: ROOT_URL
              value: 'http://127.0.0.1'
            - name: NPM_REGISTRY_URL
              value: 'https://registry.npmmirror.com'
          image: 'steedos/steedos-enterprise:latest'
          imagePullPolicy: Always
          name: enterprise
          readinessProbe:
            failureThreshold: 3
            httpGet:
              path: /api/health_check
              port: 80
              scheme: HTTP
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 1
          resources:
            limits:
              cpu: '4'
              ephemeral-storage: 4Gi
              memory: 6Gi
            requests:
              cpu: 200m
              ephemeral-storage: 2Gi
              memory: 1Gi
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          volumeMounts:
            - mountPath: /app/.steedos
              name: steedos-store-pv-mounted-path
              subPath: steedos-data
            - mountPath: /steedos-storage
              name: steedos-store-pv-mounted-path
              subPath: steedos-storage
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
      volumes:
        - name: steedos-store-pv-mounted-path
          persistentVolumeClaim:
            claimName: ebs-claim-enterprise
```

</TabItem>
</Tabs>

* Namespace: 命名空间，用于隔离部署的服务，不会影响default命名空间下部署的服务。
* PersistentVolumeClaim: k8s持久化存储，用于存储服务配置文件、数据、附件等。
* Deployment: 管理部署的应用服务。

请根据您的实际情况调整环境变量和端口。

### 启动容器

在包含 `deployment.yaml` 文件的目录中，运行以下命令来部署steedos服务：

```bash
kubectl apply -f deployment.yaml
```

### 验证部署

部署完成后，eks集群默认无法直接通过服务端口访问，需要配置Elastic Load Balancing负载均衡器访问。

参考文档：https://docs.amazonaws.cn/elasticloadbalancing/latest/userguide/load-balancer-getting-started.html

例如：配置ELB协议端口80指向Steedos服务80端口，DNS名称为k8s-test-113344.cn-northwest-1.elb.amazonaws.com.cn，成功配置后可以通过http://k8s-test-113344.cn-northwest-1.elb.amazonaws.com.cn访问Steedos服务

## 配置和优化

当服务启动后，会在本地自动创建文件夹steedos-storage存储系统配置信息、数据库文件和附件（默认存本地）

```yaml
steedos-storage
  configuration 
  data 
  files 
  logs 
  ssl 
  unpkg 
```
* configuration: 系统配置参数，包含MongoDB数据库连接用户、密码，Supervisor登录账户和密码
* data: 数据库文件存储路径、备份数据库存储路径
* files: 本地附件存储路径
* logs: 本地日志存储路径，包含nginx、mongodb、steedos等服务日志
* ssl: ssl证书存储路径
* unpkg: 资产包缓存路径


### 配置环境变量

可以通过编辑 deployment.yaml 文件kind为Deployment中的env属性

例如：配置连接公网IP为122.168.22.11的外部MongoDB数据库：
```
  containers:
    - env:
        - name: ROOT_URL
          value: 'http://127.0.0.1'
        - name: NPM_REGISTRY_URL
          value: 'https://registry.npmmirror.com'
        - name: MONGO_URL
          value: 'mongodb://122.168.22.11:27017/steedos'
        - name: MONGO_OPLOG_URL
          value: 'mongodb://122.168.22.11:27017/local'

```

更多环境变量配置参考文档：[配置 Steedos 实例](/deploy/steedos-config)

### 数据持久化

数据持久化的作用是将宿主机上的数据与容器内的数据形成映射，实现数据的共享或者数据的保存。当删除容器的时候，在宿主机上仍然能够保留文件目录。

服务启动后会自动创建一块steedos-store-pv-mounted-path的ebs数据盘用来映射服务内的数据文件，默认大小为5GB，可在控制台自行调整数据盘大小：

```
  volumeMounts:
    - mountPath: /app/.steedos
      name: steedos-store-pv-mounted-path
      subPath: steedos-data
    - mountPath: /steedos-storage
      name: steedos-store-pv-mounted-path
      subPath: steedos-storage
```
## 更新和维护

### 启停、更新服务

当 Steedos 发布新版本时，您可以通过以下步骤更新您的部署：

1. 查看k8s服务运行id、状态等信息：

```bash
# 查看pod id，例如：steedos-community-fpllw
kubectl get pod -n community

kubectl describe pod steedos-community-fpllw -n community
```

2. 停止当前运行的容器：

```bash
kubectl delete pod steedos-community-fpllw -n community
```

> 如果需要同时清理volume数据，可以使用 `kubectl delete -f deployment.yaml` 命令。

3. 更新部署服务：

```bash
kubectl apply -f deployment.yaml
```

确保在更新前备份您的数据。

### 连接数据库

通过 steedos-storage/configuration/docker.env 文件查看获取数据库连接用户名和密码

```bash
# 查看pod id，例如：steedos-community-fpllw
kubectl get pod -n community

# 连接到服务内部
kubectl exec -it steedos-community-fpllw bash -n community

# 查看配置文件
cat /steedos-storage/configuration/docker.env
# STEEDOS_MONGODB_USER=root
# STEEDOS_MONGODB_PASSWORD=xxxxxxx
```

k8s内部启用的mongo服务默认不允许外部连接，只能通过连接到镜像内部访问

```bash
# 查看pod id，例如：steedos-community-fpllw
kubectl get pod -n community

# 连接到服务内部
kubectl exec -it steedos-community-fpllw bash -n community

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

1. 连接到服务内部
```bash
# 查看pod id，例如：steedos-community-fpllw
kubectl get pod -n community

# 连接到服务内部
kubectl exec -it steedos-community-fpllw bash -n community
```

2. 执行备份脚本

```bash
cd /steedos-storage/data/backup

# 执行mongodump后会生产一个dump备份文件
mongodump -d steedos -u STEEDOS_MONGODB_USER -p STEEDOS_MONGODB_PASSWORD --authenticationDatabase=admin
```
3. 压缩并拷贝到本地
```bash
# 将dump文件夹压缩成dump.tar.gz
tar -czf dump.tar.gz dump

# 本地执行kubectl将pod中的备份文件拷贝到本地
kubectl cp steedos-community-fpllw:/steedos-storage/data/backup/dump.tar.gz . -n community
```

更多数据库备份配置参考官方文档：[database-tools: mongodump](https://www.mongodb.com/docs/database-tools/mongodump/)

### 还原数据库

1. 将备份的数据库拷贝到pod中/steedos-storage/data/backup路径下

```bash
kubectl cp dump.tar.gz steedos-community-fpllw:/steedos-storage/data/backup/ -n community
```

2. 进入备份的数据库路径

```bash
kubectl exec -it steedos-community-fpllw bash -n community

cd /steedos-storage/data/backup
```

3. 解压备份的压缩文件并进入解压后的文件夹中

```bash
tar -xzvf dump.tar.gz
cd dump
```

4. 执行mongorestore还原数据库steedos，替换STEEDOS_MONGODB_USER和STEEDOS_MONGODB_PASSWORD为docker.env中的值

```bash
mongorestore -d steedos -u STEEDOS_MONGODB_USER -p STEEDOS_MONGODB_PASSWORD --authenticationDatabase=admin --drop steedos
```

注意： -d 后面的steedos为还原的目标数据库，也可以自定义值，例如修改为steedos_data，就可以将数据库还原到新库steedos_data

```bash
mongorestore -d steedos_data -u STEEDOS_MONGODB_USER -p STEEDOS_MONGODB_PASSWORD --authenticationDatabase=admin --drop steedos
```

更多数据库还原配置参考官方文档：[database-tools: mongorestore](https://www.mongodb.com/docs/database-tools/mongorestore/)

## 故障排除

如果在部署过程中遇到问题，请检查以下事项：

- 确保所有环境变量都已正确设置。
- 检查 k8s 容器的日志以获取错误信息。
- 确保服务器端口没有被防火墙阻止。

## 进一步阅读

* [配置 Steedos 实例](/deploy/steedos-config)
