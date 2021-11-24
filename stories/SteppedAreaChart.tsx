import React from "react";
import { Chart } from "../src";
import * as steppedAreaChartData from "../sandboxes/stepped-area-chart/App";

export default {
  title: "SteppedAreaChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "SteppedAreaChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: steppedAreaChartData.data,
  options: steppedAreaChartData.options,
};
