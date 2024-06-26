/*
   Number of Islands
   Tags: Array, Depth-First Search, Breadth-First Search, Union Find, Matrix
   Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the
   number of islands.

   An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
   You may assume all four edges of the grid are all surrounded by water.

   Example 1:
   Input: grid = [
     ["1","1","1","1","0"],
     ["1","1","0","1","0"],
     ["1","1","0","0","0"],
     ["0","0","0","0","0"]
   ]
   Output: 1

   Example 2:
   Input: grid = [
     ["1","1","0","0","0"],
     ["1","1","0","0","0"],
     ["0","0","1","0","0"],
     ["0","0","0","1","1"]
   ]
   Output: 3

   Constraints:
   m == grid.length
   n == grid[i].length
   1 <= m, n <= 300
   grid[i][j] is '0' or '1'.

   Complexity:
   Time: O(rows * columns)
   Space: O(1)
 */

export const numIslands = (grid: string[][]): number => {
   const findContiguousLand = (grid: string[][], row: number, column: number): void => {
      const squares: Array<[number, number]> = [[row, column]];
      grid[row][column] = water;
      while (squares.length > 0) {
         const square = squares.shift();
         if (square === undefined)
            continue;
         const [squareRow, squareColumn] = square;
         for (const [rowDirection, columnDirection] of directions) {
            const nextRow = squareRow + rowDirection;
            const nextColumn = squareColumn + columnDirection;
            if (
               nextRow >= 0
               && nextRow < grid.length
               && nextColumn >= 0
               && nextColumn < grid[0].length
               && grid[nextRow][nextColumn] === land
            ) {
               grid[nextRow][nextColumn] = water;
               squares.push([nextRow, nextColumn]);
            }
         }
      }
   }

   const land = '1';
   const water = '0';
   const directions: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
   let islands = 0;
   for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
         if (grid[row][column] === land) {
            islands++;
            findContiguousLand(grid, row, column);
         }
      }
   }
   return islands;
}