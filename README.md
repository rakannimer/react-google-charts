# react-google-charts

[![CircleCI](https://circleci.com/gh/RakanNimer/react-google-charts.svg?style=shield)](https://circleci.com/gh/RakanNimer/react-google-charts)

[![NPM](https://nodei.co/npm/react-google-charts.png?downloads=true&downloadRank=true)](https://npmjs.org/package/react-google-charts)


A React JS wrapper to make it easy and fun to work with Google Charts.


## Installation

```
yarn add react-google-charts
```

or 

```
npm i -s react-google-charts
```
or from unpkg.com using html script tag : 

```html
 <script src="https://unpkg.com/react-google-charts@latest/umd/react-google-charts.min.js" />
```

and you can then use it using ReactGoogleCharts.default.Chart 

[JSFiddle example](https://jsfiddle.net/f8zpr8uc/)


## Quick Start

```javascript
import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

export default class App extends React.Component {
  render() {
    return (
      <div className={'my-pretty-chart-container'}>
        <Chart
          chartType="ScatterChart"
          data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
          options={{}}
          graph_id="ScatterChart"
          width="100%"
          height="400px"
          legend_toggle
        />
      </div>
    );
  }
}
render(<App />, document.querySelector('#app'));
```

## Quick Walkthrough

### Initialize from data array :

```javascript
import { Chart } from 'react-google-charts';
import React from 'react';

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Age vs. Weight comparison',
        hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      data: [
        ['Age', 'Weight'],
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7],
      ],
    };
  }
  render() {
    return (
      <Chart
        chartType="ScatterChart"
        data={this.state.data}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  }
}
export default ExampleChart;
```

### Initialize using rows and columns :

```javascript
import { Chart } from 'react-google-charts';
import React from 'react';

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Age vs. Weight comparison',
        hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      rows: [
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7],
      ],
      columns: [
        {
          type: 'number',
          label: 'Age',
        },
        {
          type: 'number',
          label: 'Weight',
        },
      ],
    };
  }
  render() {
    return (
      <Chart
        chartType="ScatterChart"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="ScatterChart"
        width={'100%'}
        height={'400px'}
        legend_toggle
      />
    );
  }
}
export default ExampleChart;

```

### Listen to chart events

Set the chart-specific events you want to listen to and the corresponding callback.
The callback has the component as an argument.

```javascript
import React from 'react';
import { Chart } from 'react-google-charts';

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
            // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
          console.log('Selected ', Chart.chart.getSelection());
        },
      },
    ];
    this.state = {
      options: {
        title: 'Age vs. Weight comparison',
        hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      rows: [
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7],
      ],
      columns: [
        {
          type: 'number',
          label: 'Age',
        },
        {
          type: 'number',
          label: 'Weight',
        },
      ],
    };
  }
  render() {
    return (
      <Chart
        chartType="ScatterChart"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        chartEvents={this.chartEvents}
      />
    );
  }
}
export default ExampleChart;
```

##Isomorphic support

Supports isomorphic configurations out of the box thanks to [@voogryk](https://github.com/voogryk)

## Examples

### Run the example app

```bash
git clone https://www.github.com/rakannimer/react-google-charts
cd react-google-charts/demo
npm link ../
npm install
npm start
```

## FAQ

### Timeline/table chart is not rendering.

Chart loader is a singleton that only loads chartPackages once, and by default it loads the ```corechart``` packages.
If you need to use packages like ```timeline```  or ```table```, add chartPackages prop with value ['corechart', 'timeline'] to your charts.


## [Changelog](./CHANGELOG.md)

## Contributing

Contributions are very welcome. Check out [CONTRIBUTING.md](CONTRIBUTING.md)
