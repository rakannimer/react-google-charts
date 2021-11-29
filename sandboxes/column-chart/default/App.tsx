import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];

export function App() {
  return (
    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
  );
}
