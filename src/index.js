import React from 'react'

import googleChartLoader from './components/GoogleChartLoader';
import Chart from './components/Chart';
import SAMPLE_DATA from './constants/SAMPLE_DATA';



export default class Main extends React.Component {
  constructor(props) {
    localStorage.debug = true;
    super(props);
    this.state = {
      rows: [],
      columns:[],
      options: {}
    }
  }
  componentDidMount() {




  }

  render() {
      return <div>
        <Chart width={"800px"} height={"550px"} rows = {this.state.rows} columns = {this.state.columns} options = {this.state.options} legend_toggle = {true}/>
        <h2>Welcome to React components</h2>
      </div>
  }
}
