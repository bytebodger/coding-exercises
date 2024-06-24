/*
   Median of Two Sorted Arrays
   Tags: Array, Binary Search, Divide and Conquer
   Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

   The overall run time complexity should be O(log (m+n)).

   Example 1:
   Input: nums1 = [1,3], nums2 = [2]
   Output: 2.00000
   Explanation: merged array = [1,2,3] and median is 2.

   Example 2:
   Input: nums1 = [1,2], nums2 = [3,4]
   Output: 2.50000
   Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

   Constraints:
   nums1.length == m
   nums2.length == n
   0 <= m <= 1000
   0 <= n <= 1000
   1 <= m + n <= 2000
   -10^6 <= nums1[i], nums2[i] <= 10^6

   Solution:
   Determine the combined length of both arrays and the midpoint index.
   Loop through the combined length and determine which array has the lowest number.
   Then shift() that number off the array.
   Once you get to the midpoint index use the most-recently shift()ed number to determine the median value.
   You also need to use the *previously-shift()ed* number if the midpoint is between two indices.
 */

export const findMedianSortedArrays = (array1: number[], array2: number[]): number => {
   const totalNumbers = array1.length + array2.length;
   const midpoint = (totalNumbers / 2) - 0.5;
   let median = 0;
   let previousNum = 0;
   for (let i = 0; i < totalNumbers; i++) {
      let num = 0;
      if (array1.length === 0)
         num = array2.shift() ?? 0;
      else if (array2.length === 0)
         num = array1.shift() ?? 0;
      else {
         const num1 = array1[0];
         const num2 = array2[0];
         if (num1 <= num2)
            num = array1.shift() ?? 0;
         else
            num = array2.shift() ?? 0;
      }
      if (i === midpoint) {
         median = num;
         break;
      } else if (i - 0.5 === midpoint) {
         median = ((num ?? 0) + previousNum) / 2;
         break;
      }
      previousNum = num;
   }
   return median;
}