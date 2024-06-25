/*
   Add Strings
   Tags: Math, String, Simulation
   Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and
   num2 as a string.

   You must solve the problem without using any built-in library for handling large integers (such
   as BigInteger). You must also not convert the inputs to integers directly.

   Example 1:
   Input: num1 = "11", num2 = "123"
   Output: "134"

   Example 2:
   Input: num1 = "456", num2 = "77"
   Output: "533"

   Example 3:
   Input: num1 = "0", num2 = "0"
   Output: "0"

   Constraints:
   1 <= num1.length, num2.length <= 10^4
   num1 and num2 consist of only digits.
   num1 and num2 don't have any leading zeros except for the zero itself.

   Complexity:
   Time: O(max(n1, n2))
   Space: O(max(n1, n2)
 */

export const addStrings = (numberText1: string, numberText2: string): string => {
   // parses through values1 and values2 while keeping track of carryover
   const addCumulatively = (values1: string[], values2: string[], carryover: number = 0) => {
      if (values1.length === 0 && values2.length === 0) {
         // append the final carryover if it's not zero
         if (carryover > 0)
            sumText = carryover + sumText;
         return;
      }
      // pop() value1 and value2 (if we can)
      const value1 = values1.length > 0 ? Number(values1.pop()) : 0;
      const value2 = values2.length > 0 ? Number(values2.pop()) : 0;
      const valueToAdd = (value1 + value2 + carryover).toString();
      // carryover is anything in front of the last digit (character)
      const newCarryover = valueToAdd.length > 1 ? Number(valueToAdd.split('').shift()) : 0;
      // digit is the last character
      const digit = valueToAdd.toString().split('').pop();
      // prepend digit to sumText
      sumText = digit + sumText;
      // call recursively
      addCumulatively(values1, values2, newCarryover);
   }

   let sumText = '';
   // split the values into string arrays
   const text1Values = numberText1.split('');
   const text2Values = numberText2.split('');
   addCumulatively(text1Values, text2Values);
   return sumText;
}