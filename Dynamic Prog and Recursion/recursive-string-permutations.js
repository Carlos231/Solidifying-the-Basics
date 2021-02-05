/* 
Write a recursive function for generating all permutations of an input string. Return them as a set.

Don't worry about time or space complexity—if we wanted efficiency we'd write an iterative version.

To start, assume every character in the input string is unique.

Your function can have loops—it just needs to also be recursive.
*/

function getPermutations(string) {

    // Generate all permutations of the input string

    // base case
    if (string.length <= 1) {
        return new Set([string]);
    }

    const stringMinusLast = string.slice(0, -1);
    const lastLetter = string[string.length - 1];

    // Recursive call: get all possible permutations for all chars except last
    const permutationsExceptLast = getPermutations(stringMinusLast);

    const permutations = new Set();

    // Put the last char in all possible positions for each of the above permutations
    permutationsExceptLast.forEach((permutationsExceptLast) => {
        for (let i = 0; i <= permutationsExceptLast.length; i++) {
            permutations.add(permutationsExceptLast.slice(0, i) + lastLetter + permutationsExceptLast.slice(i));
        }
    });

    return permutations;
}


















// Tests

let desc = 'empty string';
let input = '';
let actual = getPermutations(input);
let expected = new Set(['']);
assert(isSetsEqual(actual, expected), desc);

desc = 'one character string';
input = 'a';
actual = getPermutations(input);
expected = new Set(['a']);
assert(isSetsEqual(actual, expected), desc);

desc = 'two character string';
input = 'ab';
actual = getPermutations(input);
expected = new Set(['ab', 'ba']);
assert(isSetsEqual(actual, expected), desc);

desc = 'three character string';
input = 'abc';
actual = getPermutations(input);
expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
assert(isSetsEqual(actual, expected), desc);

function isSetsEqual(as, bs) {
    if (as.size !== bs.size) {
        return false;
    }
    for (let a of as) {
        if (!bs.has(a)) return false;
    }
    return true;
}

function assert(condition, desc) {
    if (condition) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL`);
    }
}