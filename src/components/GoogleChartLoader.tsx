import * as React from "react";
//@ts-ignore
import { default as Script } from "react-load-script";
import { GoogleViz, ReactGoogleChartProps } from "../types";

export interface Props {
  chartVersion: ReactGoogleChartProps["chartVersion"];
  chartPackages: ReactGoogleChartProps["chartPackages"];
  chartLanguage: ReactGoogleChartProps["chartLanguage"];
  mapsApiKey: ReactGoogleChartProps["mapsApiKey"];
  onLoad: (google: GoogleViz) => void;
  onLoadCallback?: (google: GoogleViz) => void;
  onError: () => void;
}

export class GoogleChartLoader extends React.Component<Props> {
  private handleGoogleChartsLoaderScriptLoaded = (
    windowGoogleCharts: GoogleViz
  ) => {
    const {
      chartVersion: version,
      chartPackages: packages,
      chartLanguage: language,
      mapsApiKey,
      onLoad,
      onLoadCallback,
    } = this.props;
    windowGoogleCharts.charts.load(version || "current", {
      packages: packages || ["corechart", "controls"],
      language: language || "en",
      mapsApiKey,
    });
    windowGoogleCharts.charts.setOnLoadCallback(() => {
      onLoadCallback && onLoadCallback(windowGoogleCharts);
      onLoad(windowGoogleCharts);
    });
  };
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.chartPackages === this.props.chartPackages;
  }
  render() {
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
