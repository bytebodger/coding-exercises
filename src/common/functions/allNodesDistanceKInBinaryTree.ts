/*
   All Nodes Distance K in Binary Tree
   Tags: Hash Table, Tree, Depth-First Search, Breadth-First Search, Binary Tree
   Given the root of a binary tree, the value of a target node target, and an integer k, return an array
   of the values of all nodes that have a distance k from the target node.

   You can return the answer in any order.

   Example 1:
   Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
   Output: [7,4,1]
   Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.

   Example 2:
   Input: root = [1], target = 1, k = 3
   Output: []

   Constraints:
   The number of nodes in the tree is in the range [1, 500].
   0 <= Node.val <= 500
   All the values Node.val are unique.
   target is the value of one of the nodes in the tree.
   0 <= k <= 1000

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

export const distanceK = (root: TreeNode | null, target: TreeNode | null, distance: number): number[] => {
   // get child nodes
   const getChildNodes = (root: TreeNode | null, level: number) => {
      if (!root)
         return;
      if (level === 0) {
         result.push(root.val);
         return;
      }
      getChildNodes(root.left, level - 1);
      getChildNodes(root.right, level - 1);
   }

   // get path from source to target
   const getPath = (root: TreeNode | null) => {
      if (!root)
         return;
      if (root === target) {
         path.push(root);
         return true;
      }
      const left = getPath(root.left);
      const right = getPath(root.right);
      // @ts-expect-error
      if (right || left) {
         path.push(root);
         return true;
      }
      return false;
   }

   const path: TreeNode[] = []; // to store path from root to target node.
   getPath(root); // to get path from root to target.
   const result: number[] = [];
   if (!path.length)
      return result;
   getChildNodes(path[0], distance);
   for (let i = 1; i < path.length; i++) {
      if (distance - i === 0)
         result.push(path[i].val);
      if (path[i].left === path[i - 1])
         getChildNodes(path[i].right, distance - i - 1);
      else
         getChildNodes(path[i].left, distance - i - 1);
   }
   return result;
}