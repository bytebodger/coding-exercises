/*
   Meeting Rooms II
   Tags: Array, Two Pointers, Greedy, Sorting, Heap (Priority Queue), Prefix Sum
   Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return
   the minimum number of conference rooms required.

   Example 1:
   Input: intervals = [[0,30],[5,10],[15,20]]
   Output: 2

   Example 2:
   Input: intervals = [[7,10],[2,4]]
   Output: 1

   Constraints:
   1 <= intervals.length <= 10^4
   0 <= starti < endi <= 10^6

   Complexity:
   Time: O(n * m)
   Space: O(n)
 */

export const minMeetingRooms = (intervals: number[][]): number => {
   // sort the intervals
   intervals = intervals.sort((intervalA, intervalB) => intervalA[0] - intervalB[0]);
   // use a reducer to reduce the intervals to a single number of needed rooms
   const result = intervals.reduce((interval: number[][], extents: number[]) => {
      const roomIndex = interval.findIndex(extent => extents[0] >= extent[1]);
      if (roomIndex === -1)
         interval.push(extents);
      else
         interval[roomIndex][1] = extents[1];
      return interval;
   }, []);
   return result.length;
}