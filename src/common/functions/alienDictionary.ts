/*
   Alien Dictionary
   Tags: Array, String, Depth-First Search, Breadth-First Search, Graph, Topological Sort
   There is a new alien language that uses the English alphabet. However, the order of the letters
   is unknown to you.

   You are given a list of strings words from the alien language's dictionary. Now it is claimed that
   the strings in words are
   sorted lexicographically
    by the rules of this new language.

   If this claim is incorrect, and the given arrangement of string in words cannot correspond to any
   order of letters, return "".

   Otherwise, return a string of the unique letters in the new alien language sorted in lexicographically
   increasing order by the new language's rules. If there are multiple solutions, return any of them.

   Example 1:
   Input: words = ["wrt","wrf","er","ett","rftt"]
   Output: "wertf"

   Example 2:
   Input: words = ["z","x"]
   Output: "zx"

   Example 3:
   Input: words = ["z","x","z"]
   Output: ""
   Explanation: The order is invalid, so return "".

   Constraints:
   1 <= words.length <= 100
   1 <= words[i].length <= 100
   words[i] consists of only lowercase English letters.
 */

export const alienOrder = (words: string[]): string => {
   //Step 0: create an adjacency list and find all unique letters
   const adjList = new Map<any, string[]>();
   const indegreeMap = new Map<string, number>();
   for (const word of words) {
      for (const letter of word) {
         if (!adjList.has(letter)) {
            adjList.set(letter, []);
            indegreeMap.set(letter, 0);
         }
      }
   }
   //Step 1: Find all edges.
   for (let i = 0; i < words.length - 1; i++) {
      const word1 = words[i];
      const word2 = words[i + 1];
      // Check that word2 is not a prefix of word1.
      if (word1.length > word2.length && word1.startsWith(word2))
         return '';
      // Find the first non match and insert the corresponding relation.
      for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
         if (word1.charAt(j) !== word2.charAt(j)) {
            const adjacents = adjList.get(word1.charAt(j));
            if (adjacents === undefined)
               continue;
            adjacents.push(word2.charAt(j));
            indegreeMap.set(word2.charAt(j), (indegreeMap.get(word2.charAt(j)) ?? 0) + 1);
            break;
         }
      }
   }
   // Step 2: Breadth-first search.
   let result = '';
   const queue = [];
   for (const item of indegreeMap) {
      if (indegreeMap.get(item[0]) === 0)
         queue.push(item[0]);
   }
   while (queue.length > 0) {
      const item = queue.shift();
      result += item;
      const adjacents = adjList.get(item);
      if (adjacents === undefined)
         continue;
      for (const next of adjacents) {
         indegreeMap.set(next, (indegreeMap.get(next) ?? 0) - 1);
         if (indegreeMap.get(next) === 0) {
            queue.push(next);
         }
      }
   }
   if (result.length < indegreeMap.size) {
      return '';
   }
   return result;
}