import React from "react";
import { Chart } from "react-google-charts";

export function App() {
  return (
    <Chart
      chartType="ColumnChart"
      spreadSheetUrl="https://docs.google.com/spreadsheets/d/1jN0iw0usssnsG1_oi-NXtuKfsUsGme09GsFidbqxFYA"
      toolbarItems={[
        {
          type: "csv",
          datasource:
            "https://spreadsheets.google.com/tq?key=1jN0iw0usssnsG1_oi-NXtuKfsUsGme09GsFidbqxFYA",
        },
      ]}
    />
  );
}
