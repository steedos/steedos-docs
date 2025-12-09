# Data Mapping

Data mapping is a powerful feature that allows users to fetch variable values from the current data chain by using template strings, such as `${xxx}` or `$xxx`. This method is mainly used in scenarios like template strings, customizing API request body formats, etc.

### Customizing API Request Body Data Format
When submitting a form via an API, if the default request body data format of AMIS does not meet your expectations, you can use data mapping to customize the required data format. For example, if your backend API only supports a specific input data structure, you can customize the data format by configuring the **data** attribute of the API.
For instance:

```json
{
  "type": "page",
  "body": {
    "type": "form",
    "api": {
      "method": "post",
      "url": "/amis/api/mock2/form/saveForm",
      "data": {
        "userName": "${name}",
        "userEmail": "${email}"
      }
    },
    "body": [
      {
        "type": "input-text",
        "name": "name",
        "label": "Name:"
      },
      {
        "name": "email",
        "type": "input-text",
        "label": "Email:"
      }
    ]
  }
}
```

### Complex Configuration
AMIS allows the use of `&` as a key in data mapping to expand the configured variables. This means you can expand all the properties of an object and concatenate them in the data.
For example:

```json
{
  "type": "page",
  "body": {
    "type": "form",
    "data": {
      "a": "1",
      "b": "2",
      "c": {
        "e": "3",
        "f": "4",
        "g": "5"
      }
    },
    "api": {
      "url": "/amis/api/mock2/form/saveForm",
      "method": "post",
      "data": {
        "name": "${name}",
        "email": "${email}",
        "e": "${c.e}",
        "f": "${c.f}",
        "g": "${c.g}"
      }
    },
    "body": [
      {
        "type": "input-text",
        "name": "name",
        "label": "Name:"
      },
      {
        "name": "email",
        "type": "input-text",
        "label": "Email:"
      }
    ]
  }
}
```

### Extracting Values from Arrays
You can configure the API's data attribute to extract only specific variables from an array and form a new array.

```json
{
  "type": "page",
  "body": {
    "type": "form",
    "api": {
      "method": "post",
      "url": "/amis/api/mock2/form/saveForm",
      "data": {
        "items": {
          "$table": {
            "a": "${a}",
            "c": "${c}"
          }
        }
      }
    },
    "body": [
      {
        "type": "input-table",
        "name": "table",
        "label": "Table",
        "columns": [
          {
            "label": "A",
            "name": "a"
          },
          {
            "label": "B",
            "name": "b"
          }
        ],
        "value": [
          {
            "a": "a1",
            "b": "b1",
            "c": "c1"
          },
          {
            "a": "a2",
            "b": "b2",
            "c": "c2"
          }
        ]
      }
    ]
  }
}
```

### Namespace
AMIS supports fetching data from different namespaces, such as global variables, localStorage, sessionStorage, and cookies.

- `window` refers to global variables.
- `ls` refers to localStorage. If the value is a JSON object, it can be used directly as an object, for example: `${ls:xxxxxlocalStrorageKey.xxxx}`
- `ss` refers to sessionStorage, similar to the above.
- `cookie` refers to cookies, similar to the above.

For example:

```json
{
  "type": "page",
  "body": "The current page title is: <span class='label label-info'>${window:document[title]}</span>"
}
```
