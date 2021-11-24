import React from "react";
import { Chart } from "../src";
import * as comboChartData from "../sandboxes/combo-chart/App";

export default {
  title: "ComboChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "ComboChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: comboChartData.data,
  options: comboChartData.options,
};
