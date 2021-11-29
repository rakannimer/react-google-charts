import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "date", id: "Date" },
    { type: "number", id: "Won/Loss" },
  ],
  [new Date(2013, 2, 4), 10],
  [new Date(2013, 2, 5), 3],
  [new Date(2013, 2, 7), -1],
  [new Date(2013, 2, 8), 2],
  [new Date(2013, 2, 12), -1],
  [new Date(2013, 2, 13), 1],
  [new Date(2013, 2, 15), 1],
  [new Date(2013, 2, 16), -4],
  [new Date(2013, 1, 4), 10],
  [new Date(2013, 1, 5), 3],
  [new Date(2013, 1, 7), -1],
  [new Date(2013, 1, 8), 2],
  [new Date(2013, 1, 12), -1],
  [new Date(2013, 1, 13), 1],
  [new Date(2013, 1, 15), 1],
  [new Date(2013, 1, 16), -4],
];

export const options = {
  title: "Red Sox Attendance",
};

export function App() {
  return (
    <Chart
      chartType="Calendar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
