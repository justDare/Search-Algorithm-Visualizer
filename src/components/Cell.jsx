import React from 'react';

import { GridContext } from '../grid-context';

class Cell extends React.Component {

    handleClick = (id, cellState) => {
        if (cellState === 'unvisited') {
            // console.log('empty')
            let { toggleMousePressed } = this.context;
            toggleMousePressed(id);
            // let { mousePressed } = this.context;

        } else if (cellState === 'start')
            console.log('start');

        if (cellState !== 'start' && cellState !== 'end') {
            let { toggleCell } = this.context;
            toggleCell(id, cellState);
        }
    }

    handleMouseUp = (id) => {
        let { toggleMousePressed, mousePressed } = this.context;
        if (mousePressed)
            toggleMousePressed();
    }

    handleDrag = (id, cellState) => {
        let { mousePressed, selectedCellVal } = this.context;
        if (mousePressed) {
            if (selectedCellVal !== 'start' && selectedCellVal !== 'end') {
                let { toggleCell } = this.context;
                toggleCell(id, cellState);
            }
            console.log('dragging!!! ' + selectedCellVal);
        }
    }

    render() {
        const { cellState, id } = this.props;
        let { drag } = this.context;

        return (
            <td
                className={cellState}
                id={id}
                onMouseDown={e => this.handleClick(id, cellState)}
                onMouseUp={e => this.handleMouseUp(id)}
                onMouseOver={e => this.handleDrag(id, cellState)}
            >
            </td>
        );
    }
}

Cell.contextType = GridContext;

export default Cell;