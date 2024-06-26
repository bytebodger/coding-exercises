/*
   Largest BST Subtree
   Tags: Dynamic Programming, Tree, Depth-First Search, Binary Search Tree, Binary Tree
   Given the root of a binary tree, find the largest subtree, which is also a Binary Search
   Tree (BST), where the largest means subtree has the largest number of nodes.

   A Binary Search Tree (BST) is a tree in which all the nodes follow the below-mentioned
   properties:

   The left subtree values are less than the value of their parent (root) node's value.
   The right subtree values are greater than the value of their parent (root) node's value.
   Note: A subtree must include all of its descendants.

   Example 1:
   Input: root = [10,5,15,1,8,null,7]
   Output: 3
   Explanation: The Largest BST Subtree in this case is the highlighted one. The return value
   is the subtree's size, which is 3.

   Example 2:
   Input: root = [4,2,7,2,3,5,null,2,null,null,null,null,null,1]
   Output: 2

   Constraints:
   The number of nodes in the tree is in the range [0, 10^4].
   -10^4 <= Node.val <= 10^4

   Follow up: Can you figure out ways to solve it with O(n) time complexity?

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

export const largestBSTSubtree = (root: TreeNode | null): number => {
   const drilldown = (node: TreeNode | null): NodeResult => {
      if (node == null)
         return {
            isNull: true,
            numNodes: 0,
            min: Infinity,
            max: -Infinity,
            isBST: false
         }
      const left = drilldown(node.left);
      const right = drilldown(node.right);
      const isBST = (left.isNull ?? (left.isBST && left.max < node.val))
         && (right.isNull ?? (right.isBST && node.val < right.min));
      if (isBST) {
         const numNodes = 1 + (left.numNodes ?? 0) + (right.numNodes ?? 0);
         maxNodes = Math.max(maxNodes, numNodes);
         return {
            numNodes,
            min: !left.isNull ? left.min : node.val,
            max: !right.isNull ? right.max : node.val,
            isBST: true
         }
      }
      return {
         numNodes: 0,
         min: Infinity,
         max: -Infinity,
         isBST: false
      }
   }

   interface NodeResult {
      isNull?: boolean;
      numNodes: number;
      min: number;
      max: number;
      isBST: boolean;
   }

   let maxNodes = 0;
   drilldown(root);
   return maxNodes;
}