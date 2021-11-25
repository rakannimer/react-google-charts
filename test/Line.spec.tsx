import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Line", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Line", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Line"
          data={[
            [
              "Day",
              "Guardians of the Galaxy",
              "The Avengers",
              "Transformers: Age of Extinction",
            ],
            [1, 37.8, 80.8, 41.8],
            [2, 30.9, 69.5, 32.4],
          ]}
          options={{
            chart: {
              title: "Box Office Earnings in First Two Weeks of Opening",
              subtitle: "in millions of dollars (USD)",
            },
          }}
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
