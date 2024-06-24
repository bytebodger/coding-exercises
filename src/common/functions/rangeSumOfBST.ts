/*
   Range Sum of BST
   Tags: Tree, Depth-First Search, Binary Search Tree, Binary Tree
   Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with
   a value in the inclusive range [low, high].

   Example 1:
   Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
   Output: 32
   Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.

   Example 2:
   Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
   Output: 23
   Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.

   Constraints:
   The number of nodes in the tree is in the range [1, 2 * 10^4].
   1 <= Node.val <= 10^5
   1 <= low <= high <= 10^5
   All Node.val are unique.

   Solution:
   Pretty standard recursive tree traversal.  Since there's no implied structure to the values of the tree's nodes (e.g., all nodes
      must be larger than their parents), I'm not sure of any way to speed this up since you have to visit every node to see if it's
      within the request min/max range.

   Complexity: O(N)
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

export const rangeSumBST = (tree: TreeNode | null, minimum: number, maximum: number): number => {
   const drillDown = (tree: TreeNode | null): void => {
      if (tree === null)
         return;
      if (tree.val >= minimum && tree.val <= maximum)
         sum += tree.val;
      if (tree.left !== null)
         drillDown(tree.left);
      if (tree.right !== null)
         drillDown(tree.right);
   }

   let sum = 0;
   drillDown(tree);
   return sum;
};