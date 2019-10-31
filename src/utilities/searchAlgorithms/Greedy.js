import { searchHelpers } from "../searchHelpers";
import PriorityQueue from "../PriorityQueue";

export function Greedy(grid, start, end) {
  // initialize helper functions
  searchHelpers();

  const { visited, pathArray } = greedy(grid, start, end);
  let newGrid = searchHelpers.updateGrid(grid, visited, false);
  let gridWithPath = newGrid.map(function(arr) {
    return arr.slice();
  });

  if (pathArray !== null)
    gridWithPath = searchHelpers.updateGrid(gridWithPath, pathArray, true);

  function greedy(grid, start, end) {
    let visited = [],
      path = {},
      pathArray = [];

    let pq = new PriorityQueue();
    pq.push(start, 0);
    visited.push(start);

    while (pq.size() > 0) {
      let minCell = pq.pop();
      let cur = minCell.value;
      // let currentWeight = minCell.priority;

      // target found
      if (searchHelpers.arraysMatch(cur, end)) {
        path[start] = cur;
        let tempCur = end;
        while (!searchHelpers.arraysMatch(tempCur, start)) {
          pathArray.unshift(tempCur);
          tempCur = path[tempCur];
        }
        return { visited, pathArray };
      }

      // track visited nodes for animation
      if (!visited.includes(cur)) {
        visited.push(cur);
      }

      const neighbors = searchHelpers.getNeighbours(
        cur,
        grid,
        grid.length,
        grid[0].length
      );

      if (neighbors) {
        for (var neighbor of neighbors) {
          if (!searchHelpers.hasVertex(neighbor, visited)) {
            // visited.push(neighbor);
            path[neighbor] = cur;
            let cost;
            // score based on weighted cell or not
            if (grid[neighbor[0]][neighbor[1]].includes("weight"))
              cost = searchHelpers.manhattanDistance(neighbor, end) + 10;
            else cost = searchHelpers.manhattanDistance(neighbor, end) + 1;

            pq.push(neighbor, cost);
          }
        }
      }
    }
    return { visited, pathArray };
  }

  return { newGrid, gridWithPath, visited, pathArray };
}
