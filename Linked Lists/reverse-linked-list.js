/*
Write a function for reversing a linked list. Do it in place. 

Your function will have one input: the head of the list.

Your function should return the new head of the list.

Here's a sample linked list node class:

  class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
*/

class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
/*
  In place reversal of linked list
  
  O(n) time nad O(1) space.
*/
function reverse(headOfList) {

    // Reverse the linked list in place

    let currentNode = headOfList;
    let previousNode = null;
    let nextNode = null;

    // Until we have 'fallen off' the end of the list
    while (currentNode) {

        // Copy a pointer to the next element
        // before we overwrite currentNode.next
        nextNode = currentNode.next;

        // Reverse the 'next' pointer
        currentNode.next = previousNode;

        // Step forward in the list
        previousNode = currentNode;
        currentNode = nextNode;
    }

    // while (previousNode){
    //   console.log(previousNode.value);
    //   previousNode = previousNode.next;
    // }

    // new head
    return previousNode;
}


















// Tests

let desc = 'short linked list';
let nodes = valuesToLinkedListNodes([1, 2]);
let reversedList = reverse(nodes[0]);
assertEquals(isListReversed(reversedList, nodes), true, desc);

desc = 'long linked list';
nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5, 6]);
reversedList = reverse(nodes[0]);
assertEquals(isListReversed(reversedList, nodes), true, desc);

desc = 'one element linked list';
const node = new LinkedListNode(1);
reversedList = reverse(node);
assertEquals(node.value === reversedList.value && node.next === reversedList.next, true, desc);

desc = 'empty linked list';
reversedList = reverse(null);
assertEquals(reversedList, null, desc);

function valuesToLinkedListNodes(values) {
    const nodes = [];
    for (let i = 0; i < values.length; i++) {
        const node = new LinkedListNode(values[i]);
        if (i > 0) {
            nodes[i - 1].next = node;
        }
        nodes.push(node);
    }
    return nodes;
}

function isListReversed(list, originalNodes) {
    let i = originalNodes.length - 1;
    while (list != null && i >= 0) {
        if (originalNodes[i] != list) {
            return false;
        }
        list = list.next;
        i--;
    }
    return list == null;
}

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}