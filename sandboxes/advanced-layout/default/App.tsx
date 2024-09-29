import React from "react";
import { Chart } from "react-google-charts";

export function App() {
  return (
    <Chart
      width={"100%"}
      height={"100%"}
      chartType="BarChart"
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
      options={{
        legend: { position: "bottom" },
      }}
      rootProps={{ "data-testid": "6" }}
      chartPackages={["corechart", "controls"]}
      render={({ renderControl, renderChart }) => {
        return (
          <div
            style={{ display: "flex", height: "100%", flexDirection: "column" }}
          >
            <div>{renderControl(() => true)}</div>
            <div>{renderChart()}</div>
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
        },
      ]}
    />
  );
}
