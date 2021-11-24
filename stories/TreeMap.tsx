import React from "react";
import { Chart } from "../src";
import * as treeMapData from "../sandboxes/tree-map/App";

export default {
  title: "TreeMap",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "TreeMap",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: treeMapData.data,
  options: treeMapData.options,
};
