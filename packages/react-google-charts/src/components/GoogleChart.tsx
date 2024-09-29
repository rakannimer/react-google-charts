import * as React from "react";
import {
  GoogleViz,
  GoogleChartWrapper,
  ReactGoogleChartProps,
  GoogleChartDashboard,
  GoogleChartEditor,
} from "../types";
import { useChartControls } from "../hooks/internal/useGoogleChartControls";
import { useChartId } from "../hooks/internal/useChartId";
import { useGoogleChartDataTable } from "../hooks/internal/useGoogleChartDataTable";
import { useGoogleChartEvents } from "../hooks/internal/useGoogleChartEvents";

type Props = ReactGoogleChartProps & {
  google: GoogleViz;
};

export const GoogleChart: React.FC<Props> = (props) => {
  const [googleChartWrapper, setGoogleChartWrapper] =
    React.useState<GoogleChartWrapper | null>(null);
  // const [isReady, setIsReady] = React.useState<boolean>(false);
  const [googleChartDashboard, setGoogleChartDashboard] =
    React.useState<GoogleChartDashboard | null>(null);

  const { addControls, setChartControls, renderControl } = useChartControls({
    ...props,
    chartDashboard: googleChartDashboard,
    chartWrapper: googleChartWrapper,
  });
  useGoogleChartEvents({
    ...props,
    googleChartWrapper,
  });
  const { chartId } = useChartId(props);
  const dashboardRef = React.useRef<HTMLDivElement>(null);
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const {
      options,
      google,
      chartType,
      chartWrapperParams,
      toolbarItems,
      getChartEditor,
      getChartWrapper,
      onLoad,
    } = props;

    const chartConfig = {
      chartType,
      options,
      containerId: chartId,
      ...chartWrapperParams,
    };
    // Create ChartWrapper instance, pass it to the user and store it in state
    const chartWrapper = new google.visualization.ChartWrapper(chartConfig);
    chartWrapper.setOptions(options || {});
    getChartWrapper?.(chartWrapper, google);

    // Create Dashboard instance, needed for controls
    const chartDashboard = new google.visualization.Dashboard(
      dashboardRef.current,
    );

    // Create toolbar if needed
    if (toolbarItems) {
      google.visualization.drawToolbar(
        toolbarRef.current as HTMLDivElement,
        toolbarItems,
      );
    }

    // Create ChartEditor instance if needed and pass it to the user
    let chartEditor: GoogleChartEditor | null = null;
    if (getChartEditor) {
      chartEditor = new google.visualization.ChartEditor();
      getChartEditor({
        chartEditor,
        chartWrapper,
        google,
      });
    }
    // Create and add controls to the chart / dashboard
    const chartControls = addControls({
      ...props,
      chartDashboard,
      chartWrapper,
    });
    setGoogleChartWrapper(chartWrapper);
    setGoogleChartDashboard(chartDashboard);
    setChartControls(chartControls);
    onLoad?.(google, {
      google,
      chartWrapper,
      chartEditor,
      chartDashboard,
    });
  }, []);

  useGoogleChartDataTable({
    ...props,
    googleChartWrapper,
    googleChartDashboard,
  });
  const renderChart = () => {
    const { width, height, options, style, className, rootProps, google } =
      props;

    const divStyle = {
      height: height || (options && options.height),
      width: width || (options && options.width),
      ...style,
    };
    return (
      <div id={chartId} style={divStyle} className={className} {...rootProps} />
    );
  };

  const renderToolBar = () => {
    if (!props.toolbarItems) return null;
    return <div ref={toolbarRef} />;
  };

  const { width, height, options, style } = props;

  const divStyle = {
    height: height || (options && options.height),
    width: width || (options && options.width),
    ...style,
  };

  // If render prop is provided, give the user full control over the rendering by passing renderChart, renderControl and renderToolbar functions
  if (props.render) {
    return (
      <div ref={dashboardRef} style={divStyle}>
        <div ref={toolbarRef} id="toolbar" />
        {props.render({
          renderChart,
          renderControl,
          renderToolbar: renderToolBar,
        })}
      </div>
    );
  } else {
    return (
      <div ref={dashboardRef} style={divStyle}>
        {renderControl(
          ({ controlProp }) => controlProp.controlPosition !== "bottom",
        )}
        {renderChart()}
        {renderControl(
          ({ controlProp }) => controlProp.controlPosition === "bottom",
        )}
        {renderToolBar()}
      </div>
    );
  }
};

export default GoogleChart;
