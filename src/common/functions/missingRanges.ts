/*
   Missing Ranges
   Tags: Array
   You are given an inclusive range [lower, upper] and a sorted unique integer array nums, where all elements
   are within the inclusive range.

   A number x is considered missing if x is in the range [lower, upper] and x is not in nums.

   Return the shortest sorted list of ranges that exactly covers all the missing numbers. That is, no element of
   nums is included in any of the ranges, and each missing number is covered by one of the ranges.

   Example 1:
   Input: nums = [0,1,3,50,75], lower = 0, upper = 99
   Output: [[2,2],[4,49],[51,74],[76,99]]
   Explanation: The ranges are:
   [2,2]
   [4,49]
   [51,74]
   [76,99]

   Example 2:
   Input: nums = [-1], lower = -1, upper = -1
   Output: []
   Explanation: There are no missing ranges since there are no missing numbers.

   Constraints:
   -10^9 <= lower <= upper <= 10^9
   0 <= nums.length <= 100
   lower <= nums[i] <= upper
   All the values of nums are unique.

   Complexity:
   Time complexity: O(n)
   Space complexity: O(n)
 */

export const findMissingRanges = (values: number[], lower: number, upper: number): number[][] => {
   if (!values.length)
      return [[lower, upper]];
   const ranges: number[][] = [];
   const firstValue = values[0];
   const lastValue = values[values.length - 1];
   if (firstValue > lower)
      ranges.push([lower, firstValue - 1]);
   for (let i = 0; i < values.length - 1; i++) {
      const value = values[i];
      const nextValue = values[i + 1];
      if (value + 1 < nextValue)
         ranges.push([value + 1, nextValue - 1]);
   }
   if (lastValue < upper)
      ranges.push([lastValue + 1, upper]);
   return ranges;
}