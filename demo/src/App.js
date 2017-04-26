import React from 'react';
import Chart from '../../src/components/Chart';

const App = () => (
  <div className={'my-pretty-chart-container'}>
    <Chart
      chartType="ScatterChart"
      data={[['Age', 'Weight'], [8, 12], [4, 5.5], [1, 2]]}
      options={{}}
      graph_id="ScatterChart"
      width="100%"
      height="400px"
      legend_toggle
    />
  </div>
);

export default App;
