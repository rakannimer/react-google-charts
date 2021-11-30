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

export const options = {
  hAxis: { minValue: 0, maxValue: 60 },
  chartArea: { top: 0, right: 0, bottom: 0 },
};

export function App() {
  return (
    <Chart
      chartType="BarChart"
      width="80%"
      height="400px"
      data={data}
      options={options}
      chartPackages={["corechart", "controls"]}
      controls={[
        {
          controlType: "NumberRangeFilter",
          options: {
            filterColumnIndex: 1,
            minValue: 0,
            maxValue: 60,
          },
        },
      ]}
    />
  );
}
