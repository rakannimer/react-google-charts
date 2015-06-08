var React = require('react');
var Chart = require('react-google-charts').Chart;


var LineCharts = require('./Examples/LineCharts');
var ScatterCharts = require('./Examples/ScatterCharts');
var BarCharts = require('./Examples/BarCharts');
var Histograms = require('./Examples/Histograms');
var BubbleCharts = require('./Examples/BubbleCharts');
var CodeHolder = require('./CodeHolder');

var Menu = require('./Menu');


var Examples = React.createClass({
	
	getInitialState: function() {
		return {
		};
	},

	render: function() {
		
		return (
			<div>
				<div className="examples">

					<BubbleCharts />
					<CodeHolder codeUrl = {"src/components/Examples/BubbleCharts.js"} />
					<LineCharts />
					<CodeHolder codeUrl = {"src/components/Examples/LineCharts.js"} />
					<ScatterCharts />
					<CodeHolder codeUrl = {"src/components/Examples/ScatterCharts.js"} />
					<BarCharts />
					<CodeHolder codeUrl = {"src/components/Examples/BarCharts.js"} />
					<Histograms />
					<CodeHolder codeUrl = {"src/components/Examples/Histograms.js"} />
					
				</div>
			</div>
		);
	}
});

module.exports = Examples;