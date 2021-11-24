import React from "react";
import { Chart } from "../src";
import * as histogramData from "../sandboxes/histogram/App";

export default {
  title: "Histogram",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Histogram",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: histogramData.data,
  options: histogramData.options,
};
