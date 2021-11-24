import React from "react";
import { Chart } from "../src";
import * as calendarData from "../sandboxes/calendar/App";

export default {
  title: "Calendar",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "Calendar",
    width: 800,
    height: 600,
  },
};

export function Default(args) {
  return <Chart {...args} />;
}

Default.args = {
  data: calendarData.data,
  options: calendarData.options,
};
