import { randomWeights } from "./mazes/randomWeights";
import { randomMaze } from "./mazes/randomMaze";

export function mazeHandler(maze, grid) {
  let newMaze;
  if (maze === "random-weighted")
    newMaze = randomWeights(grid);
  else if (maze === "random-maze")
    newMaze = randomMaze(grid);

  return newMaze;
}
