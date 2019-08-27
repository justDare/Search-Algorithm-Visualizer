import React from 'react';
import Navbar from './Navbar.jsx';
import Grid from './Grid.jsx'

import {
    GridContext,
    myState
} from '../grid-context';

import { initGrid } from '../utilities/initGrid';
import { getCoordinates } from "../utilities/getCoordinates";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.setAlgorithm = (algorithm) => {
            this.setState({ algorithm: algorithm });
        }
        this.resetBoard = () => {
            this.setState({ grid: initGrid() });
        }
        this.toggleMousePressed = (id) => {
            if (this.state.mousePressed) {
                this.setState({ mousePressed: false })
                this.setState({ selectedCells: [] });
            } else {
                this.setState({ mousePressed: true });
                const indexes = getCoordinates(id);
                this.setState({ selectedCellVal: this.state.grid[indexes[0]][indexes[1]] });
                // console.log('this will change: ' + id);
            }
        }
        this.toggleCell = (id, cellValue) => {
            console.log(cellValue);
            const indexes = getCoordinates(id);
            let newCellValue;
            if (cellValue === 'wall')
                newCellValue = 'unvisited';
            else if (cellValue === 'unvisited')
                newCellValue = 'wall';

            this.setState({
                grid: initGrid.updateGrid(this.state.grid, indexes[1], indexes[0], newCellValue)
            });
        }
        this.drag = (id) => {
            console.log('dragging ' + this.state.selectedCellVal);
            // this.setState()
        }
        this.initGrid = () => {
            return initGrid();
        }

        this.state = {
            grid: this.initGrid(),
            selectedCells: myState.grid,
            algorithm: myState.algorithm,
            mousePressed: myState.mousePressed,
            selectedCellVal: myState.selectedCellVal,
            resetBoard: this.resetBoard,
            setAlgorithm: this.setAlgorithm,
            toggleMousePressed: this.toggleMousePressed,
            toggleCell: this.toggleCell,
            drag: this.drag
        };
    }

    render() {
        // console.log(this.state.mousePressed);
        // console.log(this.state.selectedCellVal);
        return (
            <div>
                <GridContext.Provider value={this.state}>
                    <Navbar />
                    <Grid />
                </GridContext.Provider>
            </div>
        )
    }
}

export default App;