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
yarn add react-google-charts
# or
npm i -s react-google-charts
```

Note : If you're using react < 16.3 then use 2.x version:

```sh
yarn add react-google-charts@2
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

## Examples

### Load Data

#### Load Data From SpreadSheet

- [Demo](https://react-google-charts.com/data-sources/from-google-spreadsheet#simple-example)

### Charts

#### Area Chart

- [Demo](https://react-google-charts.com/area-chart)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/area-chart?file=/App.tsx)
- [Raw Code](./sandboxes/area-chart/App.tsx)

#### Bar Chart

- [Demo](https://react-google-charts.com/bar-chart)
- [Code](./sandboxes/bar-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/bar-chart?file=/App.tsx)

#### Bubble Chart

- [Demo](https://react-google-charts.com/bubble-chart)
- [Code](./sandboxes/bubble-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/bubble-chart?file=/App.tsx)

#### Calendar Chart

- [Demo](https://react-google-charts.com/calendar-chart)
- [Code](./sandboxes/calendar/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/calendar?file=/App.tsx)

#### Candlestick Chart

- [Demo](https://react-google-charts.com/candleStick-chart)
- [Code](./sandboxes/candlestick-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/candlestick-chart?file=/App.tsx)

#### Column Chart

- [Code](./sandboxes/column-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/column-chart?file=/App.tsx)

#### Diff Scatter Chart

- [Demo](https://react-google-charts.com/diff-chart)
- [Code](./sandboxes/scatter-chart-diff/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/scatter-chart-diff?file=/App.tsx)

#### Diff Column Chart

- [Demo](https://react-google-charts.com/diff-chart#diff-column-charts)
- [Code](./sandboxes/column-chart-diff/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/column-chart-diff?file=/App.tsx)

#### Donut Chart

- [Code](./sandboxes/pie-chart-donut/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/pie-chart-donut?file=/App.tsx)

#### Gantt Chart

- [Demo](https://react-google-charts.com/gantt-chart)
- [Code](./sandboxes/gantt/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/gantt?file=/App.tsx)

#### Gauge Chart

- [Demo](https://react-google-charts.com/gauge-chart)
- [Code](./sandboxes/gauge/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/gauge?file=/App.tsx)

#### Geo Chart

- [Demo](https://react-google-charts.com/geo-chart)
- [Code](./sandboxes/geo-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/geo-chart?file=/App.tsx)

#### Histogram Chart

- [Demo](https://react-google-charts.com/histogram-chart)
- [Code](./sandboxes/histogram/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/histogram?file=/App.tsx)

#### Line Chart

- [Demo](https://react-google-charts.com/line-chart)
- [Code](./sandboxes/line-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/line-chart?file=/App.tsx)

#### Material Bar Chart

- [Demo](https://react-google-charts.com/bar-chart#material-design)
- [Code](./sandboxes/bar/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/bar?file=/App.tsx)

#### Material Line Chart

- [Demo](https://react-google-charts.com/line-chart#material-design-linechart)
- [Code](./sandboxes/line/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/line?file=/App.tsx)

#### Org Chart

- [Demo](https://react-google-charts.com/org-chart)
- [Code](./sandboxes/org-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/org-chart?file=/App.tsx)

#### Pie Chart

- [Demo](https://react-google-charts.com/pie-chart)
- [Code](./sandboxes/pie-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/pie-chart?file=/App.tsx)

#### Sankey Chart

- [Demo](https://react-google-charts.com/sankey-diagram)
- [Code](./sandboxes/sankey/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/sankey?file=/App.tsx)

#### Scatter Chart

- [Demo](https://react-google-charts.com/scatter-chart)
- [Code](./sandboxes/scatter-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/scatter-chart?file=/App.tsx)

#### Stepped Area Chart

- [Demo](https://react-google-charts.com/stepped-area-chart)
- [Code](./sandboxes/stepped-area-chart/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/stepped-area-chart?file=/App.tsx)

#### Table Chart

- [Demo](https://react-google-charts.com/table-chart)
- [Code](./sandboxes/table/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/table?file=/App.tsx)

#### Timeline Chart

- [Demo](https://react-google-charts.com/timeline-chart)
- [Code](./sandboxes/timeline/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/timeline?file=/App.tsx)

#### Treemap Chart

- [Demo](https://react-google-charts.com/treemap-chart)
- [Code](./sandboxes/tree-map/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/tree-map?file=/App.tsx)

#### Waterfall Chart

- [Code](./sandboxes/candlestick-chart-waterfall/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/candlestick-chart-waterfall?file=/App.tsx)

#### Wordtree Chart

- [Demo](https://react-google-charts.com/wordtree-chart)
- [Code](./sandboxes/word-tree/App.tsx)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/word-tree?file=/App.tsx)

### Run the Storybook

```bash
git clone https://www.github.com/rakannimer/react-google-charts
cd react-google-charts
yarn
yarn start:storybook
```

## Contributing

Contributions are very welcome. Check out [CONTRIBUTING.md](CONTRIBUTING.md)

[circleci-href]: https://circleci.com/gh/rakannimer/react-google-charts
[circleci-badge]: https://img.shields.io/circleci/project/github/rakannimer/react-google-charts.svg
[npm-href]: https://www.npmjs.com/package/react-google-charts
[npm-dm-badge]: https://img.shields.io/npm/dm/react-google-charts.svg
[npm-version-badge]: https://badgen.net/npm/v/react-google-charts
[npm-license-badge]: https://img.shields.io/github/license/rakannimer/react-google-charts.svg
[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/react-google-charts.svg
[bundlephobia-href]: https://bundlephobia.com/result?p=react-google-charts

- [Demo](https://rakannimer.github.io/react-google-charts/#/react-google-charts/bar-chart)

[barchart-demo]: https://react-google-charts.com/bar-chart
[barchart-example-code]: ./sandboxes/bar-chart/App.tsx
[barchart-example-sandbox]: https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/bar-chart?file=/App.tsx
[bubblechart-demo]: https://react-google-charts.com/bubble-chart
[bubblechart-example-code]: ./sandboxes/bubble-chart/App.tsx
[bubblechart-example-sandbox]: https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/bubble-chart?file=/App.tsx
