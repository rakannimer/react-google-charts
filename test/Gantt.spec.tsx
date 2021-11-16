import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Gantt", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Gantt", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Gantt"
          data={[
            [
              { type: "string", label: "Task ID" },
              { type: "string", label: "Task Name" },
              { type: "date", label: "Start Date" },
              { type: "date", label: "End Date" },
              { type: "number", label: "Duration" },
              { type: "number", label: "Percent Complete" },
              { type: "string", label: "Dependencies" },
            ],
            [
              "Research",
              "Find sources",
              new Date(2015, 0, 1),
              new Date(2015, 0, 5),
              null,
              100,
              null,
            ],
            [
              "Write",
              "Write paper",
              null,
              new Date(2015, 0, 9),
              3 * 24 * 60 * 60 * 1000,
              25,
              "Research,Outline",
            ],
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
