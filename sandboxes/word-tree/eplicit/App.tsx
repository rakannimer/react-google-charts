import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["id", "childLabel", "parent", "size", { role: "style" }],
  [0, "Life", -1, 1, "black"],
  [1, "Archaea", 0, 1, "black"],
  [2, "Eukarya", 0, 5, "black"],
  [3, "Bacteria", 0, 1, "black"],
  [4, "Crenarchaeota", 1, 1, "black"],
  [5, "Euryarchaeota", 1, 1, "black"],
  [6, "Korarchaeota", 1, 1, "black"],
  [7, "Nanoarchaeota", 1, 1, "black"],
  [8, "Thaumarchaeota", 1, 1, "black"],
  [9, "Amoebae", 2, 1, "black"],
  [10, "Plants", 2, 1, "black"],
  [11, "Chromalveolata", 2, 1, "black"],
  [12, "Opisthokonta", 2, 5, "black"],
  [13, "Rhizaria", 2, 1, "black"],
  [14, "Excavata", 2, 1, "black"],
  [15, "Animalia", 12, 5, "black"],
  [16, "Fungi", 12, 2, "black"],
  [17, "Parazoa", 15, 2, "black"],
  [18, "Eumetazoa", 15, 5, "black"],
  [19, "Radiata", 18, 2, "black"],
  [20, "Bilateria", 18, 5, "black"],
  [21, "Orthonectida", 20, 2, "black"],
  [22, "Rhombozoa", 20, 2, "black"],
  [23, "Acoelomorpha", 20, 1, "black"],
  [24, "Deuterostomia", 20, 5, "black"],
  [25, "Chaetognatha", 20, 2, "black"],
  [26, "Protostomia", 20, 2, "black"],
  [27, "Chordata", 24, 5, "black"],
  [28, "Hemichordata", 24, 1, "black"],
  [29, "Echinodermata", 24, 1, "black"],
  [30, "Xenoturbellida", 24, 1, "black"],
  [31, "Vetulicolia", 24, 1, "black"],
];

export const options = {
  colors: ["black", "black", "black"],
  wordtree: {
    format: "explicit",
    type: "suffix",
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
