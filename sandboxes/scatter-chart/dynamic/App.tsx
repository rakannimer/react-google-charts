import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["x", "y"],
  [0, 0],
  [4, 0],
  [3.510330247561491, 1.917702154416812],
  [2.161209223472559, 3.365883939231586],
  [0.2829488066708116, 3.989979946416218],
  [-1.6645873461885696, 3.637189707302727],
  [-3.204574462187735, 2.3938885764158258],
  [-3.9599699864017817, 0.5644800322394689],
  [-3.7458267491631854, -1.4031329107584793],
  [-2.6145744834544478, -3.027209981231713],
  [-0.8431831977231188, -3.910120470660388],
  [1.134648741852905, -3.835697098652554],
  [2.83467909716504, -2.8221613022815677],
  [3.8406811466014643, -1.1176619927957034],
];

export const options = {
  legend: "none",
  // Changing shape and color
  colors: ["#087037"],
  pointShape: "star",
  pointSize: 18,
  // Animation
  animation: {
    duration: 1000,
    easing: "inAndOut",
  },
};

export function App() {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextData = [...data];

      nextData[1] = [Math.random(), Math.random()];

      setChartData(nextData);
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <Chart
      chartType="ScatterChart"
      width="80%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
}
