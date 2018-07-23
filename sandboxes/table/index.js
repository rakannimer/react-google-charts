import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram

const data = [
  ["Name", "Salary", "Full time employee"],
  ["Mike", { v: 10000, f: "$10,000" }, true],
  ["Jim", { v: 8000, f: "$8,000" }, false],
  ["Alice", { v: 12500, f: "$12,500" }, true],
  ["Bob", { v: 7000, f: "$7,000" }, true]
];
const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" }
};
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="Table"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
