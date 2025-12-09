# 自定义样式

在多数组件中，都有 className ，通过设置 组件的 className，既可以改变样式。
下面有两种方式自定义样式。
### 一、指定为  tailwindcss 类名
className 可以直接设置为 tailwindcss 的类名。
假设我们需要一个 30px 的红色字体，在 tailwindcss 管网文档中可以查到

- font-size: 30px   等效于    text-3xl
- color: rgb(239 68 68);     等效于   text-red-500
```json
{
  "type": "tpl",
  "tpl": "我是红色大文本",
  "className": "text-3xl text-red-500",
  "id": "u:b351a84d8d36"
}
```
设计器中效果：

![image.png](/img/amis/design-tool-red-font.png)

查询更多的 tailwindcss 类名，可以到下面文档

- [tailwindcss 类名](https://tailwindcss.com/docs/text-color#setting-the-text-color)
- [amis 类名](https://aisuda.bce.baidu.com/amis/zh-CN/style/sizing/width)

<br/>

### 二、Page 组件 css 定义样式
可以通过 Page 组件 css 样式配合 className 自定义样式
假设我们需要一个绿色字体的css样式：
```css
.green-text {
  color: green;
}
```
则可以通过配置

- 在 page 组件中设置 css 样式，这会插入一个 `<style>` 标签
- 在 tpl 的 className 指定 green-text
```json
{
  "type": "page",
  "css": {
    ".green-text": {
      "color": "green"
    }
  },
  "body": {
    "type": "tpl",
    "tpl": "我是绿色文本",
    "className": "green-text"
  }
}
```
设计器中效果：

![image.png](/img/amis/design-tool-green-font.png)

这种方式无疑会更加灵活。
不过由于会插入style到文档中，可能污染其他组件样式，所以需要谨慎考虑类名。
可以考虑使用一些特别的类名，比如尽量长的类名、加入随机类尾缀的类名。







