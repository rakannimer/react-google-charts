import React from "react";
import { Chart } from "react-google-charts";

export const data = [
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
  ["cats eat mice"],
];

export const options = {
  wordtree: {
    format: "implicit",
    word: "cats",
  },
};

export function App() {
  return (
    <Chart
      chartType="WordTree"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
