import {
  ChartWrapperOptions,
  GoogleDataTableCell,
  GoogleDataTableColumn,
  ReactGoogleChartEvent,
  GoogleChartAction,
  GoogleChartWrapper,
  GoogleViz,
  GoogleChartControlProp,
  ReactGoogleChartDashboardRender
} from "./types";

export const chartDefaultProps = {
  // <DEPRECATED_PROPS>
  graph_id: null as null | string,
  legend_toggle: false,
  // </DEPRECATED_PROPS>
  graphID: null as null | string,
  options: {
    colors: null as null | string[]
  } as ChartWrapperOptions["options"],
  data: null,
  rows: null as null | GoogleDataTableCell[][],
  columns: null as null | GoogleDataTableColumn[],
  diffdata: null as null | { old: any; new: any },
  chartEvents: null as null | ReactGoogleChartEvent[],
  legendToggle: false,
  chartActions: null as null | GoogleChartAction[],
  getChartWrapper: (chartWrapper: GoogleChartWrapper, google: GoogleViz) => {},
  className: "",
  style: {},
  formatters: null,
  spreadSheetUrl: null,
  spreadSheetQueryParameters: {
    headers: 1,
    gid: 1
  },
  rootProps: {},
  chartWrapperParams: {},
  controls: null as GoogleChartControlProp[] | null,
  render: null as ReactGoogleChartDashboardRender | null
};
