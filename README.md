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



## Development

Fork and clone the repo.

```
npm install
```

And

```
	gulp 
```
Will browserify and reactify the files, put them in the dist folder and serve them on localhost:8000 with livereload on changes

```
	gulp dist
```

Will browserify and reactify the files, uglify them and put them in the dist folder.




