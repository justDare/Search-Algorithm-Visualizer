import { searchHelpers } from "../searchHelpers";
import PriorityQueue from "../PriorityQueue";

export function Dijkstra(grid, start, end) {
  // initialize helper functions
  searchHelpers();

  const { visited, pathArray } = dijkstra(grid, start, end);

  let newGrid = searchHelpers.updateGrid(grid, visited, false);
  let gridWithPath = newGrid.map(function(arr) {
    return arr.slice();
  });

  if (pathArray !== null)
    gridWithPath = searchHelpers.updateGrid(gridWithPath, pathArray, true);

  function dijkstra(grid, start, end) {
    let visited = [];
    let distances = {},
      path = {};
    let pq = new PriorityQueue();

    // set dist of start cell to 0
    distances[start] = 0;
    pq.push(start, 0);

    // initialize all viable cells to infinite (NOT WALLS)
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        if (!grid[i][j].includes("wall")) {
          let thisCell = [i, j];
          if (!grid[i][j].includes("start")) distances[thisCell] = Infinity;
          path[thisCell] = null;
        }
      }
    }

    while (pq.size() > 0) {
      // dequeue
      let minCell = pq.pop();
      let currentNode = minCell.value;

      // mark visited for animations
      if (
        !searchHelpers.arraysMatch(minCell.value, start) &&
        !searchHelpers.arraysMatch(minCell.value, end)
      )
        visited.push(minCell.value);
      const neighbors = searchHelpers.getNeighbours(
        currentNode,
        grid,
        grid.length,
        grid[0].length
      );
      // check neighbours
      if (neighbors) {
        for (var neighbor of neighbors) {
          let neighborWeight;
          if (grid[neighbor[0]][neighbor[1]].includes("weight"))
            neighborWeight = 10;
          else neighborWeight = 1;

          let alternative = distances[currentNode] + neighborWeight;
          if (alternative < distances[neighbor]) {
            distances[neighbor] = alternative;
            path[neighbor] = currentNode;
            pq.push(neighbor, distances[neighbor]);
          }
          // if target found, cut search and return
          if (searchHelpers.arraysMatch(neighbor, end)) {
            const pathArray = searchHelpers.getPath(path, end);
            return { visited, pathArray };
          }
        }
      }
    }

    return { visited, pathArray };
  }

  return { newGrid, gridWithPath, visited, pathArray };
}
