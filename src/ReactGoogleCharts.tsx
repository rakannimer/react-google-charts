import * as React from "react";

import {
  ReactGoogleChartProps,
  ReactGoogleChartState,
  ReactGoogleChartPropsWithDefaults
} from "./types";
import { chartDefaultProps } from "./default-props";
import { GoogleChartLoader } from "./components/GoogleChartLoader";
import { GoogleChart } from "./components/GoogleChart";
import { ContextProvider } from "./Context";

export class Chart extends React.Component<
  ReactGoogleChartProps,
  ReactGoogleChartState
> {
  state = {
    loadingStatus: "loading" as ReactGoogleChartState["loadingStatus"],
    google: null as ReactGoogleChartState["google"]
  };
  static defaultProps = chartDefaultProps;
  render() {
    const {
      chartLanguage,
      chartPackages,
      chartVersion,
      mapsApiKey,
      loader,
      errorElement
    } = this.props;
    return (
      <ContextProvider value={this.props as ReactGoogleChartPropsWithDefaults}>
        {this.state.loadingStatus === "ready" && this.state.google !== null ? (
          <GoogleChart
            {...this.props as ReactGoogleChartPropsWithDefaults}
            google={this.state.google}
          />
        ) : this.state.loadingStatus === "errored" && errorElement ? (
          errorElement
        ) : (
          loader
        )}
        <GoogleChartLoader
          {...{ chartLanguage, chartPackages, chartVersion, mapsApiKey }}
          onLoad={google => {
            this.setState({
              loadingStatus: "ready",
              google
            });
          }}
          onError={() => {
            this.setState({
              loadingStatus: "errored"
            });
          }}
        />
      </ContextProvider>
    );
  }
}

export default Chart;
