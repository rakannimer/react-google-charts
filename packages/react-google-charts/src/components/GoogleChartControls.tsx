import React from "react";
import { GoogleChartControlAndProp } from "../hooks/internal/useGoogleChartControls";

export type FilterControl = (control: GoogleChartControlAndProp) => boolean;

type Props = {
  isReady: boolean;
  chartControls: GoogleChartControlAndProp[] | null;
  filter?: FilterControl;
};
export const GoogleChartControls = (props: Props) => {
  const { isReady, chartControls, filter } = props;
  if (!isReady || !chartControls || !chartControls?.length) {
    return null;
  }
  return (
    <>
      {chartControls
        .filter(({ controlProp, control }) => {
          return filter ? filter({ control, controlProp }) : true;
        })
        .map(({ control }) => {
          return (
            <div key={control.getContainerId()} id={control.getContainerId()} />
          );
        })}
    </>
  );
};
