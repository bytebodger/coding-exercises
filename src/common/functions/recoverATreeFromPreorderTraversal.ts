/*
   Recover a Tree From Preorder Traversal
   Tags: String, Tree, Depth-First Search, Binary Tree
   We run a preorder depth-first search (DFS) on the root of a binary tree.

   At each node in this traversal, we output D dashes (where D is the depth of this node), then we output
   the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  The
   depth of the root node is 0.

   If a node has only one child, that child is guaranteed to be the left child.

   Given the output traversal of this traversal, recover the tree and return its root.

   Example 1:
   Input: traversal = "1-2--3--4-5--6--7"
   Output: [1,2,5,3,4,6,7]

   Example 2:
   Input: traversal = "1-2--3---4-5--6---7"
   Output: [1,2,5,3,null,6,null,4,null,7]

   Example 3:
   Input: traversal = "1-401--349---90--88"
   Output: [1,401,null,349,88,90]

   Constraints:
   The number of nodes in the original tree is in the range [1, 1000].
   1 <= Node.val <= 10^9
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

export const recoverFromPreorder = (traversal: string, level: number = 1): TreeNode | null => {
   const nodes: string[] = traversal.split(new RegExp(`(?<=[0-9])-{${level}}(?=[0-9])`, 'g'));
   const node = new TreeNode(Number(nodes.shift()));
   if (nodes[0])
      node.left = recoverFromPreorder(nodes[0], level + 1);
   if (nodes[1])
      node.right = recoverFromPreorder(nodes[1], level + 1);
   return node;
}