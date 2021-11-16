import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Sankey", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Sankey", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Sankey"
          data={[
            ["From", "To", "Weight"],
            ["A", "X", 5],
            ["A", "Y", 7],
            ["A", "Z", 6],
            ["B", "X", 2],
            ["B", "Y", 9],
            ["B", "Z", 4],
          ]}
          rootProps={{ "data-testid": "1" }}
        />
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
