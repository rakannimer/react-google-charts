import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Table", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Table", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Table"
          data={[
            [
              { type: "string", label: "Name" },
              { type: "number", label: "Salary" },
              { type: "boolean", label: "Full Time Employee" },
            ],
            ["Mike", { v: 10000, f: "$10,000" }, true],
            ["Jim", { v: 8000, f: "$8,000" }, false],
            ["Alice", { v: 12500, f: "$12,500" }, true],
            ["Bob", { v: 7000, f: "$7,000" }, true],
          ]}
          options={{
            showRowNumber: true,
          }}
          rootProps={{ "data-testid": "1" }}
        />
      );

      await waitFor(() => expect(getByTestId("1")).toContainHTML("table"), {
        timeout: 5000,
      });

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("table")).toBeVisible();
    });

    it("should draw Table with formatters", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Table"
          data={[
            ["Department", "Revenues Change"],
            ["Shoes", { v: 12, f: "12.0%" }],
            ["Sports", { v: -7.3, f: "-7.3%" }],
            ["Toys", { v: 0, f: "0%" }],
            ["Electronics", { v: -2.1, f: "-2.1%" }],
            ["Food", { v: 22, f: "22.0%" }],
          ]}
          formatters={[
            {
              type: "ArrowFormat",
              column: 1,
            },
          ]}
          options={{
            allowHtml: true,
            showRowNumber: true,
          }}
          rootProps={{ "data-testid": "1" }}
        />
      );

      await waitFor(() => expect(getByTestId("1")).toContainHTML("table"), {
        timeout: 5000,
      });

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("table")).toBeVisible();
    });
  });
});
