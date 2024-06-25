/*
   Toeplitz Matrix
   Tags: Array, Matrix
   Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.

   A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.

   Example 1:
   Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
   Output: true
   Explanation:
   In the above grid, the diagonals are:
   "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
   In each diagonal all elements are the same, so the answer is True.

   Example 2:
   Input: matrix = [[1,2],[2,2]]
   Output: false
   Explanation:
   The diagonal "[1, 2]" has different elements.

   Constraints:
   m == matrix.length
   n == matrix[i].length
   1 <= m, n <= 20
   0 <= matrix[i][j] <= 99

   Follow up:
   What if the matrix is stored on disk, and the memory is limited such that you can only load at most one row of
   the matrix into the memory at once?
   What if the matrix is so large that you can only load up a partial row into the memory at once?

   Complexity:
   Time complexity: O(n * m)
   Space complexity: O(1)
 */

export const isToeplitzMatrix = (matrix: number[][]): boolean => {
   // recursively traverse the diagonal to determine if it's toeplitz
   const diagonalIsToeplitz = (firstValue: number, row: number, column: number): boolean => {
      if (matrix[row][column] !== firstValue)
         return false;
      if (row + 1 >= matrix.length || column + 1 >= matrix[row].length)
         return true;
      return diagonalIsToeplitz(firstValue, row + 1, column + 1);
   }

   let matrixIsToeplitz = true;
   // starting at the bottom, go up the left side of the matrix
   for (let row = matrix.length - 1; row >= 0; row--) {
      const thisRow = matrix[row];
      // no need to check the lower-left value and the upper-left value will be checked in the column
      if (row > 0 && row < matrix.length - 1) {
         const firstValue = thisRow[0];
         const thisDiagonalIsToeplitz = diagonalIsToeplitz(firstValue, row, 0);
         if (!thisDiagonalIsToeplitz) {
            matrixIsToeplitz = false;
            break;
         }
      }
      // then go across the top side of the matrix
      if (row !== 0)
         continue;
      for (let column = 0; column < thisRow.length; column++) {
         const firstValue = thisRow[column];
         const thisDiagonalIsToeplitz = diagonalIsToeplitz(firstValue, row, column);
         if (!thisDiagonalIsToeplitz) {
            matrixIsToeplitz = false;
            break;
         }
      }
   }
   return matrixIsToeplitz;
}