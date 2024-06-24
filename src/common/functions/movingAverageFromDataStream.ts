/*
   Moving Average from Data Stream
   Tags: Array, Design, Queue, Data Stream
   Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

   Implement the MovingAverage class:

   MovingAverage(int size) Initializes the object with the size of the window size.
   double next(int val) Returns the moving average of the last size values of the stream.

   Example 1:
   Input
   ["MovingAverage", "next", "next", "next", "next"]
   [[3], [1], [10], [3], [5]]
   Output
   [null, 1.0, 5.5, 4.66667, 6.0]

   Explanation
   MovingAverage movingAverage = new MovingAverage(3);
   movingAverage.next(1); // return 1.0 = 1 / 1
   movingAverage.next(10); // return 5.5 = (1 + 10) / 2
   movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
   movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3

   Constraints:
   1 <= size <= 1000
   -10^5 <= val <= 10^5
   At most 104 calls will be made to next.

   Solution:
   To ensure best performance we need to track not just size, but also a runningTotal (number) and an array of values (number[]).
   Whenever a new value is submitted
      1. Add the new value to runningTotal.
      2. Push the new value to the end of the values array.
      3. If the values array size has exceeded size
         1. shift() the oldest value off the beginning of the values array.
         2. subtract that value from runningTotal.
      4. return total / values.length.
 */

export class MovingAverage {
   size: number;
   total: number = 0;
   values: number[] = [];

   constructor (size: number) {
      this.size = size;
   }

   next (value: number): number {
      this.total += value;
      this.values.push(value);
      if (this.values.length > this.size) {
         const oldestValue = this.values.shift();
         if (oldestValue)
            this.total -= oldestValue;
      }
      return this.total / this.values.length;
   }
}