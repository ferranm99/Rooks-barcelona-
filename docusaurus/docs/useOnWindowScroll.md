---
id: useOnWindowScroll
title: useOnWindowScroll
sidebar_label: useOnWindowScroll
---

   

## About

A React hook for adding an event listener for window scroll
<br/>

## Installation

    npm install --save @rooks/useOnWindowScroll

## Importing the hook

```javascript
import useOnWindowScroll from "@rooks/useOnWindowScroll"
```

## Usage

```jsx

function Demo() {
  useOnWindowScroll(() => console.log("window scrolled"))
  return <p> Hello world </p>
}

render(<Demo/>)
```

### Arguments

| Arguments | Type     | Description                                     | Default value |
| --------- | -------- | ----------------------------------------------- | ------------- |
| callback  | function | Callback function which needs to run on unmount | undefined     |
| when      | boolean  | When the event handler should be active         | true          |

### A React hook for adding an event listener for window scroll


## Join Bhargav's discord server
You can click on the floating discord icon at the bottom right of the screen and talk to us in our server.

