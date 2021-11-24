import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    {
      v: "Mike",
      f: 'Mike<div style="color:red; font-style:italic">President</div>',
    },
    "",
    "The President",
  ],
  [
    {
      v: "Jim",
      f: 'Jim<div style="color:red; font-style:italic">Vice President</div>',
    },
    "Mike",
    "VP",
  ],
  ["Alice", "Mike", ""],
  ["Bob", "Jim", "Bob Sponge"],
  ["Carol", "Bob", ""],
];

export const options = {
  allowHtml: true,
};

export function App() {
  return (
    <Chart
      chartType="OrgChart"
      data={data}
      options={options}
      width="100%"
      height="400px"
    />
  );
}
