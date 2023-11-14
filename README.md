# Website

This is the source of documentation for [Steedos Platform](https://steedos.com), hosted at [docs.steedos.com](https://docs.steedos.com), powered by Docusaurus v2.

### Installation

```shell
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

Write translations for z-CN

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


### Generate PDF

use [docs-to-pdf](https://github.com/jean-humann/docs-to-pdf)

**Developer Documentation**

```shell
npx docs-to-pdf --initialDocURLs="https://docs.steedos.com/zh-CN/developer/"  --contentSelector="article"  --paginationSelector="a.pagination-nav__link.pagination-nav__link--next" --outputPDFFilename	'build/steedos-developer-zh-CN.pdf'
```


**Platform Documentation**

```shell
npx docs-to-pdf --initialDocURLs="http://localhost:3000/zh-CN/overview"  --contentSelector="article"  --paginationSelector="a.pagination-nav__link.pagination-nav__link--next" --baseUrl="http://localhost:3000/zh-CN/" --outputPDFFilename	'build/steedos-platform-zh-CN.pdf'
```