import React from "react";
import { Chart } from "../src";
import * as columnChartData from "../sandboxes/column-chart/App";
import * as columnChartDataDiff from "../sandboxes/column-chart-diff/App";

export default {
  title: "ColumnChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "ColumnChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: columnChartData.data,
};

export function Diff(args) {
  return <Chart {...args} />;
}

Diff.args = {
  diffdata: columnChartDataDiff.diffdata,
};
