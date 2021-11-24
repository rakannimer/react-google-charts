import React from "react";
import { Chart } from "../src";
import * as barChartData from "../sandboxes/bar-chart/App";

export default {
  title: "BarChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "BarChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: barChartData.data,
  options: barChartData.options,
};
