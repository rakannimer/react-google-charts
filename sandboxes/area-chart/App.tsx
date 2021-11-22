import React from "react";
import { Chart } from "react-google-charts";

export const columns = [
  {
    type: "number" as const,
    label: "year",
  },
  {
    type: "number" as const,
    label: "AttentionSpan",
  },
];

export const rows = [
  [2015, 5],
  [2016, 3],
  [2018, 1],
];

export function App() {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      legendToggle
      rows={rows}
      columns={columns}
    />
  );
}
