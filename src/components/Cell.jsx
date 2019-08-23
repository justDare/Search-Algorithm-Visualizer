import React from 'react';

import { GridContext } from '../grid-context';

class Cell extends React.Component {

    handleClick = (id) => {
        if (this.props.cellState === 'unvisited') {
            console.log('empty')
            let { toggleMousePressed } = this.context;
            toggleMousePressed();
            // let { mousePressed } = this.context;

        } else if (this.props.cellState === 'start')
            console.log('start');

        let { toggleCell } = this.context;
        toggleCell(id);
    }

    handleMouseUp = (id) => {
        let { toggleMousePressed, mousePressed } = this.context;
        if (mousePressed)
            toggleMousePressed();
    }

    handleDrag = (id) => {
        let { mousePressed } = this.context;
        if (mousePressed) {
            console.log('dragging!!!');
        }
    }

    render() {
        const { cellState, id } = this.props;
        let { drag } = this.context;

        return (
            <td
                className={cellState}
                id={id}
                onMouseDown={e => this.handleClick(id)}
                onMouseUp={e => this.handleMouseUp(id)}
                onMouseOver={e => this.handleDrag(id)}
            >
            </td>
        );
    }
}

Cell.contextType = GridContext;

export default Cell;