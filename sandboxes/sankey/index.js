import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram

const data = [
  ["From", "To", "Weight"],
  ["A", "X", 5],
  ["A", "Y", 7],
  ["A", "Z", 6],
  ["B", "X", 2],
  ["B", "Y", 9],
  ["B", "Z", 4]
];
const options = {};
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="Sankey"
          width="40%"
          height="200px"
          data={data}
          options={options}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
