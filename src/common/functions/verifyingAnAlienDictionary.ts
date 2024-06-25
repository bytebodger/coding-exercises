/*
   Verifying an Alien Dictionary
   Tags: Array, Hash Table, String
   In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different
   order. The order of the alphabet is some permutation of lowercase letters.

   Given a sequence of words written in the alien language, and the order of the alphabet, return true if and
   only if the given words are sorted lexicographically in this alien language.

   Example 1:
   Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
   Output: true
   Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.

   Example 2:
   Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
   Output: false
   Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.

   Example 3:
   Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
   Output: false
   Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to
   lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is
   less than any other character (More info).

   Constraints:
   1 <= words.length <= 100
   1 <= words[i].length <= 20
   order.length == 26
   All characters in words[i] and order are English lowercase letters.

   Complexity:
   Time complexity: O(m * n * k)
   Space complexity: O(1)
 */

export const isAlienSorted = (words: string[], order: string): boolean => {
   // check each word
   for (let i = 0; i < words.length - 1; i++) {
      const word = words[i];
      const nextWord = words[i + 1];
      // no need to check a word twice
      if (word === nextWord)
         continue;
      // go through each letter of 'word'
      // compare it to the corresponding letter of 'nextWord'
      // for both, find the indices in 'order'
      // if the indices aren't in descending order according to 'order',
      // then the words aren't sorted according to the alien alphabet
      for (let j = 0; j < words[i].length; j++) {
         const wordLetter = word[j];
         const nextWordLetter = nextWord[j];
         const wordLetterIndex = order.indexOf(wordLetter);
         const nextWordLetterIndex = order.indexOf(nextWordLetter);
         if (wordLetterIndex > nextWordLetterIndex) {
            return false;
         } else if (wordLetterIndex < nextWordLetterIndex) {
            break;
         }
      }
   }
   return true;
}