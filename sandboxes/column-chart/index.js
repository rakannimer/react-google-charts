import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"] // CSS-style declaration
];
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={data}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
