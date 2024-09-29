import * as React from "react";
import { ReactGoogleChartProps } from "../../types";
import { generateUniqueID } from "../../generate-unique-id";

export const useChartId = (
  props: Pick<ReactGoogleChartProps, "graphID" | "graph_id">,
) => {
  const chartIdRef = React.useRef<string | null>(null);
  const getChartId = (): string => {
    const { graphID, graph_id } = props;
    const chartIdFromProps = graphID || graph_id;
    let currentChartId: string;
    if (chartIdFromProps) {
      currentChartId = chartIdFromProps as string;
    } else {
      currentChartId = chartIdRef.current || generateUniqueID();
    }
    chartIdRef.current = currentChartId;
    return chartIdRef.current as string;
  };
  const chartId = getChartId();
  return { chartId };
};
