/*
   Shortest Distance from All Buildings
   Tags: Array, Breadth-First Search, Matrix
   You are given an m x n grid grid of values 0, 1, or 2, where:

   each 0 marks an empty land that you can pass by freely,
   each 1 marks a building that you cannot pass through, and
   each 2 marks an obstacle that you cannot pass through.
   You want to build a house on an empty land that reaches all buildings in the shortest total travel
   distance. You can only move up, down, left, and right.

   Return the shortest travel distance for such a house. If it is not possible to build such a house
   according to the above rules, return -1.

   The total travel distance is the sum of the distances between the houses of the friends and the
   meeting point.

   The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.

   Example 1:
   Input: grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
   Output: 7
   Explanation: Given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2).
   The point (1,2) is an ideal empty land to build a house, as the total travel distance of 3+3+1=7 is minimal.
   So return 7.

   Example 2:
   Input: grid = [[1,0]]
   Output: 1

   Example 3:
   Input: grid = [[1]]
   Output: -1

   Constraints:
   m == grid.length
   n == grid[i].length
   1 <= m, n <= 50
   grid[i][j] is either 0, 1, or 2.
   There will be at least one building in the grid.

   Complexity:
   Time complexity: O(m * n)
   Space complexity: O(m * n)
 */

export const shortestDistance = (grid: number[][]): number => {
   const findMinimum = (row: number, column: number, grid: number[][], targetValue: number) => {
      minimum = Number.MAX_SAFE_INTEGER;
      const queue = [[row, column]];
      let steps = 0;
      // continue until we have an empty queue
      while (queue.length > 0) {
         steps++;
         const size = queue.length;
         for (let i = 0; i < size; i++) {
            const item = queue.shift();
            if (item === undefined)
               continue;
            const [row1, column1] = item;
            for (const direction of directions) {
               const row2 = row1 + direction[0];
               const column2 = column1 + direction[1];
               if (isSafe(row2, column2) && grid[row2][column2] === targetValue) {
                  grid[row2][column2] = targetValue - 1;
                  total[row2][column2] = total[row2][column2] + steps;
                  // add this to the queue
                  queue.push([row2, column2]);
                  minimum = Math.min(minimum, total[row2][column2]);
               }
            }
         }
      }
   }

   const isSafe = (row: number, column: number) => row >= 0 && row < height && column >= 0 && column < width;

   const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
   // populate a default grid of totals
   const total = new Array(grid.length).fill(0).map(() => {
      return new Array(grid[0].length).fill(0);
   });
   const height = grid.length;
   const width = grid[0].length;
   let minimum = Number.MAX_SAFE_INTEGER;
   let targetValue = 0;
   for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
         // determine the minimum if we're looking at square of '1'
         if (grid[row][column] === 1)
            findMinimum(row, column, grid, targetValue--);
      }
   }
   return minimum === Number.MAX_SAFE_INTEGER ? -1 : minimum;
}