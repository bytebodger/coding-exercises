/*
   Sliding Window Median
   Tags: Array, Hash Table, Sliding Window, Heap (Priority Queue)
   The median is the middle value in an ordered integer list. If the size of the list is even, there is
   no middle value. So the median is the mean of the two middle values.

   For examples, if arr = [2,3,4], the median is 3.
   For examples, if arr = [1,2,3,4], the median is (2 + 3) / 2 = 2.5.
   You are given an integer array nums and an integer k. There is a sliding window of size k which is
   moving from the very left of the array to the very right. You can only see the k numbers in the window.
   Each time the sliding window moves right by one position.

   Return the median array for each window in the original array. Answers within 10^-5 of the actual value
   will be accepted.

   Example 1:
   Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
   Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
   Explanation:
   Window position                Median
   ---------------                -----
   [1  3  -1] -3  5  3  6  7        1
    1 [3  -1  -3] 5  3  6  7       -1
    1  3 [-1  -3  5] 3  6  7       -1
    1  3  -1 [-3  5  3] 6  7        3
    1  3  -1  -3 [5  3  6] 7        5
    1  3  -1  -3  5 [3  6  7]       6

   Example 2:
   Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
   Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]

   Constraints:
   1 <= k <= nums.length <= 10^5
   -2^31 <= nums[i] <= 2^31 - 1
 */

/*
   You can't write a heap data structure during the interview if you use JS/TS
   Sort the first window using O(klogk). Then use O(k) to keep the window sorted when adding & removing elements

   It's actually O(nk + klogk)
 */

export const medianSlidingWindow = (values: number[], windowSize: number): number[] => {
   const getWindowMedian = (window: number[], size: number): number => {
      if (size & 1)
         return window[size >> 1];
      else
         return (window[(size >> 1) - 1] + window[size >> 1]) / 2;
   }

   const medians: number[] = [];
   let window: number[] = [];
   for (let i = 0; i + windowSize <= values.length; i++) {
      // Do the sorting only for the 1st window
      if (i === 0) {
         window = values.slice(0, windowSize);
         window.sort((a: number, b: number) => a - b);
         medians.push(getWindowMedian(window, windowSize));
      } else {
         // Add & Remove meanwhile keep it sorted
         // 0 1 2
         // 1 2 3
         // remove: i - 1   add: i + windowSize - 1
         window.splice(window.indexOf(values[i - 1]), 1);
         const toAdd: number = values[i + windowSize - 1];
         let j: number = 0;
         for (; j < window.length; j++) {
            if (window[j] >= toAdd)
               break;
         }
         window.splice(j, 0, toAdd);
         medians.push(getWindowMedian(window, windowSize));
      }
   }
   return medians;
}