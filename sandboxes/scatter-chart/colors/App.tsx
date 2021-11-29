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
  title: "Descendants by Generation",
  hAxis: { title: "Generation", minValue: 0, maxValue: 3 },
  vAxis: { title: "Descendants", minValue: 0, maxValue: 2100 },
  trendlines: {
    0: {
      type: "exponential",
      color: "green",
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
