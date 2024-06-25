/*
   Word Break II
   Tags: Array, Hash Table, String, Dynamic Programming, Backtracking, Trie, Memoization
   Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each
   word is a valid dictionary word. Return all such possible sentences in any order.

   Note that the same word in the dictionary may be reused multiple times in the segmentation.

   Example 1:
   Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
   Output: ["cats and dog","cat sand dog"]

   Example 2:
   Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
   Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
   Explanation: Note that you are allowed to reuse a dictionary word.

   Example 3:
   Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
   Output: []

   Constraints:
   1 <= s.length <= 20
   1 <= wordDict.length <= 1000
   1 <= wordDict[i].length <= 10
   s and wordDict[i] consist of only lowercase English letters.
   All the strings of wordDict are unique.
   Input is generated in a way that the length of the answer doesn't exceed 10^5.

   Complexity:
   Time complexity: O(n^2)
      where n is the length of the dictionary
   Space complexity: O(n)
 */

export const wordBreak = (text: string, dictionary: string[]): string[] => {
   const parse = (text: string, parsedWords: string[]) => {
      // when the string is empty, add it to result
      if (text === '')
         result.push(parsedWords);
      dictionary.forEach(word => {
         // if a dictionary word is found, slice() it out and reparse
         if (text.startsWith(word)) {
            const subword = text.slice(word.length);
            parse(subword, parsedWords.concat(word));
         }
      })
   }

   const result: string[][] = [];
   parse(text, []);
   // convert result's subarrays into space-separated strings
   return result.map(x => x.join(' '));
}