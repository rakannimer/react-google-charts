import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Time", "Sales", "Expenses"],
  [new Date(2022, 4, 15, 9, 30), 1030, 540],
  [new Date(2022, 4, 17, 10, 30), 1000, 400],
  [new Date(2022, 5, 13, 11, 30), 1170, 460],
  [new Date(2022, 6, 13, 12, 30), 660, 1120],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: {
    title: "Date",
    format: "MMM dd, yyyy", // Custom date format
    gridlines: { count: 3 }, // Controls the number of gridlines
  },
};

export function App() {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
      formatters={[
        {
          column: 0,
          type: "DateFormat",
          options: {
            timeZone: 0,
          },
        },
      ]}
    />
  );
}
