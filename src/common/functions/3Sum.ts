/*
   3Sum
   Tags: Array, Two Pointers, Sorting
   Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that
   i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

   Notice that the solution set must not contain duplicate triplets.

   Example 1:
   Input: nums = [-1,0,1,2,-1,-4]
   Output: [[-1,-1,2],[-1,0,1]]
   Explanation:
   nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
   nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
   nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
   The distinct triplets are [-1,0,1] and [-1,-1,2].
   Notice that the order of the output and the order of the triplets does not matter.

   Example 2:
   Input: nums = [0,1,1]
   Output: []
   Explanation: The only possible triplet does not sum up to 0.

   Example 3:
   Input: nums = [0,0,0]
   Output: [[0,0,0]]
   Explanation: The only possible triplet sums up to 0.

   Constraints:
   3 <= nums.length <= 3000
   -10^5 <= nums[i] <= 10^5

   Complexity:
   Time: O(n^2)
   Space: O(n)
 */

export const threeSum = (values: number[]): number[][] => {
   // sort ascending
   values = values.sort((a, b) => a - b);
   const result: Array<[number, number, number]> = [];
   for (const i of values.keys()) {
      // Skip duplicate i values. This speeds things up a lot.
      if (i > 0 && values[i] === values[i - 1])
         continue;
      // Set two pointers between the rest of the values and the end
      let left = i + 1;
      let right = values.length - 1;
      while (left < right) {
         const sum = values[i] + values[left] + values[right];
         if (sum > 0) {
            // Sum too large? Decrease it.
            right--;
            continue;
         }
         if (sum < 0) {
            // Sum too small? Increase it.
            left++;
            continue;
         }
         // Skip duplicate left and right values
         while (left < right && values[left] === values[left + 1])
            left++;
         while (left < right && values[right] === values[right - 1])
            right--;
         result.push([values[i], values[left], values[right]]);
         // Increment left to keep looking for more combinations.
         left++;
      }
   }
   return result;
}