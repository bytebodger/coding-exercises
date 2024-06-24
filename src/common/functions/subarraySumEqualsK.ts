/*
   Subarray Sum Equals K
   Tags: Array, Hash Table, Prefix Sum
   Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

   A subarray is a contiguous non-empty sequence of elements within an array.

   Example 1:
   Input: nums = [1,1,1], k = 2
   Output: 2

   Example 2:
   Input: nums = [1,2,3], k = 3
   Output: 2

   Constraints:
   1 <= nums.length <= 2 * 104
   -1000 <= nums[i] <= 1000
   -107 <= k <= 107
 */

export const subarraySum = (values: number[], targetSum: number): number => {
   // we're going to store all of the previous subarray sums in a map, with the sum as the key
   const previousSums = new Map();
   let currentSum = 0;
   let totalSubarrays = 0;
   while (values.length > 0) {
      // grab each value from the beginning of the array
      const value = values.shift();
      if (value === undefined)
         continue;
      // keep track of the running total of values
      currentSum += value;
      // if this value === targetSum then increment totalSubarrays
      if (currentSum === targetSum)
         totalSubarrays++;
      // since the keys represent the previous sums, stored in ascending order, that means that
      // if we find one of the previous sums in the map (minus targetSum), then the remaining values after that sum
      // would be another valid subarray
      const lookback = currentSum - targetSum;
      if (previousSums.has(lookback))
         totalSubarrays += previousSums.get(lookback);
      if (previousSums.has(currentSum))
         previousSums.set(currentSum, previousSums.get(currentSum) + 1);
      else
         previousSums.set(currentSum, 1);
   }
   return totalSubarrays;
}