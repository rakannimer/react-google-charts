import * as React from "react";
//@ts-ignore
import * as Script from "react-load-script";

export type ReactGoogleChartsLoaderProps = {
  onError: Function;
  onLoad: Function;
};
export class ReactGoogleChartsLoader extends React.Component<
  ReactGoogleChartsLoaderProps
> {
  loadScript: boolean;
  constructor(props: ReactGoogleChartsLoaderProps) {
    super(props);
    const documentScripts = document.getElementsByTagName("script");
    this.loadScript = true;
    for (let i = 0; i < documentScripts.length; i += 1) {
      if (documentScripts[i].src.includes("gstatic.com/charts/loader.js")) {
        this.loadScript = false;
      }
    }
  }
  componentDidMount() {
    if (this.loadScript === false) {
      this.props.onLoad();
    }
  }
  render() {
    const { onError, onLoad } = this.props;
    if (this.loadScript === true) {
      return (
        <Script
          url="https://www.gstatic.com/charts/loader.js"
          onError={() => {
            onError();
          }}
          onLoad={onLoad}
        />
      );
    } else {
      return null;
    }
  }
}
