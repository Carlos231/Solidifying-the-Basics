/*
Write a function that takes an array of characters and reverses the letters in place.
*/
function reverse(arrayOfChars) {

    // Reverse the input array of characters in place
    // loop through the array while left < right
    // have a pointer to beginning and end
    // swap those values using array destructuring

    let left = 0;
    let right = arrayOfChars.length - 1;

    while (left < right) {
        [arrayOfChars[left], arrayOfChars[right]] = [arrayOfChars[right], arrayOfChars[left]];
        left++;
        right--;
    }

}


















// Tests

let desc = 'empty string';
let input = ''.split('');
reverse(input);
let actual = input.join('');
let expected = '';
assertEqual(actual, expected, desc);

desc = 'single character string';
input = 'A'.split('');
reverse(input);
actual = input.join('');
expected = 'A';
assertEqual(actual, expected, desc);

desc = 'longer string';
input = 'ABCDE'.split('');
reverse(input);
actual = input.join('');
expected = 'EDCBA';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}