import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700]
];
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart chartType="GeoChart" width="100%" height="400px" data={data} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
