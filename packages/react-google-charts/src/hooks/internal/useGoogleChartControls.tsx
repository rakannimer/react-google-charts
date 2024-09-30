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

const useCreateChartControls = (
  controls: ReactGoogleChartProps["controls"],
) => {
  const [chartControls, setChartControls] = React.useState<
    GoogleChartControl[] | null
  >(null);

  const controlAndProp = React.useMemo(() => {
    if (!chartControls || !controls) return null;

    return controls
      .map((controlProp, i): GoogleChartControlAndProp | undefined => {
        const control: GoogleChartControl | undefined = chartControls[i];
        return control ? { controlProp, control } : undefined;
      })
      .flatMap((controlAndProp) => (controlAndProp ? [controlAndProp] : []));
  }, [chartControls, controls]);

  return [controlAndProp, setChartControls] as const;
};

const useListenToControlEvents = (
  chartControls: GoogleChartControlAndProp[],
  props: UseChartControlsParams,
) => {
  React.useEffect(() => {
    const listeners = GoogleChartControlsInternal.listenToControlEvents(
      chartControls ?? [],
      props,
    );

    return () => {
      listeners.forEach((listener) => {
        props.google.visualization.events.removeListener(listener);
      });
    };
  }, [chartControls, props]);
};

export type Props = ReactGoogleChartProps & {
  google: GoogleViz;
};

export type GoogleChartControlAndProp = {
  controlProp: GoogleChartControlProp;
  control: GoogleChartControl;
};

export const useChartControls = (props: UseChartControlsParams) => {
  const [chartControls, setChartControls] = useCreateChartControls(
    props.controls,
  );

  useListenToControlEvents(chartControls ?? [], props);

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
    setChartControls,
    renderControl,
  };
};
