import * as React from "react";
import * as ReactDOM from "react-dom";

import { Chart } from "../build/index";

ReactDOM.render(
  <Chart
    chartType="ScatterChart"
    data={[["Age", "Weight"], [8, 12], [4, 5.5], [1, 2]]}
    options={{}}
    graph_id="ScatterChart"
    width="100%"
    height="400px"
    legend_toggle
  />,
  document.getElementById("app")
);
