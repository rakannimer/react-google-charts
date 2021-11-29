import React from "react";
import { Chart } from "react-google-charts";

const dataOld = [
  ["Major", "Degrees"],
  ["Business", 256070],
  ["Education", 108034],
  ["Social Sciences &amp; History", 127101],
  ["Health", 81863],
  ["Psychology", 74194],
];

const dataNew = [
  ["Major", "Degrees"],
  ["Business", 358293],
  ["Education", 101265],
  ["Social Sciences &amp; History", 172780],
  ["Health", 129634],
  ["Psychology", 97216],
];

export const diffdata = {
  old: dataOld,
  new: dataNew,
};

export const options = {
  pieSliceText: "none",
};

export function App() {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      diffdata={diffdata}
      options={options}
    />
  );
}
