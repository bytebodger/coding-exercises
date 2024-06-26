/*
   Next Greater Element III
   Tags: Math, Two Pointers, String
   Given a positive integer n, find the smallest integer which has exactly the same digits existing in
   the integer n and is greater in value than n. If no such positive integer exists, return -1.

   Note that the returned integer should fit in 32-bit integer, if there is a valid answer but it does
   not fit in 32-bit integer, return -1.

   Example 1:
   Input: n = 12
   Output: 21

   Example 2:
   Input: n = 21
   Output: -1

   Constraints:
   1 <= n <= 2^31 - 1
 */

export const nextGreaterElement = (value: number): number => {
   const digits = value.toString().split('').map(digit => Number(digit));
   const totalDigits = digits.length;
   let largestDigit = digits[totalDigits - 1];
   let largestDigitPosition = -1;
   for (let i = totalDigits - 2; i >= 0; i--) {
      const digit = digits[i];
      if (digit < largestDigit) {
         largestDigitPosition = i;
         break;
      }
      largestDigit = digit;
   }
   if (largestDigitPosition === -1)
      return -1;
   const lastPart = digits.splice(largestDigitPosition + 1).sort((a, b) => a - b);
   for (let j = 0; j < lastPart.length; j++) {
      if (lastPart[j] > digits[largestDigitPosition]) {
         const tmp = digits[largestDigitPosition];
         digits[largestDigitPosition] = lastPart[j];
         lastPart[j] = tmp;
         break;
      }
   }
   const result = Number(digits.join('') + lastPart.join(''));
   return result > (Math.pow(2, 31) - 1) ? -1 : result;
}