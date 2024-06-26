/*
   Diagonal Traverse II
   Tags: Array, Sorting, Heap (Priority Queue)
   Given a 2D integer array nums, return all elements of nums in diagonal order as shown in the below images.

   Example 1:
   Input: nums = [[1,2,3],[4,5,6],[7,8,9]]
   Output: [1,4,2,7,5,3,8,6,9]

   Example 2:
   Input: nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
   Output: [1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]

   Constraints:
   1 <= nums.length <= 10^5
   1 <= nums[i].length <= 10^5
   1 <= sum(nums[i].length) <= 10^5
   1 <= nums[i][j] <= 10^5

   Complexity:
   Time: O(m * n)
   Space: O(m + n)
 */

export const findDiagonalOrder = (values: number[][]): number[] => {
   const queue: number[][] = [];
   queue.push([0, 0]);
   const diagonals: number[] = [];
   while (queue.length > 0) {
      const item = queue.shift();
      if (item === undefined)
         continue;
      const [row, col] = item;
      diagonals.push(values[row][col]);
      if (col === 0 && row + 1 < values.length)
         queue.push([row + 1, col]);
      if (col + 1 < values[row].length)
         queue.push([row, col + 1]);
   }
   return diagonals;
}