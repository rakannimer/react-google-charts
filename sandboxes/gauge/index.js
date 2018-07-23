import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

const options = {
  width: 400,
  height: 120,
  redFrom: 90,
  redTo: 100,
  yellowFrom: 75,
  yellowTo: 90,
  minorTicks: 5
};

const getRandomNumber = () => {
  return Math.random() * 100;
};

class App extends React.Component {
  state = {
    networkSpeed: 1,
    memory: 80,
    cpu: 55
  };
  intervalID = null;
  getData = () => {
    return [
      ["Label", "Value"],
      ["Memory", this.state.memory],
      ["CPU", this.state.cpu],
      ["Network", this.state.networkSpeed]
    ];
  };
  componentWillUnmount() {
    if (this.intervalID === null) return;
    clearInterval(this.intervalID);
  }
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState(state => {
        return {
          ...state,
          networkSpeed: getRandomNumber(),
          cpu: getRandomNumber(),
          memory: getRandomNumber()
        };
      });
    }, 3000);
  }
  render() {
    // console.log(this.getData());
    return (
      <div className="App">
        <Chart
          chartType="Gauge"
          width="100%"
          height="400px"
          data={this.getData()}
          options={options}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
