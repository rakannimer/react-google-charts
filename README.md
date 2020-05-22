# React Google Charts

[![CircleCI][circleci-badge]][circleci-href]
[![NPM][npm-dm-badge]][npm-href]
[![NPM][npm-version-badge]][npm-href]
[![NPM][npm-license-badge]][npm-href]
[![BundlePhobia][bundlephobia-badge]][bundlephobia-href]

A thin, typed, React wrapper for [Google Charts](https://developers.google.com/chart/interactive/docs/reference).

## [Docs and examples](https://react-google-charts.com/).

- [React Google Charts](#react-google-charts)
  - [Docs and examples.](#docs-and-examples)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Quick Walkthrough](#quick-walkthrough)
    - [Initialize from data array](#initialize-from-data-array)
    - [Initialize using rows and columns](#initialize-using-rows-and-columns)
    - [Listen to chart events](#listen-to-chart-events)
  - [Examples](#examples)
    - [Load Data](#load-data)
      - [Load Data From SpreadSheet](#load-data-from-spreadsheet)
    - [Charts](#charts)
      - [Area Chart](#area-chart)
      - [Bar Chart](#bar-chart)
      - [Bubble Chart](#bubble-chart)
      - [Calendar Chart](#calendar-chart)
      - [Candlestick Chart](#candlestick-chart)
      - [Column Chart](#column-chart)
      - [Diff Scatter Chart](#diff-scatter-chart)
      - [Diff Column Chart](#diff-column-chart)
      - [Donut Chart](#donut-chart)
      - [Gantt Chart](#gantt-chart)
      - [Gauge Chart](#gauge-chart)
      - [Geo Chart](#geo-chart)
      - [Histogram Chart](#histogram-chart)
      - [Line Chart](#line-chart)
      - [Material Bar Chart](#material-bar-chart)
      - [Material Line Chart](#material-line-chart)
      - [Org Chart](#org-chart)
      - [Pie Chart](#pie-chart)
      - [Sankey Chart](#sankey-chart)
      - [Scatter Chart](#scatter-chart)
      - [Stepped Area Chart](#stepped-area-chart)
      - [Table Chart](#table-chart)
      - [Timeline Chart](#timeline-chart)
      - [Treemap Chart](#treemap-chart)
      - [Waterfall Chart](#waterfall-chart)
      - [Wordtree Chart](#wordtree-chart)
    - [Run the example app](#run-the-example-app)
  - [Contributing](#contributing)

## Installation

With your favorite package manager (yarn, pnpm or npm) :

```sh
yarn add react-google-charts2
# or
npm i -s react-google-charts2
```


## Quick Start

```javascript
import * as React from "react";
import { render } from "react-dom";
import { Chart } from "react-google-charts";

export default class App extends React.Component {
  render() {
    return (
      <div className={"my-pretty-chart-container"}>
        <Chart
          chartType="ScatterChart"
          data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
    );
  }
}
render(<App />, document.querySelector("#app"));
```

## Quick Walkthrough

### Initialize from data array

```javascript
import { Chart } from "react-google-charts";
import * as React from "react";
import { render } from "react-dom";

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

const ExampleChart = () => {
  return (
    <Chart
      chartType="ScatterChart"
      data={data}
      options={options}
      width="80%"
      height="400px"
      legendToggle
    />
  );
};

render(<ExampleChart />, document.getElementByID("app"));
```

### Initialize using rows and columns

```javascript
import * as React from "react";
import { Chart } from "react-google-charts";

const ExampleChart = () => {
  return (
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
  );
};
export default ExampleChart;
```

### Listen to chart events

Set the chart-specific events you want to listen to and the corresponding callback.
The callback has the component as an argument.

```javascript
import * as React from "react";
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
const ExampleChart = () => {
  return (
    <Chart
      chartType="ScatterChart"
      data={data}
      options={options}
      graphID="ScatterChart"
      width="100%"
      height="400px"
      chartEvents={chartEvents}
    />
  );
};

export default ExampleChart;
```

### Run the example app

```bash
git clone https://www.github.com/spoof14/react-google-charts2
cd react-google-charts
npm i
npm start
```

### Credit
This is a fork of the repo https://www.github.com/rakannimer/react-google-charts. Full credit goes to rakannimer for his nice work, I just needed a few changes for a project.