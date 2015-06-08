var React = require('react');
var Chart = require('react-google-charts').Chart;
var AirPassengerData = require('../../sample_data/AirPassenger');
var UKGasEmissionsData = require('../../sample_data/UKGasEmissions');
var CodeHolder = require('../CodeHolder');


var LineCharts = React.createClass({
	
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



		this.setState({
			'AirPassengersChart': AirPassengersChart,
			'UKGasChart': UKGasChart,
		});
		
	},

	render: function() {
		
		return (
			<div className="Examples">
				<h3> Line Chart </h3>
				<Chart chartType={this.state.AirPassengersChart.chartType} width={"500px"} height={"300px"} rows={this.state.AirPassengersChart.rows} columns={this.state.AirPassengersChart.columns} options = {this.state.AirPassengersChart.options} graph_id={this.state.AirPassengersChart.div_id}  />
				<h3> Line Chart from array with show/hide from legend </h3>
				<Chart chartType={this.state.UKGasChart.chartType} width={"500px"} height={"300px"} data={this.state.UKGasChart.data} options = {this.state.UKGasChart.options} graph_id={this.state.UKGasChart.div_id} legend_toggle={true}/>
			</div>
		);
	}
});

module.exports = LineCharts;