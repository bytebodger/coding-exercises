/*
   Sum Roof to Leaf Numbers
   Tags: Tree, Depth-First Search, Binary Tree
   You are given the root of a binary tree containing digits from 0 to 9 only.

   Each root-to-leaf path in the tree represents a number.

   For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
   Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

   A leaf node is a node with no children.

   Example 1:
   Input: root = [1,2,3]
   Output: 25
   Explanation:
   The root-to-leaf path 1->2 represents the number 12.
   The root-to-leaf path 1->3 represents the number 13.
   Therefore, sum = 12 + 13 = 25.

   Example 2:
   Input: root = [4,9,0,5,1]
   Output: 1026
   Explanation:
   The root-to-leaf path 4->9->5 represents the number 495.
   The root-to-leaf path 4->9->1 represents the number 491.
   The root-to-leaf path 4->0 represents the number 40.
   Therefore, sum = 495 + 491 + 40 = 1026.

   Constraints:
   The number of nodes in the tree is in the range [1, 1000].
   0 <= Node.val <= 9
   The depth of the tree will not exceed 10.

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

export const sumNumbers = (root: TreeNode | null): number => {
   const getSum = (root: TreeNode | null, sum: number): number => {
      // if root is not null, drill down recursively
      if (root === null)
         return 0;
      // we multiply by 10 because each horizontal step across the binary tree represents a digit in the 10s/100s/1000s/etc column
      const currentSum = (sum * 10) + root.val;
      // this is a leaf, so just return the value
      if (root.left === null && root.right === null)
         return currentSum;
      // sum up the left and right nodes
      return getSum(root.left, currentSum) + getSum(root.right, currentSum);
   }

   // start at the root
   return getSum(root, 0);
}