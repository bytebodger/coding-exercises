/*
   Insert Into a Sorted Circular Linked List
   Tags: Linked List
   Given a Circular Linked List node, which is sorted in non-descending order, write a function to insert a value
   insertVal into the list such that it remains a sorted circular list. The given node can be a reference to any
   single node in the list and may not necessarily be the smallest value in the circular list.

   If there are multiple suitable places for insertion, you may choose any place to insert the new value. After
   the insertion, the circular list should remain sorted.

   If the list is empty (i.e., the given node is null), you should create a new single circular list and return
   the reference to that single node. Otherwise, you should return the originally given node.

   Example 1:
   Input: head = [3,4,1], insertVal = 2
   Output: [3,4,1,2]
   Explanation: In the figure above, there is a sorted circular list of three elements. You are given a reference
   to the node with value 3, and we need to insert 2 into the list. The new node should be inserted between node 1
   and node 3. After the insertion, the list should look like this, and we should still return node 3.

   Example 2:
   Input: head = [], insertVal = 1
   Output: [1]
   Explanation: The list is empty (given head is null). We create a new single circular list and return the reference
   to that single node.

   Example 3:
   Input: head = [1], insertVal = 0
   Output: [1,0]

   Constraints:
   The number of nodes in the list is in the range [0, 5 * 10^4].
   -10^6 <= Node.val, insertVal <= 10^6

   Solution:
   If head is null, return a new _Node from the insertVal with its next value set to itself.
   Create a recursive insertIntoList function.
   If item.next === head, then add the new node to the end and return.
   If insertVal fits between this item and item.next ,add the new node between them.
 */

class _Node {
   val: number
   next: _Node | null

   constructor (val?: number, next?: _Node) {
      this.val = (val ?? 0);
      this.next = (next ?? null);
   }
}

export const insert = (head: _Node | null, insertVal: number): _Node | null => {
   const insertIntoList = (item: _Node): void => {
      if (item.next === null)
         return;
      if (item.next === head) {
         // the next item is the head
         const newItem = new _Node(insertVal);
         newItem.next = item;
         item.next = newItem;
         return;
      }
      if (
         (item.next.val > item.val && insertVal >= item.val && insertVal <= item.next.val) // insert into an ascending order
         || (item.next.val < item.val && (insertVal <= item.next.val || insertVal >= item.val)) // insert where the order re-starts
      ) {
         const newItem = new _Node(insertVal);
         newItem.next = item.next;
         item.next = newItem;
         return;
      }
      return insertIntoList(item.next);
   }

   if (head === null) {
      const newNode = new _Node(insertVal);
      newNode.next = newNode;
      return newNode;
   }
   insertIntoList(head);
   return head;
}