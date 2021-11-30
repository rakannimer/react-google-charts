import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Name", "Age"],
  ["Michael", 12],
  ["Elisa", 20],
  ["Robert", 7],
  ["John", 54],
  ["Jessica", 22],
  ["Aaron", 3],
  ["Margareth", 42],
  ["Miranda", 33],
];

export function App() {
  return (
    <Chart
      chartType="BarChart"
      width="80%"
      height="400px"
      data={data}
      chartPackages={["corechart", "controls"]}
      controls={[
        {
          controlType: "StringFilter",
          options: {
            filterColumnIndex: 0,
            matchType: "any", // 'prefix' | 'exact',
            ui: {
              label: "Search by name",
            },
          },
        },
      ]}
    />
  );
}
