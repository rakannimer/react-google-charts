import React from "react";
import { Chart } from "../src";
import * as barData from "../sandboxes/bar/App";

export default {
  title: "Bar",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Bar",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: barData.data,
  options: barData.options,
};
