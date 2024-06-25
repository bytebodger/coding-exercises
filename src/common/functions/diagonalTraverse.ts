/*
   Diagonal Traverse
   Tags: Array, Matrix, Simulation
   Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

   Example 1:
   Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
   Output: [1,2,4,7,5,3,6,8,9]

   Example 2:
   Input: mat = [[1,2],[3,4]]
   Output: [1,2,3,4]

   Constraints:
   m == mat.length
   n == mat[i].length
   1 <= m, n <= 10^4
   1 <= m * n <= 10^4
   -10^5 <= mat[i][j] <= 10^5

   Complexity:
   Time complexity: O(m * n)
   Space complexity: O(1)
 */

export const findDiagonalOrder = (matrix: number[][]): number[] => {
   // recursive function to log the current value and then determine where to go next
   const getValue = (row: number, column: number) => {
      diagonalPath.push(matrix[row][column]);
      // this is the end (extreme southeast corner)
      if (row === height - 1 && column === width - 1)
         return;
      if (direction === 'southwest') {
         const targetRow = row + 1;
         const targetColumn = column - 1;
         if (targetRow < height && targetColumn >= 0) {
            // continue in the current direction
            getValue(targetRow, targetColumn);
         } else {
            // flip direction
            direction = 'northeast';
            if (targetRow < height && targetColumn < 0) {
               // off the left edge
               getValue(targetRow, column);
            } else if (targetRow === height) {
               // off the bottom edge
               getValue(row, column + 1);
            }
         }
      } else if (direction === 'northeast') {
         const targetRow = row - 1;
         const targetColumn = column + 1;
         if (targetRow >= 0 && targetColumn < width) {
            // continue in the current direction
            getValue(targetRow, targetColumn);
         } else {
            // flip direction
            direction = 'southwest';
            if (targetRow < 0 && targetColumn < width) {
               // off the top edge
               getValue(row, targetColumn);
            } else if (targetColumn === width) {
               // off the right edge
               getValue(row + 1, column);
            }
         }
      }
   }

   const height = matrix.length;
   const width = matrix[0].length;
   // if the matrix is one dimensional you can just return the flatted array
   if (height === 1 || width === 1)
      return matrix.flat();
   // flip-flopping direction will determine the logic for going northeast or southwest
   let direction = 'southwest';
   // initialize the product with the first (most northwest) value in the matrix
   const diagonalPath: number[] = [matrix[0][0]];
   getValue(0, 1);
   return diagonalPath;
}