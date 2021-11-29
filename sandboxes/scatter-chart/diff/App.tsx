import React from "react";
import { Chart } from "react-google-charts";

const dataOld = [
  ["x", "y"],
  [1, 1000],
  [2, 1170],
  [3, 660],
  [4, 1030],
];

const dataNew = [
  ["x", "y"],
  [1.1, 1100],
  [2.1, 1000],
  [2.8, 960],
  [4.4, 1300],
];

export const diffdata = {
  old: dataOld,
  new: dataNew,
};

export function App() {
  return (
    <Chart
      chartType="ScatterChart"
      width="100%"
      height="400px"
      diffdata={diffdata}
    />
  );
}
