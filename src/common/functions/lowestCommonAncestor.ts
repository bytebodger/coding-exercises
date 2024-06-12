/*
   Tags: Hash Table, Two Pointers, Tree, Binary Tree
   Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).

   Each node will have a reference to its parent node. The definition for Node is below:

   class Node {
       public int val;
       public Node left;
       public Node right;
       public Node parent;
   }
   According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the lowest
   node that has both p and q as descendants (where we allow a node to be a descendant of itself)."

   Example 1:
   Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
   Output: 3
   Explanation: The LCA of nodes 5 and 1 is 3.

   Example 2:
   Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
   Output: 5
   Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.

   Example 3:
   Input: root = [1,2], p = 1, q = 2
   Output: 1

   Constraints:
   The number of nodes in the tree is in the range [2, 105].
   -10^9 <= Node.val <= 10^9
   All Node.val are unique.
   p != q
   p and q exist in the tree.

   Solution:
   Create a recursive getAncestors() function that will find all the parents of nodeA and put their values into an ancestors array.
   Create a recursive getCommonAncestor() function that will traverse the parents of nodeB until it finds one of nodeA's ancestors.
 */

class _Node {
   val: number
   left: _Node | null
   right: _Node | null
   parent: _Node | null

   constructor (v: number) {
      this.val = v;
      this.left = null;
      this.right = null;
      this.parent = null;
   }
}

export const lowestCommonAncestor = (nodeA: _Node | null, nodeB: _Node | null): _Node | null => {
   const getAncestors = (node: _Node, ancestors: number[]): number[] => {
      ancestors.push(node.val);
      if (node.parent === null)
         return ancestors;
      return getAncestors(node.parent, ancestors);
   }

   const getCommonAncestor = (node: _Node, ancestors: number[]): _Node | null => {
      if (ancestors.includes(node.val))
         return node;
      if (node.parent === null)
         return null;
      return getCommonAncestor(node.parent, ancestors);
   }

   if (nodeA === null || nodeB === null)
      return null;
   const nodeAAncestors = getAncestors(nodeA, []);
   return getCommonAncestor(nodeB, nodeAAncestors);
};