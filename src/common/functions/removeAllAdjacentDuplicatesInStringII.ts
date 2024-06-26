/*
   Remove All Adjacent Duplicates in String II
   Tags: String, Stack
   You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent and
   equal letters from s and removing them, causing the left and the right side of the deleted substring
   to concatenate together.

   We repeatedly make k duplicate removals on s until we no longer can.

   Return the final string after all such duplicate removals have been made. It is guaranteed that the
   answer is unique.

   Example 1:
   Input: s = "abcd", k = 2
   Output: "abcd"
   Explanation: There's nothing to delete.

   Example 2:
   Input: s = "deeedbbcccbdaa", k = 3
   Output: "aa"
   Explanation:
   First delete "eee" and "ccc", get "ddbbbdaa"
   Then delete "bbb", get "dddaa"
   Finally delete "ddd", get "aa"

   Example 3:
   Input: s = "pbbcggttciiippooaais", k = 2
   Output: "ps"

   Constraints:
   1 <= s.length <= 10^5
   2 <= k <= 10^4
   s only contains lowercase English letters.

   Complexity:
   Time: O(n)
   Space: O(n)
 */

export const removeDuplicates = (text: string, limit: number): string => {
   const stack: Array<[string, number]> = [];
   for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      if (stack.length > 0 && stack[stack.length - 1][0] === letter) {
         const value = stack[stack.length - 1][1];
         stack[stack.length - 1][1] = value + 1;
      } else
         stack.push([letter, 1])
      if (stack[stack.length - 1][1] === limit)
         stack.pop()
   }
   return stack.reduce((accumulator, [letter, count]) => accumulator + letter.repeat(count), '');
}