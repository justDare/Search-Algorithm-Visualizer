import React from "react";

export const myState = {
  grid: [],
  startPoint: null,
  target: null,
  selectedCells: [],
  algorithm: null,
  mousePressed: false,
  selectedCellVal: false,
  visited: [],
  setAlgorithm: () => {
    console.log("set algo");
  },
  resetBoard: () => {
    console.log("reset");
  },
  toggleMousePressed: () => {
    console.log("mouse pressed?");
  },
  toggleCell: id => {
    console.log(id);
  },
  visualize: algorithm => {
    console.log("algo");
  }
};

export const GridContext = React.createContext(myState);
