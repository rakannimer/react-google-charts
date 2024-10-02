import { useEffect } from "react";
import {
  GoogleChartWrapper,
  GoogleViz,
  ReactGoogleChartProps,
} from "../../types";

export type GoogleChartEventsParams = ReactGoogleChartProps & {
  googleChartWrapper?: GoogleChartWrapper | null;
  google: GoogleViz;
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
  return chartEvents.map(({ eventName, callback }) => {
    return google.visualization.events.addListener(
      googleChartWrapper,
      eventName,
      (...args) => {
        callback({
          chartWrapper: googleChartWrapper,
          props,
          google: google,
          eventArgs: args,
        });
      },
    );
  });
};

export const useGoogleChartEvents = (props: GoogleChartEventsParams) => {
  useEffect(() => {
    if (!props.googleChartWrapper) return;

    const listeners = listenToEvents(props);

    return () => {
      listeners?.forEach((listener) => {
        props.google.visualization.events.removeListener(listener);
      });
    };
  }, [props]);
};
