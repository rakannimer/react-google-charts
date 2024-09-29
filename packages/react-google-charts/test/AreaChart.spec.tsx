import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("AreaChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw AreaChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="AreaChart"
          data={[
            ["Year", "Sales", "Expenses"],
            ["2015", 660, 1120],
            ["2016", 1030, 540],
          ]}
          options={{
            title: "Company Performance",
            hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0 },
            chartArea: { width: "50%", height: "70%" },
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
