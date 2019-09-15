import React from "react";

import { GridContext } from "../grid-context";

class Cell extends React.Component {
  handleClick = (id, cellState) => {
    // if (cellState === "unvisited") {
    // console.log('empty')
    let { toggleMousePressed } = this.context;
    toggleMousePressed(id);
    // let { mousePressed } = this.context;
    // }
    // } else if (cellState === 'start')
    //     console.log('start');

    if (cellState !== "start" && cellState !== "end") {
      let { toggleCell } = this.context;
      toggleCell(id, cellState);
    }
  };

  handleMouseUp = id => {
    let { toggleMousePressed, mousePressed } = this.context;
    if (mousePressed) toggleMousePressed();
  };

  handleDrag = (id, cellState) => {
    let { mousePressed, selectedCellVal, toggleCell } = this.context;
    if (mousePressed) {
      if (
        selectedCellVal !== "start" &&
        selectedCellVal !== "end" &&
        (cellState !== "start") & (cellState !== "end")
      ) {
        toggleCell(id, cellState);
      } else if (selectedCellVal === "start") {
        toggleCell(id, "start");
        // erase old start cell
        // new start cell is this one
      } else if (selectedCellVal === "end") {
        toggleCell(id, "end");
      }
    }
  };

  componentDidMount = () => {};

  render() {
    const { cellState, id, delay } = this.props;
    let delayAnim;
    if (cellState !== "visited") delayAnim = "";
    else delayAnim = delay.toString() + "s";

    return (
      <td
        className={cellState + " " + delay}
        style={{ animationDelay: delayAnim }}
        id={id}
        onMouseDown={e => this.handleClick(id, cellState)}
        onMouseUp={e => this.handleMouseUp(id)}
        onMouseOver={e => this.handleDrag(id, cellState)}
      ></td>
    );
  }
}

Cell.contextType = GridContext;

export default Cell;
