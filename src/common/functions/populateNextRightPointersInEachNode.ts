/*
   Populating Next Right Pointers in Each Node
   Tags: Linked List, Tree, Depth-First Search, Breadth-First Search, Binary Tree
   You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary
   tree has the following definition:

   struct Node {
     int val;
     Node *left;
     Node *right;
     Node *next;
   }
   Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set
   to NULL.

   Initially, all next pointers are set to NULL.

   Example 1:
   Input: root = [1,2,3,4,5,6,7]
   Output: [1,#,2,3,#,4,5,6,7,#]
   Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its
   next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.

   Example 2:
   Input: root = []
   Output: []

   Constraints:
   The number of nodes in the tree is in the range [0, 2^12 - 1].
   -1000 <= Node.val <= 1000

   Follow-up:
   You may only use constant extra space.
   The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

   Solution:
   Create an empty object for levels.  The object will be indexed by level number (0, 1, 2, 3...) and each entry will hold
   an array of _Nodes.
   Create a recursive indexLevels() function that traverses the array and keeps track of level as it does.
      If there is nothing at the current level, it creates the key and sets the value to [].
      If there is an array at that level, it pushes this node to that array.
   Create a recursive addNextRights() function that traverses the array.  If the levels object has nodes at that level,
   it shift()s the value off the front and sets it to next.  Otherwise, it just sets the value to null.
 */

class _Node {
   val: number
   left: _Node | null
   right: _Node | null
   next: _Node | null

   constructor (val?: number, left?: _Node, right?: _Node, next?: _Node) {
      this.val = (val ?? 0)
      this.left = (left ?? null)
      this.right = (right ?? null)
      this.next = (next ?? null)
   }
}

export const connect = (root: _Node | null): _Node | null => {
   const addNextRights = (node: _Node | null, level: number = 0): void => {
      if (node === null)
         return;
      node.next = levels[level].length > 0 ? levels[level].shift() : null;
      if (node.left !== null)
         addNextRights(node.left, level + 1);
      if (node.right !== null)
         addNextRights(node.right, level + 1);
   }

   const indexLevels = (node: _Node | null, level: number = 0): void => {
      if (node === null)
         return;
      if (levels.hasOwnProperty(level))
         levels[level].push(node);
      else
         levels[level] = [];
      if (node.left !== null)
         indexLevels(node.left, level + 1);
      if (node.right !== null)
         indexLevels(node.right, level + 1);
   }

   const levels: any = {};
   indexLevels(root);
   addNextRights(root);
   return root;
}