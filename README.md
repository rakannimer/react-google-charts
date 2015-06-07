## React Wrapper to Google Charts

A React JS wrapper to make it easy and fun to work with Google Charts.


## Installation

```
npm install react-google-charts
```

## Usage

The library can be used as a simple wrapper to the Google Charts API ([Full Detailed Guide](https://developers.google.com/chart/)) : 

```javascript
 <Chart  chartType = "LineChart" data = {this.state.data} options = {this.state.options}  width={"100%"} height={"300px"} graph_id = "linechart_graph"  /> 
```

Where data and options are the dataTable and options parameters of [ChartWrapper](https://developers.google.com/chart/interactive/docs/reference#chartwrapperobject)

For convenience, you can optionally use the rows and columns parameters and the component will build the data table for the chart. 

```javascript

 <Chart  chartType = "LineChart" width={"100%"} height={"300px"} rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options}  graph_id = "linechart_graph"  />  

```

You can also show and hide columns in the chart by clicking on the legend if you set legend_toggle to true : 

```javascript
 <Chart  chartType = "ScatterChart" width={"100%"} height={"300px"} rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options}  graph_id = "linechart_graph" legend_toggle={true} />  
```


## Examples

The examples directory has some code examples. But for the lazy :
### Initialize from array : 

```javascript

	componentDidMount: function() {

        var options = {
          	title: 'Age vs. Weight comparison',
          	hAxis: {title: 'Age', minValue: 0, maxValue: 15},
          	vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        	legend: 'none'
        };

	    var data = [
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
    render: function() {
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
```javascript
	componentDidMount: function() {
		var chart_events = [
        {
        	eventName : 'onmouseover',
            callback  : funtion() {console.log("mouseover the chart");}
        }
        ];

	},
    render: function() {
        <Chart chartType = "ScatterChart" rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} graph_id = "ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />

    }
```


## Setup



## Development
#### Gulp tasks
```
	gulp watch-all
```
When you're working on server and client-side coding.
Will run nodemon and gulp watch on css and client-side js files 

Also starts Mongodb instance on Port 27017

```
	gulp watch-scripts
```
When you're working on client-side code only.
Will gulp-watch css and js changes and recompile.	
```
	gulp nodemon
```
As the name suggests will run nodemon and listen to changes on server.js and files in ./server/

```
	gulp build-remote
```
Builds an environment on top of an empty Ubuntu Machine ready to start listening and archiving tweets. Installs all dependent software, clones repo, and prepares environment. For more details, see the [Deployment](#deployment) section

```
	gulp deploy --branch {{branch}}
```
After committing your changes and pushing them to the repo, deploy the new code on the server on the selected branch.
if the branch argument is not passed master will be used.



## Deployment

