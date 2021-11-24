import React from "react";
import { Chart } from "../src";
import * as gaugeData from "../sandboxes/gauge/App";

export default {
  title: "Gauge",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Gauge",
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: gaugeData.getData(),
  options: gaugeData.options,
};
