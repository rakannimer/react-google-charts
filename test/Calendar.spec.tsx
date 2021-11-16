import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  describe("Calendar", () => {
    afterEach(() => {
      cleanup();
    });

    it("should draw Calendar", async () => {
      const { getByTestId } = render(
        <Chart
          chartType="Calendar"
          data={[
            [
              { type: "date", id: "Date" },
              { type: "number", id: "Won/Loss" },
            ],
            [new Date(2012, 3, 13), 37032],
          ]}
          options={{
            title: "Red Sox Attendance",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      );

      await waitFor(() => getByTestId("1"), {
        timeout: 5000,
      });

      const root = getByTestId("1");

      expect(root).toBeVisible();
    });
  });
});
