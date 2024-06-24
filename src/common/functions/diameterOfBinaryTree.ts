/*
   Diameter of Binary Tree
   Tags: Tree, Depth-First Search, Binary Tree
   Given the root of a binary tree, return the length of the diameter of the tree.

   The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path
   may or may not pass through the root.

   The length of a path between two nodes is represented by the number of edges between them.

   Example 1:
   Input: root = [1,2,3,4,5]
   Output: 3
   Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

   Example 2:
   Input: root = [1,2]
   Output: 1

   Constraints:
   The number of nodes in the tree is in the range [1, 10^4].
   -100 <= Node.val <= 100
 */

class TreeNode {
   val: number
   left: TreeNode | null
   right: TreeNode | null

   constructor (val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val ?? 0)
      this.left = (left === undefined ? null : left)
      this.right = (right === undefined ? null : right)
   }
}

export const diameterOfBinaryTree = (root: TreeNode | null): number => {
   const depthFirstSearch = (node: TreeNode | null): number => {
      // keep drilling until we find empty nodes
      if (!node)
         return 0;
      const left = depthFirstSearch(node.left);
      const right = depthFirstSearch(node.right);
      // use Math.max() because we're constantly checking if the current path has
      // expanded the visible diameter
      diameter = Math.max(diameter, left + right);
      return Math.max(left, right) + 1;
   }

   let diameter = 0;
   depthFirstSearch(root);
   return diameter;
}