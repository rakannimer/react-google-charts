import * as React from "react";
import { chartDefaultProps } from "./default-props";

import { ReactGoogleChartProps } from "./types";
const { Provider, Consumer } = React.createContext(chartDefaultProps);

export const ContextProvider = ({
  children,
  value,
}: {
  children: any;
  value: ReactGoogleChartProps;
}) => {
  return <Provider value={value}>{children}</Provider>;
};

export const ContextConsumer = ({
  render,
}: {
  render: (context: ReactGoogleChartProps) => JSX.Element | null;
}) => {
  return (
    <Consumer>
      {(context) => {
        return render(context as ReactGoogleChartProps);
      }}
    </Consumer>
  );
};
