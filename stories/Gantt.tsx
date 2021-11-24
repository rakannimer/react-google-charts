import React from "react";
import { Chart } from "../src";
import * as ganttData from "../sandboxes/gantt/App";

export default {
  title: "Gantt",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Gantt",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: ganttData.data,
};
