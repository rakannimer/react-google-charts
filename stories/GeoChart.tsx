import React from "react";
import { Chart } from "../src";
import * as geoChartData from "../sandboxes/geo-chart/App";

export default {
  title: "GeoChart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "GeoChart",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: geoChartData.data,
};
