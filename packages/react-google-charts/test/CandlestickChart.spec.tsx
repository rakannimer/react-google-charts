import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("CandlestickChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw CandlestickChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="CandlestickChart"
          data={[
            ["day", "a", "b", "c", "d"],
            ["Mon", 20, 28, 38, 45],
            ["Tue", 31, 38, 55, 66],
            ["Wed", 50, 55, 77, 80],
            ["Thu", 50, 77, 66, 77],
            ["Fri", 15, 66, 22, 68],
          ]}
          options={{
            legend: "none",
          }}
          rootProps={{ "data-testid": "1" }}
        />,
      );

      await screen.findAllByTestId("1");

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("svg")).toBeVisible();
    });
  });
});
