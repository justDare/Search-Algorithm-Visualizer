import { constants } from "fs";

// Helper function to move one cell value to another point on the grid
export function movePoint(grid, currentX, currentY, newX, newY, value) {
  console.log("current start " + grid[currentX][currentY]);
  grid[currentX][currentY] = "unvisited";
  console.log("new point: " + grid[currentX][currentY]);
  grid[newX][newY] = value;
  console.log("new start: " + grid[newX][newY]);
  return grid;
}
