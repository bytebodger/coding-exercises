/*
   Complete Binary Tree Inserter
   Tags: Tree, Breadth-First Search, Design, Binary Tree
   A complete binary tree is a binary tree in which every level, except possibly the last, is completely
   filled, and all nodes are as far left as possible.

   Design an algorithm to insert a new node to a complete binary tree keeping it complete after the insertion.

   Implement the CBTInserter class:

   CBTInserter(TreeNode root) Initializes the data structure with the root of the complete binary tree.
   int insert(int v) Inserts a TreeNode into the tree with value Node.val == val so that the tree remains
   complete, and returns the value of the parent of the inserted TreeNode.
   TreeNode get_root() Returns the root node of the tree.

   Example 1:
   Input
   ["CBTInserter", "insert", "insert", "get_root"]
   [[[1, 2]], [3], [4], []]
   Output
   [null, 1, 2, [1, 2, 3, 4]]
   Explanation
   CBTInserter cBTInserter = new CBTInserter([1, 2]);
   cBTInserter.insert(3);  // return 1
   cBTInserter.insert(4);  // return 2
   cBTInserter.get_root(); // return [1, 2, 3, 4]

   Constraints:
   The number of nodes in the tree will be in the range [1, 1000].
   0 <= Node.val <= 5000
   root is a complete binary tree.
   0 <= val <= 5000
   At most 10^4 calls will be made to insert and get_root.
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

export class CBTInserter {
   private readonly root: TreeNode | null = null;

   constructor (root: TreeNode | null) {
      this.root = root;
   }

   insert = (value: number): number => {
      const queue = [this.root];
      while (queue.length) {
         const node = queue.shift();
         if (!node)
            continue;
         if (node.left) {
            queue.push(node.left);
         } else {
            node.left = new TreeNode(value);
            return node.val;
         }
         if (node.right) {
            queue.push(node.right);
         } else {
            node.right = new TreeNode(value);
            return node.val;
         }
      }
      return value;
   }

   get_root = (): TreeNode | null => this.root;
}