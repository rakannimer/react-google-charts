import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Name", "Email"],
  ["John Lennon", "john@beatles.co.uk"],
  ["Paul McCartney", "paul@beatles.co.uk"],
  ["George Harrison", "george@beatles.co.uk"],
  ["Ringo Starr", "ringo@beatles.co.uk"],
];

export const options = {
  allowHtml: true,
  showRowNumber: true,
};

export const formatters = [
  {
    type: "PatternFormat" as const,
    column: [0, 1],
    options: '<a href="mailto:{1}">{0}</a>',
  },
];

export function App() {
  return (
    <Chart
      chartType="Table"
      width="100%"
      height="400px"
      data={data}
      options={options}
      formatters={formatters}
    />
  );
}
