import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "string", id: "President" },
    { type: "string", id: "dummy bar label" },
    { type: "string", role: "tooltip" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  ["Washington", null, "George", new Date(1789, 3, 29), new Date(1797, 2, 3)],
  ["Adams", null, "John", new Date(1797, 2, 3), new Date(1801, 2, 3)],
  ["Jefferson", null, "Thomas", new Date(1801, 2, 3), new Date(1809, 2, 3)],
];

export const options = {
  allowHtml: true,
};

export function App() {
  return (
    <Chart
      chartType="Timeline"
      data={data}
      width="100%"
      height="400px"
      options={options}
    />
  );
}
