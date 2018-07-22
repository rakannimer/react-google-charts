import React from "react";
//@ts-ignore
import Script from "react-load-script";

import { DEFAULT_CHART_COLORS as DEFAULT_COLORS } from "./constants";
import {
  GoogleViz,
  GoogleChartWrapperChartType,
  ChartWrapperOptions,
  GoogleChartWrapper,
  GoogleDataTableRow,
  GoogleDataTableColumn,
  GoogleVizEventName,
  GoogleChartAction
} from "./types";
import { hasDOM } from "./utils";
const { Component, createElement, Fragment } = React;
export type WindowWithMaybeGoogle = Window & { google?: any };

let uniqueID = 0;
const generateUniqueID = () => {
  uniqueID += 1;
  return `reactgooglegraph-${uniqueID}`;
};

export type ReactGoogleChartProps = {
  height: string | number;
  width: string | number;
  graphID: string;
  chartType: GoogleChartWrapperChartType;
  options: Partial<ChartWrapperOptions["options"]>;
  loader: JSX.Element;
  data: any[];
  rows: GoogleDataTableRow[] | null;
  columns?: GoogleDataTableColumn[];
  chartActions: GoogleChartAction[];
  events?:
    | {
        eventName: GoogleVizEventName;
        callback: (chartWrapper: GoogleChartWrapper) => void;
      }[]
    | null;
};

export type ReactGoogleChartState = {
  loadingStatus: "loading" | "errored" | "ready";
  google: null | GoogleViz;
};

class Chart extends React.Component<
  ReactGoogleChartProps,
  ReactGoogleChartState
> {
  state: ReactGoogleChartState = {
    loadingStatus: "loading",
    google: null
  };

  chart: GoogleChartWrapper | null = null;
  hidden_columns = {};

  componentWillUnmount() {
    if (this.chart === null || this.state.google === null) {
      return;
    }
    this.state.google.visualization.events.removeAllListeners(this.chart);
  }
  static defaultProps = {
    graphID: generateUniqueID(),
    options: {},
    rows: null,
    columns: null,
    data: null,
    events: null
  };
  private draw = () => {
    if (this.chart === null || this.state.google === null) return;
    const canBuildUsingRowsAndColumns =
      this.props.rows !== null && this.props.columns !== null;
    const canBuildUsingData = this.props.data !== null;
    if (canBuildUsingData) {
      this.chart.setDataTable(this.props.data);
    } else if (canBuildUsingRowsAndColumns) {
      let dataTable = this.state.google.visualization.arrayToDataTable([]);
      for (let column of this.props.columns) {
        dataTable.addColumn(column);
      }
      for (let row of this.props.rows) {
        dataTable.addRow(row);
      }

      this.chart.setDataTable(dataTable);
    }
    this.chart.setOptions(this.props.options);
    this.chart.draw();
  };
  // private initialize = () => {

  // }
  componentDidMount() {
    this.setState({ loadingStatus: "loading" });
  }

  setChartActions = (
    currentActions: GoogleChartAction[],
    previousActions: GoogleChartAction[]
  ) => {
    if (this.chart === null) return;
    const chart = this.chart.getChart();
    for (let chartAction of previousActions) {
      chart.removeAction(chartAction.id);
    }
    for (let chartAction of currentActions) {
      chart.setAction({
        id: chartAction.id,
        text: chartAction.text,
        action: () => chartAction.action(this.chart as GoogleChartWrapper)
      });
    }
  };

  listenToChartEvents = () => {
    if (this.state.google === null || !this.chart) {
      return;
    }
    if (this.props.legendToggle) {
      console.log("Listening to select");
      this.state.google.visualization.events.addListener(
        this.chart,
        "select",
        this.handleLegendToggle
      );
    }
    if (!this.props.events) return;
    this.state.google.visualization.events.removeAllListeners(this.chart);
    for (let event of this.props.events) {
      const { eventName, callback } = event;
      this.state.google.visualization.events.addListener(
        this.chart,
        eventName,
        callback
      );
    }
    // console.log(this.props.legendToggle);
  };
  componentDidUpdate(
    prevProps: ReactGoogleChartProps,
    prevState: ReactGoogleChartState
  ) {
    if (
      prevState.loadingStatus !== "ready" &&
      this.state.loadingStatus === "ready" &&
      this.state.google !== null
    ) {
      const chartConfig = {
        chartType: this.props.chartType,
        options: this.props.options,
        containerId: this.props.graphID
      };
      this.chart = new this.state.google.visualization.ChartWrapper(
        chartConfig
      );
      this.draw();
      this.listenToChartEvents();

      return;
    }
    if (
      prevProps.rows !== this.props.rows ||
      prevProps.columns !== this.props.columns ||
      prevProps.data !== this.props.data
    ) {
      this.draw();
    }
    if (this.props.events !== prevProps.events) {
      this.listenToChartEvents();
    }
    if (this.props.chartActions !== prevProps.chartActions) {
      this.setChartActions(this.props.chartActions, prevProps.chartActions);
    }
  }
  private handleLegendToggle = () => {
    if (this.chart === null) return;
    if (!this.props.legendToggle) {
      return;
    }
    const selection = this.chart.getSelection();
    if (selection.length > 0) {
      if (selection[0].row == null) {
        const column = selection[0].column;
        this.togglePoints(column);
      }
    }
  };
  private handleGoogleChartsLoaderScriptLoaded = (
    windowGoogleCharts: GoogleViz
  ) => {
    let version, packages, language, mapsApiKey;
    windowGoogleCharts.charts.load(version || "current", {
      packages: packages || ["corechart"],
      language: language || "en",
      mapsApiKey
    });
    windowGoogleCharts.charts.setOnLoadCallback(() => {
      this.setState(state => ({
        ...state,
        loadingStatus: "ready",
        google: windowGoogleCharts
      }));
    });
  };
  private handleGoogleChartsLoaderScriptErrored = () => {
    this.setState(state => ({ ...state, loadingStatus: "errored" }));
  };
  render() {
    const divStyle = {
      height:
        this.props.height || (this.props.options && this.props.options.height),
      width:
        this.props.width || (this.props.options && this.props.options.width)
    };
    return (
      <div id={this.props.graphID} style={divStyle}>
        <Fragment>
          <Script
            url="https://www.gstatic.com/charts/loader.js"
            onError={this.handleGoogleChartsLoaderScriptErrored}
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
          {this.props.loader ? this.props.loader : "Rendering Chart..."}
        </Fragment>
      </div>
    );
  }
}
// Chart.defaultProps = {
//   chartType: "LineChart",
//   rows: [],
//   columns: [],
//   options: {
//     chart: {
//       title: "Chart Title",
//       subtitle: "Subtitle"
//     },
//     hAxis: { title: "X Label" },
//     vAxis: { title: "Y Label" },
//     width: "100%",
//     height: "100%"
//   },
//   width: "400px",
//   height: "300px",
//   chartEvents: [],
//   chartActions: null,
//   data: null,
//   legend_toggle: false,
//   allowEmptyRows: false,
//   loadCharts: true,
//   loader: createElement("div", null, "Rendering Chart"),
//   chartPackages: ["corechart"],
//   chartVersion: "current",
//   chartLanguage: "en",
//   numberFormat: null,
//   dateFormat: null,
//   formatters: [],
//   diffdata: null
// };

var index = { Chart };
// export const C = (props:Partial<ReactGoogleChartProps>) => { return <Chart {...props}/>}
// const chart = Chart as React.ComponentType<Partial<ReactGoogleChartProps>>;
export default index;
export { Chart };
