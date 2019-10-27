import { randomWeights } from "./mazes/randomWeights";
import { recursiveDivision } from "./mazes/recursiveDivision";

export function mazeHandler(maze, grid) {
  let newMaze;
  if (maze === "random-weighted")
    newMaze = randomWeights(grid);
  else if (maze === "recursive-division")
    newMaze = recursiveDivision(grid);

  return newMaze;
}
