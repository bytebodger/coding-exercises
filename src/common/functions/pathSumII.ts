/*
   Path Sum II
   Tags: Backtracking, Tree, Depth-First Search, Binary Tree
   Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the
   sum of the node values in the path equals targetSum. Each path should be returned as a list of the
   node values, not node references.

   A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node
   with no children.

   Example 1:
   Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
   Output: [[5,4,11,2],[5,8,4,5]]
   Explanation: There are two paths whose sum equals targetSum:
   5 + 4 + 11 + 2 = 22
   5 + 8 + 4 + 5 = 22

   Example 2:
   Input: root = [1,2,3], targetSum = 5
   Output: []

   Example 3:
   Input: root = [1,2], targetSum = 0
   Output: []

   Constraints:
   The number of nodes in the tree is in the range [0, 5000].
   -1000 <= Node.val <= 1000
   -1000 <= targetSum <= 1000

   Complexity:
   Time: O(n) where n is the number of nodes in the tree
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

export const pathSum = (root: TreeNode | null, targetSum: number): number[][] => {
   const drilldown = (root: TreeNode | null, targetSum: number, list: number[]) => {
      if (root == null)
         return; // when no nodes present
      list.push(root.val)
      // check leaf nodes && current value is TargetSum :: success we found the sum
      if (root.val === targetSum && (root.left === null && root.right === null)) {
         fullPath.push(list.slice());
         list.pop(); // Undo the previous node
         return;
      }
      drilldown(root.left, targetSum - root.val, list);
      drilldown(root.right, targetSum - root.val, list);
      list.pop();// Undo the previous node
   }

   const fullPath: number[][] = [];
   drilldown(root, targetSum, []);
   return fullPath;
}