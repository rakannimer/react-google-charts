import React from "react";
import { Chart } from "../src";
import * as areaChartData from "../sandboxes/area-chart/App";

export default {
  title: "AreaChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "AreaChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: areaChartData.data,
  options: areaChartData.options,
};
