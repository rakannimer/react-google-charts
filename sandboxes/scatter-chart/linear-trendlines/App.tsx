import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Diameter", "Age"],
  [8, 37],
  [4, 19.5],
  [11, 52],
  [4, 22],
  [3, 16.5],
  [6.5, 32.8],
  [14, 72],
];

export const options = {
  title: "Age of sugar maples vs. trunk diameter, in inches",
  hAxis: { title: "Diameter" },
  vAxis: { title: "Age" },
  legend: "none",
  trendlines: { 0: {} },
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
