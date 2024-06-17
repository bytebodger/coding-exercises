/*
   Interval List Intersections
   Tags: Array, Two Pointers
   You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and
   secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.

   Return the intersection of these two interval lists.

   A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.

   The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed
   interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].

   Example 1:
   Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
   Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

   Example 2:
   Input: firstList = [[1,3],[5,9]], secondList = []
   Output: []

   Constraints:
   0 <= firstList.length, secondList.length <= 1000
   firstList.length + secondList.length >= 1
   0 <= starti < endi <= 10^9
   endi < starti+1
   0 <= startj < endj <= 10^9
   endj < startj+1

   Solution:
   If either input list is empty, return an empty array.
   Loop through each of the intervals in the first list.
      Loop through each of the intervals in the second list.
         If the current interval in the second list ends before the beginning of the current item in the first list, continue.
         If the current interval in the second list starts after the end of the current item in the second list, break.
         The start is the maximum of the starting values from each item.
         The end is the minimum of the ending values from each item.
         Push [start, end] to the array of intersections.
   Return the array of intersections.
 */

export const intervalIntersection = (firstList: number[][], secondList: number[][]): number[][] => {
   if (firstList.length === 0 || secondList.length === 0)
      return [];
   const intersections: number[][] = [];
   for (let i = 0; i < firstList.length; i++) {
      const firstInterval = firstList[i];
      for (let j = 0; j < secondList.length; j++) {
         const secondInterval = secondList[j];
         if (secondInterval[1] < firstInterval[0])
            continue;
         if (secondInterval[0] > firstInterval[1])
            break;
         const start = Math.max(firstInterval[0], secondInterval[0]);
         const end = Math.min(firstInterval[1], secondInterval[1]);
         intersections.push([start, end]);
      }
   }
   return intersections;
}