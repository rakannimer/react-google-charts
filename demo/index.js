import * as React from "react";
import * as ReactDOM from "react-dom";

import { Chart } from "react-google-charts";

class InteractiveChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [[8, 12], [4, 5.5]],
      columns: [
        {
          type: "number",
          label: "Age"
        },
        {
          type: "number",
          label: "Weight"
        }
      ]
    };
  }

  componentDidMount() {
    let i = 0;
    setTimeout(() => {
      i++;
      this.setState(state => {
        return Object.assign({}, state, {
          rows: [...state.rows, [i, 10 * Math.random()]]
        });
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        <Chart
          chartType="LineChart"
          rows={this.state.rows}
          columns={this.state.columns}
          // data={[["Age", "Weight"], [8, 12], [4, 5.5]]}
          options={{}}
          // graphID="ScatterChart1"
          width="100%"
          height="400px"
        />
        {/* <Chart
  chartType="ScatterChart"
  data={[["Age", "Weight"], [8, 12], [4, 5.5]]}
  options={{}}
  // graphID="ScatterChart1"
  width="100%"
  height="400px"
  legend_toggle
/> */
        /* <Chart
  chartType="ScatterChart"
  data={[["Age", "Weight"], [8, 12], [4, 5.5]]}
  options={{}}
  graphID="ScatterChart2"
  width="100%"
  height="400px"
  legend_toggle
/> */}
      </div>
    );
  }
}

ReactDOM.render(<InteractiveChart />, document.getElementById("app"));
