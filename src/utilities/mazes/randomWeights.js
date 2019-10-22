export function randomWeights(grid, start, end) {
  // for total weights
  // pick a coordinate in the grid
  // if the coordinate is not taken, fill it, if it is, fill another
  // coordinates filled with random weight from 1-10
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      // first remove all walls and current weights
      if (grid[i][j] === "wall") grid[i][j] = "unvisited";
      if (grid[i][j].includes("weight")) grid[i][j] = "unvisited";
      // populate 40% of board with weights
      if (probability(0.4) && grid[i][j] !== "start" && grid[i][j] !== "end") {
        grid[i][j] = `${grid[i][j]} weight`;
      }
    }
  }

  function probability(n) {
    return !!n && Math.random() <= n;
  }

  return grid;
}
