---
slug: /docs/quick-walkthrough
description: react-google-charts quick walkthrough
---

# Quick Walkthrough

## Initialize from a Data Array

You can easily create charts using a simple data array. The example below demonstrates how to create a **ScatterChart** that compares age and weight:

```js
import { Chart } from "react-google-charts";

const options = {
  title: "Age vs. Weight Comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none",
};

const data = [
  // Columns
  ["Age", "Weight"],
  // Columns can also be objects
  // ["Age", { type: "number", label: "Weight" }]
  // Rows
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7],
];

<Chart
  chartType="ScatterChart"
  data={data}
  options={options}
  width="80%"
  height="400px"
  legendToggle
/>;
```

### Key Highlights

- **`chartType`**: Defines the type of chart, e.g., `"ScatterChart"`.
- **`data`**: Represents the chart data in array format.
- **`options`**: Customizes the chart's look and behavior (axis titles, ranges, legend settings).
- **`width` & `height`**: Control the chart's dimensions.
- **`legendToggle`**: Allows user toggling of the chart visibility using the legend.

---

## Listen to Chart Events

`react-google-charts` also supports event listeners, enabling you to trigger callbacks when chart interactions occur. For example, you can log the selected chart items on a **ScatterChart** using the `select` event.

```js
import { Chart } from "react-google-charts";

const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    },
  },
  {
    eventName: "ready",
    callback({ chartWrapper }) {
      console.log("Chart ready. ", chartWrapper.getChart());
    },
  },
  {
    eventName: "error",
    callback(args) {
      console.log("Chart errored. ", args);
    },
  },
];

const data = [
  ["age", "weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7],
];

const options = {
  title: "Age vs. Weight Comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none",
};

<Chart
  chartType="ScatterChart"
  data={data}
  options={options}
  chartEvents={chartEvents}
/>;
```

### Event Highlights

- **`eventName`**: Specifies the event to listen for (e.g., `"select" | "error" | "ready"`).
- **`callback`**: The function that gets triggered when the event occurs, providing access to the chart instance and event data.
- **Interaction Tracking**: Capture user interactions like selections, mouseovers, or clicks and respond accordingly.

---

## More Examples

Explore more use cases and live, editable examples by visiting our [Examples Page](/examples). Whether you're looking to create bar charts, pie charts, or more complex visualizations like timelines and maps, these examples will help you get started quickly.

---

By following this guide, you now have the essential building blocks for creating interactive charts with `react-google-charts`. Customize your charts further, handle events, and visualize your data with ease!

Happy charting!
