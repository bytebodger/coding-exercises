/*
   Multiply Strings
   Tags: Math, String, Simulation
   Given two non-negative integers num1 and num2 represented as strings, return the product of num1
   and num2, also represented as a string.

   Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

   Example 1:
   Input: num1 = "2", num2 = "3"
   Output: "6"

   Example 2:
   Input: num1 = "123", num2 = "456"
   Output: "56088"

   Constraints:
   1 <= num1.length, num2.length <= 200
   num1 and num2 consist of digits only.
   Both num1 and num2 do not contain any leading zero, except the number 0 itself.

   Complexity:
   Time: O(n)
   Space: O(n)
 */

export const multiply = (value1: string, value2: string): string => {
   if (value1 === '0' || value2 === '0')
      return '0';
   if (value1 === '1')
      return value2;
   if (value2 === '1')
      return value1;
   const result: number[] = [];
   const length1 = value1.length;
   const length2 = value2.length;
   for (let i = 0; i < value1.length; ++i) {
      for (let j = 0; j < value2.length; ++j) {
         let digit = Number(value1[length1 - i - 1]) * Number(value2[length2 - j - 1]);
         let position = i + j;
         if (digit === 0) {
            if (position >= result.length)
               result.unshift(0);
         }
         while (digit > 0) {
            if (position >= result.length) {
               result.unshift(0);
            }
            const product = digit % 10 + result[result.length - 1 - position];
            result[result.length - 1 - position] = product % 10;
            digit += Math.floor(product / 10) * 10;
            digit = Math.floor(digit / 10);
            position++;
         }
      }
   }
   return result.map(a => String(a)).join('');
}