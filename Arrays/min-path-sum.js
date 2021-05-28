/**
 * 64. Minimum Path Sum
 * 
 * https://leetcode.com/problems/minimum-path-sum/
 * 
 * Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

    Note: You can only move either down or right at any point in time.
 * 
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    //     get length of graph and length of each row
    //     pre calc the path for first row and col
    //     calc for the rest of the values
    //     return value at end as shortest path value

    // copy the array so original is not changed
    // have to use this way to copy multidimensional arrays
    const gridCopy = JSON.parse(JSON.stringify(grid));

    const n = gridCopy.length;
    const m = gridCopy[0].length;

    //     calculate the path for first col
    for (let i = 1; i < n; i++) {
        gridCopy[i][0] += gridCopy[i - 1][0];
    }

    // calculate the path for first row
    for (let j = 1; j < m; j++) {
        gridCopy[0][j] += gridCopy[0][j - 1];
    }

    //     now have values for first col and row
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            gridCopy[i][j] += Math.min(gridCopy[i - 1][j], gridCopy[i][j - 1]);
        }
    }

    // console.table(grid)

    return gridCopy[n - 1][m - 1];
};

const grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]];

console.log(`Original grid: ${grid} \n Expected 7. \n Got: ${minPathSum(grid)} \n Grid after: ${grid}`)// output 7
