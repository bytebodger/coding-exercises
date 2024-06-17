/*
   Convert Binary Search Tree to Sorted Doubly Linked List
   Tags: Linked List, Stack, Tree, Depth-First Search, Binary Search Tree, Binary Tree, Doubly-Linked List
   Convert a Binary Search Tree to a sorted Circular Doubly-Linked List in place.

   You can think of the left and right pointers as synonymous to the predecessor and successor pointers in a doubly-linked
   list. For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of
   the last element is the first element.

   We want to do the transformation in place. After the transformation, the left pointer of the tree node should point to
   its predecessor, and the right pointer should point to its successor. You should return the pointer to the smallest
   element of the linked list.

   Example 1:
   Input: root = [4,2,5,1,3]
   Output: [1,2,3,4,5]
   Explanation: The figure below shows the transformed BST. The solid line indicates the successor relationship, while the
   dashed line means the predecessor relationship.

   Example 2:
   Input: root = [2,1,3]
   Output: [1,2,3]

   Constraints:
   The number of nodes in the tree is in the range [0, 2000].
   -1000 <= Node.val <= 1000
   All the values of the tree are unique.

   Solution:
   Create a recursive getNodes function that traverses the tree, adds each node to an array, and sets the left/right values to null.
   Sort the array by node.val.
   Loop through the array resetting the left/right value according to predecessor/successor.
 */

class _Node {
   val: number
   left: _Node | null
   right: _Node | null

   constructor (val?: number, left?: _Node | null, right?: _Node | null) {
      this.val = (val ?? 0)
      this.left = (left === undefined ? null : left)
      this.right = (right === undefined ? null : right)
   }
}

export const treeToDoublyList = (root: _Node | null): _Node | null => {
   const getNodes = (tree: _Node | null) => {
      if (tree === null)
         return;
      if (tree.left !== null)
         getNodes(tree.left);
      if (tree.right !== null)
         getNodes(tree.right);
      tree.left = null;
      tree.right = null;
      nodes.push(tree);
   }

   const nodes: _Node[] = [];
   getNodes(root);
   const sortedNodes = nodes.sort((nodeA, nodeB) => nodeA.val - nodeB.val);
   for (let i = 0; i < sortedNodes.length; i++) {
      sortedNodes[i].left = i === 0 ? sortedNodes[sortedNodes.length - 1] : sortedNodes[i - 1];
      sortedNodes[i].right = i === sortedNodes.length - 1 ? sortedNodes[0] : sortedNodes[i + 1];
   }
   return sortedNodes[0];
}