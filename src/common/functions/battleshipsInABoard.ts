/*
   Battleships in a Board
   Tags: Array, Depth-First Search, Matrix
   Given an m x n matrix board where each cell is a battleship 'X' or empty '.', return the number of
   the battleships on board.

   Battleships can only be placed horizontally or vertically on board. In other words, they can only be
   made of the shape 1 x k (1 row, k columns) or k x 1 (k rows, 1 column), where k can be of any size.
   At least one horizontal or vertical cell separates between two battleships (i.e., there are no adjacent
   battleships).

   Example 1:
   Input: board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]
   Output: 2

   Example 2:
   Input: board = [["."]]
   Output: 0

   Constraints:
   m == board.length
   n == board[i].length
   1 <= m, n <= 200
   board[i][j] is either '.' or 'X'.

   Follow up: Could you do it in one-pass, using only O(1) extra memory and without modifying the values board?
 */

export const countBattleships = (board: string[][]): number => {
   const removeBattleship = (row: number, column: number, board: string[][]) => {
      if (board[row][column] !== occupied)
         return;
      board[row][column] = empty;
      if (row !== 0)
         removeBattleship(row - 1, column, board)
      if (row !== board.length - 1)
         removeBattleship(row + 1, column, board)
      if (column !== 0)
         removeBattleship(row, column - 1, board)
      if (column !== board[row].length - 1)
         removeBattleship(row, column + 1, board)
   }

   const occupied = 'X';
   const empty = '.';
   let result = 0;
   for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board[row].length; column++) {
         if (board[row][column] === occupied) {
            result++;
            removeBattleship(row, column, board);
         }
      }
   }
   return result;
}