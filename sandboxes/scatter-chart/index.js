import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram

const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2008", 1030, 540],
  ["2009", 1000, 400],
  ["2010", 1170, 460],
  ["2011", 660, 1120],
  ["2012", 1030, 540]
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
          chartType="ScatterChart"
          width="80%"
          height="400px"
          data={data}
          options={options}
          legendToggle
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
