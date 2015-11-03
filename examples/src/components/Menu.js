var React = require('react');
var Menu = React.createClass({
	render: function() {
		return (
			<div>
			<nav className="menu">
				<h1 className="link"> <a href="/"> Usage </a> </h1>
				<h1 className="link"> <a href="/examples/home"> Examples </a> </h1>
					<h2 className="link"> <a href="/examples/BarCharts"> Bar Charts </a> </h2>
					<h2 className="link" ><a href="/examples/BubbleCharts">    Bubble Charts </a> </h2>
					<h2 className="link" ><a href="/examples/Histograms ">    Histograms </a> </h2>
				 	<h2 className="link" ><a href="/examples/LineCharts">   Line Charts </a> </h2>
				  <h2 className="link" ><a href="/examples/ColumnCharts">   Column Charts </a> </h2>
				 	<h2 className="link" ><a href="/examples/ScatterCharts">   Scatter Charts </a> </h2>
				 	<h2 className="link" ><a href="/examples/ManyMore">   Many more </a> </h2>
				<h1 className="link"> <a href="https://github.com/RakanNimer/react-google-charts/"> Source </a> </h1>
				<h1 className="link"> <a href="https://github.com/RakanNimer/react-google-charts/tree/gh-pages"> Examples Source </a> </h1>
			</nav>
			</div>
		);
	}
});

module.exports = Menu;