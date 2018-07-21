import React from "react";
//@ts-ignore
import Script from "react-load-script";

import { DEFAULT_CHART_COLORS as DEFAULT_COLORS } from "./constants";
import {
  GoogleChartPackages,
  GoogleChartVersion,
  GoogleChartLoader,
  GoogleViz,
  GoogleChartWrapperChartType,
  ChartWrapperOptions,
  GoogleChartWrapper,
  GoogleDataTableRow,
  GoogleDataTableColumn
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
  height?: string | number;
  width?: string | number;
  graphID?: string;
  chartType: GoogleChartWrapperChartType;
  options: Partial<ChartWrapperOptions["options"]>;
  data?: any[];
  rows?: GoogleDataTableRow[];
  columns?: GoogleDataTableColumn[];
};

export type ReactGoogleChartState = {
  loadingStatus: "loading" | "errored" | "ready";
  google: null | GoogleViz;
};

class Chart extends Component<ReactGoogleChartProps, ReactGoogleChartState> {
  state: ReactGoogleChartState = {
    loadingStatus: "loading",
    google: null
  };

  chart: GoogleChartWrapper | null = null;
  wrapper = null;
  hidden_columns = {};
  dataTable = [];
  isUnmounted = false;
  constructor(props: ReactGoogleChartProps) {
    super(props);

    // this.onResize = () => {
    //   this.drawChart();
    // };
    // this.onSelectToggle = () => {
    //   if (this.chart === null) return;
    //   if (!this.props.legend_toggle) {
    //     return;
    //   }
    //   const selection = this.chart.getSelection();
    //   if (selection.length > 0) {
    //     if (selection[0].row == null) {
    //       const column = selection[0].column;
    //       this.togglePoints(column);
    //     }
    //   }
    // };
    // this.getColumnColor = columnIndex => {
    //   if (this.props.options && this.props.options.colors) {
    //     if (this.props.options.colors[columnIndex]) {
    //       return this.props.options.colors[columnIndex];
    //     }
    //   } else if (columnIndex in DEFAULT_COLORS) {
    //     return DEFAULT_COLORS[columnIndex];
    //   }
    //   return DEFAULT_COLORS[0];
    // };
    // this.applyNumberFormat = (column, options) => {
    //   const googlefromWindow = getGoogle(window);
    //   const formatter = new googlefromWindow.visualization.NumberFormat(
    //     options
    //   );
    //   formatter.format(this.dataTable, column);
    // };
    // this.applyDateFormat = (column, options) => {
    //   const googlefromWindow = getGoogle(window);
    //   const formatter = new googlefromWindow.visualization.DateFormat(options);
    //   formatter.format(this.dataTable, column);
    // };
    // this.buildDataTableFromProps = () => {
    //   const chartType = this.props.chartType;
    //   const googlefromWindow = getGoogle(window);
    //   if (this.props.diffdata && this.props.chartType !== null) {
    //     const diffdata = this.props.diffdata;
    //     const oldData = googlefromWindow.visualization.arrayToDataTable(
    //       diffdata.old
    //     );
    //     const newData = googlefromWindow.visualization.arrayToDataTable(
    //       diffdata.new
    //     );
    //     const computeDiff =
    //       googlefromWindow.visualization[chartType].prototype.computeDiff;
    //     const chartDiff = computeDiff(oldData, newData);
    //     return chartDiff;
    //   }
    //   if (
    //     this.props.data === null &&
    //     (this.props.rows && this.props.rows.length === 0) &&
    //     !this.props.allowEmptyRows === false
    //   ) {
    //     throw new Error(
    //       "Can't build DataTable from rows and columns: rows array in props is empty"
    //     );
    //   } else if (
    //     this.props.data === null &&
    //     (this.props.columns && this.props.columns.length === 0)
    //   ) {
    //     throw new Error(
    //       "Can't build DataTable from rows and columns: columns array in props is empty"
    //     );
    //   }
    //   if (this.props.data !== null) {
    //     try {
    //       this.wrapper.setDataTable(this.props.data);
    //       const dataTable = this.wrapper.getDataTable();
    //       return dataTable;
    //     } catch (err) {
    //       throw new Error("Failed to set DataTable from data props ! ", err);
    //     }
    //   }
    //   const dataTable = new window.google.visualization.DataTable();
    //   this.props.columns.forEach(column => {
    //     dataTable.addColumn(column);
    //   });
    //   dataTable.addRows(this.props.rows);
    //   if (this.props.numberFormat) {
    //     const { column, options } = this.props.numberFormat;
    //     this.applyNumberFormat(column, options);
    //   }
    //   if (this.props.dateFormat) {
    //     const { columns, options } = this.props.dateFormat;
    //     columns.forEach(col => {
    //       this.applyDateFormat(col, options);
    //     });
    //   }
    //   this.props.formatters.forEach(({ type, column, options }) => {
    //     switch (type) {
    //       case "NumberFormat":
    //         this.applyNumberFormat(column, options);
    //         break;
    //       case "DateFormat":
    //         this.applyDateFormat(column, options);
    //         break;
    //       default:
    //         console.log(`Unkown formatter type: ${type}`);
    //         break;
    //     }
    //   });
    //   return dataTable;
    // };
    // this.updateDataTable = () => {
    //   window.google.visualization.errors.removeAll(
    //     document.getElementById(this.wrapper.getContainerId())
    //   );
    //   this.dataTable.removeRows(0, this.dataTable.getNumberOfRows());
    //   this.dataTable.removeColumns(0, this.dataTable.getNumberOfColumns());
    //   this.dataTable = this.buildDataTableFromProps();
    //   return this.dataTable;
    // };
    // this.drawChart = () => {
    //   if (this.isUnmounted) {
    //     return;
    //   }
    //   if (!this.wrapper) {
    //     const chartConfig = {
    //       chartType: this.props.chartType,
    //       options: this.props.options,
    //       containerId: this.state.graphID
    //     };
    //     this.wrapper = new window.google.visualization.ChartWrapper(
    //       chartConfig
    //     );

    /// HERE  /// HERE  /// HERE  /// HERE  /// HERE  /// HERE  /// HERE
    //     this.dataTable = this.buildDataTableFromProps();
    //     this.wrapper.setDataTable(this.dataTable);
    //     window.google.visualization.events.addOneTimeListener(
    //       this.wrapper,
    //       "ready",
    //       () => {
    //         this.chart = this.wrapper.getChart();
    //         this.listenToChartEvents();
    //         this.addChartActions();
    //       }
    //     );
    /// HERE  /// HERE  /// HERE  /// HERE  /// HERE  /// HERE  /// HERE

    //   } else {
    //     this.updateDataTable();
    //     this.wrapper.setDataTable(this.dataTable);
    //     this.wrapper.setOptions(this.props.options);
    //     if (this.wrapper.getChartType() !== this.props.chartType) {
    //       window.google.visualization.events.removeAllListeners(this.wrapper);
    //       this.wrapper.setChartType(this.props.chartType);
    //       const self = this;
    //       window.google.visualization.events.addOneTimeListener(
    //         this.wrapper,
    //         "ready",
    //         () => {
    //           self.chart = self.wrapper.getChart();
    //           self.listenToChartEvents.call(self);
    //         }
    //       );
    //     }
    //   }
    //   this.wrapper.draw();
    // };
    // this.addChartActions = () => {
    //   if (this.props.chartActions === null) {
    //     return;
    //   }
    //   this.props.chartActions.forEach(chartAction => {
    //     this.chart.setAction({
    //       id: chartAction.id,
    //       text: chartAction.text,
    //       action: chartAction.action.bind(this, this.chart)
    //     });
    //   });
    // };
    // this.listenToChartEvents = () => {
    //   if (this.props.legend_toggle) {
    //     window.google.visualization.events.addListener(
    //       this.wrapper,
    //       "select",
    //       this.onSelectToggle
    //     );
    //   }
    //   this.props.chartEvents.forEach(chartEvent => {
    //     if (chartEvent.eventName === "ready") {
    //       chartEvent.callback(this);
    //     } else {
    //       (event => {
    //         window.google.visualization.events.addListener(
    //           this.chart,
    //           event.eventName,
    //           e => {
    //             event.callback(this, e);
    //           }
    //         );
    //       })(chartEvent);
    //     }
    //   });
    // };
    // this.buildColumnFromSourceData = columnIndex => {
    //   return {
    //     label: this.dataTable.getColumnLabel(columnIndex),
    //     type: this.dataTable.getColumnType(columnIndex),
    //     sourceColumn: columnIndex,
    //     role: this.dataTable.getColumnRole(columnIndex)
    //   };
    // };
    // this.buildEmptyColumnFromSourceData = columnIndex => {
    //   return {
    //     label: this.dataTable.getColumnLabel(columnIndex),
    //     type: this.dataTable.getColumnType(columnIndex),
    //     calc: () => null,
    //     role: this.dataTable.getColumnRole(columnIndex)
    //   };
    // };
    // this.addEmptyColumnTo = (columns, columnIndex) => {
    //   const emptyColumn = this.buildEmptyColumnFromSourceData(columnIndex);
    //   columns.push(emptyColumn);
    // };
    // this.hideColumn = (colors, columnIndex) => {
    //   if (!this.isHidden(columnIndex)) {
    //     this.hidden_columns[columnIndex] = {
    //       color: this.getColumnColor(columnIndex - 1)
    //     };
    //   }
    //   colors.push("#CCCCCC");
    // };
    // this.addSourceColumnTo = (columns, columnIndex) => {
    //   const sourceColumn = this.buildColumnFromSourceData(columnIndex);
    //   columns.push(sourceColumn);
    // };
    // this.isHidden = columnIndex => {
    //   return this.hidden_columns[columnIndex] !== undefined;
    // };
    // this.restoreColorTo = (colors, columnIndex) => {
    //   let previousColor;
    //   if (this.isHidden(columnIndex)) {
    //     previousColor = this.hidden_columns[columnIndex].color;
    //     delete this.hidden_columns[columnIndex];
    //   } else {
    //     previousColor = this.getColumnColor(columnIndex - 1);
    //   }
    //   if (columnIndex !== 0) {
    //     colors.push(previousColor);
    //   }
    // };
    // this.debounce = (func, wait) => {
    //   let timeout;
    //   return function(...args) {
    //     const context = this;
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => func.apply(context, args), wait);
    //   };
    // };
    // this.togglePoints = column => {
    //   const view = new window.google.visualization.DataView(
    //     this.wrapper.getDataTable()
    //   );
    //   const columnCount = view.getNumberOfColumns();
    //   let colors = [];
    //   let columns = [];
    //   for (let i = 0; i < columnCount; i += 1) {
    //     if (i === 0) {
    //       this.addSourceColumnTo(columns, i);
    //     } else if (i === column) {
    //       if (this.isHidden(i)) {
    //         this.addSourceColumnTo(columns, i);
    //         this.restoreColorTo(colors, i);
    //       } else {
    //         this.addEmptyColumnTo(columns, i);
    //         this.hideColumn(colors, i);
    //       }
    //     } else if (this.isHidden(i)) {
    //       this.addEmptyColumnTo(columns, i);
    //       this.hideColumn(colors, i);
    //     } else {
    //       this.addSourceColumnTo(columns, i);
    //       this.restoreColorTo(colors, i);
    //     }
    //   }
    //   view.setColumns(columns);
    //   this.props.options.colors = colors;
    //   this.chart.draw(view, this.props.options);
    // };
    // this.state = { graphID: props.graph_id || generateUniqueID() };
  }
  // state = {
  //   graphID: pro
  // }
  componentDidMount() {
    // if (typeof window === "undefined") {
    //   return;
    // }
    // if (this.props.loadCharts) {
    //   googleChartLoader
    //     .init(
    //       this.props.chartPackages,
    //       this.props.chartVersion,
    //       this.props.chartLanguage,
    //       this.props.mapsApiKey
    //     )
    //     .then(() => {
    //       this.drawChart();
    //       this.onResize = this.debounce(this.onResize, 200);
    //       window.addEventListener("resize", this.onResize);
    //     });
    // } else {
    //   this.drawChart();
    // }
  }

  componentWillUnmount() {
    // this.isUnmounted = true;
    // googleChartLoader.destroy();
    // try {
    //   if (window) {
    //     if (window.google && window.google.visualization) {
    //       window.google.visualization.events.removeAllListeners(this.wrapper);
    //     }
    //     window.removeEventListener("resize", this.onResize);
    //   }
    // } catch (err) {
    //   return;
    // }
  }
  // private buildDataTableFromProps = () => {
  //   const chartType = this.props.chartType;
  //   const googlefromWindow = getGoogle(window);
  //   if (this.props.diffdata && this.props.chartType !== null) {
  //     const diffdata = this.props.diffdata;
  //     const oldData = googlefromWindow.visualization.arrayToDataTable(
  //       diffdata.old
  //     );
  //     const newData = googlefromWindow.visualization.arrayToDataTable(
  //       diffdata.new
  //     );
  //     const computeDiff =
  //       googlefromWindow.visualization[chartType].prototype.computeDiff;
  //     const chartDiff = computeDiff(oldData, newData);
  //     return chartDiff;
  //   }
  //   if (
  //     this.props.data === null &&
  //     (this.props.rows && this.props.rows.length === 0) &&
  //     !this.props.allowEmptyRows === false
  //   ) {
  //     throw new Error(
  //       "Can't build DataTable from rows and columns: rows array in props is empty"
  //     );
  //   } else if (
  //     this.props.data === null &&
  //     (this.props.columns && this.props.columns.length === 0)
  //   ) {
  //     throw new Error(
  //       "Can't build DataTable from rows and columns: columns array in props is empty"
  //     );
  //   }
  //   if (this.props.data !== null) {
  //     try {
  //       this.wrapper.setDataTable(this.props.data);
  //       const dataTable = this.wrapper.getDataTable();
  //       return dataTable;
  //     } catch (err) {
  //       throw new Error("Failed to set DataTable from data props ! ", err);
  //     }
  //   }
  //   const dataTable = new window.google.visualization.DataTable();
  //   this.props.columns.forEach(column => {
  //     dataTable.addColumn(column);
  //   });
  //   dataTable.addRows(this.props.rows);
  //   if (this.props.numberFormat) {
  //     const { column, options } = this.props.numberFormat;
  //     this.applyNumberFormat(column, options);
  //   }
  //   if (this.props.dateFormat) {
  //     const { columns, options } = this.props.dateFormat;
  //     columns.forEach(col => {
  //       this.applyDateFormat(col, options);
  //     });
  //   }
  //   this.props.formatters.forEach(({ type, column, options }) => {
  //     switch (type) {
  //       case "NumberFormat":
  //         this.applyNumberFormat(column, options);
  //         break;
  //       case "DateFormat":
  //         this.applyDateFormat(column, options);
  //         break;
  //       default:
  //         console.log(`Unkown formatter type: ${type}`);
  //         break;
  //     }
  //   });
  //   return dataTable;
  // };
  static defaultProps = {
    graphID: generateUniqueID(),
    options: {},
    rows: null,
    columns: null,
    data: null
  };
  private draw = () => {
    if (this.chart === null || this.state.google === null) return;
    const canBuildUsingRowsAndColumns =
      this.props.rows !== null && this.props.columns !== null;
    const canBuildUsingData = this.props.data !== null;
    console.log(
      canBuildUsingRowsAndColumns,
      canBuildUsingData,
      this.props.data
    );
    if (canBuildUsingData) {
      this.chart.setDataTable(this.props.data);
    } else if (canBuildUsingRowsAndColumns) {
      let dataTable = this.chart.getDataTable();
      if (dataTable === null) {
        dataTable = this.state.google.visualization.arrayToDataTable([]);
      }
      for (let column of this.props.columns) {
        dataTable.addColumn(column);
      }
      for (let row of this.props.rows) {
        dataTable.addRow(row);
      }

      this.chart.setDataTable(dataTable);
    }
    // console.log(this)
    this.chart.setOptions(this.props.options);
    this.chart.draw();
    //  else if (this.props.d)
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
      const google = this.state.google as GoogleViz;
      const chartConfig = {
        chartType: this.props.chartType,
        options: this.props.options,
        containerId: this.props.graphID
      };
      this.chart = new google.visualization.ChartWrapper(chartConfig);
      this.draw();
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
    return createElement(
      "div",
      { id: this.state.graphID, style: divStyle },
      this.props.loader ? this.props.loader : "Rendering Chart..."
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

export default index;
export { Chart, googleChartLoader };
