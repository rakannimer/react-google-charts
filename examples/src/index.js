var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    Home = require('./components/Home'),
    Examples = require('./components/Examples'),
    Menu = require('./components/Menu'),

    LineCharts = require('./components/Examples/LineCharts'),
	ScatterCharts = require('./components/Examples/ScatterCharts'),
	BarCharts = require('./components/Examples/BarCharts'),
	Histograms = require('./components/Examples/Histograms'),
	BubbleCharts = require('./components/Examples/BubbleCharts'),
	ColumnCharts = require('./components/Examples/ColumnCharts'),
	CodeHolder = require('./components/CodeHolder');

var App = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'home_handler',
        '/examples/:chartType':'examples_handler'

    },
    home_handler: function() {
    	return (
    		<div>
    			<Menu />
    			<Home />
    		</div>
    		);
    },
    examples_handler: function(chartType) {
    	var example = this.examples(chartType);
    	return (
    		<div>
    			<Menu />
    			{example}
    		</div>
    	);
    },
    examples: function(chartType) {

    	switch(chartType){
    		case 'BarCharts':
    			return (
    			<div className = "examples">
    				<BarCharts />
					<CodeHolder codeUrl = {"src/components/Examples/BarCharts.js"} />
				</div>
				);
    			break;
    		case 'BubbleCharts':
    			return (
    				<div className = "examples">
    					<BubbleCharts />
						<CodeHolder codeUrl = {"src/components/Examples/BubbleCharts.js"} />
    				</div>
    			);
    			break;
    		case 'Histograms':
    			return (
    				<div className = "examples">
						<Histograms />
						<CodeHolder codeUrl = {"src/components/Examples/Histograms.js"} />
    				</div>
    			);
    			break;
    		case 'LineCharts':
    			return (
    				<div className = "examples">
						<LineCharts />
						<CodeHolder codeUrl = {"src/components/Examples/LineCharts.js"} />
    				</div>
    			);
    			break;
				case 'ColumnCharts':
					return (
							<div className = "examples">
								<ColumnCharts />
								<CodeHolder codeUrl = {"src/components/Examples/ColumnCharts.js"} />
							</div>
					);
					break;
    		case 'Histograms':
				return (
    				<div className = "examples">
    					<Histograms />
						<CodeHolder codeUrl = {"src/components/Examples/Histograms.js"} />
    				</div>
    			);
    			break;
    		case 'ScatterCharts':
    			return (
    				<div className = "examples">
    					<ScatterCharts />
						<CodeHolder codeUrl = {"src/components/Examples/ScatterCharts.js"} />
    				</div>
    			);
    			break;
    		case 'ManyMore':
    			return (
    				<div className="examples">
    					<p>
    						The plugin uses the GoogleCharts <a href="https://developers.google.com/chart/interactive/docs/drawing_charts#chartwrapper"> ChartWrapper </a> Object so you can create <a href ="https://developers.google.com/chart/interactive/docs/gallery"> every kind of chart offered by the Google Chart API </a> by setting chartType to the class name of the corresponding Google Chart.
    					</p>
    				</div>
    			);
    			break;
    		case 'home':
    			return (
    				<div className="examples">
    					Examples with the source code used to write them.
    				</div>
    			);
    			break;
    		default:

    			break;
    	}
    },
    render: function() {
       //return this.home();
       return this.renderCurrentRoute();
    }

});

React.render(<App />, document.getElementById('content'));









/*



var Chart = require('react-google-charts').Chart;
var AirPassengerData = require('./sample_data/AirPassenger');
var UKGasEmissionsData = require('./sample_data/UKGasEmissions');
var HistogramData = require('./sample_data/Histogram');
var BarChartData = require('./sample_data/Barchart');
var BubbleChartData = require('./sample_data/BubbleChart');



var App = React.createClass({

	getInitialState: function() {
		return {
			AirPassengersChart: {
				rows:[],
				columns:[],
				chartType: ""
			},
			UKGasChart: {
				data: [],
				chartType: ""
			},
			HistogramChart: {
				data: [],
				chartType: ""
			},
			BarChart: {
				data: [],
				chartType: "",
				options : {}
			},
			BubbleChart: {
				data: [],
				chartType: "",
				options : {}
			}

		};
	},
	componentDidMount: function() {
		var AirPassengersChart =  {
			rows : AirPassengerData.rows,
			columns : AirPassengerData.columns,
			options : {title: "Air Passengers", hAxis: {title: 'Year'}, vAxis: {title: 'Count'}},
			chartType : "LineChart",
			div_id: "AirPassengers"
		};

		var UKGasChart = {
			data : UKGasEmissionsData.dataArray,
			options : {title: "UK Gas Emissions", hAxis: {title: 'Year'}, vAxis: {title: 'Count'}},
			chartType : "LineChart",
			div_id: "UKGasChart"
		};

		var HistogramChart = {
			data : HistogramData.dataArray,
			options: {title : 'Lengths of dinosaurs, in meters'},
			chartType: "Histogram",
			div_id: "HistogramChart"
		};
		var BarChart = {
			data : BarChartData.dataArray,
			options: BarChartData.options,
			chartType: "BarChart",
			div_id: "BarChart"
		};

		var BubbleChart= {
			data : BubbleChartData.dataArray,
			options : BubbleChartData.options,
			chartType: "BubbleChart",
			div_id: "BubbleChart"
		}

		this.setState({
			'AirPassengersChart': AirPassengersChart,
			'UKGasChart': UKGasChart,
			'HistogramChart': HistogramChart,
			'BarChart': BarChart,
			'BubbleChart' : BubbleChart
		});

	},

	render: function() {
		console.log(this.state.AirPassengersChart);
		return (
			<div className="App">
				<h3> Line Chart </h3>
				<Chart chartType={this.state.AirPassengersChart.chartType} width={"600px"} height={"400px"} rows={this.state.AirPassengersChart.rows} columns={this.state.AirPassengersChart.columns} options = {this.state.AirPassengersChart.options} graph_id={this.state.AirPassengersChart.div_id}  />
				<h3> Line Chart from array with show/hide from legend </h3>
				<Chart chartType={this.state.UKGasChart.chartType} width={"600px"} height={"400px"} data={this.state.UKGasChart.data} options = {this.state.UKGasChart.options} graph_id={this.state.UKGasChart.div_id} legend_toggle={true}/>
				<h3> Length of Dinosaurs in m (Histogram)</h3>
				<Chart chartType={this.state.HistogramChart.chartType} width={"600px"} height={"400px"} data={this.state.HistogramChart.data} options = {this.state.HistogramChart.options} graph_id={this.state.HistogramChart.div_id} />
				<h3> Bar Chart </h3>
				<Chart chartType={this.state.BarChart.chartType} width={"600px"} height={"400px"} data={this.state.BarChart.data} options = {this.state.BarChart.options} graph_id={this.state.BarChart.div_id} />
				<h3> Bubble Chart </h3>
				<Chart chartType={this.state.BubbleChart.chartType} width={"600px"} height={"400px"} data={this.state.BubbleChart.data} options = {this.state.BubbleChart.options} graph_id={this.state.BubbleChart.div_id } />

			</div>
		);
	}
});

React.render(<App />, document.getElementById('content')); */