/*
   Shortest Bridge
   Tags: Array, Depth-First Search, Breadth-First Search, Matrix
   You are given an n x n binary matrix grid where 1 represents land and 0 represents water.

   An island is a 4-directionally connected group of 1's not connected to any other 1's. There are
   exactly two islands in grid.

   You may change 0's to 1's to connect the two islands to form one island.

   Return the smallest number of 0's you must flip to connect the two islands.

   Example 1:
   Input: grid = [[0,1],[1,0]]
   Output: 1

   Example 2:
   Input: grid = [[0,1,0],[0,0,0],[0,0,1]]
   Output: 2

   Example 3:
   Input: grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
   Output: 1

   Constraints:
   n == grid.length == grid[i].length
   2 <= n <= 100
   grid[i][j] is either 0 or 1.
   There are exactly two islands in grid.
 */

export const shortestBridge = (grid: number[][]): number => {
   const length = grid.length;
   const queue: number[][] = [];
   // up, right, down, left
   const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
   //const visited = structuredClone(grid);
   const visited: Array<Array<string | number>> = Array.from({ length }, () => new Array(length).fill(0));
   // step 1: copy grid values to visited
   grid.forEach((thisRow, row) => {
      thisRow.forEach((thisColumn, column) => {
         if (thisColumn === 1)
            visited[row][column] = 1;
      })
   })
   // step 2: find first island (dfs)
   const findFirstIsland = (row: number, column: number) => {
      visited[row][column] = 'X';
      queue.push([row, column]);
      for (let i = 0; i < 4; i++) {
         const nextRow = row + directions[i][0];
         const nextColumn = column + directions[i][1];
         if (nextRow >= 0 && nextColumn >= 0 && nextRow < length && nextColumn < length && visited[nextRow][nextColumn] === 1)
            findFirstIsland(nextRow, nextColumn);
      }
   }
   let entered = false;
   for (let row = 0; row < length; row++) {
      for (let column = 0; column < length; column++) {
         if (visited[row][column] === 1) {
            findFirstIsland(row, column);
            entered = true;
            break;
         }
      }
      if (entered)
         break;
   }
   // step 3: while queue is not empty, find shortest bridge (bfs)
   let level = 0;
   while (queue.length) {
      const queueLength = queue.length;
      for (let i = 0; i < queueLength; i++) {
         const next = queue.shift();
         if (next === undefined)
            continue;
         for (let j = 0; j < 4; j++) {
            const nextRow = next[0] + directions[j][0];
            const nextColumn = next[1] + directions[j][1];
            if (nextRow >= 0 && nextColumn >= 0 && nextRow < length && nextColumn < length) {
               if (visited[nextRow][nextColumn] === 1)
                  return level;
               if (visited[nextRow][nextColumn] === 0) {
                  visited[nextRow][nextColumn] = 'X';
                  queue.push([nextRow, nextColumn]);
               }
            }
         }
      }
      level++;
   }
   return -1;
}