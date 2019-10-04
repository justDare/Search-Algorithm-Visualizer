export function randomWeights(grid, start, end) {
    console.log('randommm');
    // for total weights
    // pick a coordinate in the grid
    // if the coordinate is not taken, fill it, if it is, fill another
    // coordinates filled with random weight from 1-10
    // for (var i = 0; i < grid.length; i++) {
    //     for (var j = 0; j < grid[0].length; j++) {
    //         if (probability(0.25) && grid[i][j] !== 'start' && grid[i][j] !== 'end') {
    //             let weight = Math.floor((Math.random() * 10) + 1);
    //             grid[i][j] = `weight-${weight}`;
    //         }
    //     }
    // }

    // function probability(n) {
    //     return !!n && Math.random() <= n;
    // };

    return grid;
}