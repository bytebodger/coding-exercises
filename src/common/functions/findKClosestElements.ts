/*
   Find K Closest Elements
   Tags: Array, Two Pointers, Binary Search, Sliding Window, Sorting, Heap (Priority Queue)
   Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the
   array. The result should also be sorted in ascending order.

   An integer a is closer to x than an integer b if:

   |a - x| < |b - x|, or
   |a - x| == |b - x| and a < b

   Example 1:
   Input: arr = [1,2,3,4,5], k = 4, x = 3
   Output: [1,2,3,4]

   Example 2:
   Input: arr = [1,2,3,4,5], k = 4, x = -1
   Output: [1,2,3,4]

   Constraints:
   1 <= k <= arr.length
   1 <= arr.length <= 10^4
   arr is sorted in ascending order.
   -10^4 <= arr[i], x <= 10^4
 */

export const findClosestElements = (values: number[], range: number, target: number): number[] => {
   let position = range;
   for (position; position < values.length; position++) {
      const value = values[position];
      const rangeDelta = Math.abs(values[position - range] - target);
      const positionDelta = Math.abs(value - target);
      // if difference start to get bigger we want to stop
      // values[position-range] !== values[position] check is for the case of duplicate elements
      if (values[position - range] !== value && positionDelta >= rangeDelta)
         break;
   }
   return values.splice(position - range, range);
}