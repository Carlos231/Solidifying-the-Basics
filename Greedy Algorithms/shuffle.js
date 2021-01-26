/*
  Write a function for doing an in-place ↴ shuffle of an array.

The shuffle must be "uniform," meaning each item in the original
array must have the same probability of ending up in each spot in the final array.

Assume that you have a function getRandom(floor, ceiling) for getting a random
integer that is >= floor and <= ceiling.
*/


function getRandom(floor, ceiling) {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function shuffle(array) {

    // Shuffle the input in place

    /*
    "Fisher Yates sguffle algorithm"
      save the value at index
      go through the list 
        get a random index starting from spot in list to the end
        swap these values in their index
    */

    if (array.length <= 1) return;

    for (let i = 0; i < array.length - 1; i++) {

        let randomIndex = getRandom(i, array.length - 1);

        if (randomIndex != i) {
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
    }
}


const sample = [1, 2, 3, 4, 5];
console.log('Initial array: ', sample);
shuffle(sample);
console.log('Shuffled array: ', sample);