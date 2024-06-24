/*
   Maximum Swap
   Tags: Math, Greedy
   You are given an integer num. You can swap two digits at most once to get the maximum valued number.

   Return the maximum valued number you can get.

   Example 1:
   Input: num = 2736
   Output: 7236
   Explanation: Swap the number 2 and the number 7.

   Example 2:
   Input: num = 9973
   Output: 9973
   Explanation: No swap.

   Constraints:
   0 <= num <= 10^8

   Complexity:
   Time complexity: O(N)
      where N is the length of the value string
   Space complexity: O(N)
      since we're creating a new array that equals the length of the value string
 */

export const maximumSwap = (value: number): number => {
   // create an array of digits from the input string
   const digits = value.toString().split('');
   // since the values are constrained to being >= 0, we can set the default
   // values for our maximum, maximumIndex, leftIndex, and rightIndex to -1
   // we're going to track left and right index to determine which indices to swap
   let maximum = -1;
   let maximumIndex = -1;
   let leftIndex = -1;
   let rightIndex = -1;
   // interate backwards through the digits array
   for (let i = digits.length - 1; i >= 0; i--) {
      const digit = Number(digits[i]);
      if (maximum < digit) {
         // if digit > maximum then set a nwew maximum and maximumIndex
         maximum = digit;
         maximumIndex = i;
      } else if (maximum > digit) {
         // if digit < maximum then set leftIndex to i and rightIndex to maximumIndex
         leftIndex = i;
         rightIndex = maximumIndex;
      }
   }
   // just return the value if we found no indices to swap
   if (leftIndex === -1)
      return value;
   // do an inline swap
   [digits[leftIndex], digits[rightIndex]] = [digits[rightIndex], digits[leftIndex]];
   return Number(digits.join(''));
}