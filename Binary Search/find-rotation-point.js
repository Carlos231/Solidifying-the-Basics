/*
I want to learn some big words so people think I'm smart.

I opened up a dictionary to a page in the middle and started flipping
through, looking for words I didn't know. I put each word I didn't know
at increasing indices in a huge array I created in memory. When I reached
the end of the dictionary, I started from the beginning and did the same
thing until I reached the page I started at.

Now I have an array of words that are mostly alphabetical, except they
start somewhere in the middle of the alphabet, reach the end, and then
start from the beginning of the alphabet. In other words, this is an 
alphabetically ordered array that has been "rotated." For example:

  const words = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote',  // <-- rotates here!
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage',
];

JavaScript
Write a function for finding the index of the "rotation point," which is 
where I started working from the beginning of the dictionary. This array 
is huge (there are lots of words I don't know) so we want to be efficient here.

To keep things simple, you can assume all words are lowercase.
*/

const { assert } = require("console");

function findRotationPoint(words) {

    // Find the rotation point in the vector
    /*
        O(log(n)) - time
        O(1) - space

      save floorIndex, ceilingIndex, firstWord
      look while floorIndex < celingIndex
        determine the guessIndex in the middle position
        check if guess >= firstword then value is to the right
          floorIndex = guess
         else guess < firstword then value is to the left
          ceilingIndex = guess
        check if floorIndex + 1 is equal to the ceiling value
          break
      return ceilingIndex
    */
    let floorIndex = 0;
    let ceilingIndex = words.length - 1;

    const firstWord = words[0];



    while (floorIndex < ceilingIndex) {
        const middleIndex = Math.floor(floorIndex + ((ceilingIndex - floorIndex) / 2));

        // if guess comes after first word or is the first road
        console.log(words[middleIndex] >= middleIndex, middleIndex);
        if (words[middleIndex] >= firstWord) {
            // move floor to right to remoce values to the left
            floorIndex = middleIndex;
        } else {
            // move ceiling to left to remove values to the right
            ceilingIndex = middleIndex;
        }

        // if floor and ceiling have converged
        if (floorIndex + 1 === ceilingIndex) {
            // found the flip
            break;
        }
    }

    return ceilingIndex;
}


















// Tests

let desc = 'small array';
let actual = findRotationPoint(['cape', 'cake']);
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'medium array';
actual = findRotationPoint(['grape', 'orange', 'plum', 'radish', 'apple']);
expected = 4;
assertEquals(actual, expected, desc);

desc = 'large array';
actual = findRotationPoint(['ptolemaic', 'retrograde', 'supplant',
    'undulate', 'xenoepist', 'asymptote',
    'babka', 'banoffee', 'engender',
    'karpatka', 'othellolagkage']);
expected = 5;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}