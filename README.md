# react-google-charts

[![npm package][npm-badge]][npm]


A React JS wrapper to make it easy and fun to work with Google Charts.


## Installation

```
npm install react-google-charts
```


## Quick Start

```javascript
import React from 'react'
import {render} from 'react-dom'
import {Chart} from 'react-google-charts'

export default class App extends React.Component{
  render() {
    return (
    <div className={"my-pretty-chart-container"}>
      <Chart chartType = "ScatterChart" data = {[     ['Age', 'Weight'], [ 8,      12], [ 4,      5.5]]} options = {{}} graph_id = "ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />
    </div>
    )
  }
}
render(<App/>, document.querySelector('#app'));
```

## Quick Walkthrough

### Initialize from dataTable array : 

```javascript

componentDidMount() {

    let options = {
        title: 'Age vs. Weight comparison',
        hAxis: {title: 'Age', minValue: 0, maxValue: 15},
        vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none'
    };

    let data = [
       	['Age', 'Weight'],
       	[ 8,      12],
       	[ 4,      5.5],
       	[ 11,     14],
       	[ 4,      5],
       	[ 3,      3.5],
       	[ 6.5,    7]
    ];
    this.setState({
       	'data' : data,
       	'options' : options
     });


},
render() {
    <Chart chartType = "ScatterChart" data = {this.state.data} options = {this.state.options} graph_id = "ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />
}
```

### Initialize using rows and columns : 

```javascript

componentDidMount: function() {

    var options = {
       	title: 'Age vs. Weight comparison',
        hAxis: {title: 'Age', minValue: 0, maxValue: 15},
        vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none'
    };

    var rows = [
       	[ 8,      12],
       	[ 4,      5.5],
       	[ 11,     14],
       	[ 4,      5],
       	[ 3,      3.5],
       	[ 6.5,    7]
    ];

    var columns = [
	{
		'type': 'number',
		'label' : 'Age'
	}, 
	{
		'type' : 'number',
		'label' : 'Weight'
	}
	];

      	this.setState({
            'rows' : rows,
            'columns' : columns,
            'options' : options
        });


},
render: function() {
        <Chart chartType = "ScatterChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />

}
```

### Listen to chart events

Set the chart-specific events you want to listen to and the corresponding callback.
The callback has the component as an argument.

```javascript
componentDidMount: function() {
	var chart_events = [
        {
       	    eventName : 'onmouseover',
            callback  : function(Chart) { 
                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                console.log("mouseover the chart"); 
            }
        }
        ];

},
render: function() {
        <Chart chartType = "ScatterChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "ScatterChart"  width={"100%"} height={"400px"} chartEvents = {chart_events} />

}
```

##Isomorphic support
 If you are rendering the component on the server make sure you set the
 graph_id prop on the component to suppress the checksum warnings.

## Examples

The [demo](demo) directory is the source code of : http://rakannimer.github.io/react-google-charts/

Check it out.


## Contributing

Contributions are very welcome. Check out [CONTRIBUTING.md](CONTRIBUTING.md)



