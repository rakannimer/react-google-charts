import React from "react";
import { Chart } from "react-google-charts";
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram

export const datasetOld = [
  ["Name", "Popularity"],
  ["Cesar", 250],
  ["Rachel", 4200],
  ["Patrick", 2900],
  ["Eric", 8200],
];

export const datasetNew = [
  ["Name", "Popularity"],
  ["Cesar", 370],
  ["Rachel", 600],
  ["Patrick", 700],
  ["Eric", 1500],
];

export function App() {
  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      diffdata={{ old: datasetOld, new: datasetNew }}
    />
  );
}
