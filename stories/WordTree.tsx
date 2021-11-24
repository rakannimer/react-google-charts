import React from "react";
import { Chart } from "../src";
import * as wordTreeData from "../sandboxes/word-tree/App";

export default {
  title: "WordTree",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "WordTree",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: wordTreeData.data,
  options: wordTreeData.options,
};
