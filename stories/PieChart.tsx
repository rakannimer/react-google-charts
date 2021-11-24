import React from "react";
import { Chart } from "../src";
import * as pieChartData from "../sandboxes/pie-chart/App";

export default {
  title: "PieChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "PieChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: pieChartData.data,
  options: pieChartData.options,
};
