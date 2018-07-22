import React from "react";
//@ts-ignore
import Script from "react-load-script";
import {
  GoogleViz,
  GoogleChartWrapperChartType,
  ChartWrapperOptions,
  GoogleChartWrapper,
  GoogleDataTableRow,
  GoogleDataTableColumn,
  GoogleVizEventName,
  GoogleChartAction,
  GoogleDataTable
} from "./types";
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
  rows: GoogleDataTableRow[];
  columns: GoogleDataTableColumn[];
  chartActions: GoogleChartAction[];
  events: {
    eventName: GoogleVizEventName;
    callback: (chartWrapper: GoogleChartWrapper) => void;
  }[];
};

export type ReactGoogleChartState = {
  loadingStatus: "loading" | "errored" | "ready";
  google: null | GoogleViz;
  hiddenColumns: string[];
};

export const chartDefaultProps = {
  graphID: null,
  options: {},
  rows: null,
  columns: null,
  data: null,
  events: null,
  legendToggle: false
};

class Chart extends React.Component<
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
    if (this.props.graphID === null) {
      if (this.graphID === null) {
        this.graphID = generateUniqueID();
      }
      return this.graphID;
    }
    return this.props.graphID;
  };
  componentWillUnmount() {
    if (this.chartWrapper === null || this.state.google === null) {
      return;
    }
    this.state.google.visualization.events.removeAllListeners(
      this.chartWrapper
    );
  }

  private draw = () => {
    if (this.chartWrapper === null || this.state.google === null) return;
    const canBuildUsingRowsAndColumns =
      this.props.rows !== null && this.props.columns !== null;
    const canBuildUsingData = this.props.data !== null;
    if (canBuildUsingData) {
      let dataTable = this.state.google.visualization.arrayToDataTable(
        this.props.data
      );
      for (let i = 0; i < dataTable.getNumberOfColumns(); i += 1) {
        // const column = dataTable.getCol.columns[i];
        const columnID = this.getColumnID(dataTable, i);

        if (this.state.hiddenColumns.includes(columnID)) {
          console.log({ columnID });
          console.log("hidden");
          dataTable.removeColumn(i);
          dataTable.addColumn({
            label: columnID,
            id: columnID,
            type: "number"
          });
        } else {
          // console.log("not hidden");
        }
        // dataTable.addColumn(column);
      }

      this.chartWrapper.setDataTable(dataTable);
    } else if (canBuildUsingRowsAndColumns) {
      let dataTable = this.state.google.visualization.arrayToDataTable([]);
      for (let column of this.props.columns) {
        dataTable.addColumn(column);
      }
      for (let row of this.props.rows) {
        dataTable.addRow(row);
      }

      this.chartWrapper.setDataTable(dataTable);
    }
    this.chartWrapper.setOptions(this.props.options);
    this.chartWrapper.draw();
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
  getColumnID = (dataTable: GoogleDataTable, columnIndex: number) => {
    return (
      dataTable.getColumnId(columnIndex) ||
      dataTable.getColumnLabel(columnIndex)
    );
  };
  listenToChartEvents = () => {
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
    if (this.props.legendToggle === true) {
      this.state.google.visualization.events.addListener(
        this.chartWrapper,
        "select",
        () => {
          if (this.chartWrapper === null) return;
          const chart = this.chartWrapper.getChart();
          const selection = chart.getSelection();
          const dataTable = this.chartWrapper.getDataTable();
          if (selection.length === 0) {
            return;
          }
          // We want to listen to when a whole row is selected. This is the case only when row === null
          if (selection[0].row !== null) {
            return;
          }
          if (dataTable === null) {
            return;
          }
          const columnIndex = selection[0].column;
          const columnID = this.getColumnID(dataTable, columnIndex);
          if (this.state.hiddenColumns.includes(columnID)) {
            this.setState(
              state => ({ ...state, hiddenColumns: [] }),
              () => {
                this.draw();
              }
            );
          } else {
            this.setState(
              state => ({ ...state, hiddenColumns: [columnID] }),
              () => {
                this.draw();
              }
            );
          }

          // this.chartWrapper.setDataTable(dataTable);
          // this.chartWrapper.draw();
          console.log(`Hide column ${columnIndex} = ${columnID}`);
        }
      );
    }
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
        containerId: this.getGraphID()
      };
      this.chartWrapper = new this.state.google.visualization.ChartWrapper(
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
      <div id={this.getGraphID()} style={divStyle}>
        <React.Fragment>
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
          {this.state.loadingStatus === "loading" &&
            (this.props.loader ? this.props.loader : "Rendering Chart...")}
        </React.Fragment>
      </div>
    );
  }
}
export { Chart };
export default Chart;
