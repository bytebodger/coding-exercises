/*
   Check if an Original String Exists Given Two Encoded Strings
   Tags: String, Dynamic Programming
   An original string, consisting of lowercase English letters, can be encoded by the following steps:

   Arbitrarily split it into a sequence of some number of non-empty substrings.
   Arbitrarily choose some elements (possibly none) of the sequence, and replace each with its length
   (as a numeric string).
   Concatenate the sequence as the encoded string.
   For example, one way to encode an original string "abcdefghijklmnop" might be:

   Split it as a sequence: ["ab", "cdefghijklmn", "o", "p"].
   Choose the second and third elements to be replaced by their lengths, respectively. The sequence
   becomes ["ab", "12", "1", "p"].
   Concatenate the elements of the sequence to get the encoded string: "ab121p".
   Given two encoded strings s1 and s2, consisting of lowercase English letters and digits 1-9 (inclusive),
   return true if there exists an original string that could be encoded as both s1 and s2. Otherwise, return false.

   Note: The test cases are generated such that the number of consecutive digits in s1 and s2 does not exceed 3.

   Example 1:
   Input: s1 = "internationalization", s2 = "i18n"
   Output: true
   Explanation: It is possible that "internationalization" was the original string.
   - "internationalization"
     -> Split:       ["internationalization"]
     -> Do not replace any element
     -> Concatenate:  "internationalization", which is s1.
   - "internationalization"
     -> Split:       ["i", "nternationalizatio", "n"]
     -> Replace:     ["i", "18",                 "n"]
     -> Concatenate:  "i18n", which is s2

   Example 2:
   Input: s1 = "l123e", s2 = "44"
   Output: true
   Explanation: It is possible that "leetcode" was the original string.
   - "leetcode"
     -> Split:      ["l", "e", "et", "cod", "e"]
     -> Replace:    ["l", "1", "2",  "3",   "e"]
     -> Concatenate: "l123e", which is s1.
   - "leetcode"
     -> Split:      ["leet", "code"]
     -> Replace:    ["4",    "4"]
     -> Concatenate: "44", which is s2.

   Example 3:
   Input: s1 = "a5b", s2 = "c5b"
   Output: false
   Explanation: It is impossible.
   - The original string encoded as s1 must start with the letter 'a'.
   - The original string encoded as s2 must start with the letter 'c'.

   Constraints:
   1 <= s1.length, s2.length <= 40
   s1 and s2 consist of digits 1-9 (inclusive), and lowercase English letters only.
   The number of consecutive digits in s1 and s2 does not exceed 3.

   Complexity:
   Time: O(2^n)
   Space: O(2^n)
 */

export const possiblyEquals = (text1: string, text2: string): boolean => {
   const inspect = (text1Position: number, text2Position: number, delta: number): boolean => {
      const character1 = text1[text1Position];
      const character2 = text2[text2Position];
      if (text1Position >= text1.length && text2Position >= text2.length) {
         return delta === 0;
      }
      // memoizing is preferable since we can arrive at the same value twice. e.g. 111 = 11 + 1 or 1+11
      if (cache.has(text1Position + ',' + text2Position + ',' + delta))
         return false;
      let buffer = '';
      if (isValidNumber(character1)) {
         let index = text1Position;
         while (isValidNumber(text1[index])) {
            buffer += text1[index++];
            if (inspect(index, text2Position, delta + parseInt(buffer)))
               return true;
         }
      } else if (isValidNumber(character2)) {
         let index = text2Position;
         while (isValidNumber(text2[index])) {
            buffer += text2[index++];
            if (inspect(text1Position, index, delta - parseInt(buffer)))
               return true;
         }
         // at this point both text1Position and text2Position are strings or end of string
      } else if (delta > 0) {
         if (text2Position < text2.length)
            return inspect(text1Position, text2Position + 1, delta - 1);
      } else if (delta < 0) {
         if (text1Position < text1.length)
            return inspect(text1Position + 1, text2Position, delta + 1);
      } else if (delta === 0) {
         if (text1[text1Position] === text2[text2Position])
            return inspect(text1Position + 1, text2Position + 1, delta);
      }
      // it didn't recurse to any of the success cases, must be invalid
      cache.add(text1Position + ',' + text2Position + ',' + delta);
      return false;
   }

   const isValidNumber = (text: string): boolean => !isNaN(parseInt(text));

   const cache = new Set();
   return inspect(0, 0, 0);
}