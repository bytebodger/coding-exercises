/*
   Next Permutation
   Tags: Array, Two Pointers
   A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

   For example, for arr = [1,2,3], the following are all the permutations of arr:
   [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
   The next permutation of an array of integers is the next lexicographically greater permutation of its integer.
   More formally, if all the permutations of the array are sorted in one container according to their
   lexicographical order, then the next permutation of that array is the permutation that follows it in the
   sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible
   order (i.e., sorted in ascending order).

   For example, the next permutation of arr = [1,2,3] is [1,3,2].
   Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
   While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical
   larger rearrangement.
   Given an array of integers nums, find the next permutation of nums.

   The replacement must be in place and use only constant extra memory.

   Example 1:
   Input: nums = [1,2,3]
   Output: [1,3,2]

   Example 2:
   Input: nums = [3,2,1]
   Output: [1,2,3]

   Example 3:
   Input: nums = [1,1,5]
   Output: [1,5,1]

   Constraints:
   1 <= nums.length <= 100
   0 <= nums[i] <= 100

   Complexity:
   Time complexity: O(n)
      where n is the length of values[]
   Space complexity: O(1)
 */

export const nextPermutation = (values: number[]): void => {
   // if the array is of length 1 or less, no permutation is needed
   if (values.length <= 1)
      return;
   // find the first index (from the right) where the adjacent values are in increasing order
   let firstIndex = -1;
   for (let i = values.length - 2; i >= 0; i--) {
      const value = values[i];
      const nextValue = values[i + 1];
      if (value < nextValue) {
         firstIndex = i;
         break;
      }
   }
   // if no such index is found, reverse the array to get the smallest permutation
   if (firstIndex === -1) {
      values.reverse();
      return;
   }
   // find the index of the smallest number greater than values[firstIndex] from the end
   let secondIndex = -1;
   for (let i = values.length - 1; i > firstIndex; i--) {
      const value = values[i];
      const firstValue = values[firstIndex];
      if (value > firstValue) {
         secondIndex = i;
         break;
      }
   }
   // inline swap ofvalues at firstIndex and secondIndex
   [values[firstIndex], values[secondIndex]] = [values[secondIndex], values[firstIndex]];
   // reverse the subarray starting from firstIndex + 1 to the end
   let start = firstIndex + 1;
   let end = values.length - 1;
   while (start < end) {
      [values[start], values[end]] = [values[end], values[start]];
      start++;
      end--;
   }
}