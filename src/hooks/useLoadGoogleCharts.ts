import { useState, useEffect } from "react";
import { GoogleChartVersion, GoogleChartPackages, GoogleViz } from "../types";
import { useLoadScript } from "./useLoadScript";

export interface IUseLoadGoogleChartsParams {
  chartVersion?: GoogleChartVersion;
  chartPackages?: GoogleChartPackages[];
  chartLanguage?: string;
  mapsApiKey?: string;
}

/**
 * Hook to load Google Charts JS API.
 * @param params - Load parameters.
 * @param [params.chartVersion] - Chart version to load.
 * @param [params.chartPackages] - Packages to load.
 * @param [params.chartLanguage] - Languages to load.
 * @param [params.mapsApiKey] - Google Maps api key.
 * @returns
 */
export function useLoadGoogleCharts({
  chartVersion = "current",
  chartPackages = ["corechart", "controls"],
  chartLanguage = "en",
  mapsApiKey,
}: IUseLoadGoogleChartsParams) {
  const [googleCharts, setGoogleCharts] = useState<GoogleViz | null>(null);
  const [failed, setFailed] = useState(false);

  useLoadScript(
    "https://www.gstatic.com/charts/loader.js",
    () => {
      // @ts-expect-error Getting object from global namespace.
      const google = window?.google as GoogleViz;

      if (!google) {
        return;
      }

      google.charts.load(chartVersion, {
        packages: chartPackages,
        language: chartLanguage,
        mapsApiKey,
      });
      google.charts.setOnLoadCallback(() => {
        setGoogleCharts(google);
      });
    },
    () => {
      setFailed(true);
    }
  );

  return [googleCharts, failed] as const;
}

export interface ILoadGoogleChartsProps extends IUseLoadGoogleChartsParams {
  onLoad?(googleCharts: GoogleViz): void;
  onLoadCallback?(googleCharts: GoogleViz): void;
  onError?(): void;
}

/**
 * Wrapper around useLoadGoogleCharts to use in legacy components.
 */
export function LoadGoogleCharts({
  onLoad,
  onLoadCallback,
  onError,
  ...params
}: ILoadGoogleChartsProps) {
  const [googleCharts, failed] = useLoadGoogleCharts(params);

  useEffect(() => {
    if (googleCharts) {
      if (onLoad) {
        onLoad(googleCharts);
      }
      if (onLoadCallback) {
        onLoadCallback(googleCharts);
      }
    }
  }, [googleCharts]);

  useEffect(() => {
    if (failed && onError) {
      onError();
    }
  }, [failed]);

  return null;
}
