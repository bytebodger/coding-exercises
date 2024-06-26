/*
   Palindrome Permutation
   Tags: Hash Table, String, Bit Manipulation
   Given a string s, return true if a permutation of the string could form a
   palindrome
    and false otherwise.

   Example 1:
   Input: s = "code"
   Output: false

   Example 2:
   Input: s = "aab"
   Output: true

   Example 3:
   Input: s = "carerac"
   Output: true

   Constraints:
   1 <= s.length <= 5000
   s consists of only lowercase English letters.

   Complexity:
   Time: O(n)
   Space: O(1)
 */

export const canPermutePalindrome = (text: string): boolean => {
   const letterFound = Array(26).fill(false); // ☆ O(26) or O(1)
   for (const letter of text) {
      const index = letter.charCodeAt(0) - 'a'.charCodeAt(0);
      letterFound[index] = !letterFound[index];
   }

   // If 0, the length of the string is even & palindrome
   // If 1, the length of the string is odd & palindrome
   // If 2 or more, it is not palindrome
   return letterFound.filter(found => found === true).length <= 1;
}