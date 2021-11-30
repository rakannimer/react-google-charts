import React from "react";
import { Chart } from "react-google-charts";

export function App() {
  return (
    <Chart
      width={300}
      height={300}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Name", "Gender", "Age", "Donuts eaten"],
        ["Michael", "Male", 12, 5],
        ["Elisa", "Female", 20, 7],
        ["Robert", "Male", 7, 3],
        ["John", "Male", 54, 2],
        ["Jessica", "Female", 22, 6],
        ["Aaron", "Male", 3, 1],
        ["Margareth", "Female", 42, 8],
        ["Laurie", "NonBinary", 32, 1],
      ]}
      options={{
        legend: "none",
        chartArea: { left: 15, top: 15, right: 0, bottom: 0 },
        pieSliceText: "label",
      }}
      rootProps={{ "data-testid": "1" }}
      chartWrapperParams={{ view: { columns: [0, 3] } }}
      chartPackages={["corechart", "controls"]}
      render={({ renderControl, renderChart }) => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", paddingTop: 10 }}>
              <div
                style={{
                  height: 100,
                  border: "solid 1px #ccc",
                  padding: 20,
                  marginTop: 10,
                }}
              >
                {renderControl(
                  ({ controlProp }) => controlProp.controlID === "select-age"
                )}
              </div>
              <div
                style={{
                  height: 100,
                  border: "solid 1px #ccc",
                  padding: 20,
                  marginTop: 10,
                }}
              >
                {renderControl(
                  ({ controlProp }) => controlProp.controlID === "select-gender"
                )}
              </div>
            </div>
            <div style={{ width: "50%" }}>{renderChart()}</div>
          </div>
        );
      }}
      controls={[
        {
          controlType: "CategoryFilter",
          controlID: "select-gender",
          options: {
            filterColumnIndex: 1,
            ui: {
              labelStacking: "horizontal", // | "vertical"
              label: "Filter By Gender",
              allowTyping: false,
              allowMultiple: false,
            },
          },
        },
        {
          controlType: "NumberRangeFilter",
          controlID: "select-age",
          options: {
            ui: {
              label: "Filter By Age",
            },
            filterColumnIndex: 2,
            minValue: 0,
            maxValue: 60,
          },
        },
      ]}
    />
  );
}
