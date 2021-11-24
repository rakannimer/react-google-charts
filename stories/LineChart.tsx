import React from "react";
import { Chart } from "../src";
import * as lineChartData from "../sandboxes/line-chart/App";
import * as lineChartDataIntervals from "../sandboxes/line-chart-intervals/App";

export default {
  title: "LineChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "LineChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: lineChartData.data,
  options: lineChartData.options,
};

export function Intervals(args) {
  return <Chart {...args} />;
}

Intervals.args = {
  data: lineChartDataIntervals.data,
  options: lineChartDataIntervals.options,
};
