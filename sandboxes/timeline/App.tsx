import React from "react";
import { Chart } from "react-google-charts";

// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
export const columns = [
  { type: "string", id: "President" },
  { type: "date", id: "Start" },
  { type: "date", id: "End" },
];

export const rows = [
  ["Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
  ["Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)],
];

export function App() {
  return (
    <Chart
      chartType="Timeline"
      data={[columns, ...rows]}
      width="100%"
      height="400px"
    />
  );
}
