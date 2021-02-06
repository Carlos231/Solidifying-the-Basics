/*
You have a linked list ↴ and want to find the kkth to last node.

Write a function kthToLastNode() that takes an integer kk and the 
headNode of a singly-linked list, and returns the kkth to last 
node in the list.

For example:

  class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const a = new LinkedListNode('Angel Food');
const b = new LinkedListNode('Bundt');
const c = new LinkedListNode('Cheese');
const d = new LinkedListNode("Devil's Food");
const e = new LinkedListNode('Eccles');

a.next = b;
b.next = c;
c.next = d;
d.next = e;

kthToLastNode(2, a);
// Returns the node with value "Devil's Food" (the 2nd to last node)
*/

class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/*
Second approach: maintain a kk-wide "stick" in one walk down the list.

Walk one pointer kk nodes from the head. Call it rightNode.
Put another pointer at the head. Call it leftNode.
Walk both pointers, at the same speed, towards the tail. This keeps a 
distance of kk between them.
When rightNode hits the tail, leftNode is on the target (since it's kk
nodes from the end of the list).

O(n) time and O(1) space
*/

function kthToLastNode(k, head) {

    // Return the kth to last node in the linked list

    if (k < 1) {
        throw new Error(`Impossible to find less than first to last node: ${k}`);
    }

    let leftNode = head;
    let rightNode = head;

    // Move rightNode to the kth node
    for (let i = 0; i < k - 1; i++) {

        // But along the way, if a rightNode doesn't have a next,
        // then k is greater than the length of the list and there
        // can't be a kth-to-last node! we'll raise an error
        if (!rightNode.next) {
            throw new Error(`k is larger than the length of the linked list: ${k}`);
        }

        rightNode = rightNode.next;
    }

    // Starting with leftNode on the head,
    // move leftNode and rightNode down the list,
    // maintaining a distance of k between them,
    // until rightNode hits the end of the list

    // rightnode will be k steps ahead of leftNode
    while (rightNode.next) {
        leftNode = leftNode.next;
        rightNode = rightNode.next;
    }

    // Since leftNode is k nodes behind rightNode,
    // leftNode is now the kth to last node!
    return leftNode;
}

















// Tests

let desc = 'first to last node';
let nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
let actual = kthToLastNode(1, nodes[0]);
let expected = nodes[3];
assertEquals(actual, expected, desc);

desc = 'second to last node';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
actual = kthToLastNode(2, nodes[0]);
expected = nodes[2];
assertEquals(actual, expected, desc);

desc = 'first node';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
actual = kthToLastNode(4, nodes[0]);
expected = nodes[0];
assertEquals(actual, expected, desc);

desc = 'k greater than linked list length';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
const fifthFromLast = () => (kthToLastNode(5, nodes[0]));
assertThrows(fifthFromLast, desc);

desc = 'k is zero';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
const zeroFromLast = () => (kthToLastNode(0, nodes[0]));
assertThrows(zeroFromLast, desc);

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

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}

function assertThrows(func, desc) {
    try {
        func();
        console.log(`${desc} ... FAIL`);
    } catch (e) {
        console.log(`${desc} ... PASS`);
    }
}