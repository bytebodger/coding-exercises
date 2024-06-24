/*
   Valid Word Abbreviation
   Tags: Two Pointers, String
   A string can be abbreviated by replacing any number of non-adjacent, non-empty substrings with their lengths. The lengths should
   not have leading zeros.

   For example, a string such as "substitution" could be abbreviated as (but not limited to):

   "s10n" ("s ubstitutio n")
   "sub4u4" ("sub stit u tion")
   "12" ("substitution")
   "su3i1u2on" ("su bst i t u ti on")
   "substitution" (no substrings replaced)

   The following are not valid abbreviations:

   "s55n" ("s ubsti tutio n", the replaced substrings are adjacent)
   "s010n" (has leading zeros)
   "s0ubstitution" (replaces an empty substring)

   Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.

   A substring is a contiguous non-empty sequence of characters within a string.

   Example 1:
   Input: word = "internationalization", abbr = "i12iz4n"
   Output: true
   Explanation: The word "internationalization" can be abbreviated as "i12iz4n" ("i nternational iz atio n").

   Example 2:
   Input: word = "apple", abbr = "a2e"
   Output: false
   Explanation: The word "apple" cannot be abbreviated as "a2e".

   Constraints:
   1 <= word.length <= 20
   word consists of only lowercase English letters.
   1 <= abbr.length <= 10
   abbr consists of lowercase English letters and digits.
   All the integers in abbr will fit in a 32-bit integer.

   Solution:
   First parse through the abbreviation string to segment out the blocks of strings from the numbers.
   Then use those blocks to recreate the original word and then return whether the recreated word equals the original word.

   Complexity: O(N)
 */

export const validWordAbbreviation = (word: string, abbreviation: string): boolean => {
   const abbreviationElements: Array<string | number> = [];
   let currentElementType: 'string' | 'number' | null = null;
   let currentElement = '';
   for (let i = 0; i < abbreviation.length; i++) {
      const character = abbreviation[i];
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(character)) {
         if (currentElementType !== 'number') {
            if (character === '0')
               return false;
            currentElementType = 'number';
            if (currentElement !== '')
               abbreviationElements.push(currentElement);
            currentElement = character;
         } else
            currentElement += character;
      } else {
         if (currentElementType !== 'string') {
            currentElementType = 'string';
            if (currentElement !== '')
               abbreviationElements.push(Number(currentElement));
            currentElement = character;
         } else
            currentElement += character;
      }
   }
   if (currentElement !== '')
      abbreviationElements.push(currentElementType === 'string' ? currentElement : Number(currentElement));
   let wordFromAbbreviation = '';
   let position = 0;
   let succeeded = true;
   abbreviationElements.forEach(abbreviationElement => {
      if (typeof abbreviationElement === 'string') {
         wordFromAbbreviation += abbreviationElement;
         position += abbreviationElement.length;
      } else {
         if (position + abbreviationElement > word.length)
            succeeded = false;
         wordFromAbbreviation += word.substring(position, position + abbreviationElement);
         position += abbreviationElement;
      }
   })
   if (!succeeded)
      return false;
   return word === wordFromAbbreviation;
}