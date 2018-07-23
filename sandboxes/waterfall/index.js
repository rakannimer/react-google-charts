import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

// Ref : https://developers.google.com/chart/interactive/docs/gallery/candlestickchart#Waterfall
const data = [
  ["Day", "", "", "", ""],
  ["Mon", 20, 28, 38, 45],
  ["Tue", 31, 38, 55, 66],
  ["Wed", 50, 55, 77, 80],
  ["Thu", 77, 77, 66, 50],
  ["Fri", 68, 66, 22, 15]
];
const options = {
  legend: "none",
  bar: { groupWidth: "100%" }, // Remove space between bars.
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
    risingColor: { strokeWidth: 0, fill: "#0f9d58" } // green
  }
};
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="CandlestickChart"
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
