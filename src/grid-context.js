import React from 'react';

export const myState = {
    grid: [],
    mousePressed: false,
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