---
sidebar_position: 50
---

# 自定义组件

## 介绍

[Amis](https://aisuda.bce.baidu.com/amis/zh-CN/docs) 本身提供了非常丰富的组件功能，基本它可以实现大部分业务场景的UI界面需求。

如果遇到适合自己开发自定义组件的场景，我们也可以通过自定义资产包来把自定义组件集成到amis设计器中，这样我们就可以实现任何我们想要的UI效果了。 

## 配置自定义资产包

只要把自定义资产包地址配置到环境变量 `STEEDOS_PUBLIC_PAGE_ASSETURLS` 中，Steedos会根据资产包中配置的资源包地址自动把相关自定义组件加载并集成到amis引擎中，非常方便。

```bash
STEEDOS_PUBLIC_PAGE_ASSETURLS=https://unpkg.com/@steedos-widgets/example@0.0.6/dist/assets.json
```

:::tip
资产包的地址只要可以访问即可，它可以是发布到npm的包(unpkg.com)地址，也可以是其他任何可以被当前服务访问的地址，比如在远程开发环境中公开的资产包地址。
:::

