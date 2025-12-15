# 5分钟快速上手 (Docker)

:::info 学习目标

  * 不需要像程序员一样敲一堆安装命令。
  * 理解 **Docker** 是什么（只需把它当成一个“应用播放器”）。
  * 在你的电脑上成功运行起一个全新的 Steedos 系统。
:::

## 为什么要用 Docker？

如果要在传统方式下安装 Steedos，你需要分别安装数据库（MongoDB）、缓存服务（Redis）、运行环境（Node.js），还要配置复杂的网络连接。这对于第一次接触的人来说，很容易在第一步就放弃。

**Docker** 就像是一个\*\*“应用播放器”**。Steedos 官方已经把上述所有的软件、配置都打包成了一个**“镜像文件”\*\*（就像一张光盘）。你只需要安装 Docker，放入这张“光盘”，系统就会自动运行起来。

-----

## 准备工作

### 1\. 安装 Docker Desktop

请前往 Docker 官网下载并安装适合您电脑（Windows 或 Mac）的 **Docker Desktop**。

  * [下载 Docker Desktop](https://www.docker.com/products/docker-desktop)
  * 安装完成后，启动 Docker Desktop，确保左下角显示绿色的类似“Engine running”的状态。

### 2\. 创建项目文件夹

在你的电脑桌面上（或任意位置），新建一个文件夹，命名为 `my-steedos-app`。

-----

## 启动你的第一个系统

### 第 1 步：创建配置文件

打开你刚才创建的 `my-steedos-app` 文件夹。新建一个文本文件，将其命名为 **`docker-compose.yml`** (注意后缀是 `.yml`，不是 `.txt`)。

用记事本（或 VS Code）打开它，复制并粘贴以下内容：

```yaml
version: "3"

services:
  steedos:
    image: steedos/steedos-community:3.0
    restart: always
    ports:
      - "5100:80"
    environment:
      - ROOT_URL=http://localhost:5100
    volumes:
      - "./steedos-storage:/steedos-storage"
```

:::tip 这段代码在做什么？
它告诉 Docker：“请帮我启动Steedos 主程序、并把系统的入口开在 5100 端口。”
:::

### 第 2 步：一键启动

1.  打开**终端 (Terminal)** 或 **PowerShell**。
2.  输入 `cd` 并把你的文件夹拖进去，回车进入目录。
3.  输入以下“魔法命令”并回车：

<!-- end list -->

```bash
docker-compose up -d
```

Docker 会自动开始下载所需的镜像文件（第一次可能需要几分钟，取决于网速）。当看到全是绿色的 `Done` 或 `Started` 时，说明启动成功了！

### 第 3 步：访问系统

1.  打开浏览器（推荐 Chrome）。
2.  在地址栏输入：`http://localhost:5100`
3.  稍等片刻（第一次启动可能需要 30-60 秒初始化数据）。
4.  你会看到 **Steedos 的欢迎/注册页面**。

🎉 **恭喜！你已经拥有了一套属于自己的低代码平台。**

-----

## 常用操作

### 如何停止系统？

在终端中输入：

```bash
docker-compose down
```

### 如何查看日志？

如果系统打不开，可以通过日志查看原因：

```bash
docker-compose logs -f
```

### 数据存在哪里？

别担心 Docker 删除后数据会丢。看看你的 `my-steedos-app` 文件夹，是不是多了两个目录？

  * `steedos-storage`：这里存放着上传的图片和附件。
    只要保留好这个文件夹，你的数据就是安全的。

-----

## 常见问题 (FAQ)

**Q: 启动时提示 "Bind for 0.0.0.0:5100 failed: port is already allocated"？**
A: 这说明你电脑上的 `5100` 端口被其他软件占用了。

  * **解决方法**：修改 `docker-compose.yml` 文件。找到 `ports: - "5100:80"`，将其改为 `"8080:80"`。保存后，重新运行启动命令，然后访问 `http://localhost:8080`。

**Q: 浏览器一直转圈，打不开？**
A: 第一次启动时，Steedos 需要在后台创建大量基础元数据，可能需要一会。请喝杯水，稍后再刷新页面。如果 1 分钟后还不行，请检查 Docker Desktop 内存设置是否过小（建议分配 4GB 以上内存）。
