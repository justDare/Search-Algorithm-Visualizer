import React from "react";
import "./Navbar.scss";

import { GridContext } from "../grid-context";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visualizeClicked: false };
    this.handleSpeed = this.handleSpeed.bind(this);
    this.handleAlgo = this.handleAlgo.bind(this);
    this.handleMaze = this.handleMaze.bind(this);
  }

  // options for keeping board in tact but removing visited and path nodes ??
  handleClick = algorithm => {
    if (!this.state.visualizeClicked) {
      let { visualize } = this.context;
      visualize(algorithm);
    } else {
      let { resetBoard } = this.context;
      const resetSearch = true;
      resetBoard(resetSearch);
    }
    if (this.state.visualizeClicked && algorithm !== null)
      this.setState({ visualizeClicked: false });
    else if (!this.state.visualizeClicked && algorithm !== null)
      this.setState({ visualizeClicked: true });
  };

  handleAlgo = event => {
    let { setAlgorithm } = this.context;
    setAlgorithm(event.target.id);
  };

  handleMaze = event => {
    let { createMaze } = this.context;
    createMaze(event.target.id);
  };

  handleSpeed = event => {
    let { changeSpeed } = this.context;
    const speed = event.target.id;
    let newSpeed;
    if (speed === "fast") newSpeed = [0.01, 0.02];
    else if (speed === "average") newSpeed = [0.05, 0.1];
    else if (speed === "slow") newSpeed = [0.25, 0.18];

    changeSpeed(newSpeed);
  };

  resetBoard = () => {
    let { resetBoard } = this.context;
    this.setState({ visualizeClicked: false });
    resetBoard();
  };

  render() {
    let { algorithm } = this.context;
    let algorithmDisplay, visualizeColor;
    visualizeColor = "#1abc9c";
    if (algorithm !== null) algorithmDisplay = `Visualize ${algorithm}!`;
    else algorithmDisplay = "Select an algorithm!";

    if (this.state.visualizeClicked) {
      algorithmDisplay = "Clear search!";
      visualizeColor = "red";
    }

    let lock;
    if (this.props.lockBoard) lock = "none";
    else lock = "auto";

    let lockClearPath;
    if (this.props.lockClearPath) lockClearPath = "none";
    else lockClearPath = "auto";

    return (
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/Search-Algorithm-Visualizer/">
          Search Algorithm Visulaizer
        </a>
        <div
          id="visualize"
          className="btn-primary"
          onClick={() => this.handleClick(algorithm)}
          style={{
            backgroundColor: visualizeColor,
            pointerEvents: lockClearPath
          }}
        >
          {algorithmDisplay}
        </div>
        <div
          id="reset"
          className="btn-secondary"
          onClick={() => this.resetBoard()}
          style={{ pointerEvents: lock }}
        >
          Reset Board
        </div>
        <div className="dropdown" style={{ pointerEvents: lock }}>
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Mazes & Patterns
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ pointerEvents: lock }}
          >
            <div
              onClick={this.handleMaze}
              id="random-weighted"
              className="dropdown-item"
            >
              Random Weighted Maze
            </div>
            <div
              onClick={this.handleMaze}
              id="random-maze"
              className="dropdown-item"
            >
              Random Maze
            </div>
          </div>
        </div>
        <div className="dropdown" style={{ pointerEvents: lock }}>
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Algorithms
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ pointerEvents: lock }}
          >
            <div onClick={this.handleAlgo} id="BFS" className="dropdown-item">
              Breadth First Search
            </div>
            <div onClick={this.handleAlgo} id="DFS" className="dropdown-item">
              Depth First Search
            </div>
            <div
              onClick={this.handleAlgo}
              id="Greedy"
              className="dropdown-item"
            >
              Greedy Best-First Search
            </div>
            <div
              onClick={this.handleAlgo}
              id="Dijkstra"
              className="dropdown-item"
            >
              Dijkstra's Algorithm
            </div>
            <div onClick={this.handleAlgo} id="A*" className="dropdown-item">
              A* Search
            </div>
          </div>
        </div>
        <div className="dropdown" style={{ pointerEvents: lock }}>
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Speed
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ pointerEvents: lock }}
          >
            <div onClick={this.handleSpeed} id="fast" className="dropdown-item">
              Fast
            </div>
            <div
              onClick={this.handleSpeed}
              id="average"
              className="dropdown-item"
            >
              Average
            </div>
            <div onClick={this.handleSpeed} id="slow" className="dropdown-item">
              Slow
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.contextType = GridContext;

export default Navbar;
