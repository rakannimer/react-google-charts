import React from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import './stylesheets/gh-pages.css'
import './stylesheets/main.css'
import './stylesheets/github-light.css'

import PageLayout from './components/PageLayout'

import Component from '../../src'
import Chart from '../../src/components/Chart'
import StateEditor from '../../src/components/StateEditor'
import SAMPLE_DATA from '../../src/constants/SAMPLE_DATA';

//let charts = [
//  {chartType: 'LineChart', rows: [], columns: [], options: {}, width: "400px", height:"300px",legend_toggle:true},
//  {chartType: 'ScatterChart', data: [], options: { }, width: "400px", height:"300px", legend_toggle:true }
//];

let charts = {};

//console.log(charts['LineChart'])


class ChartRenderer extends React.Component {
  constructor(props){
    super(props)
    console.log ("In CONSTRUCTOR")
  }
  render() {
    console.log("IN RENDER")
    return (<div>THIS IS A CHART </div>)

  }
}

class Demo2 extends React.Component {
  constructor(props){
    super(props)
    SAMPLE_DATA.map((chart)=>{
      charts[chart['chartTitle'] || chart['chartType']] = React.createClass({
        render(){
          return  <Chart chartType = {chart.chartType} width={chart.width} height={chart.height} rows = {chart.rows} columns =  {chart.columns} data ={chart.data} options = {chart.options} legend_toggle = {chart.legend_toggle} chartPackages={['corechart','table','timeline','treemap', 'wordtree','gantt']} />
        }
        });
      });
    //charts['LineChart'] = class a extends React.Component { render() { console.log("HERRE");return <Chart chartType = {"LineChart"} width={"200px"} height={"200px"} rows = {null} columns =  {null} data ={[]} options = {{}} legend_toggle = {true} chartPackages={['corechart']}/>}}
  }
  render(){

    return  <Router history={hashHistory}>
      <Route path="/" component={PageLayout}>
        <Route path="/test" component = { charts['LineChart']} />
      </Route>

    </Router>;
  }
}

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
    this.setState({charts: SAMPLE_DATA})
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

    return <PageLayout/>
    //let chartComponents = this.state.charts.map((chartState, i)=>{
    //
    //    return (<div key={i}>
    //      <Chart chartType = {chartState.chartType} width={chartState.width} height={chartState.height} rows = {chartState.rows} columns =  {chartState.columns} data ={chartState.data} options = {chartState.options} legend_toggle = {chartState.legend_toggle} chartPackages={['corechart','table','timeline','treemap', 'wordtree','gantt']}/>
    //      <StateEditor inputValue = {JSON.stringify(chartState)} chartIndex={i} onSubmit= {this.handleFormSubmit.bind(this)}/>
    //    </div>)
    //
    //});
    //return (<div>{chartComponents}</div>)

  }
};

render(<Demo2/>, document.querySelector('#demo'))
//
//
////<Route path="users" component={Users}>
//  //  <Route path="/user/:userId" component={User}/>
//  //</Route>
//<Route path="*" component={NoMatch}/>