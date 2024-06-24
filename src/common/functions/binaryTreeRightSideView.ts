/*
   Binary Tree Right Side View
   Tags: Tree, Depth-First Search, Breadth-First Search, Binary Tree
   Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes
   you can see ordered from top to bottom.

   Example 1:
   Input: root = [1,2,3,null,5,null,4]
   Output: [1,3,4]

   Example 2:
   Input: root = [1,null,3]
   Output: [1,3]

   Example 3:
   Input: root = []
   Output: []

   Constraints:
   The number of nodes in the tree is in the range [0, 100].
   -100 <= Node.val <= 100

   Complexity:
   Time complexity: O(n)
   Space complexity: O(n)
      Where n is the number of nodes in the binary tree
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

export const rightSideView = (root: TreeNode | null): number[] => {
   const getRightSideView = (root: TreeNode | null, rightView: number[] = [], depth: number = 0): number[] => {
      // return on null
      if (root === null)
         return rightView;
      // add val to rightView
      rightView[depth] = root.val;
      // we need to traverse the left side because that could still lead us to right-side answers
      getRightSideView(root.left, rightView, depth + 1);
      // return the result of the right side
      return getRightSideView(root.right, rightView, depth + 1);
   }

   return getRightSideView(root);
}