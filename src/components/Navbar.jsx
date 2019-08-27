import React from 'react';
import './Navbar.scss';

import { GridContext } from '../grid-context';

class Navbar extends React.Component {

    handleChange = (event) => {
        let { setAlgorithm } = this.context;
        setAlgorithm(event.target.value);
    }

    render() {

        let { algorithm } = this.context;

        return (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    {/* <img src="" width="30" height="30" class="d-inline-block align-top" alt=""> */}
                    SearchBuddy
                </a>

                <select
                    id="selectAlgorithm"
                    onChange={this.handleChange}
                    value={algorithm}
                >
                    <option name="Select An Algorithm" value="Select An Algorithm">Select An Algorithm</option>
                    <option name="Breadth First Search" value="Breadth First Search">Breadth First Search</option>
                    <option name="Depth First Search" value="Depth First Search">Depth First Search</option>
                    <option name="Dijkstra's Algorithm" value="Dijkstra's Algorithm">Dijkstra's Algorithm</option>
                    <option name="A* Search" value="A* Search">A* Search</option>
                </select>
            </nav>
        )
    }
}

Navbar.contextType = GridContext;

export default Navbar;