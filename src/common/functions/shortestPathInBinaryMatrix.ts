/*
   Shortest Path in Binary Matrix
   Tags: Array, Breadth-First Search, Matrix
   Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

   A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

   All the visited cells of the path are 0.
   All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
   The length of a clear path is the number of visited cells of this path.

   Example 1:
   Input: grid = [[0,1],[1,0]]
   Output: 2

   Example 2:
   Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
   Output: 4

   Example 3:
   Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
   Output: -1

   Constraints:
   n == grid.length
   n == grid[i].length
   1 <= n <= 100
   grid[i][j] is 0 or 1
 */

export const shortestPathBinaryMatrix = (grid: number[][]): number => {
   interface Queue {
      column: number,
      count: number,
      row: number,
   }

   const movements = [
      { column: 0, row: 1 },
      { column: 0, row: -1 },
      { row: 0, column: -1 },
      { row: 0, column: 1 },
      { column: 1, row: 1 },
      { column: 1, row: -1 },
      { row: 1, column: -1 },
      { row: -1, column: -1 },
   ]

   const isAvailable = (column: number, row: number, grid: number[][]) => {
      return column >= 0 && column < grid.length && row >= 0 && row < grid.length && grid[row][column] === 0;
   }

   const n = grid.length - 1;
   if (grid[n][n] === 1 || grid[0][0] === 1)
      return -1;
   const queue: Queue[] = [{ column: 0, row: 0, count: 1 }];
   grid[0][0] = 1;
   while (queue.length > 0) {
      const { column, row, count } = queue.shift()!;
      if (column === n && row === n)
         return count;
      movements.forEach(movement => {
         const nextColumn = column + movement.column;
         const nextRow = row + movement.row;
         if (isAvailable(nextColumn, nextRow, grid)) {
            queue.push({ column: nextColumn, row: nextRow, count: count + 1 })
            grid[nextRow][nextColumn] = 1;
         }
      })
   }
   return -1;
}