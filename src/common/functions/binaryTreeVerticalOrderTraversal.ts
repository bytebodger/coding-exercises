/*
   Tags: Hash Table, Tree, Depth-First Search, Breadth-First Search, Sorting, Binary Tree
   Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom, column by column).

   If two nodes are in the same row and column, the order should be from left to right.

   Example 1:
   Input: root = [3,9,20,null,null,15,7]
   Output: [[9],[3,15],[20],[7]]

   Example 2:
   Input: root = [3,9,8,4,0,1,7]
   Output: [[4],[9],[3,0,1],[8],[7]]

   Example 3:
   Input: root = [3,9,8,4,0,1,7,null,null,null,2,5]
   Output: [[4],[9,5],[3,0,1],[8,2],[7]]

   Constraints:
   The number of nodes in the tree is in the range [0, 100].
   -100 <= Node.val <= 100

   Solution:
   Create a Node interface that holds the val, x, and y values for each node in the tree.
   Create an empty array of Nodes.
   Recursively traverse the tree, adding a new Node for every node in the tree.
   Sort the Node array first by x then by y.
   Loop through the Node array and populate the verticalTraversal array based on the y location of each Node.

   Complexity: O(Nlogn)
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

export const verticalOrder = (tree: TreeNode | null): number[][] => {
   interface Node {
      val: number,
      x: number,
      y: number,
   }

   const getNodes = (tree: TreeNode, x: number, y: number): void => {
      nodes.push({
         val: tree.val,
         x,
         y,
      })
      if (tree.left !== null) {
         const nextLeft = x - 1;
         if (nextLeft < leftExtent) {
            leftExtent = nextLeft;
            verticalTraversal.push([]);
         }
         getNodes(tree.left, nextLeft, y + 1);
      }
      if (tree.right !== null) {
         const nextRight = x + 1;
         if (nextRight > rightExtent) {
            rightExtent = nextRight;
            verticalTraversal.push([]);
         }
         getNodes(tree.right, nextRight, y + 1);
      }
   }

   if (tree === null)
      return [];
   const verticalTraversal: number[][] = [[]];
   const nodes: Node[] = [];
   let leftExtent = 0;
   let rightExtent = 0;
   getNodes(tree, 0, 0);
   const sortedNodes = nodes.sort((nodeA, nodeB) => {
      if (nodeA.x > nodeB.x)
         return 1;
      if (nodeA.x < nodeB.x)
         return -1;
      if (nodeA.y > nodeB.y)
         return 1;
      if (nodeA.y < nodeB.y)
         return -1;
      return 0;
   })
   sortedNodes.forEach(node => verticalTraversal[node.x - leftExtent].push(node.val));
   return verticalTraversal;
}