import * as React from "react";
import * as ReactDOM from "react-dom";
import { Chart } from "../src/index";

// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
const columns = [
  { type: "string", id: "President" },
  { type: "date", id: "Start" },
  { type: "date", id: "End" }
];

const rows = [
  ["Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
  ["Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)]
];
class App extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.setState({ refresh: Date.now() });
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        <Chart
          chartType="Timeline"
          data={[columns, ...rows]}
          width="100%"
          height="400px"
        />
      </div>
    );
  }
}

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
        <App />
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
