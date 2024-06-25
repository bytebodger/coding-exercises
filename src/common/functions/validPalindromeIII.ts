/*
   Valid Palindrome III
   Tags: String, Dynamic Programming
   Given a string s and an integer k, return true if s is a k-palindrome.

   A string is k-palindrome if it can be transformed into a palindrome by removing at most k characters from it.

   Example 1:
   Input: s = "abcdeca", k = 2
   Output: true
   Explanation: Remove 'b' and 'e' characters.

   Example 2:
   Input: s = "abbababa", k = 1
   Output: true

   Constraints:
   1 <= s.length <= 1000
   s consists of only lowercase English letters.
   1 <= k <= s.length

   Complexity:
   Time complexity: O(n Log n)
   Space complexity: O(n)
      where n is the length of text
 */

export const isValidPalindrome = (text: string, depth: number): boolean => {
   const memo: number[] = new Array(text.length).fill(0);
   let previous: number;
   // generate all combinations in the correct order by going backward (i)
   // and forward (j) through text
   for (let i = text.length - 2; i >= 0; i--) {
      previous = 0;
      for (let j = i + 1; j < text.length; j++) {
         const temp = memo[j];
         if (text.charAt(i) === text.charAt(j)) {
            memo[j] = previous;
         } else {
            // Case 2: Character at `i` does not equal character at `j`.
            // Either delete character at `i` or delete character at `j`
            // and try to match the two pointers using recursion.
            // We need to take the minimum of the two results and add 1
            // representing the cost of deletion.
            // memo[j] will contain the value for memo[i+1][j]
            // memo[j-1] will contain the value for memo[i][j-1]
            memo[j] = 1 + Math.min(memo[j], memo[j - 1]);
         }
         previous = temp;
      }
   }
   // Return true if the minimum cost to create a palindrome by only deleting the letters
   // is less than or equal to `depth`.
   return memo[text.length - 1] <= depth;
}