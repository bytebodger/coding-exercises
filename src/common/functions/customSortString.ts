/*
   Tags: Hash Table, String, Sorting
   You are given two strings order and s. All the characters of order are unique and were sorted in some custom order
   previously.

   Permute the characters of s so that they match the order that order was sorted. More specifically, if a character
   x occurs before a character y in order, then x should occur before y in the permuted string.

   Return any permutation of s that satisfies this property.

   Example 1:
   Input: order = "cba", s = "abcd"
   Output: "cbad"
   Explanation: "a", "b", "c" appear in order, so the order of "a", "b", "c" should be "c", "b", and "a".
   Since "d" does not appear in order, it can be at any position in the returned string. "dcba", "cdba", "cbda" are
   also valid outputs.

   Example 2:
   Input: order = "bcafg", s = "abcd"
   Output: "bcad"
   Explanation: The characters "b", "c", and "a" from order dictate the order for the characters in s. The character
   "d" in s does not appear in order, so its position is flexible.
   Following the order of appearance in order, "b", "c", and "a" from s should be arranged as "b", "c", "a". "d" can
   be placed at any position since it's not in order. The output "bcad" correctly follows this rule. Other arrangements
   like "bacd" or "bcda" would also be valid, as long as "b", "c", "a" maintain their order.

   Constraints:
   1 <= order.length <= 26
   1 <= s.length <= 200
   order and s consist of lowercase English letters.
   All the characters of order are unique.

   Solution:
   Create a textIndex object that holds a 0 values for each lowercase letter.
   Loop through text and index the number of occurrences for each letter.
   Loop through order build a new output string, adding as many occurrences of each letter as appeared in the original text.
      Also ensure that you increment downward the textIndex object so that all the letters in the order string now show as having
      0 instances.
   Loop through textIndex and add any remaining characters to the end of the output string.
 */

export const customSortString = (order: string, text: string): string => {
   let output = '';
   const textIndex: any = {};
   const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
   letters.forEach(letter => {
      textIndex[letter] = 0;
   });
   for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      textIndex[letter]++;
   }
   for (let i = 0; i < order.length; i++) {
      const letter = order[i];
      if (textIndex[letter] > 0) {
         const occurrences = textIndex[letter];
         for (let j = 0; j < occurrences; j++) {
            output += letter;
            textIndex[letter]--;
         }
      }
   }
   Object.entries(textIndex).forEach(entry => {
      const [letter, uncastOccurrences] = entry;
      const occurrences = Number(uncastOccurrences);
      if (occurrences === 0)
         return;
      for (let i = 0; i < occurrences; i++) {
         output += letter;
      }
   })
   return output;
}