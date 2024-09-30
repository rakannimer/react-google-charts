import * as React from "react";
import { chartDefaultProps } from "./default-props";
import { ReactGoogleChartProps } from "./types";

export const ChartContext = React.createContext(chartDefaultProps);

export const ContextProvider = ({
  children,
  value,
}: {
  children: any;
  value: ReactGoogleChartProps;
}) => {
  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
};
