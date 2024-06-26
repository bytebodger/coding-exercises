/*
   Expression Add Operators
   Tags: Math, String, Backtracking
   Given a string num that contains only digits and an integer target, return all possibilities to insert
   the binary operators '+', '-', and/or '*' between the digits of num so that the resultant expression evaluates to the target value.

   Note that operands in the returned expressions should not contain leading zeros.

   Example 1:
   Input: num = "123", target = 6
   Output: ["1*2*3","1+2+3"]
   Explanation: Both "1*2*3" and "1+2+3" evaluate to 6.

   Example 2:
   Input: num = "232", target = 8
   Output: ["2*3+2","2+3*2"]
   Explanation: Both "2*3+2" and "2+3*2" evaluate to 8.

   Example 3:
   Input: num = "3456237490", target = 9191
   Output: []
   Explanation: There are no expressions that can be created from "3456237490" to evaluate to 9191.

   Constraints:
   1 <= num.length <= 10
   num consists of only digits.
   -2^31 <= target <= 2^31 - 1

   Complexity:
   Time: O(4^n)
   Space: O(n * 4^n)
 */

export const addOperators = (numberText: string, target: number): string[] => {
   const parse = (expression: string, sum: number, previous: number, start: number) => {
      if (start === numberText.length) {
         if (sum === target)
            result.push(expression);
         return;
      }
      let current = '';
      for (let i = start; i < numberText.length; i++) {
         current += numberText[i];
         const curr = parseInt(current);
         // one edgecase is at the beginning, previous will be 0 effectively making the next multiplication zero which would give an invalid sum.
         // another one is that you could end up with +123 -123 *123
         // solution is, if we are in the outermost loop, just append the numbers and skip the operation steps
         if (start === 0) {
            parse(current, curr, curr, i + 1);
            if (current === '0')
               return;
            continue;
         }
         parse(expression + '*' + curr, sum - previous + previous * curr, previous * curr, i + 1);
         parse(expression + '+' + curr, sum + curr, curr, i + 1);
         parse(expression + '-' + curr, sum - curr, -curr, i + 1);
         // can't have leading zeros, so stop before next iteration since expression is invalid
         if (current === '0')
            return;
      }
   }

   const result: string[] = [];
   parse('', 0, 0, 0);
   return result;
}