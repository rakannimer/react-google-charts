import * as React from "react";
import {
  GoogleViz,
  GoogleChartWrapper,
  ReactGoogleChartProps,
  GoogleChartDashboard,
  GoogleVizEventListener,
} from "../../types";
import { GoogleChartInternal } from "../../utils";

export type ChartDrawArgs = {
  data: ReactGoogleChartProps["data"];
};

export type UseGoogleChartDataTableParams = ReactGoogleChartProps & {
  googleChartWrapper?: GoogleChartWrapper | null;
  google: GoogleViz;
  googleChartDashboard?: GoogleChartDashboard | null;
};

export const useGoogleChartDataTable = (
  props: UseGoogleChartDataTableParams,
) => {
  const { google, googleChartWrapper, googleChartDashboard } = props;
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);
  // Re-draw the chart when hiddenColumns change
  React.useEffect(() => {
    if (!googleChartWrapper) {
      return;
    }
    GoogleChartInternal.draw({
      ...props,
      hiddenColumns,
      googleChartWrapper,
      googleChartDashboard,
      google,
    });
  }, [
    hiddenColumns,
    props.data,
    props.rows,
    props.columns,
    props.options,
    props.chartLoaderScriptUrl,
    props.chartType,
    props.formatters,
    props.spreadSheetUrl,
    props.spreadSheetQueryParameters,
    props.legendToggle,
    props.legend_toggle,
  ]);

  // Re-draw the chart when the window is resized
  const onResize = () => {
    const { googleChartWrapper } = props;
    if (!googleChartWrapper) {
      return;
    }
    googleChartWrapper.draw();
  };

  // Draw the chart when the google charts wrapper is ready and when the hiddenColumns change
  const initialize = (googleChartWrapper: GoogleChartWrapper) => {
    const listeners: GoogleVizEventListener[] = [];

    const { legendToggle, legend_toggle } = props;
    GoogleChartInternal.draw({
      ...props,
      hiddenColumns,
      googleChartWrapper,
      googleChartDashboard,
      google,
    });
    window.addEventListener("resize", onResize);
    if (legend_toggle || legendToggle) {
      const listener = GoogleChartInternal.listenToLegendToggle(props, [
        hiddenColumns,
        setHiddenColumns,
      ]);

      if (listener) listeners.push(listener);
    }

    return listeners;
  };

  // Remove event listeners and clear the chart when the component is unmounted
  const destroy = (
    googleChartWrapper: GoogleChartWrapper,
    listeners: GoogleVizEventListener[],
  ) => {
    window.removeEventListener("resize", onResize);
    listeners.forEach((listener) => {
      google.visualization.events.removeListener(listener);
    });
    if (googleChartWrapper.getChartType() === "Timeline") {
      googleChartWrapper.getChart() &&
        googleChartWrapper.getChart().clearChart();
    }
  };

  React.useEffect(() => {
    if (!googleChartWrapper) {
      return;
    }
    const listeners = initialize(googleChartWrapper);
    return () => {
      destroy(googleChartWrapper, listeners);
    };
  }, [googleChartWrapper, initialize, destroy]);
};
