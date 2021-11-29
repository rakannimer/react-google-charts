import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["ID", "X", "Y", "Temperature"],
  ["", 80, 167, 120],
  ["", 79, 136, 130],
  ["", 78, 184, 50],
  ["", 72, 278, 230],
  ["", 81, 200, 210],
  ["", 72, 170, 100],
  ["", 68, 477, 80],
];

export const options = {
  colorAxis: { colors: ["yellow", "red"] },
};

export function App() {
  return (
    <Chart
      chartType="BubbleChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
