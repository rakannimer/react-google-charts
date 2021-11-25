import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function getRandomNumber() {
  return Math.random() * 100;
}

export function getData() {
  return [
    ["Label", "Value"],
    ["Memory", getRandomNumber()],
    ["CPU", getRandomNumber()],
    ["Network", getRandomNumber()],
  ];
}

export const options = {
  width: 400,
  height: 120,
  redFrom: 90,
  redTo: 100,
  yellowFrom: 75,
  yellowTo: 90,
  minorTicks: 5,
};

export function App() {
  const [data, setData] = useState(getData);

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <Chart
      chartType="Gauge"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
