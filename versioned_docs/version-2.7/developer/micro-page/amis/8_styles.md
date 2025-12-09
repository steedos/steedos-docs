# Custom Styles

In many components, there is a `className` property. By setting the component's `className`, you can change its style.
Below are two ways to customize styles.

### 1. Specifying TailwindCSS Class Names
The `className` can be directly set to TailwindCSS class names.
Suppose we need a 30px red font, we can find in the TailwindCSS documentation that:

- font-size: 30px is equivalent to `text-3xl`
- color: rgb(239 68 68); is equivalent to `text-red-500`

```json
{
  "type": "tpl",
  "tpl": "I am a big red text",
  "className": "text-3xl text-red-500",
  "id": "u:b351a84d8d36"
}
```

The effect in the designer:

![image.png](/img/amis/design-tool-red-font.png)

For more TailwindCSS class names, you can refer to the following documentation:

- [TailwindCSS Class Names](https://tailwindcss.com/docs/text-color#setting-the-text-color)
- [AMIS Class Names](https://aisuda.bce.baidu.com/amis/zh-CN/style/sizing/width)

<br/>

### 2. Defining Styles with the Page Component's CSS
You can customize styles through the Page component's CSS in combination with `className`.
Suppose we need a green font CSS style:

```css
.green-text {
  color: green;
}
```

Then you can configure it by:

- Setting the CSS style in the page component, which will insert a `<style>` tag.
- Specifying `green-text` in the `className` of the `tpl`.

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
    "tpl": "I am green text",
    "className": "green-text"
  }
}
```

The effect in the designer:

![image.png](/img/amis/design-tool-green-font.png)

This method is undoubtedly more flexible.
However, since it inserts a style into the document, it may contaminate other component styles, so you need to consider class names carefully.
Consider using some unique class names, such as longer class names or class names with random suffixes.
