import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["ID", "Parent", "Number Of Lines"],
  ["Shakespeare", null, 0],
  ["Comedies", "Shakespeare", null],
  ["Tragedies", "Shakespeare", null],
  ["Histories", "Shakespeare", null],
  ["As You Like It", "Comedies", null],
  ["Adam", "As You Like It", 10],
  ["Amiens", "As You Like It", 10],
  ["Audrey", "As You Like It", 12],
  ["Celia", "As You Like It", 108],
  ["Charles", "As You Like It", 8],
  ["Comedy Of Errors", "Comedies", null],
  ["Adriana", "Comedy Of Errors", 79],
  ["Aegeon", "Comedy Of Errors", 17],
  ["Aemilia", "Comedy Of Errors", 16],
  ["Angelo", "Comedy Of Errors", 31],
  ["Merchant Of Venice", "Comedies", null],
  ["Antonio", "Merchant Of Venice", 47],
  ["Balthasar", "Merchant Of Venice", 1],
  ["Bassanio", "Merchant Of Venice", 73],
  ["Duke (of Venice)", "Merchant Of Venice", 18],
  ["Gratiano", "Merchant Of Venice", 48],
  ["Midsummer Night's Dream", "Comedies", null],
  ["Bottom", "Midsummer Night's Dream", 59],
  ["Cobweb", "Midsummer Night's Dream", 4],
  ["Demetrius", "Midsummer Night's Dream", 48],
  ["Egeus", "Midsummer Night's Dream", 7],
  ["Fairy", "Midsummer Night's Dream", 4],
  ["The Tempest", "Comedies", null],
  ["Adrian", "The Tempest", 9],
  ["Alonso", "The Tempest", 40],
  ["Antonio, duke of Milan", "The Tempest", 57],
  ["Ariel", "The Tempest", 45],
  ["Henry VIII", "Histories", null],
  ["Anne Bullen", "Henry VIII", 18],
  ["Archbishop Cranmer", "Henry VIII", 21],
  ["Bishop Lincoln", "Henry VIII", 2],
  ["Brandon", "Henry VIII", 6],
];

export const options = {
  highlightOnMouseOver: true,
  maxDepth: 1,
  maxPostDepth: 2,
  minHighlightColor: "#8c6bb1",
  midHighlightColor: "#9ebcda",
  maxHighlightColor: "#edf8fb",
  minColor: "#009688",
  midColor: "#f7f7f7",
  maxColor: "#ee8100",
  headerHeight: 15,
  showScale: true,
  height: 500,
  useWeightedAverageForAggregation: true,
};

export function App() {
  return (
    <Chart
      chartType="TreeMap"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
