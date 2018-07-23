import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram

const data = [
  ["Director (Year)", "Rotten Tomatoes", "IMDB"],
  ["Alfred Hitchcock (1935)", 8.4, 7.9],
  ["Ralph Thomas (1959)", 6.9, 6.5],
  ["Don Sharp (1978)", 6.5, 6.4],
  ["James Hawes (2008)", 4.4, 6.2]
];
const options = {
  title: "The decline of 'The 39 Steps'",
  vAxis: { title: "Accumulated Rating" },
  isStacked: true
};
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="SteppedAreaChart"
          width="80%"
          height="400px"
          data={data}
          options={options}
          legendToggle
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
