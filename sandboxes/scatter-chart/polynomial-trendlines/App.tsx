import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Generation", "Descendants"],
  [0, 1],
  [1, 33],
  [2, 269],
  [3, 2013],
];

export const options = {
  title: "Age vs. Weight comparison",
  crosshair: { trigger: "both", orientation: "both" },
  trendlines: {
    0: {
      type: "polynomial",
      degree: 3,
      visibleInLegend: true,
      labelInLegend: "Trend",
    },
  },
};

export function App() {
  return (
    <Chart
      chartType="ScatterChart"
      width="80%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
