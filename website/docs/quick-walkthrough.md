---
slug: /docs/quick-walkthrough
description: react-google-charts quick walkthrough
---

# Quick Walkthrough

## Initialize from data array

```js
import { Chart } from "react-google-charts";

const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none"
};

const data = [
  ["Age", "Weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7]
];

<Chart
  chartType="ScatterChart"
  data={data}
  options={options}
  width="80%"
  height="400px"
  legendToggle
/>
```

## Initialize using rows and columns

```js
import { Chart } from "react-google-charts";

<Chart
  chartType="ScatterChart"
  rows={[[8, 12], [4, 5.5], [11, 14], [4, 5], [3, 3.5], [6.5, 7]]}
  columns={[
    {
      type: "number",
      label: "Age"
    },
    {
      type: "number",
      label: "Weight"
    }
  ]}
  options={
    // Chart options
    {
      title: "Age vs. Weight comparison",
      hAxis: {
        title: "Age",
        viewWindow: { min: 0, max: 15 }
      },
      vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
      legend: "none"
    }
  }
  width={"100%"}
  height={"400px"}
  legendToggle
/>
```

## Listen to chart events

Set the chart-specific events you want to listen to and the corresponding callback.
The callback has the component as an argument.

```js
import { Chart } from "react-google-charts";

const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    }
  }
];

const data = [
  ["age", "weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7]
];

const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none"
};

<Chart
  chartType="ScatterChart"
  data={data}
  options={options}
  graphID="ScatterChart"
  width="100%"
  height="400px"
  chartEvents={chartEvents}
/>
```

## More examples

Please see [live examples](/examples).
