import { randomWeights } from "./mazes/randomWeights";

export function mazeHandler(maze, grid) {
    randomWeights(grid);
    return maze;
}