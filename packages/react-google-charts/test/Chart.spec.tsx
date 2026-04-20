import React from "react";
import { render, cleanup, waitFor, screen } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render loader", async () => {
    const { getByText } = render(
      <Chart chartType="AreaChart" loader={<div>Loading Chart</div>} />,
    );

    expect(getByText("Loading Chart")).toBeVisible();
  });

  it("should render errorElement", async () => {
    const { findByText } = render(
      <Chart
        chartType="AreaChart"
        chartLoaderScriptUrl="http://0.0.0.0/invalid-errorElement.js"
        errorElement={<div>Don't Panic</div>} />,
    );

    expect(await findByText("Don't Panic")).toBeVisible();

  });

  it("should render loader then errorElement", async () => {
    const { getByText, queryByText, findByText } = render(
      <Chart
        chartType="AreaChart"
        chartLoaderScriptUrl="http://0.0.0.0/invalid-loader-errorElement.js"
        loader={<div>Loading Chart</div>}
        errorElement={<div>Don't Panic</div>} />,
    );

    expect(getByText("Loading Chart")).toBeVisible();
    expect(queryByText("Don't Panic")).toBeNull();

    expect(await findByText("Don't Panic")).toBeVisible();
    expect(queryByText("Loading Chart")).toBeNull();
  });

  it("should draw chart", async () => {
    const { getByTestId } = render(
      <Chart
        chartType="AreaChart"
        data={[
          ["Year", "Sales", "Expenses"],
          ["2015", 660, 1120],
          ["2016", 1030, 540],
        ]}
        rootProps={{ "data-testid": "1" }}
      />,
    );

    await screen.findByTestId("1");

    const root = getByTestId("1");

    expect(root).toBeVisible();
    expect(root.querySelector("svg")).toBeVisible();
  });

  it("should set size from props", async () => {
    const { getByTestId } = render(
      <Chart
        width="456px"
        height="345px"
        chartType="AreaChart"
        rootProps={{ "data-testid": "1" }}
      />,
    );

    await screen.findByTestId("1");

    const root = getByTestId("1");

    expect(root.style.width).toBe("456px");
    expect(root.style.height).toBe("345px");

    const container = root.parentElement;

    expect(container?.style.width).toBe("456px");
    expect(container?.style.height).toBe("345px");
  });

  it("should call `onLoad` prop", async () => {
    const handleLoad = jest.fn().mockImplementationOnce((/* google */) => {});
    expect(handleLoad).not.toHaveBeenCalled();

    const { getByTestId } = render(
      <Chart
        chartType="AreaChart"
        rootProps={{ "data-testid": "1" }}
        onLoad={handleLoad}
      />,
    );
    await screen.findByTestId("1");

    expect(handleLoad).toHaveBeenCalled();
  });
});
