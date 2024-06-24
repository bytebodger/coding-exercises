/*
   Dot Product of Two Sparse Vectors
   Tags: Array, Hash Table, Two Pointers, Design
   Given two sparse vectors, compute their dot product.

   Implement class SparseVector:

   SparseVector(nums) Initializes the object with the vector nums
   dotProduct(vec) Compute the dot product between the instance of SparseVector and vec
   A sparse vector is a vector that has mostly zero values, you should store the sparse vector efficiently and compute the
   dot product between two SparseVector.

   Follow up: What if only one of the vectors is sparse?

   Example 1:
   Input: nums1 = [1,0,0,2,3], nums2 = [0,3,0,4,0]
   Output: 8
   Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
   v1.dotProduct(v2) = 1*0 + 0*3 + 0*0 + 2*4 + 3*0 = 8

   Example 2:
   Input: nums1 = [0,1,0,0,0], nums2 = [0,0,0,0,2]
   Output: 0
   Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
   v1.dotProduct(v2) = 0*0 + 1*0 + 0*0 + 0*0 + 0*2 = 0

   Example 3:
   Input: nums1 = [0,1,0,0,2,0,0], nums2 = [1,0,0,0,3,0,4]
   Output: 6

   Constraints:
   n == nums1.length == nums2.length
   1 <= n <= 10^5
   0 <= nums1[i], nums2[i] <= 100

   Solution:
   Create an interface for a PopulatedValue object that stores the index and the value for all non-zero values.
   Set a class member of populatedValues that holds an array of PopulatedValue.
   In the constructor, build the populatedValue array from the values that were passed in.
   In the dotProduct method, loop through all of the populatedValues from this object.
      For each one, search for a value at the corresponding index in the passed-in vector.
      If a corresponding value is found, multiply them and add it to the dotProduct output.
 */

interface PopulatedValue {
   index: number,
   value: number,
}

export class SparseVector {
   populatedValues: PopulatedValue[];
   values: number[];

   constructor (values: number[]) {
      this.values = values;
      const populatedValues: PopulatedValue[] = [];
      values.forEach((value, index) => {
         if (value !== 0)
            populatedValues.push({
               index,
               value,
            })
      })
      this.populatedValues = populatedValues;
   }

   dotProduct (vector: SparseVector): number {
      let product = 0;
      this.populatedValues.forEach(populatedValue => {
         const vectorPopulatedValue = vector.populatedValues.find(vectorValue => vectorValue.index === populatedValue.index);
         if (!vectorPopulatedValue)
            return;
         product += populatedValue.value * vectorPopulatedValue.value;
      })
      return product;
   }
}