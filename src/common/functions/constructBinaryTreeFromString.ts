/*
   Construct Binary Tree from String
   Tags: String, Stack, Tree, Depth-First Search, Binary Tree
   You need to construct a binary tree from a string consisting of parenthesis and integers.

   The whole input represents a binary tree. It contains an integer followed by zero, one or two pairs
   of parenthesis. The integer represents the root's value and a pair of parenthesis contains a child
   binary tree with the same structure.

   You always start to construct the left child node of the parent first if it exists.

   Example 1:
   Input: s = "4(2(3)(1))(6(5))"
   Output: [4,2,6,3,1,5]

   Example 2:
   Input: s = "4(2(3)(1))(6(5)(7))"
   Output: [4,2,6,3,1,5,7]

   Example 3:
   Input: s = "-4(2(3)(1))(6(5)(7))"
   Output: [-4,2,6,3,1,5,7]

   Constraints:
   0 <= s.length <= 3 * 10^4
   s consists of digits, '(', ')', and '-' only.

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

export const str2tree = (text: string): TreeNode | null => {
   if (text === null || text.length === 0)
      return null;
   const stack: TreeNode[] = [];
   let i: number = 0;
   let root: TreeNode | null = null;
   while (i < text.length) {
      const character: string = text.charAt(i);
      if (character === '(') {
         // Get the current root before setting it'text children
         root = stack[stack.length - 1];
         i++;
         continue;
      }
      if (character === ')') {
         // When we encounter a closing brace we are done with the
         // node at the top of the stack
         stack.pop();
         i++;
         continue;
      }
      // Get the value of the new node
      const start: number = i;
      let end: number = i + 1;
      while (/[0-9|-]/.test(text.charAt(end))) {
         end++;
      }
      i = end;
      const node: TreeNode = new TreeNode(parseInt(text.substring(start, end)));
      // If the root has been processed then we can set the children
      if (root !== null) {
         // Set the left value of the root then set the right
         if (root.left === null)
            root.left = node;
         else
            root.right = node;
      }
      stack.push(node);
   }
   // Return the root at the top of the stack
   return stack.pop() ?? null;
}