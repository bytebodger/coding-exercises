/*
   Group Shifted String
   Tags: Array, Hash Table, String
   Perform the following shift operations on a string:

   Right shift: Replace every letter with the successive letter of the English alphabet, where 'z' is replaced by 'a'.
   For example, "abc" can be right-shifted to "bcd" or "xyz" can be right-shifted to "yza".
   Left shift: Replace every letter with the preceding letter of the English alphabet, where 'a' is replaced by 'z'.
   For example, "bcd" can be left-shifted to "abc" or "yza" can be left-shifted to "xyz".
   We can keep shifting the string in both directions to form an endless shifting sequence.

   For example, shift "abc" to form the sequence: ... <-> "abc" <-> "bcd" <-> ... <-> "xyz" <-> "yza" <-> .... <-> "zab" <-> "abc" <-> ...
   You are given an array of strings strings, group together all strings[i] that belong to the same shifting sequence.
   You may return the answer in any order.

   Example 1:
   Input: strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
   Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]

   Example 2:
   Input: strings = ["a"]
   Output: [["a"]]

   Constraints:
   1 <= strings.length <= 200
   1 <= strings[i].length <= 50
   strings[i] consists of lowercase English letters.
 */

export const groupStrings = (words: string[]): string[][] => {
   // determines whether word2 can eventually be transformed into word1 by a series of right shifts
   const isAShiftMatch = (word1: string, word2: string, totalShifts: number = 0): boolean => {
      if (totalShifts > 26) {
         return false;
      }
      const shiftedWord = shiftRight(word2);
      if (shiftedWord === word1)
         return true;
      return isAShiftMatch(word1, shiftedWord, totalShifts + 1);
   }

   // accepts a word and shifts all characters to the right
   // there is no reason to shift left because shifting left or right will eventually lead to the same result
   const shiftRight = (text: string): string => {
      const letters = text.split('');
      letters.forEach((letter, index) => {
         const alphabetIndex = alphabet.findIndex(alphabetLetter => alphabetLetter === letter);
         if (alphabetIndex === -1)
            return;
         const newAlphabetIndex = alphabetIndex < 25 ? alphabetIndex + 1 : 0;
         letters[index] = alphabet[newAlphabetIndex];
      })
      return letters.join('');
   }

   const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
   const groups: string[][] = [];
   while (words.length > 0) {
      const group: string[] = [];
      // create a new group consisting of this one word
      const word1 = words.shift();
      if (word1 === undefined)
         continue;
      group.push(word1);
      // if there are no more elements in words, push this group and return
      if (!words.length) {
         groups.push(group);
         continue;
      }
      // filter out any words that cannot be shifted into word 1
      words = words.filter(word2 => {
         // if word2 can be shifted into word1, push it onto the group array
         const canBeShifted = isAShiftMatch(word1, word2);
         if (canBeShifted)
            group.push(word2);
         return !canBeShifted;
      })
      // push the resulting group onto the groups array
      groups.push(group);
   }
   return groups;
}