/*
   Lowest Common Ancestor of a Binary Tree
   Tags: Tree, Depth-First Search, Binary Tree
   Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

   According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the
   lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

   Example 1:
   Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
   Output: 3
   Explanation: The LCA of nodes 5 and 1 is 3.

   Example 2:
   Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
   Output: 5
   Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

   Example 3:
   Input: root = [1,2], p = 1, q = 2
   Output: 1

   Constraints:
   The number of nodes in the tree is in the range [2, 10^5].
   -10^9 <= Node.val <= 10^9
   All Node.val are unique.
   p != q
   p and q will exist in the tree.

   Solution:
   Create a recursive function containsDescendants() that starts at a given node and determines whether nodeA or nodeB exist under it.
      The logic in this function goes as such:
         If the current node is nodeA or nodeB, return true.
         If node.left !== null, then return true if node.left containsDescendants(node.left).
         if node.right !== null, then return true if node.right containsDescendants(node.right).
         If none of these are true, return false.
   Create a recursive function drillDown() that starts at a given node and determines where the lca is.
      The logic in this function goes as such:
         If current node is null, return null.
         If current node === nodeA or current node === nodeB, return current node.
         left is false if node.left is null, or else it's the result of containsDescendants(node.left).
         right is false if node.right is null, or else it's the result of containsDescendants(node.right).
         If left & right are true, return node.
         If only left is true, return drilldown(node.left).
         If only right is true, return drilldown(node.right).
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

export const lowestCommonAncestor = (root: TreeNode | null, nodeA: TreeNode | null, nodeB: TreeNode | null): TreeNode | null => {
   const containsDescendants = (node: TreeNode): boolean => {
      if (node === nodeA || node === nodeB)
         return true;
      if (node.left !== null) {
         const left = containsDescendants(node.left);
         if (left)
            return true;
      }
      if (node.right !== null) {
         const right = containsDescendants(node.right);
         if (right)
            return true;
      }
      return false;
   }

   const drillDown = (node: TreeNode | null): TreeNode | null => {
      if (node === null)
         return null;
      if (node === nodeA || node === nodeB)
         return node;
      const left = node.left === null ? false : containsDescendants(node.left);
      const right = node.right === null ? false : containsDescendants(node.right);
      if (left && right)
         return node;
      if (left)
         return drillDown(node.left);
      if (right)
         return drillDown(node.right);
      return null;
   }

   return drillDown(root);
}