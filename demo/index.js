import * as React from "react";
import * as ReactDOM from "react-dom";

import { Chart } from "../src/index";

ReactDOM.render(
  <div>
    <Chart
      chartType="ScatterChart"
      data={[["Age", "Weight"], [8, 12], [4, 5.5]]}
      options={{}}
      graph_id="ScatterChart1"
      width="100%"
      height="400px"
      legend_toggle
    />
    <Chart
      chartType="ScatterChart"
      data={[["Age", "Weight"], [8, 12], [4, 5.5]]}
      options={{}}
      graph_id="ScatterChart2"
      width="100%"
      height="400px"
      legend_toggle
    />
  </div>,
  document.getElementById("app")
);
