/*
   Partition Array for Maximum Sum
   Tags: Array, Dynamic Programming
   Given an integer array arr, partition the array into (contiguous) subarrays of length at most k.
   After partitioning, each subarray has their values changed to become the maximum value of that subarray.

   Return the largest sum of the given array after partitioning. Test cases are generated so that the
   answer fits in a 32-bit integer.

   Example 1:
   Input: arr = [1,15,7,9,2,5,10], k = 3
   Output: 84
   Explanation: arr becomes [15,15,15,9,10,10,10]

   Example 2:
   Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
   Output: 83

   Example 3:
   Input: arr = [1], k = 1
   Output: 1

   Constraints:
   1 <= arr.length <= 500
   0 <= arr[i] <= 10^9
   1 <= k <= arr.length

   Complexity:
   Time: O(n * k)
   Space: O(n)
 */

export const maxSumAfterPartitioning = (values: number[], limit: number): number => {
   // cumulativeSums[i] = max sum up to values[i]
   const cumulativeSums = Array<number>(values.length).fill(0);
   for (let i = 0; i < values.length; i++) {
      let subarrayMaximum = -1;
      for (let j = 0; j < limit; j++) {
         if (j > i)
            break;
         subarrayMaximum = Math.max(subarrayMaximum, values[i - j]);
         const subarraySum = subarrayMaximum * (j + 1);
         const previousSubarraySum = i - j > 0 ? cumulativeSums[i - j - 1] : 0;
         cumulativeSums[i] = Math.max(cumulativeSums[i], subarraySum + previousSubarraySum);
      }
   }
   return cumulativeSums[values.length - 1];
}