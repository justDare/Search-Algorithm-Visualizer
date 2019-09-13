import React from "react";
import Navbar from "./Navbar.jsx";
import Grid from "./Grid.jsx";

import { GridContext, myState } from "../grid-context";

import { initGrid } from "../utilities/initGrid";
import { getCoordinates } from "../utilities/getCoordinates";
import { movePoint } from "../utilities/movePoint";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setAlgorithm = algorithm => {
      this.setState({ algorithm: algorithm });
    };
    this.resetBoard = () => {
      this.setState({ grid: initGrid() });
      this.setState({
        startPoint: this.getStart(),
        target: this.getTarget()
      });
    };
    this.toggleMousePressed = id => {
      // mouse is pressed, toggle off and empty selected cell point
      if (this.state.mousePressed) {
        this.setState({ mousePressed: false });
        this.setState({ selectedCellVal: null });
        // mouse isn't pressed, toggle on and set selected cell
      } else {
        this.setState({ mousePressed: true });
        const indexes = getCoordinates(id);
        this.setState({
          selectedCellVal: this.state.grid[indexes[0]][indexes[1]]
        });

        console.log(
          "selected cell: " + this.state.grid[indexes[0]][indexes[1]]
        );
      }
    };
    this.toggleCell = (id, cellValue) => {
      const indexes = getCoordinates(id);
      console.log(indexes);
      if (this.state.selectedCellVal === "start") {
        if (this.state.grid[indexes[0]][indexes[1]] !== "end") {
          const newGrid = movePoint(
            this.state.grid,
            this.state.startPoint[0],
            this.state.startPoint[1],
            indexes[0],
            indexes[1],
            "start"
          );
          this.setState({ startPoint: indexes });
          this.setState({
            grid: newGrid
          });
        }
      } else if (this.state.selectedCellVal === "end") {
        if (this.state.grid[indexes[0]][indexes[1]] !== "start") {
          console.log("here");
          const newGrid = movePoint(
            this.state.grid,
            this.state.target[0],
            this.state.target[1],
            indexes[0],
            indexes[1],
            "end"
          );
          this.setState({ target: indexes });
          this.setState({
            grid: newGrid
          });
        }
      } else {
        let newCellValue;
        if (cellValue === "wall") newCellValue = "unvisited";
        else if (cellValue === "unvisited") newCellValue = "wall";
        this.setState({
          grid: initGrid.updateGrid(
            this.state.grid,
            indexes[1],
            indexes[0],
            newCellValue
          )
        });
      }
    };
    this.drag = id => {
      //   console.log("dragging " + this.state.selectedCellVal);
    };
    this.initGrid = () => {
      return initGrid();
    };
    this.getStart = () => {
      const dimensions = initGrid.getGridDimensions();
      const start = initGrid.getStartPoints(dimensions[0], dimensions[1]);
      return start;
    };
    this.getTarget = () => {
      const dimensions = initGrid.getGridDimensions();
      const target = initGrid.getTargetPoints(dimensions[0], dimensions[1]);
      return target;
    };

    this.state = {
      grid: this.initGrid(),
      startPoint: this.getStart(),
      target: this.getTarget(),
      selectedCells: myState.grid,
      algorithm: myState.algorithm,
      mousePressed: myState.mousePressed,
      selectedCellVal: myState.selectedCellVal,
      resetBoard: this.resetBoard,
      setAlgorithm: this.setAlgorithm,
      toggleMousePressed: this.toggleMousePressed,
      toggleCell: this.toggleCell,
      drag: this.drag
    };
  }

  render() {
    return (
      <div>
        <GridContext.Provider value={this.state}>
          <Navbar />
          <Grid />
        </GridContext.Provider>
      </div>
    );
  }
}

export default App;
