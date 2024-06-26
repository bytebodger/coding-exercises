/*
   Number of Wonderful Substrings
   Tags: Hash Table, String, Bit Manipulation, Previx Sum
   A wonderful string is a string where at most one letter appears an odd number of times.

   For example, "ccjjc" and "abab" are wonderful, but "ab" is not.
   Given a string word that consists of the first ten lowercase English letters ('a' through 'j'),
   return the number of wonderful non-empty substrings in word. If the same substring appears multiple
   times in word, then count each occurrence separately.

   A substring is a contiguous sequence of characters in a string.

   Example 1:
   Input: word = "aba"
   Output: 4
   Explanation: The four wonderful substrings are underlined below:
   - "aba" -> "a"
   - "aba" -> "b"
   - "aba" -> "a"
   - "aba" -> "aba"

   Example 2:
   Input: word = "aabb"
   Output: 9
   Explanation: The nine wonderful substrings are underlined below:
   - "aabb" -> "a"
   - "aabb" -> "aa"
   - "aabb" -> "aab"
   - "aabb" -> "aabb"
   - "aabb" -> "a"
   - "aabb" -> "abb"
   - "aabb" -> "b"
   - "aabb" -> "bb"
   - "aabb" -> "b"

   Example 3:
   Input: word = "he"
   Output: 2
   Explanation: The two wonderful substrings are underlined below:
   - "he" -> "h"
   - "he" -> "e"

   Constraints:
   1 <= word.length <= 10^5
   word consists of lowercase English letters from 'a' to 'j'.

   Complexity:
   Time: O(n * k)
   Space: O(2^k)
      where k is the number of bits and n is the length of the string
 */

export const wonderfulSubstrings = (word: string): number => {
   const countByMask: Record<number, number> = { 0: 1 };
   let currentMask = 0;
   let totalCount = 0;
   for (const letter of word) {
      const index = letter.charCodeAt(0) - 'a'.charCodeAt(0);
      currentMask ^= (1 << index);
      if (countByMask[currentMask])
         totalCount += countByMask[currentMask];
      for (let i = 0; i < 10; i++) {
         const toggledMask = currentMask ^ (1 << i);
         if (countByMask[toggledMask])
            totalCount += countByMask[toggledMask];
      }
      if (countByMask[currentMask])
         countByMask[currentMask]++;
      else
         countByMask[currentMask] = 1;
   }
   return totalCount;
}