var React = require('react');
var Chart = require('react-google-charts').Chart;
var BarChartData = require('../../sample_data/Barchart');

var BarCharts = React.createClass({
	
	getInitialState: function() {
		return {
			BarChart: {
				data: [],
				chartType: "",
				options : {}
			}
		};
	},
	componentDidMount: function() {

		var BarChart = {
			data : BarChartData.dataArray,
			options: BarChartData.options,
			chartType: "BarChart",
			div_id: "BarChart"
		};


		

		this.setState({
			'BarChart': BarChart
		});
		
	},

	render: function() {
		
		return (
			<div className="Examples">
				<h3> Bar Chart </h3>
				<Chart chartType={this.state.BarChart.chartType} width={"500px"} height={"300px"} data={this.state.BarChart.data} options = {this.state.BarChart.options} graph_id={this.state.BarChart.div_id} />
			</div>
		);
	}
});

module.exports = BarCharts;