import React from "react";
import { ReactGoogleChartEvent, Chart } from "react-google-charts";

export const data = [
  ["x", "dogs"],
  [0, 0],
  [1, 10],
  [2, 23],
  [3, 17],
  [4, 18],
  [5, 9],
];

export const chartEvents: ReactGoogleChartEvent[] = [
  {
    eventName: "select",
    callback: ({ chartWrapper }) => {
      const chart = chartWrapper.getChart();
      const selection = chart.getSelection();
      if (selection.length === 1) {
        const [selectedItem] = selection;
        const dataTable = chartWrapper.getDataTable();
        const { row, column } = selectedItem;

        console.log("You selected:", {
          row,
          column,
          value: dataTable?.getValue(row, column),
        });
      }
    },
  },
];

export function App() {
  return (
    <Chart
      chartType="ScatterChart"
      width="80%"
      height="400px"
      data={data}
      chartEvents={chartEvents}
    />
  );
}
