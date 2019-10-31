import React from "react";
import Navbar from "./Navbar.jsx";
import Grid from "./Grid.jsx";
import AlgoInfo from "./AlgoInfo.jsx";

import { GridContext, myState } from "../grid-context";

// helper utilities
import { initGrid } from "../utilities/initGrid";
import { getCoordinates } from "../utilities/getCoordinates";
import { movePoint } from "../utilities/movePoint";
import { removeCells } from "../utilities/removeCells";

// algorithms
import { DFS } from "../utilities/searchAlgorithms/DFS";
import { BFS } from "../utilities/searchAlgorithms/BFS";
import { Dijkstra } from "../utilities/searchAlgorithms/Dijkstra";
import { AStar } from "../utilities/searchAlgorithms/AStar";
import { Greedy } from "../utilities/searchAlgorithms/Greedy";

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
    this.resetBoard = resetSearch => {
      if (!resetSearch) {
        this.setState({ grid: initGrid(), path: [], visited: [] });
        this.setState({
          startPoint: this.getStart(),
          target: this.getTarget(),
          algoStats: []
        });
      } else {
        this.setState({
          grid: removeCells(this.state.grid, true, true, false),
          path: [],
          visited: [],
          lockBoard: false,
          algoStats: []
        });
      }
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
              if (curVal === "wall" || curVal.includes("weight"))
                this.setState({
                  lastCell: { cell: curVal, points: [indexes[0], indexes[1]] }
                });
              if (
                this.state.lastCell.cell === "wall" ||
                this.state.lastCell.cell.includes("weight")
              ) {
                this.setState({
                  grid: initGrid.updateGrid(
                    this.state.grid,
                    this.state.lastCell.points[1],
                    this.state.lastCell.points[0],
                    this.state.lastCell.cell
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
      this.setState({
        willVisualize: true
      });
    };

    this.changeSpeed = speed => {
      this.setState({ speed: speed });
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
      lastCell: { cell: "", points: [] },
      resetBoard: this.resetBoard,
      setAlgorithm: this.setAlgorithm,
      createMaze: this.createMaze,
      toggleMousePressed: this.toggleMousePressed,
      visualize: this.visualize,
      willVisualize: false,
      toggleCell: this.toggleCell,
      drag: this.drag,
      speed: myState.speed,
      changeSpeed: this.changeSpeed,
      lockBoard: myState.lockBoard,
      lockClearPath: myState.lockClearPath,
      algoStats: []
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
      case "Dijkstra":
        results = Dijkstra(
          this.state.grid,
          this.state.startPoint,
          this.state.target
        );
        break;
      case "A*":
        results = AStar(
          this.state.grid,
          this.state.startPoint,
          this.state.target
        );
        break;
      case "Greedy":
        results = Greedy(
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
        grid: results.newGrid,
        lockBoard: true,
        lockClearPath: true
      });
    }, 1);

    const showPath = results.visited.length * this.state.speed[0] * 1000 + 900;

    setTimeout(() => {
      this.setState({
        grid: results.gridWithPath,
        path: results.pathArray,
        willVisualize: false
      });
    }, showPath);

    const pathShown =
      showPath + results.pathArray.length * this.state.speed[1] * 1000;

    setTimeout(() => {
      this.setState({
        lockClearPath: false,
        algoStats: [results.visited.length, results.pathArray.length]
      });
    }, pathShown + 100);
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
          <Navbar
            lockBoard={this.state.lockBoard}
            lockClearPath={this.state.lockClearPath}
          />
          <AlgoInfo
            algoStats={this.state.algoStats}
            algo={this.state.algorithm}
          ></AlgoInfo>
          <Grid
            visited={this.state.visited}
            path={this.state.path}
            speed={this.state.speed}
            lockBoard={this.state.lockBoard}
          />
        </GridContext.Provider>
      </div>
    );
  }
}

export default App;
