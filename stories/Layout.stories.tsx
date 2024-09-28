import React from "react";
import { Chart } from "../src";
import * as histogramData from "../sandboxes/histogram/default/App";

export default {
  title: "Layout and Controls",
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
  return (
    <Chart
      width={"100%"}
      height={"100%"}
      loader={<div>Loading Chart</div>}
      data={[
        ["Name", "Age"],
        ["Michael", 12],
        ["Elisa", 20],
        ["Robert", 7],
        ["John", 54],
        ["Jessica", 22],
        ["Aaron", 3],
        ["Margareth", 42],
        ["Miranda", 33],
      ]}
      rootProps={{ "data-testid": "6" }}
      chartPackages={["corechart", "controls"]}
      render={({ renderControl, renderChart }) => {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              {renderControl(() => true)}
            </div>
            <div style={{ width: "100%" }}>{renderChart()}</div>
          </div>
        );
      }}
      controls={[
        {
          controlType: "StringFilter",
          options: {
            filterColumnIndex: 0,
            matchType: "any", // 'prefix' | 'exact',
            ui: {
              label: "Search by name",
            },
          },
        },
        {
          controlType: "NumberRangeFilter",
          controlID: "age-filter",
          options: {
            filterColumnIndex: 1,
            ui: {
              labelStacking: "vertical",
              label: "Age Selection:",
              allowTyping: false,
              allowMultiple: false,
            },
          },
          controlEvents: [
            {
              eventName: "statechange",
              callback: ({
                chartWrapper,
                controlWrapper,
                eventArgs,
                google,
                props,
              }) => {
                console.log("statechange", eventArgs);
              },
            },
            {
              eventName: "ready",
              callback: ({
                chartWrapper,
                controlWrapper,
                eventArgs,
                google,
                props,
              }) => {
                console.log("ready", eventArgs);
              },
            },
          ],
        },
      ]}
      {...args}
    />
  );
}

Default.args = {
  data: histogramData.data,
  options: histogramData.options,
};
