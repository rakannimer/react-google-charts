import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("PieChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw PieChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="PieChart"
          data={[
            ["Task", "Hours per Day"],
            ["Work", 11],
            ["Eat", 2],
            ["Commute", 2],
            ["Watch TV", 2],
            ["Sleep", 7],
          ]}
          options={{
            title: "My Daily Activities",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      );

      await waitFor(() => getByTestId("1"), {
        timeout: 5000,
      });

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("svg")).toBeVisible();
    });
  });
});
