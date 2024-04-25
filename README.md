# Website

This is the source of documentation for [Steedos Platform](https://steedos.com), hosted at [docs.steedos.com](https://docs.steedos.com), powered by Docusaurus v2.

## Development

### Installation

```shell
nvm i 18
nvm use 18
yarn
```

### Local Development

```shell
yarn start
```

Run zh-CN version

```shell
yarn start:cn
```

Write translations for zh-CN

```shell
yarn write-translations:cn
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```shell
yarn build
yarn build:openapi
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Release

### 发布多语言版

在main分支创建tag，发布正式版到 https://docs.steedos.com

```
yarn build
```

### 发布中文版

在main分支创建tag，发布正式版到 https://docs.steedos.cn

```
yarn build --locale zh-CN
```

### 发布测试版

更新beta分支，发布测试版到 https://docs-beta.steedos.com

### Generate PDF

use [docs-to-pdf](https://github.com/jean-humann/docs-to-pdf)

**Developer Documentation**

```shell
npx docs-to-pdf --initialDocURLs="https://docs.steedos.cn/zh-CN/developer/"  --contentSelector="article"  --paginationSelector="a.pagination-nav__link.pagination-nav__link--next" --outputPDFFilename="build/steedos-developer-zh-CN.pdf" --excludeSelectors=".breadcrumbs,section.row,.theme-doc-footer" --pdfMargin="80,60,80,60" --coverTitle="Steedos Developer Documentaion"  --baseUrl="https://docs.steedos.cn/zh-CN/developer/"  --excludePaths="/zh-CN/developer/api/openapi"
```


**Platform Documentation**

```shell
npx docs-to-pdf --initialDocURLs="https://docs.steedos.cn/zh-CN/"  --contentSelector="article"  --paginationSelector="a.pagination-nav__link.pagination-nav__link--next" --baseUrl="https://docs.steedos.cn/zh-CN/" --outputPDFFilename	'build/steedos-platform-zh-CN.pdf'  --excludeSelectors=".breadcrumbs,section.row,.theme-doc-footer" --pdfMargin="80,60,80,60" --coverTitle="Steedos Platform Documentaion"   --excludePaths="/zh-CN/getting-started,/zh-CN/user,/zh-CN/deploy"
```