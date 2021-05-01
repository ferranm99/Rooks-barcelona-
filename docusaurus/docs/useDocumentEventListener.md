---
id: useDocumentEventListener
title: useDocumentEventListener
sidebar_label: useDocumentEventListener
---


    

## About

A react hook to an event listener to the document object

[//]: # "Main"

## Installation

    npm install --save @rooks/useDocumentEventListener

## Importing the hook

```javascript
import useDocumentEventListener from "@rooks/useDocumentEventListener"
```

## Usage

```jsx
function Demo() {
  useDocumentEventListener("click", function(){
    console.log("clicked")
  });
  return null
}

render(<Demo/>)
```


---

## Codesandbox Examples

### Basic Usage    



## Join Bhargav's discord server
You can click on the floating discord icon at the bottom right of the screen and talk to us in our server.

