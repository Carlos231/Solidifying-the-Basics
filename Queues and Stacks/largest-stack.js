/*
Implement a queue ↴ with 2 stacks. ↴ Your queue should have an enqueue 
and a dequeue method and it should be "first in first out" (FIFO).

Optimize for the time cost of mm calls on your queue. These can be any 
mix of enqueue and dequeue calls.

Assume you already have a stack implementation and it gives O(1)
time push and pop.
*/

//  Implement the enqueue and dequeue methods

class QueueTwoStacks {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }
    enqueue(item) {
        // add to the front (top on stack)
        this.inStack.push(item);
    }

    dequeue() {
        // remove from the back (top on stack)
        if (this.outStack.length === 0) {

            // Move items from inStack to outStack, reversing order
            while (this.inStack.length > 0) {
                const item = this.inStack.pop();
                this.outStack.push(item);
            }

            // If outStack is still empty, raise an error
            if (this.outStack.length === 0) {
                throw new Error("Can't dequeue from empty queue!");
            }
        }
        return this.outStack.pop();
    }
}


















// Tests
const q = new QueueTwoStacks();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

let desc = 'dequeue #1';
let actual = q.dequeue();
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'dequeue #2';
actual = q.dequeue();
expected = 2;
assertEquals(actual, expected, desc);

q.enqueue(4);

desc = 'dequeue #3';
actual = q.dequeue();
expected = 3;
assertEquals(actual, expected, desc);

desc = 'dequeue #4';
actual = q.dequeue();
expected = 4;
assertEquals(actual, expected, desc);

desc = 'dequeue from empty queue';
const emptyDequeue = () => q.dequeue();
assertThrowsError(emptyDequeue, desc);

function assertEquals(a, b, desc) {
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