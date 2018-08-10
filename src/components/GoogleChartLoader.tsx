import * as React from "react";
//@ts-ignore
import { default as Script } from "react-load-script";
import { GoogleViz, ReactGoogleChartProps } from "../types";

export class GoogleChartLoader extends React.Component<{
  chartVersion: ReactGoogleChartProps["chartVersion"];
  chartPackages: ReactGoogleChartProps["chartPackages"];
  chartLanguage: ReactGoogleChartProps["chartLanguage"];
  mapsApiKey: ReactGoogleChartProps["mapsApiKey"];
  onLoad: (google: GoogleViz) => void;
  onError: () => void;
}> {
  private handleGoogleChartsLoaderScriptLoaded = (
    windowGoogleCharts: GoogleViz
  ) => {
    const {
      chartVersion: version,
      chartPackages: packages,
      chartLanguage: language,
      mapsApiKey,
      onLoad
    } = this.props;
    windowGoogleCharts.charts.load(version || "current", {
      packages: packages || ["corechart"],
      language: language || "en",
      mapsApiKey
    });
    windowGoogleCharts.charts.setOnLoadCallback(() => {
      onLoad(windowGoogleCharts);
    });
  };
  shouldComponentUpdate() {
    return false;
  }
  render() {
    console.log("Rendering loader");
    const { onError } = this.props;
    return (
      <Script
        url="https://www.gstatic.com/charts/loader.js"
        onError={onError}
        onLoad={() => {
          const windowWithGoogle = window as Window & {
            google?: GoogleViz;
          };
          if (windowWithGoogle.google) {
            this.handleGoogleChartsLoaderScriptLoaded(
              windowWithGoogle.google as GoogleViz
            );
          }
        }}
      />
    );
  }
}
