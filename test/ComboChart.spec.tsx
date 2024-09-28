import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("ComboChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw ComboChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="ComboChart"
          data={[
            [
              "Month",
              "Bolivia",
              "Ecuador",
              "Madagascar",
              "Papua New Guinea",
              "Rwanda",
              "Average",
            ],
            ["2007/08", 139, 1110, 615, 968, 215, 609.4],
            ["2008/09", 136, 691, 629, 1026, 366, 569.6],
          ]}
          options={{
            title: "Monthly Coffee Production by Country",
            vAxis: { title: "Cups" },
            hAxis: { title: "Month" },
            seriesType: "bars",
            series: { 5: { type: "line" } },
          }}
          rootProps={{ "data-testid": "1" }}
        />
      );

      await screen.findByTestId("1");

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("svg")).toBeVisible();
    });
  });
});
