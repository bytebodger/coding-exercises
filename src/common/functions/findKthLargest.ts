/*
   Tags: Array, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect
   Given an integer array nums and an integer k, return the kth largest element in the array.

   Note that it is the kth largest element in the sorted order, not the kth distinct element.

   Can you solve it without sorting?

   Example 1:
   Input: nums = [3,2,1,5,6,4], k = 2
   Output: 5

   Example 2:
   Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
   Output: 4

   Constraints:
   1 <= k <= nums.length <= 10^5
   -104 <= nums[i] <= 10^4

   Solution:
   I don't know how to do this without ANY sorting at all.  I tried a few approaches but they always ran out of time or memory on the
      large edge-case test cases.  So I created a greedyQuickSelect() function that does a split recursive sort and tries to reduce the
      necessary recursion by discarding the results for the lower part of the array.
 */

export const findKthLargest = (values: number[], depth: number): number => {
   const greedyQuickSelect = (values: number[], leftExtent: number | null = null, rightExtent: number | null = null): number[] => {
      if (values.length <= 1)
         return values;
      let lowerLeftExtent = Number.MAX_SAFE_INTEGER;
      let lowerRightExtent = Number.MIN_SAFE_INTEGER;
      let upperLeftExtent = Number.MAX_SAFE_INTEGER;
      let upperRightExtent = Number.MIN_SAFE_INTEGER;
      const lowerValues: number[] = [];
      const upperValues: number[] = [];
      let pivot: number;
      if (leftExtent === null || rightExtent === null) {
         const uniqueValues = [...new Set(values)];
         if (uniqueValues.length === 1)
            return values;
         pivot = (uniqueValues[0] + uniqueValues[1]) / 2;
      } else {
         pivot = (rightExtent + leftExtent) / 2;
      }
      values.forEach(value => {
         if (value < pivot) {
            lowerValues.push(value);
            if (value < lowerLeftExtent) {
               lowerLeftExtent = value;
            } else if (value > lowerRightExtent) {
               lowerRightExtent = value;
            }
         } else {
            upperValues.push(value);
            if (value < upperLeftExtent) {
               upperLeftExtent = value;
            } else if (value > upperRightExtent) {
               upperRightExtent = value;
            }
         }
      })
      if (lowerValues.length === values.length)
         return lowerValues;
      if (upperValues.length === values.length)
         return upperValues;
      const sortedUpperValues = greedyQuickSelect(upperValues, upperLeftExtent, upperRightExtent);
      if (sortedUpperValues.length >= depth)
         return sortedUpperValues;
      const sortedLowerValues = greedyQuickSelect(lowerValues, lowerLeftExtent, lowerRightExtent);
      return sortedUpperValues.concat(sortedLowerValues);
   }

   const sortedValues = greedyQuickSelect(values);
   return sortedValues[depth - 1];
}