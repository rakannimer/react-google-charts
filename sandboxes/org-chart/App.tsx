import React from "react";
import { Chart } from "react-google-charts";

export function App() {
  return (
    <Chart
      chartType="OrgChart"
      data={[
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
      ]}
      options={{
        allowHtml: true,
      }}
      width="100%"
      height="400px"
    />
  );
}
