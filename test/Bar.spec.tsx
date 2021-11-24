import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Bar", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Bar", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Bar"
          data={[
            ["Year", "Sales", "Expenses", "Profit"],
            ["2016", 660, 1120, 300],
            ["2017", 1030, 540, 350],
          ]}
          options={{
            chart: {
              title: "Company Performance",
              subtitle: "Sales, Expenses, and Profit: 2014-2017",
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
