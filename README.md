# React Google Charts

[![CircleCI](https://circleci.com/gh/rakannimer/react-google-charts.svg?style=shield)](https://circleci.com/gh/RakanNimer/react-google-charts)

[![NPM](https://nodei.co/npm/react-google-charts.png?downloads=true&downloadRank=true)](https://npmjs.org/package/react-google-charts)

A thin, typed, React wrapper over Google Charts Visualization and Charts API.

## Installation

With your favorite package manager (yarn, pnpm or npm) :

```
yarn add react-google-charts
# or
npm i -s react-google-charts
```

## Quick Start

```javascript
import React from "react";
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

### Initialize from data array :

```javascript
import { Chart } from "react-google-charts";
import React from "react";

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: "Age vs. Weight comparison",
        hAxis: { title: "Age", minValue: 0, maxValue: 15 },
        vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
        legend: "none"
      },
      data: [
        ["Age", "Weight"],
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7]
      ]
    };
  }
  render() {
    return (
      <Chart
        chartType="ScatterChart"
        data={this.state.data}
        options={this.state.options}
        graphID="ScatterChart"
        width="100%"
        height="400px"
        legendToggle
      />
    );
  }
}
export default ExampleChart;
```

### Initialize using rows and columns :

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
      options={{
        title: "Age vs. Weight comparison",
        hAxis: {
          title: "Age",
          viewWindow: { min: 0, max: 15 }
        },
        vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
        legend: "none"
      }}
      graphID="ScatterChart"
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
import React from "react";
import { Chart } from "react-google-charts";

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartEvents = [
      {
        eventName: "select",
        callback(Chart) {
          // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
          console.log("Selected ", Chart.chart.getSelection());
        }
      }
    ];
    this.state = {
      options: {
        title: "Age vs. Weight comparison",
        hAxis: { title: "Age", minValue: 0, maxValue: 15 },
        vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
        legend: "none"
      },
      rows: [[8, 12], [4, 5.5], [11, 14], [4, 5], [3, 3.5], [6.5, 7]],
      columns: [
        {
          type: "number",
          label: "Age"
        },
        {
          type: "number",
          label: "Weight"
        }
      ]
    };
  }
  render() {
    return (
      <Chart
        chartType="ScatterChart"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graphID="ScatterChart"
        width="100%"
        height="400px"
        chartEvents={this.chartEvents}
      />
    );
  }
}
export default ExampleChart;
```

## Examples

### Area Chart

- [Code](./sandboxes/area-chart/)
- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-google-charts/tree/master/sandboxes/area-chart)

### Run the example app

```bash
git clone https://www.github.com/rakannimer/react-google-charts
cd react-google-charts
npm i
npm start
```

## Contributing

Contributions are very welcome. Check out [CONTRIBUTING.md](CONTRIBUTING.md)
