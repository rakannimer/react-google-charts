import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Name", "Salary", "Full time employee"],
  ["Mike", { v: 10000, f: "$10,000" }, true],
  ["Jim", { v: 8000, f: "$8,000" }, false],
  ["Alice", { v: 12500, f: "$12,500" }, true],
  ["Bob", { v: 7000, f: "$7,000" }, true],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
  pageSize: 1,
};

export function App() {
  return (
    <Chart
      chartType="Table"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
