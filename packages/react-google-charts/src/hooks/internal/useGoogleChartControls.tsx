import * as React from "react";
import {
  GoogleViz,
  ReactGoogleChartProps,
  GoogleChartControlProp,
  GoogleChartControl,
  UseChartControlsParams,
} from "../../types";
import {
  FilterControl,
  GoogleChartControls,
} from "../../components/GoogleChartControls";
import { GoogleChartControlsInternal } from "../../utils/GoogleChartControlsInternal";

export type Props = ReactGoogleChartProps & {
  google: GoogleViz;
};

export type GoogleChartControlAndProp = {
  controlProp: GoogleChartControlProp;
  control: GoogleChartControl;
};

export const useChartControls = (props: UseChartControlsParams) => {
  const [chartControls, setChartControls] = React.useState<
    | { control: GoogleChartControl; controlProp: GoogleChartControlProp }[]
    | null
  >(null);

  /**
   * Render the container divs for the controls
   */
  const renderControl = (filter: FilterControl) => {
    const { chartWrapper, chartDashboard } = props;
    return (
      <GoogleChartControls
        {...props}
        isReady={Boolean(chartWrapper && chartDashboard)}
        chartControls={chartControls}
        filter={filter}
      />
    );
  };

  return {
    addControls: GoogleChartControlsInternal.addControls,
    chartControls,
    setChartControls,
    renderControl,
  };
};
