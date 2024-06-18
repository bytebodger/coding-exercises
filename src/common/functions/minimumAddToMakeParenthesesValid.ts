/*
   Minimum Add to Make Parentheses Valid
   Tags: String, Stack, Greedy
   A parentheses string is valid if and only if:

   It is the empty string,
   It can be written as AB (A concatenated with B), where A and B are valid strings, or
   It can be written as (A), where A is a valid string.
   You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.

   For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".
   Return the minimum number of moves required to make s valid.

   Example 1:
   Input: s = "())"
   Output: 1

   Example 2:
   Input: s = "((("
   Output: 3

   Constraints:
   1 <= s.length <= 1000
   s[i] is either '(' or ')'.

   Solution:
   Use .match() to get an array of all parentheses.
   Set a counter for leftParentheses and rightParentheses.
   If there are no parentheses, return 0.
   Loop through all parentheses.
      If it's '(', increment leftParentheses and return.
      If it's ')'
         If leftParentheses > 0, increment leftParentheses.
         Else, increment rightParentheses.
   Return leftParentheses + rightParentheses.
 */

export const minAddToMakeValid = (text: string): number => {
   const parentheses = text.match(/[()]/g);
   let leftParentheses = 0;
   let rightParentheses = 0;
   if (parentheses === null)
      return 0;
   parentheses.forEach(parenthesis => {
      if (parenthesis === '(') {
         leftParentheses++;
         return;
      }
      if (parenthesis === ')') {
         if (leftParentheses > 0) {
            leftParentheses--;
         } else {
            rightParentheses++;
         }
      }
   })
   return leftParentheses + rightParentheses;
}