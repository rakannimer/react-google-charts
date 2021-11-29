import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "string", id: "Room" },
    { type: "string", id: "Name" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  [
    "Magnolia Room",
    "Google Charts",
    new Date(0, 0, 0, 14, 0, 0),
    new Date(0, 0, 0, 15, 0, 0),
  ],
  [
    "Magnolia Room",
    "App Engine",
    new Date(0, 0, 0, 15, 0, 0),
    new Date(0, 0, 0, 16, 0, 0),
  ],
];

export const options = {
  timeline: { showRowLabels: false },
  avoidOverlappingGridLines: false,
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
