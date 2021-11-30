import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import faker from "faker";

function getData() {
  return [
    ["Age", "Weight"],
    ...Array.from({ length: 16 }, () => [
      faker.datatype.number({ min: 1, max: 100 }),
      faker.datatype.number({ min: 1, max: 100 }),
    ]),
  ];
}

export const options = {
  colors: ["#8e0152", "#276419"],
  pointSize: 10,
  animation: {
    duration: 1000,
    easing: "out",
    startup: true,
  },
  vAxis: {
    viewWindow: {
      max: -10,
      min: 100,
    },
  },
  hAxis: {
    viewWindow: {
      max: 100,
      min: -10,
    },
  },
  legend: { position: "none" },
  enableInteractivity: false,
};

export function App() {
  const [chartData, setChartData] = useState(getData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData(getData());
    }, 900);

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
