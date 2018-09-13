import * as React from "react";
import { render } from "react-dom";
import { Chart } from "../src";

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
              callback:({chartWrapper}) => {
                const chart = chartWrapper.getChart();
                const [selection] = chart.getSelection();
                const region = data[selection.row]
                console.log("Selected : "+region)
            }
          ]}
          chartType="GeoChart"
          width="100%"
          height="400px"
          data={data}
          options={{
            enableRegionInteractivity: true,
            dataMode: "regions"
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
