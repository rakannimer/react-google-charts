import React from "react";
import { Chart } from "../src";
import * as lineData from "../sandboxes/line/App";

export default {
  title: "Line",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Line",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: lineData.data,
  options: lineData.options,
};
