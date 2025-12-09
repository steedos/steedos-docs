---
sidebar_position: 50
---

# Custom Components

## Introduction

[Amis](https://aisuda.bce.baidu.com/amis/en-US/docs) itself provides a very rich set of component features, which can basically meet the UI interface needs of most business scenarios.

If you encounter a scenario that suits the development of custom components, you can also integrate custom components into the Amis designer through a custom asset package. This way, we can achieve any UI effect we want.

## Configuring Custom Asset Packages

As long as you configure the custom asset package URL in the environment variable `STEEDOS_PUBLIC_PAGE_ASSETURLS`, Steedos will automatically load and integrate the related custom components into the Amis engine according to the resource package address configured in the asset package, which is very convenient.

```bash
STEEDOS_PUBLIC_PAGE_ASSETURLS=https://unpkg.com/@steedos-widgets/example@0.0.6/dist/assets.json
```

:::tip
The asset package URL just needs to be accessible. It can be the address of a package published to npm (unpkg.com), or any other address that can be accessed by the current service, such as an asset package address exposed in a remote development environment.
:::
