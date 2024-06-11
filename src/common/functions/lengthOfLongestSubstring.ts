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
   Create an allCharactersAreUnique() function.
   Establish a maxWindow size and work downward from there so that as soon as a unique substring is found we can exit the process.
   For each potential window size, start at the beginning of the string and step through the characters until you've checked every
      full window that can fit inside the string.
 */

export const lengthOfLongestSubstring = (word: string): number => {
   const allCharactersAreUnique = (characters: string): boolean => {
      const foundCharacters: string[] = [];
      for (let position = 0; position < characters.length; position++) {
         const character = characters[position];
         if (foundCharacters.includes(character))
            return false;
         foundCharacters.push(character);
      }
      return true;
   }

   if (allCharactersAreUnique(word))
      return word.length;
   const maxWindow = word.length - 1 > 96 ? 96 : word.length - 1;
   for (let window = maxWindow; window > 1; window--) {
      for (let startPosition = 0; startPosition + window <= word.length; startPosition++) {
         const substring = word.substring(startPosition, startPosition + window);
         if (allCharactersAreUnique(substring))
            return window;
      }
   }
   return 1;
}