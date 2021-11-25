import { ReactGoogleChartProps } from "./types";

export const chartDefaultProps: Partial<ReactGoogleChartProps> = {
  // <DEPRECATED_PROPS>
  legend_toggle: false,
  // </DEPRECATED_PROPS>
  options: {},
  legendToggle: false,
  getChartWrapper: () => {},
  spreadSheetQueryParameters: {
    headers: 1,
    gid: 1,
  },
  rootProps: {},
  chartWrapperParams: {},
};
