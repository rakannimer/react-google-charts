import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "string", id: "Term" },
    { type: "string", id: "Name" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  ["1", "George Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
  ["2", "John Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["3", "Thomas Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)],
];

export function App() {
  return <Chart chartType="Timeline" data={data} width="100%" height="400px" />;
}
