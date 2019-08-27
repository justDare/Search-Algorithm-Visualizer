import React from 'react';

export const myState = {
    grid: [],
    selectedCells: [],
    algorithm: 'Select An Algorithm',
    mousePressed: false,
    selectedCellVal: false,
    setAlgorithm: () => {
        console.log('set algo');
    },
    toggleMousePressed: () => {
        console.log('mouse pressed?');
    },
    toggleCell: (id) => {
        console.log(id);
    },
    drag: (id) => {
        console.log('dragging');
    }
};

export const GridContext = React.createContext(
    myState,
);