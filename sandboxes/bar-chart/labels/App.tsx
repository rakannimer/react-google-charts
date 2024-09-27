import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    "Element",
    "Density",
    { role: "style" },
    {
      role: "annotation",
      type: "string",
    },
  ],
  ["Copper", 8.94, "#b87333", "Cu"],
  ["Silver", 10.49, "silver", "Ag"],
  ["Gold", 19.3, "gold", "Au"],
  ["Platinum", 21.45, "color: #e5e4e2", "Pt"],
];

export const options = {
  title: "Density of Precious Metals, in g/cm^3",
  width: 600,
  height: 400,
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

export function App() {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
