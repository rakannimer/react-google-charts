import * as React from "react";
import {
  GoogleViz,
  GoogleChartWrapper,
  ReactGoogleChartPropsWithDefaults
} from "../types";
import { generateUniqueID } from "../generate-unique-id";
import { GoogleChartDataTable } from "./GoogleChartDataTable";
import { GoogleChartEvents } from "./GoogleChartEvents";

export type GoogleChartProps = {
  google: GoogleViz;
  graphID?: string | null;
  graph_id?: string | null;
  options?: ReactGoogleChartPropsWithDefaults["options"];
  chartType: ReactGoogleChartPropsWithDefaults["chartType"];
  width?: ReactGoogleChartPropsWithDefaults["width"];
  height?: ReactGoogleChartPropsWithDefaults["height"];
  style?: ReactGoogleChartPropsWithDefaults["style"];
  className?: ReactGoogleChartPropsWithDefaults["className"];
  rootProps?: ReactGoogleChartPropsWithDefaults["rootProps"];
} & ReactGoogleChartPropsWithDefaults;

export type GoogleChartState = {
  googleChartWrapper: GoogleChartWrapper | null;
  isReady: boolean;
};

export class GoogleChart extends React.Component<
  GoogleChartProps,
  GoogleChartState
> {
  state = {
    googleChartWrapper: null as GoogleChartWrapper | null,
    isReady: false
  };
  graphID: null | string = null;
  private getGraphID = () => {
    const { graphID, graph_id } = this.props;
    let instanceGraphID: string;
    if (graphID === null && graph_id === null) {
      if (this.graphID === null) {
        instanceGraphID = generateUniqueID();
      } else {
        instanceGraphID = this.graphID;
      }
    } else if (graphID !== null && graph_id === null) {
      instanceGraphID = graphID as string;
    } else if (graph_id !== null && graphID === null) {
      instanceGraphID = graph_id as string;
    } else {
      instanceGraphID = graphID as string;
    }
    this.graphID = instanceGraphID;
    return this.graphID as string;
  };
  componentDidMount() {
    const { options, google, chartType } = this.props;
    const chartConfig = {
      chartType,
      options,
      containerId: this.getGraphID()
    };
    const googleChartWrapper = new google.visualization.ChartWrapper(
      chartConfig
    );
    googleChartWrapper.setOptions(options);
    this.setState({
      googleChartWrapper,
      isReady: true
    });
  }
  shouldComponentUpdate(
    nextProps: GoogleChartProps,
    nextState: GoogleChartState
  ) {
    return this.state.isReady !== nextState.isReady;
  }

  render() {
    const {
      width,
      height,
      options,
      style,
      className,
      rootProps,
      google,
      chartEvents
    } = this.props;

    const divStyle = {
      height: height || (options && options.height),
      width: width || (options && options.width),
      ...style
    };
    return (
      <div
        id={this.getGraphID()}
        style={divStyle}
        className={className}
        {...rootProps}
      >
        {this.state.isReady && this.state.googleChartWrapper !== null ? (
          <React.Fragment>
            <GoogleChartDataTable
              googleChartWrapper={this.state.googleChartWrapper}
              google={google}
            />
            <GoogleChartEvents
              googleChartWrapper={this.state.googleChartWrapper}
              google={google}
            />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
