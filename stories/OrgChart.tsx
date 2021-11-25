import React from "react";
import { Chart } from "../src";
import * as orgChartData from "../sandboxes/org-chart/App";

export default {
  title: "OrgChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "OrgChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: orgChartData.data,
  options: orgChartData.options,
};
