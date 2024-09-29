import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("ScatterChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw ScatterChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="ScatterChart"
          data={[
            ["Age", "Weight"],
            [8, 12],
            [4, 5.5],
            [11, 14],
            [4, 5],
            [3, 3.5],
            [6.5, 7],
          ]}
          options={{
            title: "Age vs. Weight comparison",
            hAxis: { title: "Age", minValue: 0, maxValue: 15 },
            vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
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

    it("should draw ScatterChart with diff", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="ScatterChart"
          diffdata={{
            old: [
              ["", "Medicine 1", "Medicine 2"],
              [23, null, 12],
              [9, null, 39],
              [15, null, 28],
              [37, null, 30],
              [21, null, 14],
              [12, null, 18],
              [29, null, 34],
              [8, null, 12],
              [38, null, 28],
              [35, null, 12],
              [26, null, 10],
              [10, null, 29],
              [11, null, 10],
              [27, null, 38],
              [39, null, 17],
              [34, null, 20],
              [38, null, 5],
              [33, null, 27],
              [23, null, 39],
              [12, null, 10],
              [8, 15, null],
              [39, 15, null],
              [27, 31, null],
              [30, 24, null],
              [31, 39, null],
              [35, 6, null],
              [5, 5, null],
              [19, 39, null],
              [22, 8, null],
              [19, 23, null],
              [27, 20, null],
              [11, 6, null],
              [34, 33, null],
              [38, 8, null],
              [39, 29, null],
              [13, 23, null],
              [13, 36, null],
              [39, 6, null],
              [14, 37, null],
              [13, 39, null],
            ],
            new: [
              ["", "Medicine 1", "Medicine 2"],
              [22, null, 12],
              [7, null, 40],
              [14, null, 31],
              [37, null, 30],
              [18, null, 17],
              [9, null, 20],
              [26, null, 36],
              [5, null, 13],
              [36, null, 30],
              [35, null, 15],
              [24, null, 12],
              [7, null, 31],
              [10, null, 12],
              [24, null, 40],
              [37, null, 18],
              [32, null, 21],
              [35, null, 7],
              [31, null, 30],
              [21, null, 42],
              [12, null, 10],
              [10, 13, null],
              [40, 12, null],
              [28, 29, null],
              [32, 22, null],
              [31, 37, null],
              [38, 5, null],
              [6, 4, null],
              [21, 36, null],
              [22, 8, null],
              [21, 22, null],
              [28, 17, null],
              [12, 5, null],
              [37, 30, null],
              [41, 7, null],
              [41, 27, null],
              [15, 20, null],
              [14, 36, null],
              [42, 3, null],
              [14, 37, null],
              [15, 36, null],
            ],
          }}
          options={{
            hAxis: { viewWindow: { min: 0, max: 50 } },
            vAxis: { viewWindow: { min: 0, max: 50 } },
            theme: "maximized",
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
