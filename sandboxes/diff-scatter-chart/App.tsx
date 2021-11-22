import React from "react";
import { Chart } from "react-google-charts";
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram

export const datasetOld = [
  ["x", "y"],
  [1, 1000],
  [2, 1170],
  [3, 660],
  [4, 1030],
];

export const datasetNew = [
  ["x", "y"],
  [1.1, 1100],
  [2.1, 1000],
  [2.8, 960],
  [4.4, 1300],
];

export function App() {
  return (
    <Chart
      chartType="ScatterChart"
      width="100%"
      height="400px"
      diffdata={{ old: datasetOld, new: datasetNew }}
    />
  );
}
