/*
   Reverse Integer
   Tags: Math
   Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit
   integer range [-231, 231 - 1], then return 0.

   Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

   Example 1:
   Input: x = 123
   Output: 321

   Example 2:
   Input: x = -123
   Output: -321

   Example 3:
   Input: x = 120
   Output: 21

   Constraints:
   -2^31 <= x <= 2^31 - 1

   Solution:
   A 32-bit signed integer has a max value of 2147483647 and a min value of -2147483647.
   Convert the supplied integer to a string and reverse it and remove any minus sign.
   Then add the negative back if the original number was negative.
   Return 0 if the reversed number is outside min/max.
   Otherwise, return the reversed number.
 */

export const reverse = (integer: number): number => {
   const max = 2147483647;
   const min = -2147483647;
   const isPositive = integer >= 0;
   let reversedInteger = Number(integer.toString().replace('-', '').split('').reverse().join(''));
   if (!isPositive)
      reversedInteger *= -1;
   if (reversedInteger > max || reversedInteger < min)
      return 0;
   return reversedInteger;
}