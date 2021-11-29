import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Language", "Speakers (in millions)"],
  ["German", 5.85],
  ["French", 1.66],
  ["Italian", 0.316],
  ["Romansh", 0.0791],
];

export const options = {
  legend: "none",
  pieSliceText: "label",
  title: "Swiss Language Use (100 degree rotation)",
  pieStartAngle: 100,
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
