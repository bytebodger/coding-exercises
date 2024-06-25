/*
   Remove Invalid Parentheses
   Tags: String, Backtracking, Breadth-First Search
   Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to
   make the input string valid.

   Return a list of unique strings that are valid with the minimum number of removals. You may return the answer
   in any order.

   Example 1:
   Input: s = "()())()"
   Output: ["(())()","()()()"]

   Example 2:
   Input: s = "(a)())()"
   Output: ["(a())()","(a)()()"]

   Example 3:
   Input: s = ")("
   Output: [""]

   Constraints:
   1 <= s.length <= 25
   s consists of lowercase English letters and parentheses '(' and ')'.
   There will be at most 20 parentheses in s.

   Complexity:
   Time: O(n)
   Space: O(1)
 */

export const removeInvalidParentheses = (text: string): string[] => {
   const countImbalance = (text: string): number => {
      const parentheses = [];
      for (let i = 0; i < text.length; i++) {
         const character = text[i];
         if (character === left)
            parentheses.push(left);
         if (character === right && parentheses[parentheses.length - 1] === left)
            parentheses.pop();
         else if (character === right)
            parentheses.push(right);
      }
      return parentheses.length;
   }

   const parse = (text: string, count: number, start: number) => {
      if (count === 0) {
         // if the current count is 0 then do another imbalance check and push to results if it's 0
         if (countImbalance(text) === 0)
            result.push(text);
         return;
      }
      let previousCharacter = '';
      for (let i = start; i < text.length; i++) {
         const character = text[i];
         // bail out of this loop if we're currently in a string of right parens or a string of left parens
         // or if the character is something other than a paren
         if (
            previousCharacter === character
            || (character !== right && character !== left)
         ) {
            previousCharacter = character;
            continue;
         }
         const removedParenthesis = text.slice(0, i) + text.slice(i + 1);
         parse(removedParenthesis, count - 1, i);
         previousCharacter = text[i];
      }
   }

   const left = '(';
   const right = ')';
   // create an initial count of imbalances
   const count = countImbalance(text);
   const result: string[] = [];
   parse(text, count, 0);
   return result;
}