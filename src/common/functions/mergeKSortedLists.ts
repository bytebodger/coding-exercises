/*
   Merge k Sorted Lists
   Tags: Linked List, Divide and Conquer, Heap (Priority Queue), Merge Sort
   You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

   Merge all the linked-lists into one sorted linked-list and return it.

   Example 1:
   Input: lists = [[1,4,5],[1,3,4],[2,6]]
   Output: [1,1,2,3,4,4,5,6]
   Explanation: The linked-lists are:
   [
     1->4->5,
     1->3->4,
     2->6
   ]
   merging them into one sorted list:
   1->1->2->3->4->4->5->6

   Example 2:
   Input: lists = []
   Output: []

   Example 3:
   Input: lists = [[]]
   Output: []

   Constraints:
   k == lists.length
   0 <= k <= 10^4
   0 <= lists[i].length <= 500
   -10^4 <= lists[i][j] <= 10^4
   lists[i] is sorted in ascending order.
   The sum of lists[i].length will not exceed 10^4.

   Complexity:
   Time complexity: O(lists.length^2)
   Space complexity: O(lists.length^2)
 */

class ListNode {
   val: number
   next: ListNode | null

   constructor (val?: number, next?: ListNode | null) {
      this.val = (val ?? 0)
      this.next = (next === undefined ? null : next)
   }
}

export const mergeKLists = (lists: Array<ListNode | null>): ListNode | null => {
   // merge two lists by working through list1 & list2 until there is not node.next value
   const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null): ListNode | null => {
      let node = new ListNode();
      const dummy = node;
      while (list1 && list2) {
         // determine which list to use for the node.next value;
         if (list1.val < list2.val) {
            node.next = list1;
            list1 = list1.next;
         } else {
            node.next = list2;
            list2 = list2.next;
         }
         node = node.next;
      }
      node.next = list1 ?? list2;
      return dummy.next;
   }
   // reduce lists by repeatedly calling mergeTwoLists()
   return lists.reduce((full, node) => mergeTwoLists(full, node), null);
}