import React from "react";
import "./Grid.scss";
import Cell from "./Cell";

import { GridContext } from "../grid-context";

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  getVisitedIndex = (visited, indexes) => {
    for (var i = 0; i < visited.length; i++) {
      // This if statement depends on the format of your array
      if (visited[i][0] == indexes[0] && visited[i][1] == indexes[1]) {
        return i; // Found it
      }
    }
    return 0; // Not found
  };

  createTable = () => {
    let table = [];
    let { grid } = this.context;

    // Outer loop to create parent
    for (let i = 0; i < grid.length; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < grid[i].length; j++) {
        let delay, index;
        if (this.props.visited.length > 0) {
          index = this.getVisitedIndex(this.props.visited, [i, j]);
          delay = index * 0.01;
        }
        children.push(
          <Cell
            cellState={grid[i][j]}
            id={i + "-" + j}
            delay={delay}
            key={i + "-" + j}
          />
        );
      }
      //Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };

  render() {
    let table = this.createTable();
    console.log(this.props.visited);
    return (
      <table id="grid">
        <tbody>{table}</tbody>
      </table>
    );
  }
}

Grid.contextType = GridContext;

export default Grid;
