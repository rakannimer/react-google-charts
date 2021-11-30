import React from "react";
import { Chart } from "react-google-charts";

export function App() {
  return (
    <Chart
      chartType="ScatterChart"
      spreadSheetUrl="https://docs.google.com/spreadsheets/d/1jN0iw0usssnsG1_oi-NXtuKfsUsGme09GsFidbqxFYA/edit#gid=0"
      options={{
        hAxis: {
          format: "short",
        },
        vAxis: {
          format: "decimal",
        },
      }}
    />
  );
}
