/*
   Palindromic Substrings
   Tags: Two Pointers, String, Dynamic Programming
   Given a string s, return the number of palindromic substrings in it.

   A string is a palindrome when it reads the same backward as forward.

   A substring is a contiguous sequence of characters within the string.

   Example 1:
   Input: s = "abc"
   Output: 3
   Explanation: Three palindromic strings: "a", "b", "c".

   Example 2:
   Input: s = "aaa"
   Output: 6
   Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

   Constraints:
   1 <= s.length <= 1000
   s consists of lowercase English letters.
 */

export const countSubstrings = (text: string): number => {
   const leftRight = (left: number, right: number): void => {
      while (left >= 0 && right < text.length && text[left] === text[right]) {
         count++;
         left--;
         right++;
      }
   }

   let count = 0;
   for (let position = 0; position < text.length; position++) {
      leftRight(position, position);
      leftRight(position, position + 1);
   }
   return count;
}