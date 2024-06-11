/*
   Tags: Hash Table, String, Sliding Window
   Given a string s, find the length of the longest
   substring
    without repeating characters.

   Example 1:
   Input: s = "abcabcbb"
   Output: 3
   Explanation: The answer is "abc", with the length of 3.

   Example 2:
   Input: s = "bbbbb"
   Output: 1
   Explanation: The answer is "b", with the length of 1.

   Example 3:
   Input: s = "pwwkew"
   Output: 3
   Explanation: The answer is "wke", with the length of 3.
   Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

   Constraints:
   0 <= s.length <= 5 * 104
   s consists of English letters, digits, symbols and spaces.

   Solution:
   Use Set() to compare the deduped arrays of characters to the full array of characters.
   Establish a maxWindow size and work downward from there so that as soon as a unique substring is found we can exit the process.
   For each potential window size, start at the beginning of the string and step through the characters until you've checked every
      full window that can fit inside the string.
 */

export const lengthOfLongestSubstring = (word: string): number => {
   let maxLength = 1;
   const characters = word.split('');
   if (characters.length < 2)
      return characters.length;
   else if (new Set(characters).size === characters.length)
      return characters.length;
   const maxWindow = characters.length - 1 > 96 ? 96 : characters.length - 1;
   for (let window = maxWindow; window > 1; window--) {
      if (maxLength > 1)
         break;
      for (let startPosition = 0; startPosition + window <= characters.length; startPosition++) {
         if (maxLength > 1)
            break;
         const substring = characters.slice(startPosition, startPosition + window);
         if (new Set(substring).size === substring.length)
            maxLength = window;
      }
   }
   return maxLength;
}