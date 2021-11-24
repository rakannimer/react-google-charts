import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("ColumnChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw ColumnChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="ColumnChart"
          data={[
            ["Element", "Density", { role: "style" }],
            ["Copper", 8.94, "#b87333"],
            ["Silver", 10.49, "silver"],
            ["Gold", 19.3, "gold"],
          ]}
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

  it("should draw ScatterChart with diff", async () => {
    const { getByTestId } = render(
      <Chart
        chartType="ColumnChart"
        diffdata={{
          old: [
            ["Name", "Popularity"],
            ["Cesar", 250],
            ["Rachel", 4200],
            ["Patrick", 2900],
            ["Eric", 8200],
          ],
          new: [
            ["Name", "Popularity"],
            ["Cesar", 370],
            ["Rachel", 600],
            ["Patrick", 700],
            ["Eric", 1500],
          ],
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
