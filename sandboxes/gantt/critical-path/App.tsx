import React from "react";
import { Chart } from "react-google-charts";

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [
  [
    "Research",
    "Find sources",
    null,
    new Date(2015, 0, 1),
    new Date(2015, 0, 5),
    null,
    100,
    null,
  ],
  [
    "Write",
    "Write paper",
    "write",
    null,
    new Date(2015, 0, 9),
    3 * 24 * 60 * 60 * 1000,
    25,
    "Research,Outline",
  ],
  [
    "Cite",
    "Create bibliography",
    "write",
    null,
    new Date(2015, 0, 7),
    1 * 24 * 60 * 60 * 1000,
    20,
    "Research",
  ],
  [
    "Complete",
    "Hand in paper",
    "complete",
    null,
    new Date(2015, 0, 10),
    1 * 24 * 60 * 60 * 1000,
    0,
    "Cite,Write",
  ],
  [
    "Outline",
    "Outline paper",
    "write",
    null,
    new Date(2015, 0, 6),
    1 * 24 * 60 * 60 * 1000,
    100,
    "Research",
  ],
];

export const data = [columns, ...rows];

export const options = {
  gantt: {
    criticalPathEnabled: true,
    criticalPathStyle: {
      stroke: "#e64a19",
      strokeWidth: 5,
    },
  },
};

export function App() {
  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="50%"
      data={data}
      options={options}
    />
  );
}
