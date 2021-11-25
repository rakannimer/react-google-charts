import * as React from "react";

import {
  GoogleViz,
  ReactGoogleChartProps,
  ReactGoogleChartState,
} from "./types";
import { LoadGoogleCharts } from "./hooks";
import { chartDefaultProps } from "./default-props";
import { GoogleChart } from "./components/GoogleChart";
import { ContextProvider } from "./Context";

export class Chart extends React.Component<
  ReactGoogleChartProps,
  ReactGoogleChartState
> {
  _isMounted = false;

  state = {
    loadingStatus: "loading" as ReactGoogleChartState["loadingStatus"],
    google: null as ReactGoogleChartState["google"],
  };

  static defaultProps = chartDefaultProps;

  render() {
    const {
      chartLanguage,
      chartPackages,
      chartVersion,
      mapsApiKey,
      loader,
      onLoad,
      errorElement,
    } = this.props;
    return (
      <ContextProvider value={this.props as ReactGoogleChartProps}>
        {this.state.loadingStatus === "ready" && this.state.google !== null ? (
          <GoogleChart
            {...(this.props as ReactGoogleChartProps)}
            google={this.state.google}
          />
        ) : this.state.loadingStatus === "errored" && errorElement ? (
          errorElement
        ) : (
          loader
        )}
        <LoadGoogleCharts
          chartLanguage={chartLanguage}
          chartPackages={chartPackages}
          chartVersion={chartVersion}
          mapsApiKey={mapsApiKey}
          onLoad={this.onLoad}
          onLoadCallback={onLoad}
          onError={this.onError}
        />
      </ContextProvider>
    );
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoad = (google: GoogleViz) => {
    if (this.isFullyLoaded(google)) {
      this.onSuccess(google);
    } else {
      // IE11: window.google is not fully set, we have to wait
      const id = setInterval(() => {
        const google = (
          window as Window & {
            google?: GoogleViz;
          }
        ).google;

        if (this._isMounted) {
          if (google && this.isFullyLoaded(google)) {
            clearInterval(id);
            this.onSuccess(google);
          }
        } else {
          clearInterval(id);
        }
      }, 1000);
    }
  };

  onSuccess = (google: GoogleViz) => {
    this.setState({
      loadingStatus: "ready",
      google,
    });
  };

  onError = () => {
    this.setState({
      loadingStatus: "errored",
    });
  };

  isFullyLoaded(google: GoogleViz) {
    const { controls, toolbarItems, getChartEditor } = this.props;

    return (
      google &&
      google.visualization &&
      google.visualization.ChartWrapper &&
      google.visualization.Dashboard &&
      (!controls || google.visualization.ChartWrapper) &&
      (!getChartEditor || google.visualization.ChartEditor) &&
      (!toolbarItems || google.visualization.drawToolbar)
    );
  }
}

export default Chart;
