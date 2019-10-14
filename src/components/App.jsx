import React from "react";
import Navbar from "./Navbar.jsx";
import Grid from "./Grid.jsx";

import { GridContext, myState } from "../grid-context";

// helper utilities
import { initGrid } from "../utilities/initGrid";
import { getCoordinates } from "../utilities/getCoordinates";
import { movePoint } from "../utilities/movePoint";
import { removeCells } from "../utilities/removeCells";

// algorithms
import { DFS } from "../utilities/searchAlgorithms/DFS";
import { BFS } from "../utilities/searchAlgorithms/BFS";

// boards and mazes creation
import { mazeHandler } from "../utilities/mazeHandler";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setAlgorithm = algorithm => {
      this.setState({ algorithm: algorithm });
    };
    this.createMaze = maze => {
      this.setState({ grid: mazeHandler(maze, this.state.grid) });
    };
    // add options to preserve walls, start & end points and weights
    this.resetBoard = () => {
      this.setState({ grid: initGrid(), path: [], visited: [] });
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
      }
    };
    this.toggleCell = (id, cellValue) => {
      const indexes = getCoordinates(id);
      const curVal = this.state.grid[indexes[0]][indexes[1]];

      if (
        this.state.selectedCellVal === "start" ||
        this.state.selectedCellVal === "end"
      ) {
        let newCell, points;
        if (
          this.state.selectedCellVal === "start" &&
          this.state.grid[indexes[0]][indexes[1]] !== "end"
        ) {
          newCell = "start";
          points = [this.state.startPoint[0], this.state.startPoint[1]];
          this.setState({ startPoint: indexes });
        } else if (
          this.state.selectedCellVal === "end" &&
          this.state.grid[indexes[0]][indexes[1]] !== "start"
        ) {
          newCell = "end";
          points = [this.state.target[0], this.state.target[1]];
          this.setState({ target: indexes });
        }

        if (points !== undefined) {
          const newGrid = movePoint(
            this.state.grid,
            points[0],
            points[1],
            indexes[0],
            indexes[1],
            newCell
          );

          this.setState(
            {
              grid: newGrid
            },
            () => {
              if (curVal === "wall")
                this.setState({
                  lastCell: { cell: "wall", points: [indexes[0], indexes[1]] }
                });
              if (this.state.lastCell.cell === "wall") {
                this.setState({
                  grid: initGrid.updateGrid(
                    this.state.grid,
                    this.state.lastCell.points[1],
                    this.state.lastCell.points[0],
                    "wall"
                  )
                });
              }
            }
          );
        }
      } else {
        let newCellValue;
        if (cellValue === "wall") newCellValue = "unvisited";
        else if (
          cellValue === "unvisited" ||
          cellValue === "visited" ||
          cellValue === "path" ||
          cellValue === "weight" ||
          cellValue === "visited weight" ||
          cellValue === "unvisited weight"
        )
          newCellValue = "wall";
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

    this.visualize = algorithm => {
      let grid = this.setState({
        grid: removeCells(this.state.grid, true, true, false),
        willVisualize: true
      });
    };

    this.state = {
      grid: this.initGrid(),
      startPoint: this.getStart(),
      target: this.getTarget(),
      selectedCells: myState.grid,
      algorithm: myState.algorithm,
      mousePressed: myState.mousePressed,
      selectedCellVal: myState.selectedCellVal,
      visited: myState.visited,
      path: myState.path,
      lastCell: { cell: null, points: [] },
      resetBoard: this.resetBoard,
      setAlgorithm: this.setAlgorithm,
      createMaze: this.createMaze,
      toggleMousePressed: this.toggleMousePressed,
      visualize: this.visualize,
      willVisualize: false,
      toggleCell: this.toggleCell,
      drag: this.drag
    };
  }

  showPath = () => {
    let results;
    let algorithm = this.state.algorithm;

    // use selected search
    switch (algorithm) {
      case "DFS":
        results = DFS(
          this.state.grid,
          this.state.startPoint,
          this.state.target
        );

        break;
      case "BFS":
        results = BFS(
          this.state.grid,
          this.state.startPoint,
          this.state.target
        );
        break;
      default:
        this.setState({
          willVisualize: false
        });
        return;
    }

    // animate grid with results of search
    setTimeout(() => {
      this.setState({
        visited: results.visited,
        grid: results.newGrid
      });
    }, 1);
    setTimeout(() => {
      this.setState({
        grid: results.gridWithPath,
        path: results.pathArray,
        willVisualize: false
      });
    }, results.visited.length * 0.01 * 1000 + 900);
  };

  componentDidUpdate(previousProps, previousState) {
    if (
      this.state.willVisualize &&
      previousState.willVisualize !== this.state.willVisualize
    ) {
      this.showPath();
    }
  }

  render() {
    return (
      <div>
        <GridContext.Provider value={this.state}>
          <Navbar />
          <Grid visited={this.state.visited} path={this.state.path} />
        </GridContext.Provider>
      </div>
    );
  }
}

export default App;
