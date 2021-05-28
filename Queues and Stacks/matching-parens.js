/*
I like parentheticals (a lot).

"Sometimes (when I nest them (my parentheticals) too much 
(like this (and this))) they get confusing."

Write a function that, given a sentence like the one above, 
along with the position of an opening parenthesis, finds the 
corresponding closing parenthesis.

Example: if the example string above is input with the number 
10 (position of the first parenthesis), the output should be 
79 (position of the last parenthesis).
*/

// O(n) time and O(n) space using a stack
// function getClosingParen(sentence, openingParenIndex) {

//   // Find the position of the matching closing parenthesis

//   /* loop through the string
//       when find a ( push to stack
//       when find a ) pop off the stack
//       when stack is empty then return the index its at
//   */

//   const parentStack = [];

//   for (let i = openingParenIndex; i < sentence.length; i++){
//     const letter = sentence[i];
//     if (letter === '('){
//       parentStack.push(letter);
//     } else if (letter === ')'){
//       parentStack.pop();
//     }
//     if (parentStack.length === 0){
//       return i;
//     }
//   }

//   throw new Error('The parenthesis is not ballanced!');
// }

/* O(n) time and O(1) space using iterative approach and  since only 
  care about paranthesis we can store the the number of items that 
  the stack would be holding.
*/
function getClosingParen(sentence, openingParenIndex) {

    // Find the position of the matching closing parenthesis

    let openNestedParens = 0;

    for (let position = openingParenIndex + 1; position < sentence.length; position++) {
        const char = sentence[position];

        if (char === '(') {
            openNestedParens += 1;
        } else if (char === ')') {
            if (openNestedParens === 0) {
                return position;
            }
            openNestedParens -= 1;
        }
    }

    throw new Error('No closing parenthesis :(');
}

















// Tests

let desc = 'all openers then closers';
let actual = getClosingParen('((((()))))', 2);
let expected = 7;
assertEqual(actual, expected, desc);

desc = 'mixed openers and closers';
actual = getClosingParen('()()((()()))', 5);
expected = 10;
assertEqual(actual, expected, desc);

desc = 'no matching closer';
const noCloser = () => (getClosingParen('()(()', 2));
assertThrowsError(noCloser, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
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