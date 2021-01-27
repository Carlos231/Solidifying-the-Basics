/*
Find a duplicate, Space Edition™.

We have an array of integers, where:

The integers are in the range 1..n1..n
The array has a length of n+1n+1
It follows that our array has at least one integer which appears at least twice. But it may have several duplicates, and each duplicate may appear more than twice.

Write a function which finds an integer that appears more than once in our array. (If there are multiple duplicates, you only need to find one of them.)

We're going to run this function on our new, super-hip MacBook Pro With Retina Display™. Thing is, the damn thing came with the RAM soldered right to the motherboard, so we can't upgrade our RAM. So we need to optimize for space!


    Different approaches: 
    1) Using a set to see if there is a duplicate (O(n) time and O(n) space)
    2) Brute force solution (O(n^2) - time and O(1) - space) - Taking each number in the range 1..n1..n and, for each, walking through the array to see if it appears twice.
    3) Sorting the array getting O(n log n) time but would require a O(n) space
    4) Do 3 but sort in place to get O(1) time
        instead of cutting the array in half we cut the range of possible answers in half

*/

function findRepeat(numbers) {

    // Find a number that appears more than once
    /*
        O(n log n) - time
        O(1) - space
    */

    let floor = 1;
    let ceiling = numbers.length - 1;

    while (floor < ceiling) {

        // Divide our range 1..n into an upper range and lower range
        // (such that they don't overlap)
        // lower range is floor..midpoint
        // upper range is midpoint+1..ceiling
        const midpoint = Math.floor(floor + ((ceiling - floor) / 2));
        const lowerRangeFloor = floor;
        const lowerRangeCeiling = midpoint;
        const upperRangeFloor = midpoint + 1;
        const upperRangeCeiling = ceiling;

        const distinctPossibleIntegersInLowerRange = lowerRangeCeiling - lowerRangeFloor + 1;

        // Count number of items in lower range
        let itemsInLowerRange = 0;
        numbers.forEach(item => {

            // Is it in the lower range?
            if (item >= lowerRangeFloor && item <= lowerRangeCeiling) {
                itemsInLowerRange += 1;
            }
        });

        if (itemsInLowerRange > distinctPossibleIntegersInLowerRange) {

            // There must be a duplicate in the lower range
            // so use the same approach iteratively on that range
            floor = lowerRangeFloor;
            ceiling = lowerRangeCeiling;
        } else {

            // There must be a duplicate in the upper range
            // so use the same approach iteratively on that range
            floor = upperRangeFloor;
            ceiling = upperRangeCeiling;
        }
    }

    // Floor and ceiling have converged
    // We found a number that repeats!
    return floor;


    return 0;
}


















// Tests

let desc = 'just the repeated number';
let actual = findRepeat([1, 1]);
let expected = 1;
assertEqual(actual, expected, desc);

desc = 'short array';
actual = findRepeat([1, 2, 3, 2]);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'medium array';
actual = findRepeat([1, 2, 5, 5, 5, 5]);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'long array';
actual = findRepeat([4, 1, 4, 8, 3, 2, 7, 6, 5]);
expected = 4;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}