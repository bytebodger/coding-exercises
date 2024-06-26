/*
   Minimum Window Sequence
   Tags: String, Dynamic Programming, Sliding Window
   Given strings s1 and s2, return the minimum contiguous substring part of s1, so that s2 is a
   subsequence of the part.

   If there is no such window in s1 that covers all characters in s2, return the empty string "".
   If there are multiple such minimum-length windows, return the one with the left-most starting index.

   Example 1:
   Input: s1 = "abcdebdde", s2 = "bde"
   Output: "bcde"
   Explanation:
   "bcde" is the answer because it occurs before "bdde" which has the same length.
   "deb" is not a smaller window because the elements of s2 in the window must occur in order.

   Example 2:
   Input: s1 = "jmeqksfrsdcmsiwvaovztaqenprpvnbstl", s2 = "u"
   Output: ""

   Constraints:
   1 <= s1.length <= 2 * 10^4
   1 <= s2.length <= 100
   s1 and s2 consist of lowercase English letters.
 */

export const minWindow = (text1: string, text2: string): string => {
   let text1i = 0;
   let text1j = 0;
   let text2j = 0;
   let minimumStart = -1;
   let minimumEnd = text1.length;
   let expand = true;
   while (text1i < text1.length) {
      if (expand) {
         if (text1j >= text1.length)
            break;
         if (text1[text1j] === text2[text2j])
            text2j++;
         if (text2j === text2.length)
            expand = false;
         text1j++;
      } else {
         text2j--;
         text1i = text1j;
         while (text2j >= 0) {
            text1i--;
            if (text1[text1i] === text2[text2j])
               text2j--;
         }
         if (text1j - text1i < minimumEnd - minimumStart) {
            minimumEnd = text1j;
            minimumStart = text1i;
         }
         text2j = 0;
         text1j = text1i + 1;
         expand = true;
      }
   }
   if (minimumStart !== -1)
      return text1.slice(minimumStart, minimumEnd);
   return '';
}