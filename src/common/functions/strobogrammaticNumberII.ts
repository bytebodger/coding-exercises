/*
   Strobogrammatic Number II
   Tags: Array, String, Recursion
   Given an integer n, return all the strobogrammatic numbers that are of length n. You may return the
   answer in any order.

   A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

   Example 1:
   Input: n = 2
   Output: ["11","69","88","96"]

   Example 2:
   Input: n = 1
   Output: ["0","1","8"]

   Constraints:
   1 <= n <= 14
 */

export const findStrobogrammatic = (value: number): string[] => {
   const fillMiddle = (value: number): Array<Array<string | null>> => {
      const midpoint = Math.ceil(value / 2 - 1);
      const fillQueue: Array<Array<string | null>> = [];
      for (const middle of middles) {
         const element: Array<string | null> = Array(value).fill(null);
         element[midpoint] = middle;
         fillQueue.push(element);
      }
      return fillQueue;
   }

   const fillSides = (queue: Array<Array<string | null>>): Array<Array<string | null>> => {
      const leftIndex = queue[0].indexOf(null);
      const rightIndex = queue[0].length - 1 - leftIndex;
      const fillQueue: Array<Array<string | null>> = [];
      queue.forEach(element => {
         for (const [value, flipped] of Object.entries(possibles)) {
            const clone = [...element];
            clone[leftIndex] = value;
            clone[rightIndex] = flipped;
            if (clone[0] !== '0')
               fillQueue.push(clone);
         }
      })
      return fillQueue;
   }

   const middles: string[] = ['0', '1', '8'];
   const possibles: Record<string, string> = { 0: '0', 1: '1', 8: '8', 6: '9', 9: '6' };
   if (value === 0)
      return [];
   if (value === 1)
      return middles;
   let queue: Array<Array<string | null>>;
   if (value % 2 === 1)
      queue = fillMiddle(value);
   else
      queue = Array(1).fill(Array(value).fill(null));
   while (queue[0].includes(null)) {
      queue = fillSides(queue);
   }
   const final: string[] = [];
   queue.forEach((element) => final.push(element.join('')));
   return final;
}