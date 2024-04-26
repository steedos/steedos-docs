/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // 扫描 src 文件夹中的所有文件
    './docs/**/*.{md,mdx}', // 扫描 docs 文件夹中的所有文档
    './i18n/**/*.{md,mdx}', // 扫描 docs 文件夹中的所有文档
    './docusaurus.config.js', // 扫描 Docusaurus 的配置文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

