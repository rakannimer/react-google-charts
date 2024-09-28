import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("BubbleChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw BubbleChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="BubbleChart"
          data={[
            ["ID", "Life Expectancy", "Fertility Rate", "Region", "Population"],
            ["CAN", 80.66, 1.67, "North America", 33739900],
            ["DEU", 79.84, 1.36, "Europe", 81902307],
            ["DNK", 78.6, 1.84, "Europe", 5523095],
          ]}
          options={{
            title:
              "Correlation between life expectancy, fertility rate " +
              "and population of some world countries (2010)",
            hAxis: { title: "Life Expectancy" },
            vAxis: { title: "Fertility Rate" },
            bubble: { textStyle: { fontSize: 11 } },
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
