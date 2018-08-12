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
      loader
    } = this.props;
    return (
      <div>
        <ContextProvider
          value={this.props as ReactGoogleChartPropsWithDefaults}
        >
          {this.state.loadingStatus === "ready" &&
          this.state.google !== null ? (
            <React.Fragment>
              <GoogleChart
                {...this.props as ReactGoogleChartPropsWithDefaults}
                google={this.state.google}
              />
            </React.Fragment>
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
      </div>
    );
  }
}

export default Chart;
