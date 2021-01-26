/*
You have an array of integers, and for each index you want to 
find the product of every integer except the integer at that index.

Write a function getProductsOfAllIntsExceptAtIndex() that takes an 
array of integers and returns an array of the products.

For example, given:

  [1, 7, 3, 4]

JavaScript
your function would return:

  [84, 12, 28, 21]

JavaScript
by calculating:

  [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]

JavaScript
Here's the catch: You can't use division in your solution!
*/

function getProductsOfAllIntsExceptAtIndex(intArray) {

    // Make a list of the products

    /*
    O(n) time
    O(n) space
    make sure the there are more than two values in the array
    set current product
    set a product array
    - will save the first value to itself then set the next value 
        to the product of the values before it
    go through array from begnning
        set product array [i] to currrent product 
        set current product to current product * current value
    - now do it in reverse order so that it calculates all of the 
        values to the right
    go through array from the end
        set product array [i] to currrent product * product array[i]
        set current product to current product * current value

    return the product array

    Ex: 
        [ (8), 2, 4, 3, 1, 5 ]              - left
        [ (1), [8], 16, 64, 192, 192 ]      - right
        [ 120, 480, 240, 320, 960, 192 ]    - product
    */
    if (intArray.length < 2) {
        throw new Error("Less than two numbers in the array!");
    }

    const product = [];

    // For each integer, we find the product of all the integers
    // before it, storing the total product so far each time
    let currentProduct = 1;
    for (let i = 0; i < intArray.length; i++) {
        product[i] = currentProduct;
        currentProduct *= intArray[i];
    }

    // For each integer, we find the product of all the integers
    // after it. since each index in products already has the
    // product of all the integers before it, now we're storing
    // the total product of all other integers
    currentProduct = 1;
    for (i = intArray.length - 1; i >= 0; i--) {
        product[i] *= currentProduct;
        currentProduct *= intArray[i];
    }

    return product;
}


















// Tests

let desc = 'short array';
let actual = getProductsOfAllIntsExceptAtIndex([1, 2, 3]);
let expected = [6, 3, 2];
assertArrayEquals(actual, expected, desc);

desc = 'longer array',
    actual = getProductsOfAllIntsExceptAtIndex([8, 2, 4, 3, 1, 5]);
expected = [120, 480, 240, 320, 960, 192];
assertArrayEquals(actual, expected, desc);

desc = 'array has one zero',
    actual = getProductsOfAllIntsExceptAtIndex([6, 2, 0, 3]);
expected = [0, 0, 36, 0];
assertArrayEquals(actual, expected, desc);

desc = 'array has two zeros';
actual = getProductsOfAllIntsExceptAtIndex([4, 0, 9, 1, 0]);
expected = [0, 0, 0, 0, 0];
assertArrayEquals(actual, expected, desc);

desc = 'one negative number';
actual = getProductsOfAllIntsExceptAtIndex([-3, 8, 4]);
expected = [32, -12, -24];
assertArrayEquals(actual, expected, desc);

desc = 'all negative numbers';
actual = getProductsOfAllIntsExceptAtIndex([-7, -1, -4, -2]);
expected = [-8, -56, -14, -28];
assertArrayEquals(actual, expected, desc);

desc = 'error with empty array';
const emptyArray = () => (getProductsOfAllIntsExceptAtIndex([]));
assertThrowsError(emptyArray, desc);

desc = 'error with one number';
const oneNumber = () => (getProductsOfAllIntsExceptAtIndex([1]));
assertThrowsError(oneNumber, desc);

function assertArrayEquals(a, b, desc) {
    const arrayA = JSON.stringify(a);
    const arrayB = JSON.stringify(b);
    if (arrayA !== arrayB) {
        console.log(`${desc} ... FAIL: ${arrayA} != ${arrayB}`)
    } else {
        console.log(`${desc} ... PASS`);
    }
}

function assertThrowsError(func, desc) {
    try {
        func();
        console.log(`${desc} ... FAIL`);
    } catch (e) {
        console.log(`${desc} ... PASS`);
    }
}