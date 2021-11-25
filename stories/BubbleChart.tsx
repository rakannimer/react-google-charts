import React from "react";
import { Chart } from "../src";
import * as bubbleChartData from "../sandboxes/bubble-chart/App";

export default {
  title: "BubbleChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "BubbleChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: bubbleChartData.data,
  options: bubbleChartData.options,
};
