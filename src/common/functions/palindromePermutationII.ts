/*
   Palindrome Permutation II
   Tags: Hash Table, String, Backtracking
   Given a string s, return all the palindromic permutations (without duplicates) of it.

   You may return the answer in any order. If s has no palindromic permutation, return an empty list.

   Example 1:
   Input: s = "aabb"
   Output: ["abba","baab"]

   Example 2:
   Input: s = "abc"
   Output: []

   Constraints:
   1 <= s.length <= 16
   s consists of only lowercase English letters.

   Complexity:
   Time: O(n!)
   Space: O(n)
 */

export const generatePalindromes = (text: string): string[] => {
   const getPermutations = (combination: string, frequencyMap: Map<string, number>) => {
      if (combination.length === text.length) {
         result.push(combination);
         return;
      }
      for (const [character, frequency] of frequencyMap) {
         if (frequency <= 0)
            continue;
         const clone = new Map(frequencyMap);
         // We're going to add two letters to the palindrome
         clone.set(character, (clone.get(character) ?? 0) - 2);
         // Surround previous combination with two letters
         getPermutations(character + combination + character, clone);
      }
   }

   // Map each letter to # of occurences
   const frequencyMap = new Map<string, number>();
   for (const character of text) {
      frequencyMap.set(character, (frequencyMap.get(character) ?? 0) + 1);
   }
   // Letter with odd # of occurences
   let oddCharacter: string | null = null;
   for (const [character, frequency] of frequencyMap) {
      if (frequency % 2 === 1) {
         // There cannot be more than one letter with odd # of occurences
         if (oddCharacter != null)
            return [];
         oddCharacter = character;
      }
   }
   const result: string[] = [];
   // If we have an odd letter, we'll start with that letter in
   // the center of the initial combination so decrement by 1
   if (oddCharacter != null)
      frequencyMap.set(oddCharacter, (frequencyMap.get(oddCharacter) ?? 0) - 1);
   getPermutations(oddCharacter ?? '', frequencyMap);
   return result;
}