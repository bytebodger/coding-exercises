/*
   Maximum Sum of 3 Non-Overlapping Subarrays
   Tags: Array, Dynamic Programming
   Given an integer array nums and an integer k, find three non-overlapping subarrays of length k with
   maximum sum and return them.

   Return the result as a list of indices representing the starting position of each interval (0-indexed).
   If there are multiple answers, return the lexicographically smallest one.

   Example 1:
   Input: nums = [1,2,1,2,6,7,5,1], k = 2
   Output: [0,3,5]
   Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
   We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.

   Example 2:
   Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
   Output: [0,2,4]

   Constraints:
   1 <= nums.length <= 2 * 10^4
   1 <= nums[i] < 2^16
   1 <= k <= floor(nums.length / 3)
 */

export const maxSumOfThreeSubarrays = (values: number[], targetLength: number): number[] => {
   const length = values.length - targetLength + 1;
   const totalSubarrays = 3;
   const memo = Array(length).fill(0);
   memo[0] = values.slice(targetLength).reduce((accumulator, value) => accumulator + value);
   for (let i = 1; i < values.length - targetLength + 1; i++) {
      memo[i] = memo[i - 1] - values[i - 1] + values[i + targetLength - 1];
   }
   const sumMemo = Array(totalSubarrays + 1).fill([0, []]);
   for (let i = 0; i < values.length - targetLength * totalSubarrays + 1; i++) {
      for (let j = 1; j <= totalSubarrays; j++) {
         const subarrayLength = i + (j - 1) * targetLength;
         const windowSum = memo[subarrayLength];
         const tempSum = windowSum + sumMemo[j - 1][0];
         if (tempSum > sumMemo[j][0]) {
            const indices = [...sumMemo[j - 1][1], subarrayLength];
            sumMemo[j] = [tempSum, indices];
         }
      }
   }
   return sumMemo[totalSubarrays][1];
}