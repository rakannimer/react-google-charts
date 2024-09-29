import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export function getData() {
  return [
    ["Label", "Value"],
    ["Memory", 24],
    ["CPU", 51],
    ["Network", 90],
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
      height="100%"
      data={data}
      options={options}
    />
  );
}
