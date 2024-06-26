/*
   Check Completeness of a Binary Tree
   Tags: Tree, Breadth-First Search, Binary Tree
   Given the root of a binary tree, determine if it is a complete binary tree.

   In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes
   in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last
   level h.

   Example 1:
   Input: root = [1,2,3,4,5,6]
   Output: true
   Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all
   nodes in the last level ({4, 5, 6}) are as far left as possible.

   Example 2:
   Input: root = [1,2,3,4,5,null,7]
   Output: false
   Explanation: The node with value 7 isn't as far left as possible.

   Constraints:
   The number of nodes in the tree is in the range [1, 100].
   1 <= Node.val <= 1000

   Complexity:
   Time: O(n)
   Space: O(n)
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

export const isCompleteTree = (root: TreeNode | null): boolean => {
   // If you ever encounter a NULL node, you must not encounter a non NULL node after that in
   // a Level Order Traversal, this is the definition of a complete Binary Tree.
   const queue = [root];
   let previousNull = false;
   while (queue.length > 0) {
      const node = queue.shift();
      if (!node)
         previousNull = true;
      else {
         if (previousNull)
            return false;
         queue.push(node.left);
         queue.push(node.right)
      }
   }
   return true;
}