import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("OrgChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw OrgChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="OrgChart"
          data={[
            ["Name", "Manager", "ToolTip"],
            [
              {
                v: "Mike",
                f: 'Mike<div style="color:red; font-style:italic">President</div>',
              },
              "",
              "The President",
            ],
            [
              {
                v: "Jim",
                f: 'Jim<div style="color:red; font-style:italic">Vice President</div>',
              },
              "Mike",
              "VP",
            ],
            ["Alice", "Mike", ""],
            ["Bob", "Jim", "Bob Sponge"],
            ["Carol", "Bob", ""],
          ]}
          options={{
            allowHtml: true,
          }}
          rootProps={{ "data-testid": "1" }}
        />,
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
