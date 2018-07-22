import * as React from "react";
import * as ReactDOM from "react-dom";

import { Chart } from "../src/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderCharts: false };
    this.toggleCharts = this.toggleCharts.bind(this);
  }

  data() {
    return [
      ["Age", "Avg. Weight"],
      [70, 183],
      [55, 192],
      [40, 175],
      [20, 150],
      [8, 12],
      [4, 5.5]
    ];
  }

  toggleCharts() {
    this.setState({ renderCharts: !this.state.renderCharts });
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.toggleCharts}>Toggle Charts</button>
        </div>
        {this.state.renderCharts && (
          <div
            style={{
              margin: "auto",
              padding: "0px 5%",
              display: "flex",
              flex: "auto",
              flexFlow: "row wrap"
            }}
          >
            <Chart
              chartType="LineChart"
              rows={[[8, 12], [4, 5.5]]}
              columns={[
                {
                  type: "number",
                  label: "Age",
                  id: "Age"
                },
                {
                  type: "number",
                  label: "Weight",
                  id: "Weight"
                }
              ]}
              options={{}}
              graphID="LineChart"
              width="33%"
              height="400px"
              legendToggle
            />
            <Chart
              chartType="ScatterChart"
              data={this.data()}
              options={{ colors: ["salmon"] }}
              graphID="ScatterChart"
              width="33%"
              height="400px"
              legendToggle
            />
            <Chart
              chartType="ColumnChart"
              data={this.data()}
              options={{ colors: ["limegreen"] }}
              graphID="ColumnChart"
              width="33%"
              height="400px"
              legendToggle
            />
            <Chart
              chartType="BarChart"
              data={this.data()}
              options={{ colors: ["orange"] }}
              graphID="BarChart"
              width="33%"
              height="400px"
              legendToggle
            />
            <Chart
              chartType="AreaChart"
              data={this.data()}
              options={{ colors: ["violet"] }}
              graphID="AreaChart"
              width="33%"
              height="400px"
              legendToggle
            />
            <Chart
              chartType="Table"
              data={this.data()}
              options={{ showRowNumber: false, width: "100%", height: "100%" }}
              graphID="Table"
              width="33%"
              height="400px"
              legendToggle
            />
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
