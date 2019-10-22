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
  path: [],
  speed: [0.01, 0.02],
  lockBoard: false,
  lockClearPath: false,
  setAlgorithm: () => {
    console.log("set algo");
  },
  createMaze: () => {
    console.log("create maze");
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
  },
  changeSpeed: speed => {
    console.log("algo");
  }
};

export const GridContext = React.createContext(myState);
