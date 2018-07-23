import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

const columns = [
  {
    type: "number",
    label: "year"
  },
  {
    label: "AttentionSpan",
    type: "number"
  }
];
const rows = [[2015, 5], [2016, 3], [2018, 1]];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          legendToggle
          rows={rows}
          columns={columns}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
