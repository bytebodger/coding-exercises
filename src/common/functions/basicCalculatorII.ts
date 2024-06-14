/*
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
   OMFG is a royal PITA!
   I created several "working" solutions that nevertheless failed time/memory constraints when this was run against some of the
      huge strings used in the later tests.  Ultimately, to satisfy those constraints you need to do a lot of manual parsing of the
      original string (as opposed to, say, breaking the string up into arrays) because to do otherwise leads it to run out of memory
      on the very-large tests.
   Create a getNumber() function.  It accepts a text string and a position and returns a string.  The purpose is to find the next number
      in the string starting from any given position.  This is a useful helper function because numbers aren't limited to being single-digit.
   Use .replaceAll() to remove all whitespace.
   First pass the cleaned-up text through multiplyAndDivide().  The purpose of this function is to go through the string and evaluate all
      instances of 1-or-more consecutive multiplication/division operations.  (e.g., 4*3/2*5)  Once these are evaluated out, the resulting
      string will contains nothing but addition/subtraction operations and can simply be evaluated from left-to-right.  This function
      takes a string like "7+4*5/10-9" and converts it to "7+2-9".
   multiplyAndDivide() will call getConsecutiveMultipliersAndDividers(). This accepts a position argument.  From that position in the
      spaced-cleaned string it will return the full string of consecutive multiply/divide operations.  For example, if the string looks
      like this: "8-4+3*10/6*2-9+7" and it's called with a position argument of 4, it will return "3*10/6*2".
   multiplyAndDivide() will then call resolveMultipliersAndDividers().  This accepts a single string or consecutive multiply/divide
      operations. (e.g., "3*10/6*2") And returns the evaluated string. (e.g., "90")
   After multiplyAndDivide() is called, the resulting string is passed into calculateSum().  This takes a string of add/subtract-only
      operations (e.g., "7+2+9") and returns a numerical sum (e.g., 18).
 */

export const calculate = (text: string): number => {
   const calculateSum = (text: string, position: number, runningTotal: number): number => {
      let currentPosition = position;
      let currentRunningTotal = runningTotal;
      const operator = text[currentPosition];
      currentPosition++;
      const nextNumber = getNumber(text, currentPosition);
      currentPosition += nextNumber.length;
      if (operator === '+')
         currentRunningTotal += Number(nextNumber);
      else if (operator === '-')
         currentRunningTotal -= Number(nextNumber);
      return currentPosition >= text.length ? currentRunningTotal : calculateSum(text, currentPosition, currentRunningTotal);
   }

   const getConsecutiveMultipliersAndDividers = (position: number): string => {
      let consecutiveMultipliersAndDividers = '';
      let plusOrMinusFound = false;
      let currentPosition = position;
      while (!plusOrMinusFound) {
         if (currentPosition >= noSpaceText.length)
            break;
         const character = noSpaceText[currentPosition];
         if (['+', '-'].includes(character))
            plusOrMinusFound = true;
         else
            consecutiveMultipliersAndDividers += character;
         currentPosition++;
      }
      return consecutiveMultipliersAndDividers;
   }

   const getNumber = (text: string, position: number): string => {
      let nextNumber = '';
      let operatorFound = false;
      let currentPosition = position;
      while (!operatorFound) {
         if (currentPosition >= text.length)
            break;
         const character = text[currentPosition];
         if (character.match(/[0-9]/))
            nextNumber += character;
         else
            operatorFound = true;
         currentPosition++;
      }
      return nextNumber;
   }

   const multiplyAndDivide = (): string => {
      let simplifiedText = '';
      let position = 0;
      while (position < noSpaceText.length) {
         const firstOperand = getNumber(noSpaceText, position);
         position += firstOperand.length;
         const operator = noSpaceText[position];
         position++;
         if (['*', '/'].includes(operator)) {
            const consecutiveMultipliersAndDividers = getConsecutiveMultipliersAndDividers(position - firstOperand.length - 1);
            const resolvedMultipliersAndDividers = resolveMultipliersAndDividers(consecutiveMultipliersAndDividers);
            position += consecutiveMultipliersAndDividers.length - firstOperand.length - 1;
            simplifiedText += resolvedMultipliersAndDividers;
         } else {
            simplifiedText += firstOperand;
            if (operator !== undefined)
               simplifiedText += operator;
         }
      }
      return simplifiedText;
   }

   const resolveMultipliersAndDividers = (text: string): string => {
      let position = 0;
      const firstNumber = getNumber(text, position);
      position += firstNumber.length;
      const operator = text[position];
      position++;
      const secondNumber = getNumber(text, position);
      position += secondNumber.length;
      let product: number = 0;
      if (operator === '*')
         product = Number(firstNumber) * Number(secondNumber);
      else if (operator === '/')
         product = Math.floor(Number(firstNumber) / Number(secondNumber));
      const newText = product + text.substring(position);
      return position >= text.length - 1 ? newText : resolveMultipliersAndDividers(newText);
   }

   const noSpaceText = text.replaceAll(' ', '');
   const multipliedAndDivided = multiplyAndDivide();
   const firstNumber = getNumber(multipliedAndDivided, 0);
   return calculateSum(multipliedAndDivided, firstNumber.length - 1, Number(firstNumber));
}