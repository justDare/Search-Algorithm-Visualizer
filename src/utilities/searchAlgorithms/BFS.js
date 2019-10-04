import { searchHelpers } from '../searchHelpers';

export function BFS(grid, start, end) {

    // initialize helper functions
    searchHelpers();

    const { visited, pathArray } = bfs(grid, start, end);
    let newGrid = searchHelpers.updateGrid(grid, visited, false);
    let gridWithPath = newGrid.map(function (arr) {
        return arr.slice();
    });

    if (pathArray !== null)
        gridWithPath = searchHelpers.updateGrid(gridWithPath, pathArray, true);

    function bfs(grid, vertex, end) {
        let stack = [],
            visited = [],
            path = {},
            pathArray = [];

        stack.unshift(vertex);
        visited.push(vertex);

        while (stack.length > 0) {
            let cur = stack.pop();

            // target found
            if (searchHelpers.arraysMatch(cur, end)) {
                path[vertex] = cur;
                let tempCur = end;
                while (!searchHelpers.arraysMatch(tempCur, vertex)) {
                    pathArray.unshift(tempCur);
                    tempCur = path[tempCur];
                }
                return { visited, pathArray };
            }

            const neighbors = searchHelpers.getNeighbours(cur, grid, grid.length, grid[0].length);
            if (neighbors) {
                for (var neighbor of neighbors) {
                    if (!searchHelpers.hasVertex(neighbor, visited)) {
                        visited.push(neighbor);
                        path[neighbor] = cur;
                        stack.unshift(neighbor);
                    }
                }
            }
        }
        return { visited, pathArray };
    }

    return { newGrid, gridWithPath, visited, pathArray };
}
