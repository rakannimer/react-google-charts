import * as React from "react";
import {
  GoogleViz,
  GoogleChartWrapper,
  ReactGoogleChartProps,
  GoogleChartControlProp,
  GoogleChartControl,
  GoogleChartDashboard,
  GoogleChartEditor,
} from "../types";
import { generateUniqueID } from "../generate-unique-id";
import { GoogleChartDataTable } from "./GoogleChartDataTable";
import { GoogleChartEvents } from "./GoogleChartEvents";

export type Props = {
  google: GoogleViz;
  graphID?: string | null;
  graph_id?: string | null;
  options?: ReactGoogleChartProps["options"];
  chartWrapperParams?: {};
  chartType: ReactGoogleChartProps["chartType"];
  width?: ReactGoogleChartProps["width"];
  height?: ReactGoogleChartProps["height"];
  style?: ReactGoogleChartProps["style"];
  className?: ReactGoogleChartProps["className"];
  rootProps?: ReactGoogleChartProps["rootProps"];
} & ReactGoogleChartProps;

export interface State {
  googleChartWrapper: GoogleChartWrapper | null;
  isReady: boolean;
  googleChartDashboard: GoogleChartDashboard | null;
  googleChartEditor: GoogleChartEditor | null;
  googleChartControls:
    | { control: GoogleChartControl; controlProp: GoogleChartControlProp }[]
    | null;
}

let controlCounter = 0;

export class GoogleChart extends React.Component<Props, State> {
  state = {
    googleChartWrapper: null,
    googleChartDashboard: null,
    googleChartControls: null,
    googleChartEditor: null,
    isReady: false,
  } as State;
  graphID: null | string = null;
  private dashboard_ref: React.RefObject<HTMLDivElement> = React.createRef();
  private toolbar_ref: React.RefObject<HTMLDivElement> = React.createRef();
  private getGraphID = () => {
    const { graphID, graph_id } = this.props;
    let instanceGraphID: string;
    if (!graphID && !graph_id) {
      if (!this.graphID) {
        instanceGraphID = generateUniqueID();
      } else {
        instanceGraphID = this.graphID;
      }
    } else if (graphID && !graph_id) {
      instanceGraphID = graphID as string;
    } else if (graph_id && !graphID) {
      instanceGraphID = graph_id as string;
    } else {
      instanceGraphID = graphID as string;
    }
    this.graphID = instanceGraphID;
    return this.graphID as string;
  };
  private getControlID = (id: undefined | string, index: number) => {
    controlCounter += 1;
    let controlID: string;
    if (typeof id === "undefined") {
      controlID = `googlechart-control-${index}-${controlCounter}`;
    } else {
      controlID = id;
    }
    return controlID;
  };

  addControls = (
    googleChartWrapper: GoogleChartWrapper,
    googleChartDashboard: GoogleChartDashboard
  ) => {
    const { google, controls } = this.props;

    const googleChartControls = !controls
      ? null
      : controls.map((control, i) => {
          const {
            controlID: controlIDMaybe,
            controlType,
            options: controlOptions,
            controlWrapperParams,
          } = control;
          const controlID = this.getControlID(controlIDMaybe, i);
          return {
            controlProp: control,
            control: new google.visualization.ControlWrapper({
              containerId: controlID,
              controlType,
              options: controlOptions,
              ...controlWrapperParams,
            }),
          };
        });
    if (!googleChartControls) {
      return null;
    }
    googleChartDashboard.bind(
      googleChartControls.map(({ control }) => control),
      googleChartWrapper
    );
    for (let chartControl of googleChartControls) {
      const { control, controlProp } = chartControl;
      const { controlEvents = [] } = controlProp;
      for (let event of controlEvents) {
        const { callback, eventName } = event;
        google.visualization.events.removeListener(
          control,
          eventName,
          callback
        );
        google.visualization.events.addListener(
          control,
          eventName,
          (...args: any[]) => {
            callback({
              chartWrapper: googleChartWrapper,
              controlWrapper: control,
              props: this.props as any,
              google: google,
              eventArgs: args,
            });
          }
        );
      }
    }
    return googleChartControls;
  };

  componentDidMount() {
    const {
      options,
      google,
      chartType,
      chartWrapperParams,
      toolbarItems,
      getChartEditor,
      getChartWrapper,
    } = this.props;

    const chartConfig = {
      chartType,
      options,
      containerId: this.getGraphID(),
      ...chartWrapperParams,
    };
    const googleChartWrapper = new google.visualization.ChartWrapper(
      chartConfig
    );
    googleChartWrapper.setOptions(options || {});
    if (getChartWrapper) {
      getChartWrapper(googleChartWrapper, google);
    }
    const googleChartDashboard = new google.visualization.Dashboard(
      this.dashboard_ref
    );

    const googleChartControls = this.addControls(
      googleChartWrapper,
      googleChartDashboard
    );
    if (toolbarItems) {
      google.visualization.drawToolbar(
        this.toolbar_ref.current as HTMLDivElement,
        toolbarItems
      );
    }
    let googleChartEditor: null | GoogleChartEditor = null;
    if (getChartEditor) {
      googleChartEditor = new google.visualization.ChartEditor();
      getChartEditor({
        chartEditor: googleChartEditor,
        chartWrapper: googleChartWrapper,
        google,
      });
    }

    this.setState({
      googleChartEditor,
      googleChartControls: googleChartControls,
      googleChartDashboard: googleChartDashboard,
      googleChartWrapper,
      isReady: true,
    });
  }
  componentDidUpdate() {
    if (!this.state.googleChartWrapper) return;
    if (!this.state.googleChartDashboard) return;
    if (!this.state.googleChartControls) return;

    const { controls } = this.props;
    if (controls) {
      for (let i = 0; i < controls.length; i += 1) {
        const { controlType, options, controlWrapperParams } = controls[i];
        if (controlWrapperParams && "state" in controlWrapperParams) {
          this.state.googleChartControls[i].control.setState(
            controlWrapperParams["state"]
          );
        }
        this.state.googleChartControls[i].control.setOptions(options);
        this.state.googleChartControls[i].control.setControlType(controlType);
      }
    }
  }
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.state.isReady !== nextState.isReady ||
      nextProps.controls !== this.props.controls
    );
  }
  renderChart = () => {
    const { width, height, options, style, className, rootProps, google } =
      this.props;

    const divStyle = {
      height: height || (options && options.height),
      width: width || (options && options.width),
      ...style,
    };
    return (
      <div
        id={this.getGraphID()}
        style={divStyle}
        className={className}
        {...rootProps}
      >
        {this.state.isReady && this.state.googleChartWrapper !== null ? (
          <React.Fragment>
            <GoogleChartDataTable
              googleChartWrapper={this.state.googleChartWrapper}
              google={google}
              googleChartDashboard={this.state.googleChartDashboard}
            />
            <GoogleChartEvents
              googleChartWrapper={this.state.googleChartWrapper}
              google={google}
            />
          </React.Fragment>
        ) : null}
      </div>
    );
  };
  renderControl = (
    filter = ({
      control,
      controlProp,
    }: {
      control: GoogleChartControl;
      controlProp: GoogleChartControlProp;
    }) => true
  ) => {
    return this.state.isReady && this.state.googleChartControls !== null ? (
      <React.Fragment>
        {this.state.googleChartControls
          .filter(({ controlProp, control }) => {
            return filter({ control, controlProp });
          })
          .map(({ control, controlProp }) => {
            return (
              <div
                key={control.getContainerId()}
                id={control.getContainerId()}
              />
            );
          })}
      </React.Fragment>
    ) : null;
  };
  renderToolBar = () => {
    if (!this.props.toolbarItems) return null;
    return <div ref={this.toolbar_ref} />;
  };
  render() {
    const { width, height, options, style } = this.props;

    const divStyle = {
      height: height || (options && options.height),
      width: width || (options && options.width),
      ...style,
    };
    if (this.props.render) {
      return (
        <div ref={this.dashboard_ref} style={divStyle}>
          <div ref={this.toolbar_ref} id="toolbar" />
          {this.props.render({
            renderChart: this.renderChart,
            renderControl: this.renderControl,
            renderToolbar: this.renderToolBar,
          })}
        </div>
      );
    } else {
      return (
        <div ref={this.dashboard_ref} style={divStyle}>
          {this.renderControl(({ controlProp }) => {
            return controlProp.controlPosition !== "bottom";
          })}
          {this.renderChart()}
          {this.renderControl(({ controlProp }) => {
            return controlProp.controlPosition === "bottom";
          })}
          {this.renderToolBar()}
        </div>
      );
    }
  }
}
