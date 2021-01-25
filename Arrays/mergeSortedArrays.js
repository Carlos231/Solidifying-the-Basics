/*
In order to win the prize for most cookies sold, my friend Alice and I are going to merge our Girl Scout Cookies orders and enter as one unit.

Each order is represented by an "order id" (an integer).

We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.

For example:

  const myArray = [3, 4, 6, 10, 11, 15];
const alicesArray = [1, 5, 8, 12, 14, 19];

console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
*/

function mergeArrays(myArray, alicesArray) {
    // Combine the sorted arrays into one large sorted array O(n) time and O(n) space
    /*
      save current index for both arrays and a counter
      loop for distance of both arrays
        check to see if there are any more values to merge over in either array
        check if myarray value is less than the alice value
          add that to the merged array
          increment the index for myArray
        else alices value is smaller
          add alice to merged
          increment to merged array
    */

    const mergedArrays = [];

    let idx = 0;
    let jdx = 0;
    let counter = 0;

    while (counter < (myArray.length + alicesArray.length)) {
        const isIdxExhausted = (idx >= myArray.length);
        const isJdxExhausted = (jdx >= alicesArray.length);

        // My array must not be exhausted, and EITHER:
        // 1) Alice's array IS exhausted, or
        // 2) The current element in my array is less
        //    than the current element in Alice's array
        if (!isIdxExhausted && (isJdxExhausted || (myArray[idx] < alicesArray[jdx]))) {
            mergedArrays.push(myArray[idx]);
            idx++;
        } else {
            mergedArrays.push(alicesArray[jdx]);
            jdx++;
        }
        counter++;
    }
    return mergedArrays;
}

















// Tests

let desc = 'both arrays are empty';
let actual = mergeArrays([], []);
let expected = [];
assertDeepEqual(actual, expected, desc);

desc = 'first array is empty';
actual = mergeArrays([], [1, 2, 3]);
expected = [1, 2, 3];
assertDeepEqual(actual, expected, desc);

desc = 'second array is empty';
actual = mergeArrays([5, 6, 7], []);
expected = [5, 6, 7];
assertDeepEqual(actual, expected, desc);

desc = 'both arrays have some numbers';
actual = mergeArrays([2, 4, 6], [1, 3, 7]);
expected = [1, 2, 3, 4, 6, 7];
assertDeepEqual(actual, expected, desc);

desc = 'arrays are different lengths';
actual = mergeArrays([2, 4, 6, 8], [1, 7]);
expected = [1, 2, 4, 6, 7, 8];
assertDeepEqual(actual, expected, desc);

function assertDeepEqual(a, b, desc) {
    const aStr = JSON.stringify(a);
    const bStr = JSON.stringify(b);
    if (aStr !== bStr) {
        console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
    } else {
        console.log(`${desc} ... PASS`);
    }
}