import { searchHelpers } from "../searchHelpers";
import PriorityQueue from "../PriorityQueue";

export function AStar(grid, start, end) {
  // initialize helper functions
  searchHelpers();

  const { visited, pathArray } = AStar(grid, start, end);

  let newGrid = searchHelpers.updateGrid(grid, visited, false);
  let gridWithPath = newGrid.map(function(arr) {
    return arr.slice();
  });

  if (pathArray !== null)
    gridWithPath = searchHelpers.updateGrid(gridWithPath, pathArray, true);

  function AStar(grid, start, end) {
    let visited = [],
      pathArray = [];

    let path = {},
      gScore = {},
      fScore = {};

    // initial discovered node is the start only
    let open = new PriorityQueue();
    gScore[start] = 0;
    fScore[start] = searchHelpers.manhattanDistance(start, end);
    open.push(start, fScore[start]);

    // initialize all viable cells to infinite (NOT WALLS)
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        if (!grid[i][j].includes("wall")) {
          let thisCell = [i, j];
          if (!grid[i][j].includes("start")) {
            gScore[thisCell] = Infinity;
            fScore[thisCell] = Infinity;
          }
          path[thisCell] = null;
        }
      }
    }

    while (open.size() > 0) {
      // dequeue
      let minCell = open.pop();
      let currentNode = minCell.value;

      // if target found, cut search and return
      if (searchHelpers.arraysMatch(currentNode, end)) {
        const pathArray = searchHelpers.getPath(path, end);
        return { visited, pathArray };
      }

      // track visited nodes for animation
      if (!visited.includes(currentNode)) {
        visited.push(currentNode);
      }

      // normal case, traverse neighbours
      const neighbors = searchHelpers.getNeighbours(
        currentNode,
        grid,
        grid.length,
        grid[0].length
      );

      for (var neighbor of neighbors) {
        let potentialScore;
        // score based on weighted cell or not
        if (grid[neighbor[0]][neighbor[1]].includes("weight"))
          potentialScore = gScore[currentNode] + 10;
        else potentialScore = gScore[currentNode] + 1;
        // new best path found, record it
        if (potentialScore < gScore[neighbor]) {
          path[neighbor] = currentNode;
          gScore[neighbor] = potentialScore;
          fScore[neighbor] =
            potentialScore + searchHelpers.manhattanDistance(neighbor, end);
          if (!open[neighbor]) {
            open.push(neighbor, fScore[neighbor]);
          }
        }
      }
    }
    return { visited, pathArray };
  }

  return { newGrid, gridWithPath, visited, pathArray };
}
