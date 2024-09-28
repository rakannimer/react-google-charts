import { useContext, useEffect } from "react";
import { ChartContext } from "../../Context";
import {
  GoogleChartWrapper,
  GoogleViz,
  ReactGoogleChartEvent,
  ReactGoogleChartProps,
} from "../../types";

export type GoogleChartEventsParams = ReactGoogleChartProps & {
  googleChartWrapper?: GoogleChartWrapper | null;
  google: GoogleViz;
  chartEvents?: ReactGoogleChartEvent[] | null;
};

const listenToEvents = (props: GoogleChartEventsParams) => {
  const { chartEvents, google, googleChartWrapper } = props;
  if (!chartEvents) {
    return;
  }
  if (!googleChartWrapper) {
    console.warn("listenToEvents was called before chart wrapper ready.");
    return;
  }
  google.visualization.events.removeAllListeners(googleChartWrapper);
  for (let event of chartEvents) {
    const { eventName, callback } = event;
    google.visualization.events.addListener(
      googleChartWrapper,
      eventName,
      (...args: any[]) => {
        callback({
          chartWrapper: googleChartWrapper,
          props,
          google: google,
          eventArgs: args,
        });
      }
    );
  }
};

export const useGoogleChartEvents = (props: GoogleChartEventsParams) => {
  const { googleChartWrapper, google } = props;
  const { chartEvents } = useContext(ChartContext);
  useEffect(() => {
    if (!googleChartWrapper) {
      return;
    }
    listenToEvents({ chartEvents, ...props });
  }, [chartEvents, googleChartWrapper, google]);
};
