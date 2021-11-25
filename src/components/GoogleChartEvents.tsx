import * as React from "react";
import {
  GoogleViz,
  GoogleChartWrapper,
  ReactGoogleChartProps,
  ReactGoogleChartEvent,
} from "../types";

import { ContextConsumer } from "../Context";

export type ChartDrawArgs = {
  data: ReactGoogleChartProps["data"];
};

export interface Props {
  googleChartWrapper: GoogleChartWrapper;
  google: GoogleViz;
}

export interface ListenToEventsArgs {
  googleChartWrapper: GoogleChartWrapper;
  google: GoogleViz;
  chartEvents: ReactGoogleChartEvent[] | null;
}

export class GoogleChartEvents extends React.Component<Props> {
  shouldComponentUpdate() {
    return false;
  }
  listenToEvents({
    chartEvents,
    google,
    googleChartWrapper,
  }: ListenToEventsArgs) {
    if (!chartEvents) {
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
            eventArgs: args,
          });
        }
      );
    }
  }
  render() {
    const { google, googleChartWrapper } = this.props;
    return (
      <ContextConsumer
        render={(propsFromContext) => {
          this.listenToEvents({
            chartEvents: propsFromContext.chartEvents || null,
            google,
            googleChartWrapper,
          });
          return null;
        }}
      />
    );
  }
}
