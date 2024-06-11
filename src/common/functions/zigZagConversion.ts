/*
   Tags: String
   The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this
   pattern in a fixed font for better legibility)

   P   A   H   N
   A P L S I I G
   Y   I   R

   And then read line by line: "PAHNAPLSIIGYIR"

   Write the code that will take a string and make this conversion given a number of rows:

   string convert(string s, int numRows);

   Example 1:
   Input: s = "PAYPALISHIRING", numRows = 3
   Output: "PAHNAPLSIIGYIR"

   Example 2:
   Input: s = "PAYPALISHIRING", numRows = 4
   Output: "PINALSIGYAHRPI"
   Explanation:
   P     I    N
   A   L S  I G
   Y A   H R
   P     I

   Example 3:
   Input: s = "A", numRows = 1
   Output: "A"

   Constraints:
   1 <= s.length <= 1000
   s consists of English letters (lower-case and upper-case), ',' and '.'.
   1 <= numRows <= 1000

   Solution:
   Prepopulate a 2D array with empty strings.
   Then implement the convoluted zig-zag logic to populate the matrix based on the supplied letters.
   Then loop back through the matrix and join() it back into a string.
 */

export const convertZigZag = (word: string, rows: number) => {
   if (rows === 1)
      return word;
   let output = '';
   const grid: string[][] = [];
   const lettersPerZig = rows === 1 ? 1 : rows + (rows - 2);
   const columnsPerZig = rows === 1 ? 1 : rows - 1;
   const totalZigs = Math.ceil(word.length / lettersPerZig);
   const totalColumns = totalZigs * columnsPerZig;
   for (let i = 0; i < rows; i++) {
      grid[i] = new Array(totalColumns).fill('');
   }
   let nextY = 0;
   let nextX = 0;
   let descending = true;
   for (let position = 0; position < word.length; position++) {
      grid[nextY][nextX] = word[position];
      if (descending)
         nextY++;
      else {
         nextY--;
         nextX++;
      }
      if (nextY === rows) {
         nextY = rows - 2;
         nextX++;
         descending = false;
      } else if (nextY === -1) {
         nextY = 1;
         nextX--;
         descending = true;
      }
   }
   grid.forEach(row => {
      output += row.join('');
   })
   return output;
}