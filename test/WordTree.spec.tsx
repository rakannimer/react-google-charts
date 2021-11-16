import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("WordTree", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw WordTree", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="WordTree"
          data={[
            ["Phrases"],
            ["cats are better than dogs"],
            ["cats eat kibble"],
            ["cats are better than hamsters"],
            ["cats are awesome"],
            ["cats are people too"],
            ["cats eat mice"],
            ["cats meowing"],
            ["cats in the cradle"],
            ["cats eat mice"],
            ["cats in the cradle lyrics"],
            ["cats eat kibble"],
            ["cats for adoption"],
            ["cats are family"],
            ["cats eat mice"],
            ["cats are better than kittens"],
            ["cats are evil"],
            ["cats are weird"],
            ["cats eat mice"],
          ]}
          options={{
            wordtree: {
              format: "implicit",
              word: "cats",
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
