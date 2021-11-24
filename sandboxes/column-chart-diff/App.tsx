import React from "react";
import { Chart } from "react-google-charts";

const dataOld = [
  ["Name", "Popularity"],
  ["Cesar", 250],
  ["Rachel", 4200],
  ["Patrick", 2900],
  ["Eric", 8200],
];

const dataNew = [
  ["Name", "Popularity"],
  ["Cesar", 370],
  ["Rachel", 600],
  ["Patrick", 700],
  ["Eric", 1500],
];

export const diffdata = {
  old: dataOld,
  new: dataNew,
};

export function App() {
  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      diffdata={diffdata}
    />
  );
}
