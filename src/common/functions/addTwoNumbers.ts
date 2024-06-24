/*
   Add Two Numbers
   Tags: Linked List, Math, Recursion
   You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each
   of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

   You may assume the two numbers do not contain any leading zero, except the number 0 itself.

   Example 1:
   Input: l1 = [2,4,3], l2 = [5,6,4]
   Output: [7,0,8]
   Explanation: 342 + 465 = 807.
   Example 2:

   Input: l1 = [0], l2 = [0]
   Output: [0]
   Example 3:

   Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
   Output: [8,9,9,9,0,0,0,1]

   Constraints:

   The number of nodes in each linked list is in the range [1, 100].
   0 <= Node.val <= 9
   It is guaranteed that the list represents a number that does not have leading zeros.

   Solution:
   ListNodes are recursive.
   First we extract the supplied ListNodes into numerical arrays.
   Then reverse the arrays and add the numbers.
   Then convert the sum back into an array and reverse it.
   Then use the reversed sum array to build and return a new ListNode.
 */

class ListNode {
   val: number | undefined = 0;
   next: ListNode | null;
   constructor (val?: number, next?: ListNode | null) {
      this.val = (val ?? 0)
      this.next = (next === undefined ? null : next)
   }
}

export const addTwoNumbers = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
   const createListNode = (integers: number[], listNode: ListNode): ListNode | null => {
      listNode.val = integers.shift();
      if (integers.length !== 0)
         listNode.next = createListNode(integers, new ListNode());
      return listNode;
   }

   const getNumbers = (l1: ListNode | null, currentNumbers: number[]): number[] => {
      if (l1 === null)
         return [];
      if (l1.val != null)
         currentNumbers.push(l1.val);
      return l1.next === null ? currentNumbers : getNumbers(l1.next, currentNumbers);
   }

   const firstNumber = BigInt(getNumbers(l1, []).reverse().join(''));
   const secondNumber = BigInt(getNumbers(l2, []).reverse().join(''));
   const summedNumbers = (firstNumber + secondNumber)
      .toString().split('').reverse().map(character => Number(character));
   return createListNode(summedNumbers, new ListNode());
}