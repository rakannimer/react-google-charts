var React = require('react');
var Chart = require('../../src').Chart;
var sample_data = require('../../src').sample_data;

var App = React.createClass({

	getInitialState: function() {
		return {
			rows: [],
			columns: {}
		};
	},
	componentDidMount: function() {

    var options = {
      title: 'My Chart',
      hAxis: {title: 'X Label'},
      vAxis: {title: 'Y Label'},
      theme : 'material'
    };
      
    this.setState({
      	'rows' : sample_data.three_columns.rows,
      	'columns' : sample_data.three_columns.columns,
      	'options' : options
    });


	},
	render: function() {
		return (
			<div className="App container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h4> Scatter Chart with point toggle </h4>
            <Chart graph_id = "ScatterChart" chartType = "ScatterChart" width={"100%"} height={"300px"} rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} legend_toggle={true}/>  
          </div>
          <div className="col-md-4">
            <h4> Line Chart with Series toggle </h4>
              <Chart graph_id = "LineChart"  chartType = "LineChart" width={"100%"} height={"300px"} rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} legend_toggle={true}/>  
          </div>
        </div>
        <div className="">
        </div>  
			</div>
		);
	}
});

React.render(<App />, document.getElementById('content'));


module.exports = App;
