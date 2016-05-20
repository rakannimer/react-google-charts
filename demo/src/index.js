import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'
import Chart from '../../src/components/Chart'
import StateEditor from '../../src/components/StateEditor'
import SAMPLE_DATA from '../../src/constants/SAMPLE_DATA';

//let charts = [
//  {chartType: 'LineChart', rows: [], columns: [], options: {}, width: "400px", height:"300px",legend_toggle:true},
//  {chartType: 'ScatterChart', data: [], options: { }, width: "400px", height:"300px", legend_toggle:true }
//];

class Demo extends React.Component {
  constructor(props) {
    if (process.env.NODE_ENV === 'development') {
      localStorage.debug = "react-google-charts:*";
    }
    super(props);
    this.state = {
      charts : []
    };
  }
  componentDidMount() {
    //let renderedCharts = Object.assign([], charts);
    //renderedCharts[0]['rows'] = SAMPLE_DATA.three_columns.rows;
    //renderedCharts[0]['columns'] = SAMPLE_DATA.three_columns.columns;
    //
    //renderedCharts[0]['options'] = {legend: true}
    //renderedCharts[1]['data'] =          [['Element', 'Density', { role: 'style' }],
    //    ['Copper', 8.94, '#b87333'],            // RGB value
    //    ['Silver', 10.49, 'silver'],            // English color name
    //    ['Gold', 19.30, 'gold'],
    //    ['Platinum', 21.45, 'color: #e5e4e2' ] ] // CSS-style declaration//SAMPLE_DATA.data_array.data;
    //renderedCharts[1]['options'] = {legend: true, hAxis: {title: 'Age', minValue: 0, maxValue: 15}, vAxis: {title: 'Weight', minValue: 0, maxValue: 15}}


    this.setState({charts: SAMPLE_DATA})
    //this.setState({
    //    'rows' : rows,
    //    'columns' : columns,
    //    'options' : {legend:true},
    //    'data': ageVsWeightData
    //});
  }

  handleTextAreaSubmit(index, event){
    console.log("UPDATING " +index);
    console.log("EVENT",event);
    let updatedCharts  = Object.assign([], this.state.charts);
    updatedCharts[index] = event.target.value;
    this.setState({charts: updatedCharts});
  }
  handleTextAreaChanged(index, event){
    console.log("UPDATING " +index);
    console.log("EVENT",event);
    let updatedCharts  = Object.assign([], this.state.charts);
    updatedCharts[index] = JSON.parse(event.target.value);
    console.log("CHANGED TO ",updatedCharts[index])
    this.setState({charts: updatedCharts});
  }

  handleChangeChartType(chartState, index, newChartType) {
    chartState['chartType'] = newChartType;
    let updatedCharts  = Object.assign([], this.state.charts)
    updatedCharts[index] = chartState;
    this.setState({charts: updatedCharts}) //this.state.charts})

  }

  handleDoubleButton(chartState, index){

    if (chartState['_buildTableFromRows']){
      let newRows = chartState['rows'].map((row, i)=>{
        return [row[0], row[1]*2, row[2]*2]
      });
      //console.log("NEWROWS : ",newRows);
      chartState['rows'] = newRows;
    }
    else {
      let newData = chartState['data'].map((row, i)=>{
        if (i === 0) {
          return row
        }
        return [row[0]*2, row[1]*2]
      })
      chartState['data'] = newData
    }
    let updatedCharts  = Object.assign([], this.state.charts)
    updatedCharts[index] = chartState;
    // this.state.charts[index] = chartState;
    this.setState({charts: updatedCharts})//this.state.charts})
  }

  handleFormSubmit(newChartState, chartIndex) {
    console.log("UPDATING CHART", chartIndex);
    console.log("Setting State", newChartState);
    let updatedCharts  = Object.assign([], this.state.charts);
    updatedCharts[chartIndex] = JSON.parse(newChartState);
    console.log("CHANGED TO ",updatedCharts[chartIndex]);
    this.setState({charts: updatedCharts});
  }

  render() {

    let chartComponents = this.state.charts.map((chartState, i)=>{

        return (<div key={i}>
          <Chart chartType = {chartState.chartType} width={chartState.width} height={chartState.height} rows = {chartState.rows} columns =  {chartState.columns} data ={chartState.data} options = {chartState.options} legend_toggle = {chartState.legend_toggle} chartPackages={['corechart','table','timeline','treemap', 'wordtree','gantt']}/>
          <StateEditor inputValue = {JSON.stringify(chartState)} chartIndex={i} onSubmit= {this.handleFormSubmit.bind(this)}/>
        </div>)

    });

    //console.log("RENDERING CHARTS ", charts);

    //let chartComponents = charts.map((chart)=>{
    //  return chart
    //});
    return (<div>{chartComponents}</div>)

  }
};

render(<Demo/>, document.querySelector('#demo'))
