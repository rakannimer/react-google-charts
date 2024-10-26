import React from "react";
import { Chart, GoogleDataTable, GoogleViz } from "../src";
import * as barChartData from "../../../sandboxes/bar-chart/default/App";

export default {
  title: "DataTable",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  args: {
    chartType: "BarChart",
    width: 800,
    height: 600,
  },
};

export function Default({ data, chartType, ...rest }) {
  const [dataTable, setDataTable] = React.useState<GoogleDataTable | null>(null);

  const handleGoogleChartLoaded = (google: GoogleViz) => {
    const dataTable = google.visualization.arrayToDataTable(data);

    setDataTable(dataTable);
  };

  return <Chart onLoad={handleGoogleChartLoaded} data={dataTable ?? []} chartType={chartType} {...rest} />;
}

Default.args = {
  data: barChartData.data,
  options: barChartData.options,
};
