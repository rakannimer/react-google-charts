import React from "react";
import { Chart } from "../src";
import * as scatterChartData from "../sandboxes/scatter-chart/App";
import * as scatterChartDataDiff from "../sandboxes/scatter-chart-diff/App";

export default {
  title: "ScatterChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "ScatterChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: scatterChartData.data,
  options: scatterChartData.options,
};

export function Diff(args) {
  return <Chart {...args} />;
}

Diff.args = {
  diffdata: scatterChartDataDiff.diffdata,
};
