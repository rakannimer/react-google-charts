import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("LineChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw LineChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="LineChart"
          data={[
            ["x", "dogs"],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
          ]}
          options={{
            hAxis: {
              title: "Time",
            },
            vAxis: {
              title: "Popularity",
            },
          }}
          rootProps={{ "data-testid": "1" }}
        />,
      );

      await screen.findByTestId("1");

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("svg")).toBeVisible();
    });

    it("should draw LineChart with intervals", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="LineChart"
          data={[
            [
              { type: "number", label: "x" },
              { type: "number", label: "values" },
              { id: "i0", type: "number", role: "interval" },
              { id: "i1", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
              { id: "i2", type: "number", role: "interval" },
            ],
            [1, 100, 90, 110, 85, 96, 104, 120],
            [2, 120, 95, 130, 90, 113, 124, 140],
            [3, 130, 105, 140, 100, 117, 133, 139],
            [4, 90, 85, 95, 85, 88, 92, 95],
          ]}
          options={{
            title: "Line intervals, default",
            curveType: "function",
            lineWidth: 4,
            intervals: { style: "line" },
            legend: "none",
          }}
          rootProps={{ "data-testid": "1" }}
        />,
      );

      await screen.findByTestId("1");

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("svg")).toBeVisible();
    });
  });
});
