import React from "react";
import { Chart } from "react-google-charts";

export function App() {
  return (
    <Chart
      chartType="ColumnChart"
      spreadSheetUrl="https://docs.google.com/spreadsheets/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE"
      spreadSheetQueryParameters={{
        headers: 1,
        query: "SELECT A, H, O, Q, R, U LIMIT 5 OFFSET 8",
      }}
      options={{
        vAxis: {
          format: "long",
        },
      }}
    />
  );
}
