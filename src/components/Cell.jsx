import React from "react";

import { GridContext } from "../grid-context";

class Cell extends React.Component {
  handleClick = (id, cellState) => {
    let { toggleMousePressed } = this.context;
    toggleMousePressed(id);

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
      } else if (selectedCellVal === "end") {
        toggleCell(id, "end");
      }
    }
  };

  componentDidMount = () => {};

  render() {
    const { cellState, id, delay } = this.props;
    let delayAnim;
    if (typeof this.props.cellState === undefined) console.log("problem");

    if (
      !this.props.cellState.startsWith("visited") &&
      !this.props.cellState.includes("path")
    ) {
      delayAnim = "";
    } else {
      delayAnim = delay.toString() + "s";
    }

    return (
      <td
        className={cellState}
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
