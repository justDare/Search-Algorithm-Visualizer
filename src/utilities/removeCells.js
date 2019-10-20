export function removeCells(grid, visited, path, weights) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (
        grid[i][j].includes("visited") &&
        visited &&
        !grid[i][j].includes("unvisited")
      )
        grid[i][j] = grid[i][j].replace("visited", "unvisited");

      // remove path from cell if specified
      if (grid[i][j].includes("path") && path)
        grid[i][j] = grid[i][j].replace("path", "unvisited");

      // remove weight from cell if specified
      if (grid[i][j].includes("weight") && weights)
        grid[i][j] = grid[i][j].replace(" weight", "");
    }
  }
  return grid;
}
