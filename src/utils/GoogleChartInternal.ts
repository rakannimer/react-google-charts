import { DEFAULT_CHART_COLORS } from "../constants";
import { UseGoogleChartDataTableParams } from "../hooks/internal/useGoogleChartDataTable";
import { loadDataTableFromSpreadSheet } from "../load-data-table-from-spreadsheet";
import { ApplyFormattersParams, GoogleDataTable } from "../types";

const GRAY_COLOR = "#CCCCCC";

/**
 * An internal helper class around the Google Chart API.
 * Offers high-level methods to interact with the Google Chart API.
 */
export class GoogleChartInternal {
  private static grayOutHiddenColumnsLabel = (
    props: UseGoogleChartDataTableParams,
    hiddenColumns: string[]
  ) => {
    const { googleChartWrapper, options } = props;
    if (!googleChartWrapper) {
      console.error("googleChartWrapper is not defined");
      return;
    }
    const dataTable = googleChartWrapper.getDataTable();
    if (!dataTable) return;
    const columnCount = dataTable.getNumberOfColumns();
    const hasAHiddenColumn = hiddenColumns.length > 0;
    if (hasAHiddenColumn === false) return;
    const colors = Array.from({ length: columnCount - 1 }).map(
      (_dontcare, i) => {
        const columnID = this.getColumnId(dataTable, i + 1);
        if (hiddenColumns.includes(columnID)) {
          return GRAY_COLOR;
        } else if (options && options.colors) {
          return options.colors[i];
        } else {
          return DEFAULT_CHART_COLORS[i];
        }
      }
    );
    googleChartWrapper.setOptions({
      ...options,
      colors,
    });
    googleChartWrapper.draw();
  };
  /**
   * Listens to user clicking on the legend to toggle the visibility of a column.
   * When a user clicks on a legend item, the column id is added to / removed from the hiddenColumns state.
   */
  public static listenToLegendToggle = (
    props: UseGoogleChartDataTableParams,
    hiddenColumnsState: [
      string[],
      React.Dispatch<React.SetStateAction<string[]>>
    ]
  ) => {
    const [hiddenColumns, setHiddenColumns] = hiddenColumnsState;
    const { google, googleChartWrapper } = props;
    if (!googleChartWrapper) {
      console.error("googleChartWrapper is not defined");
      return;
    }
    google.visualization.events.addListener(
      googleChartWrapper,
      "select",
      () => {
        const chart = googleChartWrapper.getChart();
        const selection = chart.getSelection();
        const dataTable = googleChartWrapper.getDataTable();
        if (
          selection.length === 0 ||
          // We want to listen to when a whole row is selected. This is the case only when row === null
          selection[0].row !== null ||
          !dataTable
        ) {
          return;
        }

        const columnIndex = selection[0].column;
        const columnID = this.getColumnId(dataTable, columnIndex);
        // If the column is hidden remove it from state, otherwise add it
        if (hiddenColumns?.includes(columnID)) {
          setHiddenColumns((state) => [
            ...state.filter((colID) => colID !== columnID),
          ]);
        } else {
          setHiddenColumns((state) => [...state, columnID]);
        }
      }
    );
  };

  /**
   * (Re-)Draw a Google Chart with the given data, options, and chart type.
   */
  public static draw = async (
    props: UseGoogleChartDataTableParams & { hiddenColumns: string[] }
  ) => {
    const {
      data,
      diffdata,
      rows,
      columns,
      options,
      chartType,
      formatters,
      spreadSheetUrl,
      spreadSheetQueryParameters,
      googleChartDashboard,
      googleChartWrapper,
      google,
      hiddenColumns,
      legendToggle,
      legend_toggle,
    } = props;
    if (!googleChartWrapper) {
      console.error("draw was called with googleChartWrapper = null");
      return;
    }
    let dataTable: GoogleDataTable;
    let chartDiff = null;
    if (diffdata) {
      const oldData = google.visualization.arrayToDataTable(diffdata.old);
      const newData = google.visualization.arrayToDataTable(diffdata.new);
      chartDiff = google.visualization[chartType].prototype.computeDiff(
        oldData,
        newData
      );
    }
    if (data) {
      if (Array.isArray(data)) {
        dataTable = google.visualization.arrayToDataTable(data);
      } else {
        dataTable = new google.visualization.DataTable(data);
      }
    } else if (rows && columns) {
      dataTable = google.visualization.arrayToDataTable([columns, ...rows]);
    } else if (spreadSheetUrl) {
      dataTable = (await loadDataTableFromSpreadSheet(
        google,
        spreadSheetUrl,
        spreadSheetQueryParameters
      )) as GoogleDataTable;
    } else {
      dataTable = google.visualization.arrayToDataTable([]);
    }
    const columnCount = dataTable.getNumberOfColumns();

    const viewColumns = Array(columnCount)
      .fill(0)
      .map((_c, i) => {
        const columnID = this.getColumnId(dataTable, i);
        if (hiddenColumns.includes(columnID)) {
          return {
            label: dataTable.getColumnLabel(i),
            type: dataTable.getColumnType(i),
            calc: () => null,
          };
        } else {
          return i;
        }
      });
    const chart = googleChartWrapper.getChart();
    if (googleChartWrapper.getChartType() === "Timeline") {
      chart && chart.clearChart();
    }
    googleChartWrapper.setChartType(chartType);
    googleChartWrapper.setOptions(options || {});
    const viewTable = new google.visualization.DataView(dataTable);
    viewTable.setColumns(viewColumns);
    googleChartWrapper.setDataTable(viewTable);
    googleChartWrapper.draw();
    if (googleChartDashboard) {
      googleChartDashboard.draw(dataTable);
    }

    if (chartDiff) {
      googleChartWrapper.setDataTable(chartDiff);
      googleChartWrapper.draw();
    }
    if (formatters) {
      this.applyFormatters({ dataTable, formatters, google });
      googleChartWrapper.setDataTable(dataTable);
      googleChartWrapper.draw();
    }
    if (legendToggle === true || legend_toggle === true) {
      this.grayOutHiddenColumnsLabel(props, hiddenColumns);
    }
    return;
  };
  /**
   * Get the column ID of a column in a GoogleDataTable.
   * If the column has an ID, return the ID, otherwise return the label.
   */
  private static getColumnId = (
    dataTable: GoogleDataTable,
    columnIndex: number
  ) => {
    return (
      dataTable.getColumnId(columnIndex) ||
      dataTable.getColumnLabel(columnIndex)
    );
  };

  /**
   * Apply Chart Formatters passed under the formatters prop to the GoogleDataTable
   */
  private static applyFormatters = ({
    dataTable,
    formatters,
    google,
  }: ApplyFormattersParams) => {
    for (let formatter of formatters) {
      switch (formatter.type) {
        case "ArrowFormat": {
          const vizFormatter = new google.visualization.ArrowFormat(
            formatter.options
          );
          vizFormatter.format(dataTable, formatter.column);
          return;
        }
        case "BarFormat": {
          const vizFormatter = new google.visualization.BarFormat(
            formatter.options
          );
          vizFormatter.format(dataTable, formatter.column);
          return;
        }
        case "ColorFormat": {
          const vizFormatter = new google.visualization.ColorFormat(
            formatter.options
          );
          const { ranges } = formatter;
          if (ranges) {
            for (let range of ranges) {
              vizFormatter.addRange(...range);
            }
          }
          vizFormatter.format(dataTable, formatter.column);
          return;
        }
        case "DateFormat": {
          const vizFormatter = new google.visualization.DateFormat(
            formatter.options
          );
          vizFormatter.format(dataTable, formatter.column);
          return;
        }
        case "NumberFormat": {
          const vizFormatter = new google.visualization.NumberFormat(
            formatter.options
          );
          vizFormatter.format(dataTable, formatter.column);
          return;
        }
        case "PatternFormat": {
          const vizFormatter = new google.visualization.PatternFormat(
            formatter.options
          );
          vizFormatter.format(dataTable, formatter.column);
          return;
        }
        default: {
          console.warn(`Unknown formatter type: ${formatter.type}`);
          return;
        }
      }
    }
  };
}
