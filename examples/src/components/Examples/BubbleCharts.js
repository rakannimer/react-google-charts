var React = require('react');
var Chart = require('react-google-charts').Chart;
var BubbleChartData = require('../../sample_data/BubbleChart');


var BubbleCharts = React.createClass({

	getInitialState: function() {
		return {

			BubbleChart: {
				data: [],
				chartType: "",
				options : {}
			}
		};
	},
	componentDidMount: function() {

		var BubbleChart= {
			data : BubbleChartData.dataArray,
			options : BubbleChartData.options,
			chartType: "BubbleChart",
			div_id: "BubbleChart"
		};


		this.setState({
			'BubbleChart' : BubbleChart
		});
		
	},

	render: function() {
		
		return (
			<div className="Examples">
				<h3> Bubble Chart </h3>
				<Chart chartType={this.state.BubbleChart.chartType} width={"500px"} height={"300px"} data={this.state.BubbleChart.data} options = {this.state.BubbleChart.options} graph_id={this.state.BubbleChart.div_id } />
			</div>
		);
	}
});

module.exports = BubbleCharts;