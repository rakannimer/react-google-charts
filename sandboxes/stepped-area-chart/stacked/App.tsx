import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Style", "Colonial", "Victorian", "Modern", "Contemporary"],
  ["2013", 5.2, 3.6, 2.8, 2],
  ["2014", 5.6, 4.0, 2.8, 3],
  ["2015", 7.2, 2.2, 2.2, 6.0],
  ["2016", 8.0, 1.7, 0.8, 4.0],
];

export const options = {
  isStacked: "relative",
  height: 300,
  legend: { position: "top", maxLines: 3 },
  vAxis: {
    minValue: 0,
    ticks: [0, 0.3, 0.6, 0.9, 1],
  },
};

export function App() {
  return (
    <Chart
      chartType="SteppedAreaChart"
      width="80%"
      height="400px"
      data={data}
      options={options}
      legendToggle
    />
  );
}
