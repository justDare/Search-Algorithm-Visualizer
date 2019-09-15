// Helper function to move one cell value to another point on the grid
export function movePoint(grid, currentX, currentY, newX, newY, value) {
  grid[currentX][currentY] = "unvisited";
  grid[newX][newY] = value;
  return grid;
}
