import React from "react";
import { Chart } from "../src";
import * as candlestickChartData from "../sandboxes/candlestick-chart/App";

export default {
  title: "CandlestickChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "CandlestickChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: candlestickChartData.data,
  options: candlestickChartData.options,
};
