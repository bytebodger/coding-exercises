/*
   Tags: Two Pointers, String, Dynamic Programming
   Given a string s, return the longest palindromic substring in s.

   Example 1:
   Input: s = "babad"
   Output: "bab"
   Explanation: "aba" is also a valid answer.

   Example 2:
   Input: s = "cbbd"
   Output: "bb"

   Constraints:
   1 <= s.length <= 1000
   s consist of only digits and English letters.

   Solution:
   Create an isPalindrome() function that compares the left-and-right characters of the word.
   Loop through the possible window sizes, starting from the largest and incrementing downward.
   For each window size, start at the beginning of the string and step through the characters until you've checked every possible
      window to see if it's a palindrome.
 */

export const longestPalindrome = (word: string): string => {
   const isPalindrome = (letters: string): boolean => {
      let leftPointer = 0;
      let rightPointer = letters.length - 1;
      while (leftPointer < rightPointer) {
         if (letters[leftPointer] !== letters[rightPointer])
            return false;
         leftPointer++;
         rightPointer--;
      }
      return true;
   }

   if (isPalindrome(word))
      return word;
   for (let window = word.length - 1; window > 1; window--) {
      for (let startPosition = 0; startPosition + window <= word.length; startPosition++) {
         const substring = word.substring(startPosition, startPosition + window);
         if (isPalindrome(substring))
            return substring;
      }
   }
   return word[0];
}