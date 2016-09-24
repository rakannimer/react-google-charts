import React from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

import './stylesheets/gh-pages.css'
import './stylesheets/main.css'
import './stylesheets/github-light.css'

import PageLayout from './components/PageLayout'
import ChartEditor from './components/ChartEditor'
import Usage from './components/Usage'

import {Chart} from 'react-google-charts'
import PropsEditor from 'react-google-charts/src/components/PropsEditor'
import SAMPLE_DATA from 'react-google-charts/src/constants/SAMPLE_DATA';

//let charts = [
//  {chartType: 'LineChart', rows: [], columns: [], options: {}, width: "400px", height:"300px",legend_toggle:true},
//  {chartType: 'ScatterChart', data: [], options: { }, width: "400px", height:"300px", legend_toggle:true }
//];


//console.log(charts['LineChart'])


let routes = [];
class Demo extends React.Component {
  constructor(props){
    super(props);
    let charts = {};
    routes = SAMPLE_DATA.map((chart, i)=>{
      charts[chart['chartTitle'] || chart['chartType']] = React.createClass({
        render(){
          return  <div>
            <ChartEditor chart={chart} />
            </div>
        }
      });
      return <Route key={i} path={"/examples/"+(chart['chartTitle'] || chart['chartType'])} component={charts[chart['chartTitle'] || chart['chartType']]} />
    });
    this.state = {charts : charts};

  }

  render(){

    return  <Router history={hashHistory}>
      <Route path="/" component={PageLayout}>
        <IndexRoute component={Usage}/>
        {routes}
      </Route>
    </Router>;
  }
}



render(<Demo/>, document.querySelector('#demo'))


//class Demo extends React.Component {
//  constructor(props) {
//    if (process.env.NODE_ENV === 'development') {
//      localStorage.debug = "react-google-charts:*";
//    }
//    super(props);
//    this.state = {
//      charts : []
//    };
//  }
//  componentDidMount() {
//    this.setState({charts: SAMPLE_DATA})
//  }
//
//
//
//
//
//  handleFormSubmit(newChartState, chartIndex) {
//    console.log("UPDATING CHART", chartIndex);
//    console.log("Setting State", newChartState);
//    let updatedCharts  = Object.assign([], this.state.charts);
//    updatedCharts[chartIndex] = JSON.parse(newChartState);
//    console.log("CHANGED TO ",updatedCharts[chartIndex]);
//    this.setState({charts: updatedCharts});
//  }
//
//  render() {
//
//    return <PageLayout/>
//    //let chartComponents = this.state.charts.map((chartState, i)=>{
//    //
//    //    return (<div key={i}>
//    //      <Chart chartType = {chartState.chartType} width={chartState.width} height={chartState.height} rows = {chartState.rows} columns =  {chartState.columns} data ={chartState.data} options = {chartState.options} legend_toggle = {chartState.legend_toggle} chartPackages={['corechart','table','timeline','treemap', 'wordtree','gantt']}/>
//    //      <PropsEditor inputValue = {JSON.stringify(chartState)} chartIndex={i} onSubmit= {this.handleFormSubmit.bind(this)}/>
//    //    </div>)
//    //
//    //});
//    //return (<div>{chartComponents}</div>)
//
//  }
//};
//
//
//
////<Route path="users" component={Users}>
//  //  <Route path="/user/:userId" component={User}/>
//  //</Route>
//<Route path="*" component={NoMatch}/>
