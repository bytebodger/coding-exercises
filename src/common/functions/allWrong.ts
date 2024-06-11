/*
   There's a multiple-choice test with 𝑁 questions, numbered from 1 to 𝑁. Each question has 2 answer options, labelled
   A and B. You know that the correct answer for the 𝑖ith question is the 𝑖ith character in the string 𝐶, which is
   either "A" or "B", but you want to get a score of 0 on this test by answering every question incorrectly.

   Your task is to implement the function getWrongAnswers(N, C) which returns a string with 𝑁 characters, the
   𝑖ith of which is the answer you should give for question 𝑖 in order to get it wrong (either "A" or "B").

   Constraints
   1 ≤ 𝑁 ≤ 100
   𝐶𝑖 ∈ {"A","B"}

   Sample test case #1
   N = 3
   C = ABA
   Expected Return Value = BAB

   Sample test case #2
   N = 5
   C = BBBBB
   Expected Return Value = AAAAA

   Sample Explanation
   In the first case the correct answers to the 3 questions are A, B, and A, in that order. Therefore, in order to
   get them all wrong, the 3 answers you should give are B, A, and B, in that order.
   In the second case the correct answers are all B, so you should answer each question with A.
*/

export const getWrongAnswers = (_N: number, C: string) => {
   /*
      C represents all of the correct answers.  So we just need to loop through characters in C and flip every letter
      to its opposite letter.
    */
   let wrongAnswers = '';
   const correctAnswers = C.split('');
   correctAnswers.forEach(correctAnswer => {
      wrongAnswers += correctAnswer === 'A' ? 'B' : 'A';
   })
   return wrongAnswers;
}