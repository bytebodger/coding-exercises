/*
   Remove Nth Node From End of List
   Tags: Linked List, Two Pointers
   Given the head of a linked list, remove the nth node from the end of the list and return its head.

   Example 1:
   Input: head = [1,2,3,4,5], n = 2
   Output: [1,2,3,5]

   Example 2:
   Input: head = [1], n = 1
   Output: []

   Example 3:
   Input: head = [1,2], n = 1
   Output: [1]

   Constraints:
   The number of nodes in the list is sz.
   1 <= sz <= 30
   0 <= Node.val <= 100
   1 <= n <= sz

   Follow up: Could you do this in one pass?

   Complexity:
   Time: O(n)
   Space: O(1)
 */

class ListNode {
   val: number
   next: ListNode | null

   constructor (val?: number, next?: ListNode | null) {
      this.val = (val ?? 0)
      this.next = (next === undefined ? null : next)
   }
}

export const removeNthFromEnd = (head: ListNode | null, target: number): ListNode | null => {
   const findLength = (head: ListNode | null): number => {
      let count = 0;
      if (head === null)
         return count;
      while (head !== null) {
         count++;
         head = head.next;
      }
      return count;
   }

   if (head === null)
      return null;
   const length = findLength(head);
   let i = 0;
   const traverseTill = length - target - 1;
   if (traverseTill === -1)
      return head.next;
   let node: ListNode | null = head;
   while (i < traverseTill) {
      if (node)
         node = node.next;
      i++;
   }
   if (node?.next)
      node.next = node.next.next;
   return head;
}