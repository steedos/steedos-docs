# Formulas

### 💡 Formula Syntax

The body of a Formula field is a **Formula Expression**. Expressions must be wrapped with the **`${`** and **`}`** characters.

**Basic Structure:** `${ [Formula Body] }$`

### Formula Body Syntax Rules

The content between `${` and `}` follows **JavaScript expression syntax** and supports the following types:

#### A. Variable References (Field References)

In Steedos, **variable names** are the **API Names** of the object's fields.

| Reference Type | Example | Steedos Use Case |
| --- | --- | --- |
| **Basic Reference** | `price * quantity` | Refers to the `price` and `quantity` fields of the current record. |
| **Property Access** | `customer.name` | Refers to the `name` property of a related record via a Lookup field named `customer`. |
| **Index Access** | `items[0].unit_price` | Refers to the `unit_price` of the first element in an `items` array. |

#### B. Literal Values

| Type | Example | Description |
| --- | --- | --- |
| **Number** | `123`, `123.23` | Used for calculations. |
| **String** | `'Sales Order'`, `"Draft"` | Must be wrapped in single or double quotes. |
| **Boolean** | `true`, `false` | Used for logical evaluations. |
| **Null/Undefined** | `null`, `undefined` | Used to check if a field is empty. |

#### C. Operators

The formula body supports standard JavaScript binary and ternary operators.

| Type | Operators | Example |
| --- | --- | --- |
| **Arithmetic** | `+`, `-`, `*`, `/`, `**` (Power) | `(price * 0.8) ** 2` |
| **Comparison** | `==`, `!=`, `===`, `!==` | `status === 'Completed'` |
| **Relational** | `<`, `<=`, `>`, `>=` | `amount >= 10000` |
| **Logical** | `&&` (AND), ` |  |

---

## ⚙️ Function Calls

Within the formula body, you can call **Built-in Functions** to implement complex logic, data conversion, and formatting.

**Calling Format:** `FUNCTION_NAME(argument1, argument2, ...)`

| Category | Common Functions | Example |
| --- | --- | --- |
| **Logic** | `IF`, `ISBLANK` | `${IF(ISBLANK(memo), 'None', memo)}$` |
| **Date** | `DATE_FORMAT`, `DATE_DIFF`, `TODAY` | `${DATE_DIFF(TODAY(), due_date, 'day')}$` |
| **Text** | `CONCAT`, `SUBSTR`, `UPPER` | `${CONCAT(code, '-', name)}$` |
| **Math** | `ROUND`, `MIN`, `SUM` | `${ROUND(amount * 0.15, 2)}$` |

### Example: Calculating Total Price Including Tax

| Field API Name | Example Value |
| --- | --- |
| `price` | 100 |
| `quantity` | 5 |
| `tax_rate` | 0.13 |

**Formula:** `${(price * quantity) * (1 + tax_rate)}$`

**Return Type:** **Number** (with 2 decimal places)

---

## 1. Logic Functions

### IF

* **Syntax**: `IF(condition, consequent, alternate)`
* **Parameters**:
* `condition`: Logical expression (e.g., `score > 80`).
* `consequent`: Value returned if true.
* `alternate`: Value returned if false.


* **Returns**: `any`
* **Equivalent Expression**: `condition ? consequent : alternate`

### AND / OR

* **Syntax**: `AND(expr1, expr2, ...)` / `OR(expr1, expr2, ...)`
* **Description**: Returns `true` if all/any conditions are met.
* **Equivalent Expression**: `a && b` / `a || b`

### XOR

* **Syntax**: `XOR(condition1, condition2, ...)`
* **Description**: Returns `true` if an **odd number** of conditions are true.

### IFS

* **Syntax**: `IFS(condition1, result1, condition2, result2, ...)`
* **Description**: Functions like a multi-level `else if`. Returns the result of the first matching condition.
* **Example**: `IFS(score > 80, "Excellent", score > 60, "Pass", true, "Fail")`

---

## 2. Math Functions

### Rounding: ROUND / FLOOR / CEIL

* **Syntax**: `ROUND(num[, digits=2])`, `FLOOR(num[, digits=2])`, `CEIL(num[, digits=2])`
* **Description**: Rounds to the specified number of decimal places.

### MAX / MIN / SUM / AVG

* **Syntax**: `MAX(n1, n2, ...)` or `MAX([array])`
* **Description**: Supports both a list of numbers or a single array parameter.

### Other Math Functions

* **ABS(num)**: Absolute value.
* **INT(num)**: Truncates to the nearest integer down.
* **MOD(num, divisor)**: Remainder.
* **SQRT(num)**: Square root.
* **POW(base, exponent)**: Power.
* **UPPERMONEY(num)**: Converts a number to Chinese uppercase currency words (specifically for financial documents).
* **RAND()**: Returns a random number between `[0, 1)`.

---

## 3. Text Functions

### Substring: LEFT / RIGHT / MID

* **LEFT(text, len)**: Extract from left.
* **RIGHT(text, len)**: Extract from right.
* **MID(text, from, len)**: Extract `len` characters starting from `from`.

### Case & Formatting

* **LOWER / UPPER**: Convert case.
* **UPPERFIRST / CAPITALIZE**: Capitalize first letter or title-case.
* **TRIM(text)**: Remove leading/trailing whitespace.
* **PADSTART(text, num, pad)**: Pad the start (e.g., `PADSTART("6", 2, "0")` → `"06"`).

### Search & Replace

* **CONTAINS(text, search)**: Check if text exists.
* **REPLACE(text, search, replace)**: Global replacement.
* **SEARCH(text, search, start)**: Returns the index position of the match.

### Tools

* **LEN(text)**: Character length.
* **SPLIT(text, delimiter)**: String to array.
* **JOIN(arr, separator)**: Array to string.
* **UUID(length=32)**: Generates a unique identifier.

---

## 4. Date Functions

### DATE / TODAY / NOW

* **DATE(value)**: Creates a Date object from a string or number.
* **TODAY()**: Returns today's date (no time).
* **NOW()**: Returns current date and time.

### Extraction & Modification

* **YEAR / MONTH / DAY / HOUR...**: Extract specific units.
* **DATEMODIFY(date, num, unit)**: Add/Subtract time (e.g., `DATEMODIFY(NOW(), 1, 'day')`).
* **STARTOF / ENDOF**: Get the start or end of a day/month/year.

### Calculations & Comparison

* **DAYS(endDate, startDate)**: Difference in days.
* **ISBEFORE / ISAFTER**: Boolean comparison.
* **DATETOSTR(date, format)**: Format a date to a string (e.g., `YYYY-MM-DD`).

---

## 5. Array Functions

### COUNT(arr)

Returns the number of elements in an array.

### High-Order Functions

:::info Note
Must be used with arrow functions (single expression only).
:::

* **ARRAYMAP(arr, item => expr)**: Transform each element.
* **ARRAYFILTER(arr, item => expr)**: Filter elements.
* **ARRAYFIND(arr, item => expr)**: Find first matching element.
* **ARRAYSOME / ARRAYEVERY**: Check if some or all elements match a condition.

---

## 6. Other Functions

### GET(obj, path[, defaultValue])

Safely retrieves a value from a nested object path.

### ISTYPE(value, type)

Checks the data type. Supported types: `string`, `number`, `array`, `date`, `plain-object`.
