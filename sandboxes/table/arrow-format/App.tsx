import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Department", "Revenues Change"],
  ["Shoes", { v: 12, f: "12.0%" }],
  ["Sports", { v: -7.3, f: "-7.3%" }],
  ["Toys", { v: 0, f: "0%" }],
  ["Electronics", { v: -2.1, f: "-2.1%" }],
  ["Food", { v: 22, f: "22.0%" }],
];

export const options = {
  allowHtml: true,
  showRowNumber: true,
};

export const formatters = [
  {
    type: "ArrowFormat" as const,
    column: 1,
  },
];

export function App() {
  return (
    <Chart
      chartType="Table"
      width="100%"
      height="400px"
      data={data}
      options={options}
      formatters={formatters}
    />
  );
}
