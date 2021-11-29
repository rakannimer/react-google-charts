import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Hours Studied", "Final"],
  [0, 67],
  [1, 88],
  [2, 77],
  [3, 93],
  [4, 85],
  [5, 91],
  [6, 71],
  [7, 78],
  [8, 93],
  [9, 80],
  [10, 82],
  [0, 75],
  [5, 80],
  [3, 90],
  [1, 72],
  [5, 75],
  [6, 68],
  [7, 98],
  [3, 82],
  [9, 94],
  [2, 79],
  [2, 95],
  [2, 86],
  [3, 67],
  [4, 60],
  [2, 80],
  [6, 92],
  [2, 81],
  [8, 79],
  [9, 83],
  [3, 75],
  [1, 80],
  [3, 71],
  [3, 89],
  [4, 92],
  [5, 85],
  [6, 92],
  [7, 78],
  [6, 95],
  [3, 81],
  [0, 64],
  [4, 85],
  [2, 83],
  [3, 96],
  [4, 77],
  [5, 89],
  [4, 89],
  [7, 84],
  [4, 92],
  [9, 98],
];

export const options = {
  // Material design options
  chart: {
    title: "Students' Final Grades",
    subtitle: "based on hours studied",
  },
  hAxis: { title: "Hours Studied" },
  vAxis: { title: "Grade" },
};

export function App() {
  return (
    <Chart
      chartType="Scatter"
      width="80%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
