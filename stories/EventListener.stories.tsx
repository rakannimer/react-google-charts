import React from "react";
import { Chart } from "../src";
import * as lineChartData from "../sandboxes/line-chart/default/App";

export default {
  title: "Event Listener",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "LineChart",
    width: 800,
    height: 600,
    data: lineChartData.data,
    legendToggle: true,
    chartEvents: [
      {
        eventName: "select",
        callback: ({ chartWrapper, props, google, eventArgs }) => {
          const selection = chartWrapper.getChart().getSelection();
          console.log("Event 'select' received", { selection });
        },
      },
      {
        eventName: "ready",
        callback: ({ chartWrapper, props, google, eventArgs }) => {
          console.log("Event 'ready' received", {
            chartWrapper,
            google,
          });
        },
      },
      {
        eventName: "error",
        callback: ({ chartWrapper, props, google, eventArgs }) => {
          console.log("Event 'ready' received", eventArgs);
        },
      },
    ],
  },
};

export function Default(args) {
  return (
    <>
      Check the console to see the event listener in action
      <Chart {...args} />
    </>
  );
}

Default.args = {
  data: lineChartData.data,
  options: lineChartData.options,
};
