/*
   Course Schedule
   Tags: Depth-First Search, Breadth-First Search, Graph, Topological Sort
   There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are
   given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi
   first if you want to take course ai.

   For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
   Return true if you can finish all courses. Otherwise, return false.

   Example 1:
   Input: numCourses = 2, prerequisites = [[1,0]]
   Output: true
   Explanation: There are a total of 2 courses to take.
   To take course 1 you should have finished course 0. So it is possible.

   Example 2:
   Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
   Output: false
   Explanation: There are a total of 2 courses to take.
   To take course 1 you should have finished course 0, and to take course 0 you should also have finished
   course 1. So it is impossible.

   Constraints:
   1 <= numCourses <= 2000
   0 <= prerequisites.length <= 5000
   prerequisites[i].length == 2
   0 <= ai, bi < numCourses
   All the pairs prerequisites[i] are unique.
 */

export const canFinish = (totalCourses: number, prerequisites: number[][]): boolean => {
   // This canBeCompleted function recursively checks if it's possible to complete a course considering its prerequisites.
   const canBeCompleted = (
      course: number,
      prerequisitesMap: Map<number, Set<number>>,
      skipCourses: Set<number>,
      covered = new Set(),
   ): boolean => {
      // If the course is in the skipCourses set, it means it can be skipped, so return true.
      if (skipCourses.has(course))
         return true;
      // If the course is already covered in the current recursion path, it indicates a cycle, so return false.
      if (covered.has(course))
         return false;
      // Mark the current course as covered to avoid revisiting it in the current path.
      covered.add(course);
      // Get the prerequisites of the current course from the prerequisitesMap.
      const prerequisitesEntries = prerequisitesMap.get(course) ? [...(prerequisitesMap.get(course) ?? [])] : [];
      // Iterate through each prerequisite and recursively check if it can be completed.
      for (let i = 0; i < prerequisitesEntries.length; i++) {
         if (!canBeCompleted(prerequisitesEntries[i], prerequisitesMap, skipCourses, covered))
            return false; // If any prerequisite cannot be completed, return false.
      }
      // Remove the current course from the covered set since it's being explored further.
      covered.delete(course);
      // Add the current course to the skipCourses set since it can be completed.
      skipCourses.add(course);
      return true; // Return true indicating the course and its prerequisites can be completed.
   }

   const skipCourses = new Set<number>(); // Set to keep track of courses that can be skipped.
   const prerequisitesMap = new Map(); // Map to store prerequisites of each course.
   // Building the prerequisitesMap.
   for (let i = 0; i < prerequisites.length; i++) {
      if (!prerequisitesMap.get(prerequisites[i][0]))
         prerequisitesMap.set(prerequisites[i][0], new Set());
      prerequisitesMap.get(prerequisites[i][0]).add(prerequisites[i][1]);
   }
   // Iterate through each course and check if it can be completed.
   for (let i = 0; i < totalCourses; i++) {
      if (!canBeCompleted(i, prerequisitesMap, skipCourses))
         return false; // If any course cannot be completed, return false.
   }
   return true; // If all courses can be completed, return true.
}