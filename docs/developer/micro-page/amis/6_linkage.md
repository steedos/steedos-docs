# Linkage Mechanism

In AMIS, the linkage mechanism is an important feature for achieving dynamic page interactions. Through linkage, components can be controlled to show, hide, or disable based on certain conditions, or to trigger interface requests. Linkage configurations are usually based on expressions.

### Basic Linkage
Basic linkage mainly involves the display, hiding, and disabling states of components. For example, when a specific option is selected in a radio button, a text box is shown or hidden; or when a certain option is selected, another text box becomes disabled. In form item linkage, the value of hidden form items is not removed from the current data domain by default, but can be removed upon submission by adding the `clearValueOnHidden` property.

Suppose we have a form that includes a radio button (radio) and two text boxes (text1 and text2). We want to achieve the following linkage effects:

1. Text1 is only displayed when radio selects type 1.
2. When radio selects type 2, text2 becomes disabled.

To achieve this linkage effect, we can use expressions to configure the linkage rules. Here is an example of the corresponding JSON configuration:

```json
{
  "type": "page",
  "body": {
    "type": "form",
    "body": [
      {
        "type": "radios",
        "name": "foo",
        "label": false,
        "options": [
          {
            "label": "Type 1",
            "value": 1
          },
          {
            "label": "Type 2",
            "value": 2
          }
        ]
      },
      {
        "type": "input-text",
        "name": "text1",
        "label": false,
        "placeholder": "Visible when Type 1 is selected",
        "visibleOn": "${foo == 1}"
      },
      {
        "type": "input-text",
        "name": "text2",
        "label": false,
        "placeholder": "Disabled when Type 2 is selected",
        "disabledOn": "${foo == 2}"
      }
    ]
  }
}
```

In this configuration:

- The `visibleOn` property controls the display of the text1 text box. When the value of the radio button is "type1", the text1 text box will be displayed.
- The `disabledOn` property controls the disabled state of the text2 text box. When the value of the radio button is "type2", the text2 text box will be disabled.

With such a configuration, we have achieved a basic linkage effect, allowing the form's behavior to dynamically change based on user selection.

### Interface Linkage
Interface linkage is another common scenario, for example, when selecting an option from a dropdown, it triggers a new request for another dropdown's options. This is achieved by using data mapping in the initialization interface link. When the referenced variable value changes, the interface automatically requests again. Interface linkage is often applicable to initialization interfaces, such as the form's `initApi`, the `source` option source interface URL of the select component, etc.

Suppose we have a form that includes a dropdown box (select) and a cascading dropdown box (cascader). We want to achieve the following linkage effect:

1. When the user selects an option in the first dropdown box, the cascading dropdown box triggers an interface request based on the selected item, dynamically loading the corresponding options.

To achieve this linkage effect, we can use data mapping in the `source` property of the cascading dropdown box to dynamically construct the interface request. Here is an example of the corresponding JSON configuration:

```json
{
  "type": "page",
  "body": {
    "title": "",
    "type": "form",
    "mode": "horizontal",
    "body": [
      {
        "label": "Option 1",
        "type": "radios",
        "name": "a",
        "inline": true,
        "options": [
          {
            "label": "Option A",
            "value": 1
          },
          {
            "label": "Option B",
            "value": 2
          },
          {
            "label": "Option C",
            "value": 3
          }
        ]
      },
      {
        "label": "Option 2",
        "type": "select",
        "size": "sm",
        "name": "b",
        "source": "/amis/api/mock2/options/level2?a=${a}",
        "description": "Switching the value of <code>Option 1</code> will trigger the <code>source</code> interface of <code>Option 2</code> to fetch again"
      }
    ],
    "actions": []
  }
}
```

In this configuration:

- The first dropdown box (select) allows the user to choose a category.
- The `source` property of the second dropdown box (select) uses data mapping `${category}` to dynamically construct the URL for the interface request. When the value of `category` changes (i.e., the user selects an option in the first dropdown box), the second dropdown box triggers an interface request based on the new URL, loading the options for the corresponding category.

With such a configuration, we have achieved an interface linkage effect, allowing the component's data to dynamically update based on user selection.

#### Configuring Request Conditions
By default, the linked interface is always requested when the variable changes. However, request conditions can be configured so that the interface is only requested when a certain value in the current data domain meets specific conditions.
Suppose we have a form that
