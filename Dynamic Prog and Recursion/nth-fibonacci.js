/*
Write a function fib() that takes an integer nn and returns the nnth Fibonacci ↴ number.

Let's say our Fibonacci series is 0-indexed and starts with 0. So:

    fib(0);  // => 0
    fib(1);  // => 1
    fib(2);  // => 1
    fib(3);  // => 2
    fib(4);  // => 3
...
*/

// O(2^n) time
// function fib(n) {
//     if (n === 0 || n === 1) {
//         return n;
//     }
//     return fib(n - 1) + fib(n - 2);
// }

// Using memoization: O(n) time and O(n) space
// class Fibber {
//     constructor() {
//         this.memo = {};
//     }

//     fib(n) {

//         // Edge case: negative index
//         if (n < 0) {
//             throw new Error('Index was negative. No such thing as a negative index in a series.');
//         }

//         // Base case: 0 or 1
//         else if (n === 0 || n === 1) {
//             return n;
//         }

//         // See if we've already calculated this
//         if (this.memo.hasOwnProperty(n)) {
//             return this.memo[n];
//         }

//         const result = this.fib(n - 1) + this.fib(n - 2);

//         // Memoize
//         this.memo[n] = result;

//         return result;
//     }
// }

// Bottoms up approach 
//  - starting with the 0th Fibonacci number and iteratively computing subsequent numbers until we get to nn.
// O(n) time and O(1) space

// With matrix multiplication can bring the time cost down even further, to O(lg(n))
function fib(n) {

    // Compute the nth Fibonacci number
    // Edge cases:
    if (n < 0) {
        throw new Error('Index was negative. No such thing as a negative index in a series.');
    } else if (n === 0 || n === 1) {
        return n;
    }

    // We'll be building the fibonacci series from the bottom up
    // So we'll need to track the previous 2 numbers at each step
    let prevPrev = 0;  // 0th fibonacci
    let prev = 1;      // 1st fibonacci
    let current;       // Declare current

    for (let i = 1; i < n; i++) {

        // Iteration 1: current = 2nd fibonacci
        // Iteration 2: current = 3rd fibonacci
        // Iteration 3: current = 4th fibonacci
        // To get nth fibonacci ... do n-1 iterations.
        current = prev + prevPrev;
        prevPrev = prev;
        prev = current;
    }

    return current;
}
















// Tests

let desc = 'zeroth fibonacci';
let actual = fib(0);
let expected = 0;
assertEqual(actual, expected, desc);

desc = 'first fibonacci';
actual = fib(1);
expected = 1;
assertEqual(actual, expected, desc);

desc = 'second fibonacci';
actual = fib(2);
expected = 1;
assertEqual(actual, expected, desc);

desc = 'third fibonacci';
actual = fib(3);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'fifth fibonacci';
actual = fib(5);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'tenth fibonacci';
actual = fib(10);
expected = 55;
assertEqual(actual, expected, desc);

desc = 'negative fibonacci';
const negativeFib = () => (fib(-1));
assertThrowsError(negativeFib, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`)
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