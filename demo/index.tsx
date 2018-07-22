import * as React from "react";
import * as ReactDOM from "react-dom";
import { Chart } from "../src/index";

class InteractiveChart extends React.Component<{}, { data: any[][] }> {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        [
          {
            type: "number",
            label: "Age"
          },
          {
            type: "number",
            label: "Weight",
            color: "green"
          },
          {
            type: "number",
            label: "test"
          }
        ],
        [4, 5.5, 1],
        [8, 12, 2],
        [11, 14, 3]
      ]
    };
  }

  componentDidMount() {
    let i = 0;
    setInterval(() => {
      i++;
      if (i > 10) return;
      this.setState(state => {
        return Object.assign({}, state, {
          data: [
            ...state.data,
            [20 * i, 10 * Math.random(), 10 * Math.random()]
          ]
        });
      });
    }, 500);
  }
  render() {
    return (
      <div>
        <Chart
          chartType="LineChart"
          data={this.state.data}
          options={{ colors: ["green"] }}
          width="100%"
          height="400px"
          legendToggle
        />
        <Chart
          chartType="ScatterChart"
          data={this.state.data}
          options={{
            title: "Age vs. Weight comparison",
            hAxis: { title: "Age", minValue: 0, maxValue: 15 },
            vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
            legend: "none"
          }}
          width="100%"
          height="400px"
          legendToggle
          getChartWrapper={chartWrapper => {
            console.log(chartWrapper.getChart());
          }}
        />
        <Chart
          chartType="ScatterChart"
          columns={["Age", "Weight", "Test"]}
          rows={[[8, 12, 1], [4, 5.5, 2]]}
          options={{}}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
    );
  }
}

ReactDOM.render(<InteractiveChart />, document.getElementById("app"));
