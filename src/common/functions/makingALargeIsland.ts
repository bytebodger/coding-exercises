/*
   Making A Large Island
   Tags: Array, Depth-First Search, Breadth-First Search, Union Find, Matrix
   You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

   Return the size of the largest island in grid after applying this operation.

   An island is a 4-directionally connected group of 1s.

   Example 1:
   Input: grid = [[1,0],[0,1]]
   Output: 3
   Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.

   Example 2:
   Input: grid = [[1,1],[1,0]]
   Output: 4
   Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.

   Example 3:
   Input: grid = [[1,1],[1,1]]
   Output: 4
   Explanation: Can't change any 0 to 1, only one island with area = 4.

   Constraints:
   n == grid.length
   n == grid[i].length
   1 <= n <= 500
   grid[i][j] is either 0 or 1.

   Complexity:
   Time complexity: O(N^2)
   Space complexity: O(N^2)
 */

export const largestIsland = (grid: number[][]): number => {
   // get neighbors for any given grid location
   const getNeighbors = (row: number, column: number): number[][] => {
      const neighbors: number[][] = [];
      if (row > 0)
         neighbors.push([row - 1, column]);
      if (row < gridLength - 1)
         neighbors.push([row + 1, column]);
      if (column > 0)
         neighbors.push([row, column - 1]);
      if (column < gridLength - 1)
         neighbors.push([row, column + 1]);
      return neighbors;
   }

   // set grid location and all surrounding 1s to groupIndex,
   // and return the area of this island
   const depthFirstSearch = (row: number, column: number, groupIndex: number) => {
      let maxArea = 1;
      grid[row][column] = groupIndex;
      const neighbors = getNeighbors(row, column);
      for (const [currentRow, currentColumn] of neighbors) {
         if (grid[currentRow][currentColumn] === 1) {
            grid[currentRow][currentColumn] = groupIndex;
            maxArea += depthFirstSearch(currentRow, currentColumn, groupIndex);
         }
      }
      return maxArea;
   }

   const gridLength = grid.length;
   // map that tracks group index to area (groupIndex, groupArea)
   const groupMap = new Map<number, number>();
   // start at 2 because 1 is taken
   let groupIndex = 2;
   // populate the (group, area) map
   for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[0].length; column++) {
         if (grid[row][column] === 1) {
            groupMap.set(groupIndex, depthFirstSearch(row, column, groupIndex));
            groupIndex++;
         }
      }
   }
   // max area must be at least as large as the largest group
   // (if grid has no 0s, then maxArea = area of largest group)
   let maxArea = 0;
   for (const [, area] of groupMap) {
      maxArea = Math.max(maxArea, area);
   }
   // find all 0s and the areas that would result from turning them to 1s
   for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[0].length; column++) {
         if (grid[row][column] === 0) {
            // keep track of groupIndexes encountered here
            const groupIndexes = new Set<number>();
            const neighbors = getNeighbors(row, column);
            for (const [row, col] of neighbors) {
               if (grid[row][col] > 1) {
                  groupIndexes.add(grid[row][col])
               }
            }
            // init to 1 since flipping 0 to 1
            let localMaxArea = 1;
            // sum all areas of the groupIndexes surrounding (row, column)
            for (const groupIndex of groupIndexes) {
               const area = groupMap.get(groupIndex);
               if (area !== undefined)
                  localMaxArea += area;
            }
            maxArea = Math.max(maxArea, localMaxArea)
         }
      }
   }
   return maxArea;
}