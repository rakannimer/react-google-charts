import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7] // CSS-style declaration
];
const options = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: true
};
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="PieChart"
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
