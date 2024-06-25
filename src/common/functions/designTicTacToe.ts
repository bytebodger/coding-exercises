/*
   Design Tic-Tac-Toe
   Tags: Array, Hash Table, Design, Matrix, Simulation
   Assume the following rules are for the tic-tac-toe game on an n x n board between two players:

   A move is guaranteed to be valid and is placed on an empty block.
   Once a winning condition is reached, no more moves are allowed.
   A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row
   wins the game.
   Implement the TicTacToe class:

   TicTacToe(int n) Initializes the object the size of the board n.
   int move(int row, int col, int player) Indicates that the player with id player plays at the
   cell (row, col) of the board. The move is guaranteed to be a valid move, and the two players alternate in making moves. Return
   0 if there is no winner after the move,
   1 if player 1 is the winner after the move, or
   2 if player 2 is the winner after the move.

   Example 1:

   Input
   ["TicTacToe", "move", "move", "move", "move", "move", "move", "move"]
   [[3], [0, 0, 1], [0, 2, 2], [2, 2, 1], [1, 1, 2], [2, 0, 1], [1, 0, 2], [2, 1, 1]]
   Output
   [null, 0, 0, 0, 0, 0, 0, 1]

   Explanation
   TicTacToe ticTacToe = new TicTacToe(3);
   Assume that player 1 is "X" and player 2 is "O" in the board.
   ticTacToe.move(0, 0, 1); // return 0 (no one wins)
   |X| | |
   | | | |    // Player 1 makes a move at (0, 0).
   | | | |

   ticTacToe.move(0, 2, 2); // return 0 (no one wins)
   |X| |O|
   | | | |    // Player 2 makes a move at (0, 2).
   | | | |

   ticTacToe.move(2, 2, 1); // return 0 (no one wins)
   |X| |O|
   | | | |    // Player 1 makes a move at (2, 2).
   | | |X|

   ticTacToe.move(1, 1, 2); // return 0 (no one wins)
   |X| |O|
   | |O| |    // Player 2 makes a move at (1, 1).
   | | |X|

   ticTacToe.move(2, 0, 1); // return 0 (no one wins)
   |X| |O|
   | |O| |    // Player 1 makes a move at (2, 0).
   |X| |X|

   ticTacToe.move(1, 0, 2); // return 0 (no one wins)
   |X| |O|
   |O|O| |    // Player 2 makes a move at (1, 0).
   |X| |X|

   ticTacToe.move(2, 1, 1); // return 1 (player 1 wins)
   |X| |O|
   |O|O| |    // Player 1 makes a move at (2, 1).
   |X|X|X|

   Constraints:
   2 <= n <= 100
   player is 1 or 2.
   0 <= row, col < n
   (row, col) are unique for each different call to move.
   At most n^2 calls will be made to move.

   Follow-up: Could you do better than O(n^2) per move() operation?
 */

export class TicTacToe {
   boardSize: number;
   grid: number[][] = [];

   constructor (boardSize: number) {
      this.boardSize = boardSize;
      // populate the grid with 0s
      for (let row = 0; row < boardSize; row++) {
         this.grid.push([]);
         for (let column = 0; column < boardSize; column++) {
            this.grid[row].push(0);
         }
      }
   }

   move (row: number, column: number, player: number): number {
      // update grid
      this.grid[row][column] = player;
      // check row
      let rowCompleted = true;
      this.grid[row].forEach(column => {
         if (column !== player)
            rowCompleted = false;
      })
      if (rowCompleted)
         return player;
      // check column
      let columnCompleted = true;
      for (let row = 0; row < this.boardSize; row++) {
         if (this.grid[row][column] !== player)
            columnCompleted = false;
      }
      if (columnCompleted)
         return player;
      // check nw2se diagonal
      let nw2seComplete = true;
      for (let i = 0; i < this.boardSize; i++) {
         if (this.grid[i][i] !== player)
            nw2seComplete = false;
      }
      if (nw2seComplete)
         return player;
      // check ne2sw diagonal
      let ne2swComplete = true;
      for (let row = 0; row < this.boardSize; row++) {
         if (this.grid[row][this.boardSize - row - 1] !== player)
            ne2swComplete = false;
      }
      return ne2swComplete ? player : 0;
   }
}