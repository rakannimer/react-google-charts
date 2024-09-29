import { useState, useEffect } from "react";
import {
  GoogleChartVersion,
  GoogleChartPackages,
  GoogleViz,
  ReactGoogleChartProps,
} from "../types";
import { useLoadScript } from "./useLoadScript";

export interface IUseLoadGoogleChartsParams {
  chartVersion?: GoogleChartVersion;
  chartPackages?: GoogleChartPackages[];
  chartLanguage?: string;
  mapsApiKey?: string;
}

const isGoogleReady = (google?: GoogleViz) => {
  return google && google.charts;
};

const isGoogleChartsReady = (
  props: ReactGoogleChartProps,
  google?: GoogleViz,
) => {
  const { controls, toolbarItems, getChartEditor } = props;
  return (
    google &&
    google.charts &&
    google.visualization &&
    google.visualization.ChartWrapper &&
    google.visualization.Dashboard &&
    (!controls || google.visualization.ChartWrapper) &&
    (!getChartEditor || google.visualization.ChartEditor) &&
    (!toolbarItems || google.visualization.drawToolbar)
  );
};

const getGoogleInstanceFromWindow = (props: ReactGoogleChartProps) => {
  // @ts-expect-error Getting object from global namespace.
  const google = window.google as GoogleViz;
  return google;
};

/**
 * Hook to load Google Charts JS API.
 * @param params - Load parameters.
 * @param [params.chartVersion] - Chart version to load.
 * @param [params.chartPackages] - Packages to load.
 * @param [params.chartLanguage] - Languages to load.
 * @param [params.mapsApiKey] - Google Maps api key.
 * @returns
 */
export function useLoadGoogleCharts(props: ReactGoogleChartProps) {
  const {
    chartVersion = "current",
    chartPackages = ["corechart", "controls"],
    chartLanguage = "en",
    mapsApiKey,
  } = props;
  const [googleCharts, setGoogleCharts] = useState<GoogleViz | null>(null);
  const [scriptInitializationError, setScriptInitializationError] =
    useState<Error | null>(null);
  const [googleChartsInitializationError, setGoogleChartsInitializationError] =
    useState<Error | null>(null);
  const {
    isLoading,
    error: scriptLoadingError,
    isSuccess,
  } = useLoadScript("https://www.gstatic.com/charts/loader.js");

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    const google = getGoogleInstanceFromWindow(props);
    if (!isGoogleReady(google)) {
      const error = new Error(
        "[ScriptInitializationError] Script loaded but Google not attached to window.",
      );
      setScriptInitializationError(error);
      return;
    }
    if (isGoogleChartsReady(props, google)) {
      setGoogleCharts(google);
      return;
    }
    google.charts.load(chartVersion, {
      packages: chartPackages,
      language: chartLanguage,
      mapsApiKey,
    });
    google.charts.setOnLoadCallback(() => {
      if (!isGoogleChartsReady(props, google)) {
        const error = new Error(
          "[GoogleChartsInitializationError] Google Charts not ready after load callback.",
        );
        console.error(error);
        setGoogleChartsInitializationError(error);
        return;
      }
      setGoogleCharts(google);
    });
  }, [isSuccess]);
  return {
    error:
      scriptLoadingError ||
      scriptInitializationError ||
      googleChartsInitializationError,
    isLoading,
    google: googleCharts,
  };
}

export interface ILoadGoogleChartsProps extends IUseLoadGoogleChartsParams {
  onLoad?(googleCharts: GoogleViz): void;
  onError?(): void;
}
