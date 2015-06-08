var React = require('react');
var Chart = require('react-google-charts').Chart;
var HistogramData = require('../../sample_data/Histogram');

var Histograms = React.createClass({
	
	getInitialState: function() {
		return {
			HistogramChart: {
				data: [],
				chartType: ""
			}
		};
	},
	componentDidMount: function() {

		var HistogramChart = {
			data : HistogramData.dataArray,
			options: {title : 'Lengths of dinosaurs, in meters'},
			chartType: "Histogram",
			div_id: "HistogramChart"
		};


		this.setState({
			'HistogramChart': HistogramChart
		});
		
	},

	render: function() {
		
		return (
			<div className="Examples">
				<h3> Length of Dinosaurs in m (Histogram)</h3>
				<Chart chartType={this.state.HistogramChart.chartType} width={"500px"} height={"300px"} data={this.state.HistogramChart.data} options = {this.state.HistogramChart.options} graph_id={this.state.HistogramChart.div_id} />
				
			</div>
		);
	}
});

module.exports = Histograms;