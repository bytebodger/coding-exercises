/*
   Copy List with Random Pointer
   Tags: Hash Table, Linked List
   A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

   Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value
   of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the
   pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the
   original list.

   For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied
   list, x.random --> y.

   Return the head of the copied linked list.

   The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

   val: an integer representing Node.val
   random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
   Your code will only be given the head of the original linked list.

   Example 1:
   Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
   Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

   Example 2:
   Input: head = [[1,1],[2,1]]
   Output: [[1,1],[2,1]]

   Example 3:
   Input: head = [[3,null],[3,0],[3,null]]
   Output: [[3,null],[3,0],[3,null]]

   Constraints:
   0 <= n <= 1000
   -10^4 <= Node.val <= 10^4
   Node.random is null or is pointing to some node in the linked list.

   Solution:
   If head is null, return null.
   Create a recursive function convertListToMap that drills down through the list.
      For each node, create a new map key equal to that node.
      The VALUE of the map key needs to be new _Node(node.val, node.next, node.random).
   Once this function is called, loop through the new map.
      If the current node has a value for node.next, use map.get() to get this value.
      If the current node has a value for node.random, use map.get() to get this value.
   This works because first we're drilling down through the tree to create NEW _Nodes for each of the existing nodes.
      Then we look at each node and, if it has values for node.next or node.random, we're grabbing the NEW equivalent node about of the map.
 */

class _Node {
   val: number
   next: _Node | null
   random: _Node | null

   constructor (val?: number, next?: _Node | null, random?: _Node | null) {
      this.val = (val ?? 0)
      this.next = (next ?? null)
      this.random = (random ?? null)
   }
}

export const copyRandomList = (head: _Node | null): _Node | null => {
   const convertListToMap = (node: _Node | null) => {
      if (node === null)
         return;
      map.set(node, new _Node(node.val, node.next, node.random));
      if (node.next === null)
         return;
      convertListToMap(node.next);
   }

   if (head == null)
      return null;
   const map = new Map();
   convertListToMap(head);
   map.forEach(node => {
      if (node.next)
         node.next = map.get(node.next);
      if (node.random)
         node.random = map.get(node.random);
   });
   return map.get(head);
}