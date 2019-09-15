export function initGrid() {
  const dimensions = getGridDimensions();
  const rows = dimensions[0];
  const columns = dimensions[1];

  let grid = Array(rows)
    .fill(0)
    .map(row => new Array(columns).fill("unvisited"));

  const startPoints = getStartPoints(rows, columns);
  grid = updateGrid(grid, startPoints[1], startPoints[0], "start");

  const endPoints = getTargetPoints(rows, columns);
  grid = updateGrid(grid, endPoints[1], endPoints[0], "end");

  function getGridDimensions() {
    const columns = Math.floor(window.innerWidth / 25);
    const rows = Math.floor(window.innerHeight / 25 - 2);
    return [rows, columns];
  }

  function getStartPoints(rows, columns) {
    const startX = Math.floor(columns / 4);
    const startY = Math.floor(rows / 2);
    return [startY, startX];
  }

  function getTargetPoints() {
    const targetX = Math.floor(columns * 0.75);
    const targetY = Math.floor(rows / 2);
    return [targetY, targetX];
  }

  function updateGrid(grid, x, y, value) {
    let newArray = grid.map((r, i) => {
      if (i === y) {
        return grid[y].map((c, j) => {
          if (j === x) {
            return value;
          }
          return c;
        });
      }
      return r;
    });

    return newArray;
  }

  initGrid.updateGrid = updateGrid;
  initGrid.getStartPoints = getStartPoints;
  initGrid.getTargetPoints = getTargetPoints;
  initGrid.getGridDimensions = getGridDimensions;

  return grid;
}
