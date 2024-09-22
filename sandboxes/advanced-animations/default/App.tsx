import React, { useEffect, useState } from "react";
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
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
  animation: {
    duration: 1000,
    easing: "out",
  },
  vAxis: {
    viewWindow: {
      max: 100,
      min: 0,
    },
  },
  hAxis: {
    viewWindow: {
      max: 100,
      min: 0,
    },
  },
};

export function App() {
  const [chartData, setChartData] = useState(getData);
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData(getData());
      setYear((y) => y - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [setChartData]);
  return (
    <>
      <Chart
        chartType="ScatterChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
      <div style={{ width: "100%", textAlign: "center" }}>{year}</div>
    </>
  );
}
