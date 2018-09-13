import * as React from "react";
import { render } from "react-dom";
import { Chart } from "react-google-charts";

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
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = data[selection[0].row + 1];
                console.log("Selected : " + region);
              }
            }
          ]}
          chartType="GeoChart"
          width="100%"
          height="400px"
          data={data}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
