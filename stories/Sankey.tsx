import React from "react";
import { Chart } from "../src";
import * as sankeyData from "../sandboxes/sankey/App";

export default {
  title: "Sankey",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Sankey",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: sankeyData.data,
  options: sankeyData.options,
};
