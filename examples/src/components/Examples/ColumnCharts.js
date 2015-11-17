var React = require('react');
var Chart = require('react-google-charts').Chart;
var AirPassengerData = require('../../sample_data/AirPassengerTooltip');
var CodeHolder = require('../CodeHolder');


var ColumnCharts = React.createClass({

    getInitialState: function() {
  return {
    AirPassengersTooltip: {
      rows:[],
      columns:[],
      chartType: ""
    }
  };
},
componentDidMount: function() {
  var AirPassengersTooltip =  {
    rows : AirPassengerData.rows,
    columns : AirPassengerData.columns,
    options : {tooltip: {isHtml: true}},
    chartType : "ColumnChart",
    div_id : "ColumnChartId"
  };



  this.setState({
    'AirPassengersTooltip': AirPassengersTooltip
  });

},

render: function() {

  return (
      <div className="Examples">
      <h3> Column Chart with Tooltip </h3>
      <Chart chartType={this.state.AirPassengersTooltip.chartType} width={"500px"} height={"300px"} rows={this.state.AirPassengersTooltip.rows} columns={this.state.AirPassengersTooltip.columns} options = {this.state.AirPassengersTooltip.options}  />
    </div>
);
}
});

module.exports = ColumnCharts;