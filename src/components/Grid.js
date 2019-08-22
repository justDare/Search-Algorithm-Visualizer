import React from 'react';
import './Grid.scss';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: {
                width: null,
                height: null
            },
            grid: null,
        };
    }

    initializeGrid = () => {
        const columns = Math.floor(this.state.dimensions.width / 25);
        this.setState({
            grid: Array(50).fill(0).map(row => new Array(columns).fill('unvisited'))
        });
    }

    createTable = () => {
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < this.state.grid.length; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < this.state.grid[i].length; j++) {
                children.push(<td className={this.state.grid[i][j]} id={i + "-" + j} key={i + "-" + j}></td>);
            }
            //Create the parent and add the children
            table.push(<tr key={i}>{children}</tr>)
        }
        return table
    }

    componentDidMount = () => {
        this.setState({
            dimensions: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        }, () => {
            this.initializeGrid();
        });
    }

    render() {

        let table;
        if (this.state.grid) {
            table = this.createTable();
        }

        return (
            <table id="grid" ref={el => (this.container = el)}>
                <tbody>
                    {table}
                </tbody>
            </table>
        )
    }
}

export default Grid;