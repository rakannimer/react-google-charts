import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Timeline", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Timeline", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Timeline"
          data={[
            [
              { type: "string", id: "President" },
              { type: "date", id: "Start" },
              { type: "date", id: "End" },
            ],
            ["Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
            ["Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
            ["Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)],
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
