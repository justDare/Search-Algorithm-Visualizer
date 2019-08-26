import React from 'react';
import './Grid.scss';
import Cell from "./Cell";

import { GridContext } from '../grid-context';

class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    createTable = () => {
        let table = []
        let { grid } = this.context;

        // Outer loop to create parent
        for (let i = 0; i < grid.length; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < grid[i].length; j++) {
                children.push(<Cell cellState={grid[i][j]} id={i + "-" + j} key={i + "-" + j} />)
            }
            //Create the parent and add the children
            table.push(<tr key={i}>{children}</tr>)
        }
        return table
    }

    render() {

        // console.log('Grid render');
        let table = this.createTable();

        return (
            <table id="grid">
                <tbody>
                    {table}
                </tbody>
            </table>
        )
    }
}

Grid.contextType = GridContext;

export default Grid;