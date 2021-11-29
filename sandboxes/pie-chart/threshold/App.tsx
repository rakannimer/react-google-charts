import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Pizza", "Popularity"],
  ["Pepperoni", 33],
  ["Hawaiian", 26],
  ["Mushroom", 22],
  ["Sausage", 10], // Below limit.
  ["Anchovies", 9], // Below limit.
];

export const options = {
  title: "Popularity of Types of Pizza",
  sliceVisibilityThreshold: 0.2, // 20%
};

export function App() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
