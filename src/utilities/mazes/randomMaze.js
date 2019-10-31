export function randomMaze(grid, start, end) {
  const width = grid[0].length;
  const height = grid.length;

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== "start" && grid[i][j] !== "end") grid[i][j] = "wall";
    }
  }

  randomMazeUtil(grid, 0, 0, width, height, chooseOrientation(width, height));

  function randomMazeUtil(grid, x, y, width, height, orientation) {
    if (width < 2 || height < 2) return grid;

    // horizontal or veritcal ?
    let horizontal = orientation;

    // where will the wall be drawn from?
    let wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 1)));
    let wy = y + (horizontal ? Math.floor(Math.random() * (height - 1)) : 0);

    // where will the passage through the wall exist?
    let px = wx + (horizontal ? Math.floor(Math.random() * width) : 0);
    let py = wy + (horizontal ? 0 : Math.floor(Math.random() * height));

    // what direction will the wall be drawn?
    let dx = horizontal ? 1 : 0;
    let dy = horizontal ? 0 : 1;

    // how long will the wall be?
    let length = horizontal ? width : height;

    for (var i = 0; i < length; i++) {
      if (wx !== px || wy !== py) {
        if (grid[wy][wx] !== "start" && grid[wy][wx] !== "end")
          grid[wy][wx] = "unvisited";
      }
      wx += dx;
      wy += dy;
    }

    let nx = x;
    let ny = y;
    let w = horizontal ? width : wx - x + 1;
    let h = horizontal ? wy - y + 1 : height;
    randomMazeUtil(grid, nx, ny, w, h, chooseOrientation(w, h));

    nx = horizontal ? x : wx + 1;
    ny = horizontal ? wy + 1 : y;
    w = horizontal ? width : x + width - wx - 1;
    h = horizontal ? y + height - wy - 1 : height;
    randomMazeUtil(grid, nx, ny, w, h, chooseOrientation(w, h));
  }

  // helper function, choose orientation of division
  function chooseOrientation(width, height) {
    if (width < height) return 1;
    else if (height < width) return 0;
    else return Math.random(2) === 0 ? 1 : 0;
  }

  return grid;
}
