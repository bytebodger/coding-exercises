/*
   Valid Palindrome II
   Tags: Two Pointers, String, Greedy
   Given a string s, return true if the s can be palindrome after deleting at most one character from it.

   Example 1:
   Input: s = "aba"
   Output: true

   Example 2:
   Input: s = "abca"
   Output: true
   Explanation: You could delete the character 'c'.

   Example 3:
   Input: s = "abc"
   Output: false

   Constraints:
   1 <= s.length <= 105
   s consists of lowercase English letters.

   Solution:
   First create the isPalindrome() function that checks by looking at the first and last letters and then working inward through the whole
      string.
   Then create a removeOuterCharacters() function.  This removes matching (palindromic) characters from the outside (left and right side)
      of the string.  Do this because you only want to check if you can make the string a palindrome by removing non-palindromic characters.
      By removing the outer palindromic characters first, we can then check if we can make it a palindrome by either removing the first
      character or the last character.
   If the supplied text is already a palindrome, return TRUE.  (All palindromes can remain a palindrome by removing the middle character.)
   Remove the first character. If it's a palindrome, return TRUE.  Else...
   Remove the last character.  Return whether or not the resulting string is a palindrome.

   Complexity: O(N)
 */

export const validPalindrome = (text: string): boolean => {
   const isPalindrome = (text: string): boolean => {
      let leftPointer = 0;
      let rightPointer = text.length - 1;
      while (leftPointer < rightPointer) {
         if (text[leftPointer] !== text[rightPointer])
            return false;
         leftPointer++;
         rightPointer--;
      }
      return true;
   }

   const removeOuterCharacters = (text: string): string => {
      let leftPointer = -1;
      let rightPointer = text.length;
      let nonmatchingCharactersFound = false;
      while (leftPointer < rightPointer && !nonmatchingCharactersFound) {
         leftPointer++;
         rightPointer--;
         if (text[leftPointer] !== text[rightPointer])
            nonmatchingCharactersFound = true;
      }
      if (!nonmatchingCharactersFound)
         return text;
      return text.substring(leftPointer, rightPointer + 1);
   }

   if (isPalindrome(text))
      return true;
   const innerText = removeOuterCharacters(text);
   const firstLetterRemoved = innerText.substring(1);
   if (isPalindrome(firstLetterRemoved))
      return true;
   const lastLetterRemoved = innerText.substring(0, innerText.length - 1);
   return isPalindrome(lastLetterRemoved);
}