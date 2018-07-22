import React from "react";
import {
  GoogleViz,
  GoogleChartWrapperChartType,
  ChartWrapperOptions,
  GoogleChartWrapper,
  GoogleVizEventName,
  GoogleChartAction,
  GoogleDataTable,
  GoogleDataTableRow,
  GoogleDataTableColumn,
  GoogleChartVersion,
  GoogleChartPackages
} from "./types";
import { DEFAULT_CHART_COLORS } from "./constants";
import { ReactGoogleChartsLoader } from "./ReactGoogleChartsLoader";

const GRAY_COLOR = "#CCCCCC";

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
  rows: GoogleDataTableRow[];
  columns: GoogleDataTableColumn[];
  chartActions: GoogleChartAction[];
  events: {
    eventName: GoogleVizEventName;
    callback: (chartWrapper: GoogleChartWrapper) => void;
  }[];
  chartVersion: GoogleChartVersion;
  chartPackages: GoogleChartPackages[];
  chartLanguage: string;
  mapsApiKey: string;
};

export type ReactGoogleChartState = {
  loadingStatus: "loading" | "errored" | "ready";
  google: null | GoogleViz;
  hiddenColumns: string[];
};

export const chartDefaultProps = {
  // <DEPRECATED_PROPS>
  graph_id: null,
  legend_toggle: false,
  // </DEPRECATED_PROPS>
  graphID: null,
  options: {
    colors: null as null | string[]
  },
  data: null,
  rows: null,
  columns: null,
  events: null,
  legendToggle: false
};

export class Chart extends React.Component<
  ReactGoogleChartProps & typeof chartDefaultProps,
  ReactGoogleChartState
> {
  state: ReactGoogleChartState = {
    loadingStatus: "loading",
    google: null,
    hiddenColumns: []
  };
  graphID: null | string = null;
  chartWrapper: GoogleChartWrapper | null = null;
  static defaultProps = chartDefaultProps;

  private getGraphID = () => {
    if (this.props.graphID === null && this.props.graph_id === null) {
      if (this.graphID === null) {
        this.graphID = generateUniqueID();
      }
      return this.graphID;
    } else if (this.props.graphID !== null && this.props.graph_id === null) {
      this.graphID = this.props.graphID;
    } else if (this.props.graph_id !== null && this.props.graphID === null) {
      this.graphID = this.props.graph_id;
    } else {
      this.graphID = this.props.graphID;
    }
    return this.graphID as string;
  };

  private draw = () => {
    if (this.chartWrapper === null || this.state.google === null) return;

    let dataTable: GoogleDataTable;
    if (this.props.data !== null) {
      dataTable = this.state.google.visualization.arrayToDataTable(
        this.props.data
      );
    } else if (this.props.rows !== null && this.props.columns !== null) {
      dataTable = this.state.google.visualization.arrayToDataTable([
        this.props.columns,
        ...this.props.rows
      ]);
    } else {
      dataTable = this.state.google.visualization.arrayToDataTable([]);
    }

    const columnCount = dataTable.getNumberOfColumns();
    for (let i = 0; i < columnCount; i += 1) {
      const columnID = this.getColumnID(dataTable, i);
      if (this.state.hiddenColumns.includes(columnID)) {
        const previousColumnLabel = dataTable.getColumnLabel(i);
        const previousColumnID = dataTable.getColumnId(i);
        const previousColumnType = dataTable.getColumnType(i);
        dataTable.removeColumn(i);
        dataTable.addColumn({
          label: previousColumnLabel,
          id: previousColumnID,
          type: previousColumnType
        });
      }
    }
    this.chartWrapper.setOptions(this.props.options);
    this.chartWrapper.setDataTable(dataTable);
    this.chartWrapper.draw();
    if (this.props.legendToggle === true) {
      this.grayOutHiddenColumns();
    }
  };
  private grayOutHiddenColumns = () => {
    if (this.chartWrapper === null || this.state.google === null) return;
    const dataTable = this.chartWrapper.getDataTable();
    if (dataTable === null) return;

    const columnCount = dataTable.getNumberOfColumns();
    const hasAHiddenColumn = this.state.hiddenColumns.length > 0;
    if (hasAHiddenColumn === false) return;

    const colors = Array.from({ length: columnCount - 1 }).map(
      (dontcare, i) => {
        const columnID = this.getColumnID(dataTable, i + 1);
        if (this.state.hiddenColumns.includes(columnID)) {
          return GRAY_COLOR;
        } else if (
          "colors" in this.props.options &&
          this.props.options.colors !== null
        ) {
          return this.props.options.colors[i];
        } else {
          return DEFAULT_CHART_COLORS[i];
        }
      }
    );
    this.chartWrapper.setOptions({
      ...this.props.options,
      colors
    });
    this.chartWrapper.draw();
  };
  componentDidMount() {
    this.setState({ loadingStatus: "loading" });
  }
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
        containerId: this.getGraphID()
      };
      this.chartWrapper = new this.state.google.visualization.ChartWrapper(
        chartConfig
      );
      this.draw();
      this.listenToChartEvents();
      return;
    }
    if (this.props.events !== prevProps.events) {
      this.listenToChartEvents();
    }
    if (this.props.chartActions !== prevProps.chartActions) {
      this.setChartActions(this.props.chartActions, prevProps.chartActions);
    }
    if (this.props.data !== prevProps.data) {
      this.draw();
    }
  }
  componentWillUnmount() {
    if (this.chartWrapper === null || this.state.google === null) {
      return;
    }
    this.state.google.visualization.events.removeAllListeners(
      this.chartWrapper
    );
  }
  private setChartActions = (
    currentActions: GoogleChartAction[],
    previousActions: GoogleChartAction[]
  ) => {
    if (this.chartWrapper === null) return;
    const chart = this.chartWrapper.getChart();
    for (let chartAction of previousActions) {
      chart.removeAction(chartAction.id);
    }
    for (let chartAction of currentActions) {
      chart.setAction({
        id: chartAction.id,
        text: chartAction.text,
        action: () =>
          chartAction.action(this.chartWrapper as GoogleChartWrapper)
      });
    }
  };
  private getColumnID = (dataTable: GoogleDataTable, columnIndex: number) => {
    return (
      dataTable.getColumnId(columnIndex) ||
      dataTable.getColumnLabel(columnIndex)
    );
  };
  private listenToChartEvents = () => {
    if (this.state.google === null || this.chartWrapper === null) {
      return;
    }
    this.state.google.visualization.events.removeAllListeners(
      this.chartWrapper
    );
    if (this.props.events !== null) {
      for (let event of this.props.events) {
        const { eventName, callback } = event;
        this.state.google.visualization.events.addListener(
          this.chartWrapper,
          eventName,
          callback
        );
      }
    }
    if (this.props.legendToggle === true || this.props.legend_toggle === true) {
      this.listenToLegendToggle();
    }
  };
  private listenToLegendToggle = () => {
    if (this.state.google === null || this.chartWrapper === null) {
      return;
    }
    this.state.google.visualization.events.addListener(
      this.chartWrapper,
      "select",
      () => {
        if (this.chartWrapper === null) return;
        const chart = this.chartWrapper.getChart();
        const selection = chart.getSelection();
        const dataTable = this.chartWrapper.getDataTable();
        if (
          selection.length === 0 ||
          // We want to listen to when a whole row is selected. This is the case only when row === null
          selection[0].row !== null ||
          dataTable === null
        ) {
          return;
        }

        const columnIndex = selection[0].column;
        const columnID = this.getColumnID(dataTable, columnIndex);
        if (this.state.hiddenColumns.includes(columnID)) {
          this.setState(
            state => ({
              ...state,
              hiddenColumns: [
                ...state.hiddenColumns.filter(colID => colID !== columnID)
              ]
            }),
            () => {
              this.draw();
            }
          );
        } else {
          this.setState(
            state => ({
              ...state,
              hiddenColumns: [...state.hiddenColumns, columnID]
            }),
            () => {
              this.draw();
            }
          );
        }
      }
    );
  };

  private handleGoogleChartsLoaderScriptLoaded = (
    windowGoogleCharts: GoogleViz
  ) => {
    const {
      chartVersion: version,
      chartPackages: packages,
      chartLanguage: language,
      mapsApiKey
    } = this.props;
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
      <div id={this.getGraphID()} style={divStyle}>
        <React.Fragment>
          <ReactGoogleChartsLoader
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
          {this.state.loadingStatus === "loading" &&
            (this.props.loader ? this.props.loader : "Rendering Chart...")}
        </React.Fragment>
      </div>
    );
  }
}
