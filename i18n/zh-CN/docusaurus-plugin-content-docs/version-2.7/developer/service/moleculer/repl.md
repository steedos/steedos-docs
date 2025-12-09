# REPL控制台

REPL是Steedos的交互式开发者控制台。

## 使用方法

**将代理切换到REPL模式**

```bash
yarn moleculer-runner --repl
```

## REPL命令

```
命令:
  actions [选项]                                            列出所有动作
  bench [选项] <动作> [json参数] [元数据]                     服务动作基准测试
  broadcast <事件名称>                                        广播事件
  broadcastLocal <事件名称>                                   本地广播事件
  cache                                                        管理缓存
  call [选项] <动作名称> [json参数] [元数据]                   调用一个动作
  dcall [选项] <节点ID> <动作名称> [json参数] [元数据]          直接调用一个动作
  clear [模式]                                                清除缓存条目
  cls                                                          清空控制台
  destroy <服务名称>                                          销毁本地服务
  emit <事件名称>                                             发出一个事件
  env                                                          环境变量列表
  events [选项]                                               事件监听器列表
  info                                                         代理信息
  listener                                                     添加或删除事件监听器
  load <服务路径>                                              从文件加载服务
  loadFolder <服务文件夹> [文件掩码]                            从文件夹加载所有服务
  metrics [选项]                                              列出指标
  nodes [选项]                                                节点列表
  exit|q                                                       退出程序
  services [选项]                                             服务列表
  help [命令]                                                 显示命令帮助
```

### 列出节点
```bash
mol $ nodes
```

**选项**
```
    -a, --all             列出所有（离线）节点
    -d, --details         详细列表
    -f, --filter <匹配>    筛选节点（例如：'node-*'）
    --raw                 将服务注册表打印为JSON
    --save [文件名]        将服务注册表保存为JSON文件
```

**输出**
![image](/img/service/repl/nodes.png)

**详细输出**
![image](/img/service/repl/nodes-detailed.png)

### 列出服务
```bash
mol $ services
```

**选项**
```
    -a, --all             列出所有（离线）服务
    -d, --details         打印端点
    -f, --filter <匹配>    筛选服务（例如：'user*'）
    -i, --skipinternal    跳过内部服务
    -l, --local           仅本地服务
```

**输出**

![image](/img/service/repl/services.png)

**详细输出**

![image](/img/service/repl/services-detailed.png)

### 列出动作
```bash
mol $ actions
```

**选项**
```
    -a, --all             列出所有（离线）动作
    -d, --details         打印端点
    -f, --filter <匹配>    筛选动作（例如：'users.*'）
    -i, --skipinternal    跳过内部动作
    -l, --local           仅本地动作
```

**输出**

![image](/img/service/repl/actions.png)

**详细输出**

![image](/img/service/repl/actions-detailed.png)

### 列出事件
```bash
mol $ events
```

**选项**
```
    -a, --all             列出所有（离线）事件监听器
    -d, --details         打印端点
    -f, --filter <匹配>    筛选事件监听器（例如：'user.*'）
    -i, --skipinternal    跳过内部事件监听器
    -l, --local           仅本地事件监听器
```

**输出**

![image](/img/service/repl/events.png)

**详细输出**

![image](/img/service/repl/events-detailed.png)

### 显示常见信息
```bash
mol $ info
```

**输出**

![image](https://cloud.githubusercontent.com/assets/306521/26260974/aaea9b02-3ccf-11e7-9e1c-ec9150518791.png)

### 列出环境变量
```bash
mol $ env
```

### 调用一个动作
```bash
mol $ call "test.hello"
```

**输出**

![image](/img/service/repl/call1.png)

**选项**
```
    --help               输出使用信息
    --load [文件名]       从文件加载参数
    --stream [文件名]     将文件作为流发送
    --save [文件名]       将响应保存到文件
```

#### 带参数调用动作
```bash
mol $ call "math.add" --a 5 --b Bob --c --no-d --e.f "hello"
```
参数将是 `{ a: 5, b: 'Bob', c: true, d: false, e: { f: 'hello' } }`

#### 带参数、元数据和选项的调用
```bash
mol $ call "math.add" --a 5 --#b Bob --$timeout 1
```
参数将是 `{ a: 5 }`，元数据将是 `{ b: 'Bob' }`，选项将是 `{ timeout: 1 }`。

#### 使用JSON字符串参数调用
```bash
mol $ call "math.add" '{"a": 5, "b": "Bob", "c": true, "d": false, "e": { "f": "hello" } }'
```
参数将是 `{ a: 5, b: 'Bob', c: true, d: false, e: { f: 'hello' } }`

#### 从文件中调用参数
```bash
mol $ call "math.add" --load
```
它试图加载 `<当前目录>/math.add.params.json` 文件到参数。

```bash
mol $ call "math.add" --load custom.params.json
```
它加载 `<当前目录>/custom.params.json` 文件到参数。

#### 使用流文件调用
```bash
mol $ call "math.add" --stream my-photo.png
```
它将文件 `my-photo.png` 作为流发送。

#### 保存响应到文件
```bash
mol $ call "math.add" --save response.json
```
它将响应保存到文件 `response.json`。
