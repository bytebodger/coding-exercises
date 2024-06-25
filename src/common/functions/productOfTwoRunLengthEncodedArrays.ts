/*
   Product of Two Run-Length Encoded Arrays
   Tags: Array, Two Pointers
   Run-length encoding is a compression algorithm that allows for an integer array nums with many segments of
   consecutive repeated numbers to be represented by a (generally smaller) 2D array encoded. Each encoded[i] = [vali, freqi]
   describes the ith segment of repeated numbers in nums where vali is the value that is repeated freqi times.

   For example, nums = [1,1,1,2,2,2,2,2] is represented by the run-length encoded array encoded = [[1,3],[2,5]].
   Another way to read this is "three 1's followed by five 2's".
   The product of two run-length encoded arrays encoded1 and encoded2 can be calculated using the following steps:

   Expand both encoded1 and encoded2 into the full arrays nums1 and nums2 respectively.
   Create a new array prodNums of length nums1.length and set prodNums[i] = nums1[i] * nums2[i].
   Compress prodNums into a run-length encoded array and return it.
   You are given two run-length encoded arrays encoded1 and encoded2 representing full arrays nums1 and nums2 respectively.
   Both nums1 and nums2 have the same length. Each encoded1[i] = [vali, freqi] describes the ith segment of nums1, and each
   encoded2[j] = [valj, freqj] describes the jth segment of nums2.

   Return the product of encoded1 and encoded2.

   Note: Compression should be done such that the run-length encoded array has the minimum possible length.

   Example 1:
   Input: encoded1 = [[1,3],[2,3]], encoded2 = [[6,3],[3,3]]
   Output: [[6,6]]
   Explanation: encoded1 expands to [1,1,1,2,2,2] and encoded2 expands to [6,6,6,3,3,3].
   prodNums = [6,6,6,6,6,6], which is compressed into the run-length encoded array [[6,6]].

   Example 2:
   Input: encoded1 = [[1,3],[2,1],[3,2]], encoded2 = [[2,3],[3,3]]
   Output: [[2,3],[6,1],[9,2]]
   Explanation: encoded1 expands to [1,1,1,2,3,3] and encoded2 expands to [2,2,2,3,3,3].
   prodNums = [2,2,2,6,9,9], which is compressed into the run-length encoded array [[2,3],[6,1],[9,2]].

   Constraints:
   1 <= encoded1.length, encoded2.length <= 10^5
   encoded1[i].length == 2
   encoded2[j].length == 2
   1 <= vali, freqi <= 10^4 for each encoded1[i].
   1 <= valj, freqj <= 10^4 for each encoded2[j].
   The full arrays that encoded1 and encoded2 represent are the same length.

   Complexity:
   Time complexity: O(m+n)
   Space complexity: O(m+n)
 */

export const findRLEArray = (encoded1: number[][], encoded2: number[][]): number[][] => {
   let index1 = 0;
   let index2 = 0;
   const result: number[][] = [];
   let occurrences1: number = 0;
   let occurrences2: number = 0;
   // go until we've inspected all rows in both encoded[][] arrays
   while (index1 < encoded1.length && index2 < encoded2.length) {
      const value1 = encoded1[index1][0];
      const value2 = encoded2[index2][0];
      occurrences1 = occurrences1 || encoded1[index1][1];
      occurrences2 = occurrences2 || encoded2[index2][1];
      const valuesProduct = value1 * value2;
      const minimumOccurrence = Math.min(occurrences1, occurrences2);
      // we're seeing a new value, so push the previous values onto result[][]
      // else, update minimumOccurrence
      if (result[result.length - 1]?.[0] !== valuesProduct)
         result.push([valuesProduct, minimumOccurrence]);
      else
         result[result.length - 1][1] += minimumOccurrence;
      occurrences1 -= minimumOccurrence;
      occurrences2 -= minimumOccurrence;
      // if either occurrences are 0, then increment the pointers for their respective encoded[][] arrays
      if (occurrences1 === 0)
         index1++;
      if (occurrences2 === 0)
         index2++;
   }
   return result;
}