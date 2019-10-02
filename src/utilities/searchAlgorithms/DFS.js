import { searchHelpers } from '../searchHelpers';

export function DFS(grid, start, end) {

  // initialize helper functions
  searchHelpers();

  const { visited, pathArray } = dfs(grid, start, end);
  let newGrid = searchHelpers.updateGrid(grid, visited, false);
  let gridWithPath = newGrid.map(function (arr) {
    return arr.slice();
  });

  if (pathArray !== null)
    gridWithPath = searchHelpers.updateGrid(gridWithPath, pathArray, true);

  function dfs(grid, vertex, end) {
    let stack = [],
      visited = [],
      path = {},
      pathArray = [];
    stack.push(vertex);

    while (stack.length > 0) {
      let cur = stack.pop();
      if (searchHelpers.arraysMatch(cur, end)) {
        path[vertex] = cur;
        let tempCur = end;
        while (!searchHelpers.arraysMatch(tempCur, vertex)) {
          pathArray.unshift(tempCur);
          tempCur = path[tempCur];
        }
        return { visited, pathArray };
      }
      visited.push(cur);
      const neighbors = searchHelpers.getNeighbours(cur, grid, grid.length, grid[0].length);
      if (neighbors) {
        for (var neighbour of neighbors) {
          if (!searchHelpers.hasVertex(neighbour, visited)) {
            visited.push(neighbour);
            stack.push(neighbour);
            path[neighbour] = cur;
          }
        }
      }
    }
    return { visited, pathArray };
  }

  return { newGrid, gridWithPath, visited, pathArray };
}
