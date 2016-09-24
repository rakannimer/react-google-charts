import React from 'react';
import {Chart} from 'react-google-charts';
import Constants from 'react-google-charts/src/constants/SAMPLE_DATA';


class ChartsExample extends React.Component {
  constructor(props){
    super(props);
    this.state={
      charts : Constants
    };
  }

  render() {
    return (
      <div>
      {
        this.state.charts.map((chartProps, i)=>{
          return (
            <div key={i}>
              <h3>{chartProps.chartType}</h3>
              <Chart    {...chartProps} />
            </div>
          );
        })
      }
      </div>
    );
  }
};
export default ChartsExample;
