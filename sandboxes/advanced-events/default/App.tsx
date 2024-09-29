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
          value:
            // If a whole row is selected, row is null
            row !== null
              ? dataTable?.getValue(row, column)
              : dataTable?.getDistinctValues(column),
        });
      }
    },
  },
  {
    eventName: "error",
    callback: ({ chartWrapper, eventArgs }) => {
      console.error("Error:", eventArgs);
    },
  },
  {
    eventName: "ready",
    callback: ({ chartWrapper }) => {
      console.log("Chart ready:", chartWrapper);
    },
  },
];

export function App() {
  return (
    <Chart
      chartType="ScatterChart"
      width="100%"
      height="100%"
      data={data}
      chartEvents={chartEvents}
      options={{
        legend: { position: "bottom" },
      }}
    />
  );
}
