var React = require('react');
var Chart = require('react-google-charts').Chart;
var ScatterChartData = require('../../sample_data/ScatterCharts');


var ScatterCharts = React.createClass({
	
	build_circle_scatter: function() {
		var dataArray = [];
		dataTable.addColumn('number');
		dataTable.addColumn('number');
		var radius = 100;
		for (var i = 0; i < 6.28; i += 0.1) {
		dataTable.addRow([radius * Math.cos(i), radius * Math.sin(i)]);
		} 
		dataTable.addRow([0, 0]);
		return dataTable;
	},
	getInitialState: function() {
		return {
			
			ScatterChart: {
				data: [],
				chartType: "",
				options : {},
				chartEvents: []
			}

		};
	},
	componentDidMount: function() {


		var randomWalk = function(Wrapper) {
			var dataTable = Wrapper.getDataTable(),
				x = Chart.props.rows[Chart.props.rows.length - 1][0],
	        	y = Chart.props.rows[Chart.props.rows.length - 1][1],
	        	radius = 100;
	        x += 5 * (Math.random() - 0.5);
	        y += 5 * (Math.random() - 0.5);	
	        if (x * x + y * y > radius * radius) {
	          // Out of bounds. Bump toward center.
	          x += Math.random() * ((x < 0) ? 5 : -5);
	          y += Math.random() * ((y < 0) ? 5 : -5);
	        }

	        // Change this to draw by only setting state.
	        dataTable.setValue(dataTable.getNumberOfRows() - 1, 0, x);
	        dataTable.setValue(dataTable.getNumberOfRows() - 1, 1, y);
	        Chart.wrapper.draw();
	        return;
		};

		var ScatterChart= {

			rows : ScatterChartData.circle_scatter.rows,
			columns : ScatterChartData.circle_scatter.columns,
			options : ScatterChartData.circle_scatter.options,
			chartType: "ScatterChart",
			div_id: "ScatterChart",
			chartEvents: [{
				eventName : 'ready' , callback: randomWalk,
			},
			{
				eventName : 'animationfinish' , callback: randomWalk,
			},
			]
			
		}

		this.setState({
			'ScatterChart' : ScatterChart,
		});
		
	},

	render: function() {
		
		return (
			<div className="Examples">
				<h3> Scatter Chart </h3>
				<Chart chartType={this.state.ScatterChart.chartType} chartEvents={this.state.ScatterChart.chartEvents} width={"500px"} height={"300px"} rows={this.state.ScatterChart.rows} columns={this.state.ScatterChart.columns} options = {this.state.ScatterChart.options} graph_id={this.state.ScatterChart.div_id } />
			</div>
		);
	}
});

module.exports = ScatterCharts;