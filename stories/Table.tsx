import React from "react";
import { Chart } from "../src";
import * as tableData from "../sandboxes/table/App";

export default {
  title: "Table",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Table",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: tableData.data,
  options: tableData.options,
};
