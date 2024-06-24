/*
   Closest Binary Search Tree Value
   Tags: Binary Search, Tree, Depth-First Search, Binary Search Tree, Binary Tree
   Given the root of a binary search tree and a target value, return the value in the BST that is closest
   to the target. If there are multiple answers, print the smallest.

   Example 1:
   Input: root = [4,2,5,1,3], target = 3.714286
   Output: 4

   Example 2:
   Input: root = [1], target = 4.428571
   Output: 1

   Constraints:
   The number of nodes in the tree is in the range [1, 104].
   0 <= Node.val <= 10^9
   -10^9 <= target <= 10^9

   Complexity:
   Time complexity: O(LogN)
      because we're halving the time with the BST approach
   Space complexity: O(1)
      because there's no recursion and we're not adding/building other data structures
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

export const closestValue = (root: TreeNode | null, target: number): number => {
   if (root === null)
      return 0;
   // track the closest seen distance
   let closest = root.val;
   while (root) {
      const targetDistance = Math.abs(closest - target);
      const distance = Math.abs(root.val - target)
      // update closest if appropriate
      if (distance < targetDistance || (distance === targetDistance && root.val < closest))
         closest = root.val;
      // use the return value from the loop to determine if we should go left or right
      root = target < root.val ? root.left : root.right;
   }
   return closest;
}