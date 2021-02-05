/*
Your quirky boss collects rare, old coins...

They found out you're a programmer and asked you to solve something they've been wondering for a long time.

Write a function that, given:

an amount of money
an array of coin denominations
computes the number of ways to make the amount of money with coins of the available denominations.

Example: for amount=44 (44¢) and denominations=[1,2,3][1,2,3] (11¢, 22¢ and 33¢), your program would output 44—the number of ways to make 44¢ with those denominations:

1¢, 1¢, 1¢, 1¢
1¢, 1¢, 2¢
1¢, 3¢
2¢, 2¢
*/

/* 
We use a bottom-up ↴ algorithm to build up a table waysOfDoingNCents such that waysOfDoingNCents[k] is how many ways we can get to k cents using our denominations. We start with the base case that there's one way to create the amount zero, and progressively add each of our denominations.

The number of new ways we can make a higherAmount when we account for a new coin is simply waysOfDoingNCents[higherAmount - coin], where we know that value already includes combinations involving coin (because we went bottom-up, we know smaller values have already been calculated).

O(n∗m) time and O(n) additional space, where n is the amount of money and m is the number of potential denominations.
*/
function changePossibilities(amount, denominations) {

    // Calculate the number of ways to make change

    // Initialize an array of zeros with indices up to amount
    const waysOfDoingNcents = new Array(amount + 1).fill(0);
    waysOfDoingNcents[0] = 1;

    denominations.forEach(coin => {
        for (let higherAmount = coin; higherAmount <= amount; higherAmount++) {
            const higherAmountRemainder = higherAmount - coin;
            waysOfDoingNcents[higherAmount] += waysOfDoingNcents[higherAmountRemainder];
        }
    });

    return waysOfDoingNcents[amount];
}


















// Tests

let desc = 'sample input';
let actual = changePossibilities(4, [1, 2, 3]);
let expected = 4;
assertEqual(actual, expected, desc);

desc = 'one way to make zero cents';
actual = changePossibilities(0, [1, 2]);
expected = 1;
assertEqual(actual, expected, desc);

desc = 'no ways if no coins';
actual = changePossibilities(1, []);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'big coin value';
actual = changePossibilities(5, [25, 50]);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'big target amount';
actual = changePossibilities(50, [5, 10]);
expected = 6;
assertEqual(actual, expected, desc);

desc = 'change for one dollar';
actual = changePossibilities(100, [1, 5, 10, 25, 50]);
expected = 292;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`)
    }
}