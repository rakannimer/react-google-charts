import React from "react";
import { Chart } from "../src";
import * as timelineData from "../sandboxes/timeline/App";

export default {
  title: "Timeline",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Timeline",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: timelineData.data,
};
