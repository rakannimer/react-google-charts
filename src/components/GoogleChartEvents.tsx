import * as React from "react";
import {
  GoogleViz,
  GoogleChartWrapper,
  ReactGoogleChartProps,
  ReactGoogleChartEvent
} from "../types";

import { ContextConsumer } from "../Context";

export type ChartDrawArgs = {
  data: ReactGoogleChartProps["data"];
};

export type GoogleChartEventProps = {
  googleChartWrapper: GoogleChartWrapper;
  google: GoogleViz;
};

export class GoogleChartEvents extends React.Component<GoogleChartEventProps> {
  shouldComponentUpdate() {
    return false;
  }
  listenToEvents({
    chartEvents,
    google,
    googleChartWrapper
  }: {
    googleChartWrapper: GoogleChartWrapper;
    google: GoogleViz;
    chartEvents: ReactGoogleChartEvent[] | null;
  }) {
    if (chartEvents === null) {
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
            props: this.props as any,
            google: google,
            eventArgs: args
          });
        }
      );
    }
  }
  render() {
    const { google, googleChartWrapper } = this.props;
    return (
      <ContextConsumer
        render={propsFromContext => {
          this.listenToEvents({
            chartEvents: propsFromContext.chartEvents || null,
            google,
            googleChartWrapper
          });
          return null;
        }}
      />
    );
  }
}
