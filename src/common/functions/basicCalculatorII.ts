/*
   Basic Calculator II
   Tags: Math, String, Stack
   Given a string s which represents an expression, evaluate this expression and return its value.

   The integer division should truncate toward zero.

   You may assume that the given expression is always valid. All intermediate results will be in the range of [-2^31, 2^31 - 1].

   Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

   Example 1:
   Input: s = "3+2*2"
   Output: 7

   Example 2:
   Input: s = " 3/2 "
   Output: 1

   Example 3:
   Input: s = " 3+5 / 2 "
   Output: 5

   Constraints:
   1 <= s.length <= 3 * 10^5
   s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
   s represents a valid expression.
   All the integers in the expression are non-negative integers in the range [0, 2^31 - 1].
   The answer is guaranteed to fit in a 32-bit integer.

   Solution:
   First create a helper function - getNumber() - that uses regex search to find the number at the beginning of a string.
   Then create multiplyAndDivide(), a recursive function that takes a string, finds the firstNumber, operator, and secondNumber
      from that string, and calculates the product.  It calls itself until there's nothing but a number left in the calculation.
   Remove all whitespace from the input text.
   Split the text on '+'.
   For each additionBlock created in the previous step, split the text on '-'.
      Create a new .map() of the '-'-split array.  If the element contains only a number, then just return it.  If it contains
      multiply and/or divide operations, get the fully-evaluated value from multiplyAndDivide().
      Collapse the subtractionBlock elements to a single value.  For example, [8, 3, 1, 2] will result in 8 - 3 - 1 - 2 = 2.
      Add the subtractionBlock value to the sum.
   For each additionBlock element that does NOT contain a '-' symbol, add it to the sum (if it's a standalone number) or add the
      result of multiplyAndDivide() (if contains those operations).

   Complexity: O(N)
 */

export const calculate = (text: string): number => {
   const getNumber = (text: string): string => {
      const nonNumberIndex = text.search(/[^0-9]/);
      return nonNumberIndex === -1 ? text : text.substring(0, nonNumberIndex);
   }

   const multiplyAndDivide = (text: string): string => {
      let currentText = text;
      const firstNumber = getNumber(currentText);
      currentText = currentText.replace(firstNumber, '');
      const operator = currentText[0];
      currentText = currentText.replace(operator, '');
      const secondNumber = getNumber(currentText);
      currentText = currentText.replace(secondNumber, '');
      let product: number = 0;
      if (operator === '*')
         product = Number(firstNumber) * Number(secondNumber);
      else if (operator === '/')
         product = Math.floor(Number(firstNumber) / Number(secondNumber));
      return currentText === '' ? product.toString() : multiplyAndDivide(product + currentText);
   }

   const noSpaceText = text.replaceAll(' ', '');
   const additionBlocks = noSpaceText.split('+');
   let sum = 0;
   additionBlocks.forEach(additionBlock => {
      const subtractionBlocks = additionBlock.split('-');
      if (subtractionBlocks.length > 1) {
         const evaluatedSubtractionBlocks = subtractionBlocks.map(subtractionBlock => {
            return subtractionBlock.search(/[^0-9]/) === -1 ? subtractionBlock : multiplyAndDivide(subtractionBlock);
         })
         let subtractionBlockValue = Number(evaluatedSubtractionBlocks.shift());
         evaluatedSubtractionBlocks.forEach(value => {
            subtractionBlockValue -= Number(value)
         });
         sum += subtractionBlockValue;
      } else
         sum += additionBlock.search(/[^0-9]/) === -1 ? Number(additionBlock) : Number(multiplyAndDivide(additionBlock));
   })
   return sum;
}