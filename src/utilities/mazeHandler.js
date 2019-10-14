import { randomWeights } from "./mazes/randomWeights";

export function mazeHandler(maze, grid) {
  const newMaze = randomWeights(grid);
  return newMaze;
}
