import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("SteppedAreaChart", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw SteppedAreaChart", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="SteppedAreaChart"
          data={[
            ["Director (Year)", "Rotten Tomatoes", "IMDB"],
            ["Alfred Hitchcock (1935)", 8.4, 7.9],
            ["Ralph Thomas (1959)", 6.9, 6.5],
            ["Don Sharp (1978)", 6.5, 6.4],
            ["James Hawes (2008)", 4.4, 6.2],
          ]}
          options={{
            title: "The decline of 'The 39 Steps'",
            vAxis: { title: "Accumulated Rating" },
            isStacked: true,
          }}
          rootProps={{ "data-testid": "1" }}
        />
      );

      await screen.findByTestId("1");

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("svg")).toBeVisible();
    });
  });
});
