/*
   Tags: String, Stack
   Given a string s of '(' , ')' and lowercase English characters.

   Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses
   string is valid and return any valid string.

   Formally, a parentheses string is valid if and only if:

   It is the empty string, contains only lowercase characters, or
   It can be written as AB (A concatenated with B), where A and B are valid strings, or
   It can be written as (A), where A is a valid string.

   Example 1:
   Input: s = "lee(t(c)o)de)"
   Output: "lee(t(c)o)de"
   Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

   Example 2:
   Input: s = "a)b(c)d"
   Output: "ab(c)d"

   Example 3:
   Input: s = "))(("
   Output: ""
   Explanation: An empty string is also valid.

   Constraints:
   1 <= s.length <= 10^5
   s[i] is either '(' , ')', or lowercase English letter.

   Solution:
   Create an array to hold unclosedLeftParenthesesPositions.
   Step through each character in the text.
   Add any character that is not a ( or a ) to the valid output.
   When you encounter a (
      Add the postion to the unclosedLeftParenthesesPositions array (this is the length of the current valid output string)
      Add the ( to the valid output.
   When you encounter a )
      Only add it to the valid output if there are items in the unclosedLeftParenthesesPositions array.
      Pop the last item off of the unclosedLeftParenthesesPositions array.
   The last thing to do is to clean up any dangling ('s in the valid output.
      Loop through all of the remaining items in the unclosedLeftParenthesesPositions array.
      Use .slice() to extract those items from the valid output string.
 */

export const minRemoveToMakeValid = (text: string): string => {
   let validString = '';
   const unclosedLeftParenthesesPositions: number[] = [];
   for (let position = 0; position < text.length; position++) {
      const character = text[position];
      if (!['(', ')'].includes(character)) {
         validString += character;
         continue;
      }
      if (character === '(') {
         unclosedLeftParenthesesPositions.push(validString.length);
         validString += character;
         continue;
      }
      if (character === ')' && unclosedLeftParenthesesPositions.length > 0) {
         unclosedLeftParenthesesPositions.pop();
         validString += character;
      }
   }
   unclosedLeftParenthesesPositions.forEach((position, index) => {
      validString = validString.slice(0, position - index) + validString.slice(position - index + 1);
   })
   return validString;
};