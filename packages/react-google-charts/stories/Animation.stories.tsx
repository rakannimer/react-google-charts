import React, { useEffect, useState } from "react";
import { Chart } from "../src";
import * as areaChartData from "../../../sandboxes/area-chart/default/App";

export default {
  title: "Animations",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "ScatterChart",
    width: 800,
    height: 600,
    legendToggle: true,
  },
};

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function getData() {
  return [
    ["Age", "Weight"],
    ...Array.from({ length: 16 }, () => [getRandomNumber(), getRandomNumber()]),
  ];
}

export function Default(args) {
  const [chartData, setChartData] = useState(getData);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }
    const intervalId = setInterval(() => {
      setChartData(getData());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [setChartData, shouldAnimate]);
  const options = args.options;
  return (
    <>
      <button onClick={() => setShouldAnimate(!shouldAnimate)}>
        {shouldAnimate ? "Stop" : "Start"} Animating
      </button>
      <Chart {...args} data={chartData} />
    </>
  );
}

Default.args = {
  data: areaChartData.data,
  options: {
    title: "Company Performance",
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
  },
};
