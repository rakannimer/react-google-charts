import {
  GoogleViz,
  ReactGoogleChartProps,
  GoogleChartControlProp,
  GoogleChartControl,
  UseChartControlsParams,
} from "../types";
import { generateUniqueID } from "../generate-unique-id";

export type Props = ReactGoogleChartProps & {
  google: GoogleViz;
};

export type GoogleChartControlAndProp = {
  controlProp: GoogleChartControlProp;
  control: GoogleChartControl;
};

/**
 * An internal helper class for creating and managing Google Charts controls.
 * Offers high-level methods to interact with the Google Chart Controls.
 */
export class GoogleChartControlsInternal {
  /**
   * Initialize the controls once chart is ready
   */
  private static initializeControls = (
    googleChartControls: GoogleChartControlAndProp[],
  ) => {
    for (let i = 0; i < googleChartControls.length; i += 1) {
      const { controlType, options, controlWrapperParams } =
        googleChartControls[i].controlProp;
      if (controlWrapperParams && "state" in controlWrapperParams) {
        googleChartControls[i].control.setState(controlWrapperParams["state"]);
      }
      googleChartControls[i].control.setOptions(options);
      googleChartControls[i].control.setControlType(controlType);
    }
  };

  /**
   * After the controls are initialized, listen to the control events (ready, statechange, error) specified in the controlEvents prop
   */
  private static listenToControlEvents = (
    googleChartControls: GoogleChartControlAndProp[],
    props: UseChartControlsParams,
  ) => {
    const { google } = props;
    for (let chartControl of googleChartControls) {
      const { control, controlProp } = chartControl;
      const { controlEvents = [] } = controlProp;
      for (let event of controlEvents) {
        const { callback, eventName } = event;
        google.visualization.events.removeListener(
          control,
          eventName,
          callback,
        );
        google.visualization.events.addListener(
          control,
          eventName,
          (...args: any[]) => {
            callback({
              chartWrapper: null,
              controlWrapper: control,
              props: props,
              google: google,
              eventArgs: args,
            });
          },
        );
      }
    }
  };

  /**
   * If controlID is not provided, generate a unique controlID
   */
  private static createControlId = (id: undefined | string) => {
    let controlID: string;
    if (typeof id === "undefined") {
      controlID = `googlechart-control-${generateUniqueID()}`;
    } else {
      controlID = id;
    }
    return controlID;
  };

  /**
   * Map the control props to Google Chart Controls
   */
  private static createChartControls = (props: UseChartControlsParams) => {
    const { controls, google } = props;
    if (!controls) {
      return null;
    }

    return controls.map((control, i) => {
      const {
        controlID: controlIDMaybe,
        controlType,
        options: controlOptions,
        controlWrapperParams,
      } = control;
      const controlID = this.createControlId(controlIDMaybe);
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
  };

  static addControls = (props: UseChartControlsParams) => {
    const { chartWrapper, chartDashboard } = props;
    const googleChartControls = this.createChartControls(props);
    if (!googleChartControls || !chartDashboard || !chartWrapper) {
      return null;
    }
    chartDashboard.bind(
      googleChartControls.map(({ control }) => control),
      chartWrapper,
    );
    this.listenToControlEvents(googleChartControls, props);
    this.initializeControls(googleChartControls);
    return googleChartControls;
  };
}
