import * as React from "react";
import * as ReactDOM from "react-dom";

import { Chart } from "../src/index.tsx";

ReactDOM.render(
  <div>
    {/* <Chart
      chartType="ScatterChart"
      data={[["Age", "Weight"], [8, 12], [4, 5.5]]}
      options={{}}
      // graphID="ScatterChart1"
      width="100%"
      height="400px"
      legend_toggle
    /> */}
    <Chart
      chartType="ScatterChart"
      rows={[[8, 12], [4, 5.5]]}
      columns={[
        {
          type: "number",
          label: "Age"
        },
        {
          type: "number",
          label: "Weight"
        }
      ]}
      // data={[["Age", "Weight"], [8, 12], [4, 5.5]]}
      options={{}}
      // graphID="ScatterChart1"
      width="100%"
      height="400px"
    />
    {/* <Chart
      chartType="ScatterChart"
      data={[["Age", "Weight"], [8, 12], [4, 5.5]]}
      options={{}}
      graphID="ScatterChart2"
      width="100%"
      height="400px"
      legend_toggle
    /> */}
  </div>,
  document.getElementById("app")
);
