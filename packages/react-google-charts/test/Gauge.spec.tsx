import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Gauge", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Gauge", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Gauge"
          data={[
            ["Label", "Value"],
            ["Memory", 256],
            ["CPU", 50],
            ["Network", 100],
          ]}
          options={{
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 5,
          }}
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
