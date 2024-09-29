import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Histogram", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Histogram", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Histogram"
          data={[
            ["Dinosaur", "Length"],
            ["Acrocanthosaurus (top-spined lizard)", 12.2],
            ["Albertosaurus (Alberta lizard)", 9.1],
            ["Allosaurus (other lizard)", 12.2],
          ]}
          options={{
            title: "Lengths of dinosaurs, in meters",
            legend: { position: "none" },
          }}
          rootProps={{ "data-testid": "1" }}
        />,
      );

      await screen.findByTestId("1");

      const root = getByTestId("1");

      expect(root).toBeVisible();
      expect(root.querySelector("svg")).toBeVisible();
    });
  });
});
