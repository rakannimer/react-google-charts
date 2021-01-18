import React from "react";
import { Chart } from "../src";
import * as lineChartData from "../sandboxes/line-chart/default/App";

export default {
  title: "Legend Toggle",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "LineChart",
    width: 800,
    height: 600,
    data: lineChartData.data,
    legend_toggle: true,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: lineChartData.data,
  options: lineChartData.options,
};
