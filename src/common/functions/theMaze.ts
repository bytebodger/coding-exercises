/*
   The Maze
   Tags: Array, Depth-First Search, Breadth-First Search, Matrix
   There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can
   go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a
   wall. When the ball stops, it could choose the next direction.

   Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol]
   and destination = [destinationrow, destinationcol], return true if the ball can stop at the destination,
   otherwise return false.

   You may assume that the borders of the maze are all walls (see examples).

   Example 1:
   Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
   Output: true
   Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.

   Example 2:
   Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
   Output: false
   Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the
   destination but you cannot stop there.

   Example 3:
   Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
   Output: false

   Constraints:
   m == maze.length
   n == maze[i].length
   1 <= m, n <= 100
   maze[i][j] is 0 or 1.
   start.length == 2
   destination.length == 2
   0 <= startrow, destinationrow <= m
   0 <= startcol, destinationcol <= n
   Both the ball and the destination exist in an empty space, and they will not be in the same position initially.
   The maze contains at least 2 empty spaces.
 */

export const hasPath = (maze: number[][], start: number[], destination: number[]): boolean => {
   const canReachDestination = (maze: number[][], start: number[], destination: number[], direction: number[]): boolean => {
      const row: number = start[0];
      const column: number = start[1];
      // Fail condition check - Out of bounds, hits a wall, or starting at an already visited space (marked as 2)
      if (row < 0 || column < 0 || row >= maze.length || column >= maze[0].length || maze[row][column] === 2 || maze[row][column] === 1)
         return false;
      const nextRow: number = row + direction[0];
      const nextColumn: number = column + direction[1];
      // Keep checking canReachDestination in same direction unless next space is a wall
      if (nextRow >= 0 && nextRow < maze.length && nextColumn >= 0 && nextColumn < maze[0].length && maze[nextRow][nextColumn] !== 1) {
         return canReachDestination(maze, [nextRow, nextColumn], destination, direction);
         // Next space is a wall, so mark current space as visited (2) and check canReachDestination in all four directions again
         // also check if we are at goal here
      } else {
         if (row === destination[0] && column === destination[1])
            return true;
         maze[row][column] = 2;
         return canReachDestination(maze, [row, column + 1], destination, [0, 1])
            || canReachDestination(maze, [row, column - 1], destination, [0, -1])
            || canReachDestination(maze, [row - 1, column], destination, [-1, 0])
            || canReachDestination(maze, [row + 1, column], destination, [1, 0]);
      }
   }

   return canReachDestination(maze, start, destination, [0, 1])
      || canReachDestination(maze, start, destination, [0, -1])
      || canReachDestination(maze, start, destination, [-1, 0])
      || canReachDestination(maze, start, destination, [1, 0]);
}