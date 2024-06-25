/*
   Top K Frequent Elements
   Tags: Array, Hash Table, Divide and Conquer, Sorting, Heap (Priority Queue), Bucket Sort, Counting, Quickselect
   Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

   Example 1:
   Input: nums = [1,1,1,2,2,3], k = 2
   Output: [1,2]

   Example 2:
   Input: nums = [1], k = 1
   Output: [1]

   Constraints:
   1 <= nums.length <= 10^5
   -10^4 <= nums[i] <= 10^4
   k is in the range [1, the number of unique elements in the array].
   It is guaranteed that the answer is unique.

   Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

   Complexity:
   Time complexity: O(n)
 */

export const topKFrequent = (values: number[], depth: number): number[] => {
   // map frequencies
   const frequencies = new Map();
   values.forEach((value) => {
      const previousValue = frequencies.get(value);
      return previousValue ? frequencies.set(value, previousValue + 1) : frequencies.set(value, 1);
   })
   // create buckets
   const bucket: number[][] = Array(values.length);
   // fill buckets
   frequencies.forEach((frequency, value) => {
      bucket[frequency] ? bucket[frequency].push(value) : bucket[frequency] = [value];
   })
   // flatting the bucket allows us to slice the depth-number of values off the end
   return bucket.flat().slice(-depth);
}