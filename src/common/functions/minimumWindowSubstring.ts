/*
   Minimum Window Substring
   Tags: Hash Table, String, Sliding Window
   Given two strings s and t of lengths m and n respectively, return the minimum window
   substring of s such that every character in t (including duplicates) is included in
   the window. If there is no such substring, return the empty string "".

   The testcases will be generated such that the answer is unique.

   Example 1:
   Input: s = "ADOBECODEBANC", t = "ABC"
   Output: "BANC"
   Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

   Example 2:
   Input: s = "a", t = "a"
   Output: "a"
   Explanation: The entire string s is the minimum window.

   Example 3:
   Input: s = "a", t = "aa"
   Output: ""
   Explanation: Both 'a's from t must be included in the window.
   Since the largest window of s only has one 'a', return empty string.

   Constraints:
   m == s.length
   n == t.length
   1 <= m, n <= 10^5
   s and t consist of uppercase and lowercase English letters.

   Follow up: Could you find an algorithm that runs in O(m + n) time?

   Complexity:
   Time: O(m + n)
   Space: O(m)
      where m is the map for the target string
 */

export const minWindow = (text1: string, text2: string): string => {
   //Analysis: The problem is similar to finding anagrams
   //The approach is to use a sliding window
   //The window size is text1.length
   //We will use 2 maps to store the count of characters in text1 and text2
   //We will compare the maps to check if the characters in the window match
   //If they match, we will return true
   //If not, we will slide the window to the right
   //When the window is slided, we will update the counts in the maps

   const map = new Map<string, number>();
   //fill the map with the characters of text2
   for (let i = 0; i < text2.length; i++) {
      map.set(text2[i], (map.get(text2[i]) ?? 0) + 1);
   }
   //use a separate variable to store matches
   //this will avoid doing full on comparison of the maps on each iteration
   let matches = 0;
   //sliding window
   let windowLength = 0;
   let minimumLength = text1.length + 1;
   let minimumStart = 0;
   for (let position = 0; position < text1.length; position++) {
      const letter = text1[position];
      if (map.has(letter)) {
         map.set(letter, (map.get(letter) ?? 0) - 1);
         if ((map.get(letter) ?? 0) >= 0)
            matches++;
      }
      while (matches === text2.length) {
         if (position - windowLength + 1 < minimumLength) {
            minimumLength = position - windowLength + 1;
            minimumStart = windowLength;
         }
         const lastWindowLetter = text1[windowLength];
         if (map.has(lastWindowLetter)) {
            map.set(lastWindowLetter, (map.get(lastWindowLetter) ?? 0) + 1);
            if ((map.get(lastWindowLetter) ?? 0) > 0)
               matches--;
         }
         windowLength++;
      }
   }
   return minimumLength > text1.length ? '' : text1.substring(minimumStart, minimumStart + minimumLength);
}