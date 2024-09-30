import React from "react";
import { ReactGoogleChartProps } from "./types";
import { useLoadGoogleCharts } from "./hooks";
import { chartDefaultProps } from "./default-props";
import { GoogleChart } from "./components/GoogleChart";
import { ContextProvider } from "./Context";

/**
 * Loads Google Charts JS and renders the GoogleChart component.
 */
const ChartView: React.FC<ReactGoogleChartProps> = (props) => {
  const { google, isLoading, error } = useLoadGoogleCharts(props);
  if (isLoading) {
    return props.loader ?? null;
  }
  if (error) {
    return props.errorElement ?? null;
  }
  if (google) {
    return <GoogleChart google={google} {...props} />;
  }
  return null;
};

/**
 * Updates the context with the props and renders ChartView.
 */
export const Chart: React.FC<ReactGoogleChartProps> = (userProps) => {
  const props = { ...chartDefaultProps, ...userProps };
  return (
    <ContextProvider value={props}>
      <ChartView {...props} />
    </ContextProvider>
  );
};

export default Chart;
