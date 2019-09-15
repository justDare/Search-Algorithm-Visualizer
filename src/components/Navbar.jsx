import React from "react";
import "./Navbar.scss";

import { GridContext } from "../grid-context";

class Navbar extends React.Component {
  handleClick = algorithm => {
    let { visualize } = this.context;
    visualize(algorithm);
  };

  handleChange = event => {
    let { setAlgorithm } = this.context;
    setAlgorithm(event.target.value);
  };

  resetBoard = () => {
    let { resetBoard } = this.context;
    resetBoard();
  };

  render() {
    let { algorithm } = this.context;
    let algorithmDisplay;
    if (algorithm !== null) algorithmDisplay = `Visualize ${algorithm}!`;
    else algorithmDisplay = "Select an algorithm!";

    const defaultValue = algorithmDisplay;

    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          {/* <img src="" width="30" height="30" class="d-inline-block align-top" alt=""> */}
          SearchBuddy
        </a>
        <div
          id="visualize"
          className="btn-primary"
          onClick={() => this.handleClick(algorithm)}
        >
          {algorithmDisplay}
        </div>
        <div
          id="reset"
          className="btn-secondary"
          onClick={() => this.resetBoard()}
        >
          Reset Board
        </div>
        <select
          id="selectAlgorithm"
          onChange={this.handleChange}
          value={defaultValue}
        >
          <option name="Select An Algorithm" value="Select An Algorithm">
            Select An Algorithm
          </option>
          <option name="Breadth First Search" value="BFS">
            Breadth First Search
          </option>
          <option name="Depth First Search" value="DFS">
            Depth First Search
          </option>
          <option name="Dijkstra's Algorithm" value="Dijkstra's">
            Dijkstra's Algorithm
          </option>
          <option name="A* Search" value="A* Search">
            A* Search
          </option>
        </select>
      </nav>
    );
  }
}

Navbar.contextType = GridContext;

export default Navbar;
