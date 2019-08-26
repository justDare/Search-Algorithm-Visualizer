export function initGrid() {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const columns = Math.floor(width / 25);
    const rows = Math.floor(height / 25 - 2);

    let grid = Array(rows).fill(0).map(row => new Array(columns).fill('unvisited'));

    const startX = Math.floor(columns / 4);
    const startY = Math.floor(rows / 2);
    grid = updateGrid(grid, startX, startY, 'start');

    const targetX = Math.floor(columns * .75);
    const targetY = Math.floor(rows / 2);
    grid = updateGrid(grid, targetX, targetY, 'end');

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

    return grid;
}