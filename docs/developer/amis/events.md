# Chapter: Events and Interactions

In AMIS, events and interactions are key to building dynamic and responsive applications. This chapter will detail AMIS's event system, interaction design, and how to implement complex user interactions through configuration.

## Event System

The event system is a cornerstone in AMIS for implementing interactive logic. It allows developers to listen to and respond to events triggered by user actions or the system. This section will delve into AMIS's event system, including event types, listening, and handling.

### Event Types

In AMIS, events are the basic units of user interface interaction. Events can be user actions like clicks, inputs, selections, or system-level events such as load completion, data updates, etc. Here are some common event types:

- **Click Event (click)**: Triggered when a user clicks a button or other interactive element.
- **Change Event (change)**: Triggered when the value of a form element changes.
- **Submit Event (submit)**: Triggered when a form is submitted.
- **Load Event (load)**: Triggered when a component or page finishes loading.

### Event Listening

Event listening refers to defining an event handler that will be triggered when a specific event occurs. In AMIS, event listening is typically declared in the component's configuration.

For example, a button component might include a click event listener:

```json
{
  "type": "button",
  "label": "Click Me",
  "on": {
    "click": {
      "actions": [
        {
          "type": "toast",
          "body": "The button was clicked!"
        }
      ]
    }
  }
}
```

In this example, when the button is clicked, an action is triggered to display a message.

### Event Handling

Event handling is the response to an event. In AMIS, event handling is typically implemented by defining a series of actions. Each action is a response to the event, which can be displaying a message, sending a request, updating data, etc.

Actions can be simple, like the message display in the example above, or complex, like sending an AJAX request, updating a data source, opening a modal window, etc. Actions can be used individually or combined into action chains to execute in sequence.

### Event Parameters

Events often carry parameters that contain information related to the event, such as the click position, the entered value, etc. In AMIS's event handling, these parameters can be accessed through specific syntax.

For example, in a form's submit event, you can access the form's data:

```json
{
  "type": "form",
  "api": "/submit",
  "on": {
    "submit": {
      "actions": [
        {
          "type": "ajax",
          "api": "post:/api/submit",
          "data": {
            "formData": "${data}"
          }
        }
      ]
    }
  }
}
```

In this example, an AJAX request is triggered when the form is submitted, and the request data includes the form's data.

Through this section's learning, you should have a basic understanding of AMIS's event system. Mastering event listening and handling will enable you to build dynamic interfaces that respond to user actions. In the following chapters, we will explore how to combine the event system with other AMIS features to implement more complex interaction logic.
