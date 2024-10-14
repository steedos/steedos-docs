// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const { themes } = require('prism-react-renderer');

const lightTheme = themes.github;
const darkCodeTheme = themes.dracula;

console.log(process.env.NODE_ENV)
    /** @type {import('@docusaurus/types').Config} */
const config = {
    title: process.env.SITE_TITLE || 'Steedos Docs',
    tagline: 'Open source alterative to Salesforce Platform.',
    favicon: 'img/favicon.png',

    // Set the production url of your site here
    url: process.env.SITE_URL || 'https://docs.steedos.com/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'steedos', // Usually your GitHub org/user name.
    projectName: 'steedos.github.io', // Usually your repo name.
    // trailingSlash: true,

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh-CN'],
    },

    scripts: [
        // String format.
        // '/js/salesiq.js',
    ],
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: "/",
                    // lastVersion: 'current',
                    // versions: {
                    //   current: {
                    //     label: '2.5',
                    //   },
                    // },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/steedos/steedos-docs/tree/master/',
                    editLocalizedFiles: true
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.css'),
                    ]
                },
                gtag: {
                    trackingID: 'G-XVSWFLK780',
                    anonymizeIP: true,
                },
            }),
        ],
    ],

    themes: [
        [
            "@easyops-cn/docusaurus-search-local",
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                hashed: true,
                language: ["en", "zh"],
                highlightSearchTermsOnTargetPage: true,
                explicitSearchResultPath: true,
                docsRouteBasePath: "/"
            }),
        ],
        '@docusaurus/theme-mermaid'
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true,
            respectPrefersColorScheme: false,
        },
        // announcementBar: {
        //   id: 'support_us',
        //   content:
        //     '⭐️ If you like Steedos, give a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/steedos/steedos-platform">GitHub</a>.',
        //   backgroundColor: '#4D72DA',
        //   textColor: '#ffffff',
        //   isCloseable: true,
        // },
        navbar: {
            title: 'Steedos',
            // style: 'dark',
            logo: {
                alt: 'Steedos',
                src: 'img/logo.png',
            },
            items: [
                // {
                //     type: 'docSidebar',
                //     position: 'left',
                //     sidebarId: 'steedos-platform',
                //     label: 'Platform',
                // },
                {
                    type: 'docSidebar',
                    position: 'left',
                    sidebarId: 'platform',
                    label: 'Docs',
                },
                {
                    type: 'docSidebar',
                    position: 'left',
                    sidebarId: 'developer',
                    label: 'Developer',
                },
                {
                    type: 'docSidebar',
                    position: 'left',
                    sidebarId: 'solutions',
                    label: 'Solutions',
                },
                {
                    type: 'search',
                    position: 'right',
                },
                {
                    href: 'https://docs.steedos.com',
                    position: 'right',
                    html: 'English',
                },
                {
                    href: 'https://docs.steedos.cn',
                    position: 'right',
                    html: '中文',
                },
                // {
                //   type: 'docsVersionDropdown',
                //   position: 'right',
                // },
                // {
                //   type: 'localeDropdown',
                //   position: 'right',
                // },
                {
                    href: 'https://github.com/steedos/steedos-platform',
                    position: 'right',
                    className: 'navbar-social-link navbar-github-logo',
                    'aria-label': 'GitHub repository',
                },

            ],
        },
        docs: {
            sidebar: {
                hideable: false,
            }
        },
        footer: {
            // links: [{
            //         title: 'Platform',
            //         items: [{
            //                 label: 'What is Steedos?',
            //                 to: 'platform/overview',
            //             },
            //             {
            //                 label: 'What is Lowcode?',
            //                 to: 'platform/lowcode',
            //             },
            //             {
            //                 label: 'Features',
            //                 to: 'platform/features',
            //             },
            //             {
            //                 label: 'Pricing',
            //                 to: 'platform/pricing',
            //             },
            //         ],
            //     },
            //     {
            //         title: 'Solutions',
            //         items: [{
            //                 label: 'Project Management',
            //                 to: 'solutions/project',
            //             },
            //             {
            //                 label: 'Contract Management',
            //                 to: 'solutions/contract',
            //             },
            //             {
            //                 label: 'Expense Management',
            //                 to: 'solutions/expense',
            //             },
            //             {
            //                 label: 'Steedos AI',
            //                 href: 'https://bots6.com',
            //             },
            //         ],
            //     },
            //     {
            //         title: 'Customer Success Stories',
            //         items: [{
            //                 label: 'Tsinghua University',
            //                 to: 'customer-success-stories/tsinghua',
            //             },
            //             {
            //                 label: 'CMB China',
            //                 to: 'customer-success-stories/cmbchina-poc',
            //             },
            //             {
            //                 label: 'Jianhua BM',
            //                 to: 'customer-success-stories/jianhuabm',
            //             },
            //             {
            //                 label: 'Shuang Hui',
            //                 to: 'customer-success-stories/yz',
            //             },
            //         ],
            //     },
            //     {
            //         title: 'Resources',
            //         items: [{
            //                 label: 'Documentation',
            //                 to: 'getting-started',
            //             },
            //             {
            //                 label: 'Deploy',
            //                 to: 'deploy',
            //             },
            //             {
            //                 label: 'Developer',
            //                 to: 'developer',
            //             },
            //         ],
            //     },
            //     {
            //         title: 'Contact Us',
            //         items: [{
            //                 label: 'About Us',
            //                 to: 'company/about-us',
            //             },
            //             {
            //                 label: '400-820-1612 (China)',
            //                 href: 'tel:400-820-1612',
            //             },
            //         ],
            //     },
            // ],
            copyright: `
            Copyright © ${new Date().getFullYear()} Steedos Inc.
            `,
        },
        prism: {
            theme: darkCodeTheme,
            darkTheme: darkCodeTheme,
            additionalLanguages: ['bash', 'json', 'yaml'],
        },
    }),
    markdown: {
        mermaid: true,
    },
    plugins: [
        [
            '@docusaurus/plugin-pwa',
            {
                debug: true,
                offlineModeActivationStrategies: [
                    'appInstalled',
                    'standalone',
                    'queryString',
                ],
                pwaHead: [{
                        tagName: 'link',
                        rel: 'icon',
                        href: '/img/logo.png',
                    },
                    {
                        tagName: 'link',
                        rel: 'manifest',
                        href: '/manifest.json', // your PWA manifest
                    },
                    {
                        tagName: 'meta',
                        name: 'theme-color',
                        content: 'rgb(37, 194, 160)',
                    },
                ],
            },
        ],
    ],
};

module.exports = config;