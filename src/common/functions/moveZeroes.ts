/*
   Move Zeroes
   Tags: Array, Two Pointers
   Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the
   non-zero elements.

   Note that you must do this in-place without making a copy of the array.

   Example 1:
   Input: nums = [0,1,0,3,12]
   Output: [1,3,12,0,0]

   Example 2:
   Input: nums = [0]
   Output: [0]

   Constraints:
   1 <= nums.length <= 10^4
   -2^31 <= nums[i] <= 2^31 - 1

   Follow up: Could you minimize the total number of operations done?

   Complexity:
   Time: O(n)
   Space: O(1)
 */

export const moveZeroes = (values: number[]): void => {
   for (let i = 0, j = 0; i < values.length; i++) {
      const valueI = values[i];
      if (valueI === 0)
         continue;
      const valueJ: number = values[j];
      // swap and increment j
      values[j] = valueI;
      values[i] = valueJ;
      j++;
   }
}