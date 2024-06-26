/*
   Count and Say
   Tags: String
   The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

   countAndSay(1) = "1"
   countAndSay(n) is the run-length encoding of countAndSay(n - 1).
   Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical
   characters (repeated 2 or more times) with the concatenation of the character and the number marking the
   count of the characters (length of the run). For example, to compress the string "3322251" we replace "33"
   with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed
   string becomes "23321511".

   Given a positive integer n, return the nth element of the count-and-say sequence.

   Example 1:
   Input: n = 4
   Output: "1211"
   Explanation:
   countAndSay(1) = "1"
   countAndSay(2) = RLE of "1" = "11"
   countAndSay(3) = RLE of "11" = "21"
   countAndSay(4) = RLE of "21" = "1211"

   Example 2:
   Input: n = 1
   Output: "1"
   Explanation:
   This is the base case.

   Constraints:
   1 <= n <= 30

   Follow up: Could you solve it iteratively?
 */

/*
   There's only issue is to determine how many numbers repeated after another one. If not we can put 1 before it.
 */

export const countAndSay = (value: number): string => {
   let result = '1'; // the result of value = 1
   for (let i = 1; i < value; i++) { // enters only value > 1
      let storage = ''; // inner storage to give to real one after collecting the result
      let counter = 1; // default count of result[j]
      for (let j = 0; j < result.length; j++) {
         if (result[j] === result[j + 1])
            counter++; // if it repeats counter inceases
         else {
            storage += counter + result[j];
            counter = 1;
         } // else we add to storage and setting counter to default
      }
      result = storage; // to keep result we giving it back to result
   }
   return result;
}