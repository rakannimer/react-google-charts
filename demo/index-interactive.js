import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Chart, googleChartLoader } from '../src/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderCharts: false };
    this.toggleCharts = this.toggleCharts.bind(this);
  }

  data() {
    return [['Age', 'Avg. Weight'], [70, 183], [55, 192], [40, 175], [20, 150], [8, 12], [4, 5.5]];
  }

  toggleCharts() {
    this.setState({ renderCharts: !this.state.renderCharts });
  }

  render() {
    googleChartLoader
      .init({
        chartPackages: Chart.defaultProps.chartPackages,
        chartVersion: Chart.defaultProps.chartVersion,
        chartLanguage: Chart.defaultProps.chartLanguage,
      })
      .then(() => {});
    return (
      <div>
        <div>
          <button onClick={this.toggleCharts}>Toggle Charts</button>
        </div>
        {this.state.renderCharts && (
          <div style={{ margin: 'auto', padding: '0px 5%', display: 'flex', flex: 'auto', flexFlow: 'row wrap' }}>
            <Chart
              chartType="LineChart"
              data={this.data()}
              options={{}}
              graph_id="LineChart"
              width="33%"
              height="400px"
              legend_toggle
            />
            <Chart
              chartType="ScatterChart"
              data={this.data()}
              options={{ colors: ['salmon'] }}
              graph_id="ScatterChart"
              width="33%"
              height="400px"
              legend_toggle
            />
            <Chart
              chartType="ColumnChart"
              data={this.data()}
              options={{ colors: ['limegreen'] }}
              graph_id="ColumnChart"
              width="33%"
              height="400px"
              legend_toggle
            />
            <Chart
              chartType="BarChart"
              data={this.data()}
              options={{ colors: ['orange'] }}
              graph_id="BarChart"
              width="33%"
              height="400px"
              legend_toggle
            />
            <Chart
              chartType="AreaChart"
              data={this.data()}
              options={{ colors: ['violet'] }}
              graph_id="AreaChart"
              width="33%"
              height="400px"
              legend_toggle
            />
            <Chart
              chartType="Table"
              data={this.data()}
              options={{ showRowNumber: false, width: '100%', height: '100%' }}
              graph_id="Table"
              width="33%"
              height="400px"
              legend_toggle
            />
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
