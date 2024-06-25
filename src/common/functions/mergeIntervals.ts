/*
   Merge Intervals
   Tags: Array, Sorting
   Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return
   an array of the non-overlapping intervals that cover all the intervals in the input.

   Example 1:
   Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
   Output: [[1,6],[8,10],[15,18]]
   Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

   Example 2:
   Input: intervals = [[1,4],[4,5]]
   Output: [[1,5]]
   Explanation: Intervals [1,4] and [4,5] are considered overlapping.

   Constraints:
   1 <= intervals.length <= 10^4
   intervals[i].length == 2
   0 <= starti <= endi <= 10^4

   Complexity:
   Time complexity: O(n log n)
      Where n is the numberr of intervals
   Space complexity: O(n)
      Where n is the numberr of intervals
 */

export const merge = (intervals: number[][]): number[][] => {
   // sort the intervals by the starting element
   intervals.sort((a, b) => a[0] - b[0])
   const result = [];
   const totalIntervals = intervals.length;
   let i = 0;
   // loop through each interval to find overlaps
   while (i < totalIntervals) {
      const temporaryInterval = [intervals[i][0]];
      let maximum = intervals[i][1];
      i++;
      // loop again from the end the of this interval to the maximum
      while (i < totalIntervals && maximum >= intervals[i][0]) {
         if (intervals[i][0] < temporaryInterval[0])
            temporaryInterval[0] = intervals[i][0];
         maximum = Math.max(intervals[i][1], maximum);
         // we have to increment in both the outer and inner loops
         // to avoid double-counting
         i++;
      }
      // push the max to the temporary interval
      temporaryInterval.push(maximum);
      // push the whole interval to the result
      result.push(temporaryInterval);
   }
   return result;
}