import React from "react";
import { render, cleanup, waitFor, act, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Chart,
  GoogleChartControl,
  GoogleChartWrapper,
  GoogleViz,
  ReactGoogleChartProps,
} from "../src";

const fireSelectEvent = ({
  google,
  chartWrapper,
}: {
  google: GoogleViz;
  chartWrapper: GoogleChartWrapper;
}) => {
  jest.spyOn(chartWrapper, "getChart").mockImplementation(() => ({
    removeAction: () => {},
    getSelection: () => [{ row: null, column: 1 }],
    setAction: () => {},
    getImageURI: () => {},
    clearChart: () => {},
  }));

  (google.visualization.events as any).trigger(chartWrapper, "select");
};

const fireStatechangeEvent = ({
  google,
  controlWrapper,
}: {
  google: GoogleViz;
  controlWrapper: GoogleChartControl;
}) => {
  (google.visualization.events as any).trigger(controlWrapper, "statechange");
};

describe("Event Listening", () => {
  afterEach(() => {
    cleanup();
  });

  it("toggles chart visibility on select event", async () => {
    let chartInstance!: { google: GoogleViz; chartWrapper: GoogleChartWrapper };

    const { container } = render(
      <Chart
        chartType="BarChart"
        data={[
          ["Year", "Value"],
          ["2024", 1000],
        ]}
        legendToggle
        chartEvents={[
          {
            eventName: "ready",
            callback: ({ google, chartWrapper }) => {
              chartInstance = { google, chartWrapper: chartWrapper! };
            },
          },
        ]}
      />,
    );

    await waitFor(() => expect(chartInstance).toBeTruthy(), {
      timeout: 5_000,
    });
    await waitFor(() =>
      expect(container.querySelector('rect[fill="#3366cc"]')).toBeVisible(),
    );

    act(() => fireSelectEvent(chartInstance));
    await waitFor(() =>
      expect(
        container.querySelector('rect[fill="#3366cc"]'),
      ).not.toBeInTheDocument(),
    );

    act(() => fireSelectEvent(chartInstance));
    await waitFor(() =>
      expect(container.querySelector('rect[fill="#3366cc"]')).toBeVisible(),
    );
  });

  it("should call `chartEvents` callback", async () => {
    const eventCallback = jest.fn();
    let chartInstance!: { google: GoogleViz; chartWrapper: GoogleChartWrapper };

    const props: ReactGoogleChartProps = {
      chartType: "BarChart",
      data: [
        ["Year", "Value"],
        ["2024", 1000],
      ],
      chartEvents: [
        {
          eventName: "ready",
          callback: ({ google, chartWrapper }) => {
            chartInstance = { google, chartWrapper: chartWrapper! };
            eventCallback("first rendering");
          },
        },
      ],
      rootProps: { "data-testid": "1" },
    };
    const { getByTestId, rerender } = render(<Chart {...props} />);
    await screen.findByTestId("1");
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("first rendering"),
    );

    eventCallback.mockClear();
    rerender(
      <Chart
        {...props}
        chartEvents={[
          {
            eventName: "select",
            callback: () => eventCallback("second rendering"),
          },
        ]}
      />,
    );

    act(() => fireSelectEvent(chartInstance));
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("second rendering"),
    );
  });

  it("should call `controlEvents` callback", async () => {
    const eventCallback = jest.fn();
    let chartInstance!: {
      google: GoogleViz;
      controlWrapper: GoogleChartControl;
    };

    const props: ReactGoogleChartProps = {
      chartType: "BarChart",
      data: [
        ["Year", "Value"],
        ["2024", 1000],
      ],
      controls: [
        {
          controlType: "StringFilter",
          options: { filterColumnIndex: 1 },
          controlEvents: [
            {
              eventName: "ready",
              callback: ({ google, controlWrapper }) => {
                chartInstance = { google, controlWrapper: controlWrapper! };
                eventCallback("first rendering");
              },
            },
          ],
        },
      ],
      rootProps: { "data-testid": "1" },
    };
    const { getByTestId, rerender, container } = render(<Chart {...props} />);

    await screen.findByTestId("1");
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("first rendering"),
    );

    eventCallback.mockClear();
    rerender(
      <Chart
        {...props}
        controls={[
          {
            controlType: "StringFilter",
            options: { filterColumnIndex: 1 },
            controlEvents: [
              {
                eventName: "statechange",
                callback: () => eventCallback("second rendering of alpha"),
              },
            ],
          },
        ]}
      />,
    );

    act(() => fireStatechangeEvent(chartInstance));
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("second rendering of alpha"),
    );
  });

  it("should call `chartEvents` callback for each individual component", async () => {
    const eventCallback = jest.fn();
    let chartInstance!: { google: GoogleViz; chartWrapper: GoogleChartWrapper };

    const alphaChartProps: ReactGoogleChartProps = {
      chartType: "BarChart",
      data: [
        ["Year", "Value"],
        ["2024", 1000],
      ],
      chartEvents: [
        {
          eventName: "ready",
          callback: ({ google, chartWrapper }) => {
            chartInstance = { google, chartWrapper: chartWrapper! };
            eventCallback("first rendering of alpha");
          },
        },
      ],
      rootProps: { "data-testid": "alphaChart" },
    };

    const betaChartProps: ReactGoogleChartProps = {
      ...alphaChartProps,
      chartEvents: [
        {
          eventName: "ready",
          callback: () => eventCallback("first rendering of beta"),
        },
      ],
      rootProps: { "data-testid": "betaChart" },
    };

    const { getByTestId, rerender } = render(
      <>
        <Chart {...alphaChartProps} />
        <Chart {...betaChartProps} />
      </>,
    );

    await screen.findByTestId("alphaChart");
    await screen.findByTestId("betaChart");
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("first rendering of alpha"),
    );
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("first rendering of beta"),
    );

    eventCallback.mockClear();
    rerender(
      <>
        <Chart
          {...alphaChartProps}
          chartEvents={[
            {
              eventName: "select",
              callback: () => eventCallback("second rendering of alpha"),
            },
          ]}
        />
      </>,
    );

    act(() => fireSelectEvent(chartInstance));
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("second rendering of alpha"),
    );
  });

  it("should call `controlEvents` callback for each individual component", async () => {
    const eventCallback = jest.fn();
    let chartInstance!: {
      google: GoogleViz;
      controlWrapper: GoogleChartControl;
    };

    const alphaChartProps: ReactGoogleChartProps = {
      chartType: "BarChart",
      data: [
        ["Year", "Value"],
        ["2024", 1000],
      ],
      controls: [
        {
          controlType: "StringFilter",
          options: { filterColumnIndex: 1 },
          controlEvents: [
            {
              eventName: "ready",
              callback: ({ google, controlWrapper }) => {
                chartInstance = { google, controlWrapper: controlWrapper! };
                eventCallback("first rendering of alpha");
              },
            },
          ],
        },
      ],
      rootProps: { "data-testid": "alphaChart" },
    };

    const betaChartProps: ReactGoogleChartProps = {
      ...alphaChartProps,
      controls: [
        {
          controlType: "StringFilter",
          options: { filterColumnIndex: 1 },
          controlEvents: [
            {
              eventName: "ready",
              callback: () => eventCallback("second rendering of alpha"),
            },
          ],
        },
      ],
      rootProps: { "data-testid": "betaChart" },
    };

    const { getByTestId, rerender } = render(
      <>
        <Chart {...alphaChartProps} />
        <Chart {...betaChartProps} />
      </>,
    );

    await screen.findByTestId("alphaChart");
    await screen.findByTestId("betaChart");
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("first rendering of alpha"),
    );
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("second rendering of alpha"),
    );

    eventCallback.mockReset();
    rerender(
      <>
        <Chart
          {...alphaChartProps}
          controls={[
            {
              controlType: "StringFilter",
              options: { filterColumnIndex: 1 },
              controlEvents: [
                {
                  eventName: "statechange",
                  callback: () => eventCallback("second rendering of alpha"),
                },
              ],
            },
          ]}
        />
      </>,
    );

    act(() => fireStatechangeEvent(chartInstance));
    await waitFor(() =>
      expect(eventCallback).toHaveBeenCalledWith("second rendering of alpha"),
    );
  });
});
