import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("GeoChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw GeoChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="GeoChart"
          data={[
            ["Country", "Popularity"],
            ["Germany", 200],
            ["United States", 300],
            ["RU", 700],
          ]}
          rootProps={{ "data-testid": "1" }}
        />,
      );

      await waitFor(() => expect(getByTestId("1")).toContainHTML("svg"), {
        timeout: 5000,
      });

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("svg")).toBeVisible();
    });
  });
});
