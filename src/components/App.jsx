import React from 'react';
import Navbar from './Navbar.jsx';
import Grid from './Grid.jsx'

import {
    GridContext,
    myState
} from '../grid-context';

import { initGridHelper } from '../utilities/helpers';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMousePressed = () => {
            this.state.mousePressed ? this.setState({ mousePressed: false }) : this.setState({ mousePressed: true });
        }
        this.toggleCell = (id) => {
            console.log('this will change: ' + id);
            // this.setState()
        }
        this.drag = (id) => {
            console.log('dragging ' + id);
            // this.setState()
        }
        this.initGrid = () => {
            return initGridHelper();
        }

        this.state = {
            grid: this.initGrid(),
            mousePressed: myState.mousePressed,
            toggleMousePressed: this.toggleMousePressed,
            toggleCell: this.toggleCell,
            drag: this.drag
        };
    }

    render() {
        console.log(this.state.mousePressed);
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