import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

// Ref : https://developers.google.com/chart/interactive/docs/gallery/candlestickchart#Waterfall
const data = [
  ["Phrases"],
  ["cats are better than dogs"],
  ["cats eat kibble"],
  ["cats are better than hamsters"],
  ["cats are awesome"],
  ["cats are people too"],
  ["cats eat mice"],
  ["cats meowing"],
  ["cats in the cradle"],
  ["cats eat mice"],
  ["cats in the cradle lyrics"],
  ["cats eat kibble"],
  ["cats for adoption"],
  ["cats are family"],
  ["cats eat mice"],
  ["cats are better than kittens"],
  ["cats are evil"],
  ["cats are weird"],
  ["cats eat mice"]
];
const options = {
  wordtree: {
    format: "implicit",
    word: "cats"
  }
};
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="WordTree"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
