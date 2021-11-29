import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Pac Man", "Percentage"],
  ["", 75],
  ["", 25],
];

export const options = {
  legend: "none",
  pieSliceText: "none",
  pieStartAngle: 135,
  tooltip: { trigger: "none" },
  slices: {
    0: { color: "yellow" },
    1: { color: "transparent" },
  },
};

export function App() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
