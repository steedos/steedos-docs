# Expressions

In AMIS, expressions are a powerful tool that allows users to dynamically handle data in various scenarios. Expressions can be used for template variable retrieval, API endpoint parameter retrieval, data mapping, conditions for component visibility, form default values, and more. AMIS supports two syntaxes for expressions: pure JavaScript expressions and expressions wrapped in ${}.

## Expression Syntax

Expressions are at the core of dynamic data handling, consisting of three basic parts: the start character `${`, the expression body, and the end character `}`. The expression body follows a set of syntax rules, including:

### Variables and Property Access

- Single variable: `xxx variable`
- Object property access: `xxx variable.xxx property` or `xxx variable[xxx property]`

### Basic Data Types

- Boolean values: `true` or `false`
- Null value: `null`
- Undefined: `undefined`
- Numbers: integers `123` or floating-point numbers `123.23`
- Strings: double quotes `"string"` or single quotes `'string'`
- Template literals: ``my name is ${name}``
- Arrays: `[1, 2, 3]`
- Objects: `{a: 1, b: 2}` or combined usage like `{a: 1, b: [1, 2, 3], [key]: yyy variable}`

### Expression Operations

- Ternary expressions: `xx variable == 1 ? 2 : 3`
- Binary expressions: logical operations (`&&`, `||`), comparison operations (`==`, `!=`, `===`, `!==`, `<`, `<=`, `>`, `>=`), arithmetic operations (`+`, `-`, ``*, `/`, ```), bit operations (`|`, `^`, `&`, `<<`, `>>`, `>>>`)
- Unary expressions: logical NOT (`!xx variable`), bitwise NOT (`~xx variable`), unary plus and minus (`+xx variable`, `-xx variable`)

### Functions and Arrow Functions

- Function calls: `SUM(1, 2, 3)`
- Arrow functions: `() => abc` (only supports a single expression) Note that this arrow function only supports a single expression and does not support multiple statements. It is mainly configured for use with other functions, such as: ARRAY_MAP(arr, item => item.abc)

### Parentheses and Operator Precedence

- Parentheses: `(10 - 2) * 3` are used to modify operator precedence

### Special Variable Names
Default variable names do not support special characters, for example, `${ xxx.yyy }` means to take the yyy property of the xxx variable. What if the variable name is `xxx.yyy?` In this case, you need to use escape syntax, like: `${ xxx\.yyy }`

AMIS also integrates many built-in functions

- Logical functions: IF, AND, OR, XOR, IFS
- Mathematical functions: ABS, MAX, MIN, SUM, INT, MOD, PI, ROUND, FLOOR, CEIL, SQRT, AVG, DEVSQ, AVEDEV, HARMEAN, LARGE, UPPER MONEY, RAND, LAST
- Text functions: LEFT, RIGHT, LEN, LENGTH, ISEMPTY, CONCATENATE, CHAR, LOWER, UPPER, UPPERFIRST, PADSTART, CAPITALIZE, ESCAPE, TRUNCATE, BEFORELAST, SPLIT, TRIM, STRIPTAG, LINEBREAK, STARTSWITH, ENDSWITH, CONTAINS, REPLACE, SEARCH, MID, BASENAME
- Date functions: DATE, TIMESTAMP, TODAY, NOW, WEEKDAY, WEEK, DATETOSTR, DATERANGESPLIT

And many more functions can be found [here](https://aisuda.bce.baidu.com/amis/zh-CN/docs/concepts/expression#%E6%95%B0%E7%BB%84)

These functions can be nested, with parameters supporting both constants and variables, greatly enhancing the functionality and flexibility of expressions.

### Example: Text Processing
Suppose we have a variable `userName` with the value `"john_doe"`, and we want to:

1. Convert the text to uppercase.
2. Replace `"_"` with `" "`.
3. Append the result to `"Welcome, "`.

Using AMIS expressions, we could write: `${"Welcome, " + REPLACE(UPPER(userName), "_", " ")}`
Configured as:

```json
{
  "type": "page",
  "data": {
    "userName": "john_doe"
  },
  "body": [
    "${\"Welcome,\" + REPLACE(UPPER(userName), \"_\", \".\")}"
  ]
}
```

This expression first uses the `UPPER` function to convert `userName` to uppercase, then uses the `REPLACE` function to replace `"_"` with `" "`. Finally, it appends the processed text to `"Welcome, "`. After executing the above expression, the final result will be:

`Welcome, JOHN DOE`

This example demonstrates how to use AMIS expressions and functions for simple text processing.
