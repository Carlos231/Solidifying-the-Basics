/*
You wrote a trendy new messaging app, MeshMessage, to get around flaky cell phone coverage.

Instead of routing texts through cell towers, your app sends messages via the phones of nearby users, passing each message along from one phone to the next until it reaches the intended recipient. (Don't worry—the messages are encrypted while they're in transit.)

Some friends have been using your service, and they're complaining that it takes a long time for messages to get delivered. After some preliminary debugging, you suspect messages might not be taking the most direct route from the sender to the recipient.

Given information about active users on the network, find the shortest route for a message from one user (the sender) to another (the recipient). Return an array of users that make up this route.

There might be a few shortest delivery routes, all with the same length. For now, let's just return any shortest route.

Your network information takes the form of an object where keys are usernames and values are arrays of other users nearby:

  const network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
  ...
};

JavaScript
For the network above, a message from Jayden to Adam should have this route:

  ['Jayden', 'Amelia', 'Adam']
*/

// A simple, somewhat inefficient queue implementation
class Queue {
    constructor() {
        this.queue = [];
        this.size = 0;
    }

    enqueue(item) {
        this.queue.unshift(item);
        this.size += 1;
    }

    dequeue() {
        this.size -= 1;
        return this.queue.pop();
    }
}


/*
  helper function the reconstruct the path from the end and then reversing
    the path
    
    make a list to save reversed shortest path
    
    start from the end so make the current node the endNode
    
    loop until current node is not null
      add the current node to reversed shortest path
      set current node to the the value of currentValue in howWeReachedNodes list
      
    return the path reversed to get it from start to end
*/
function reconstructPath(howWeReachedNodes, startNode, endNode) {
    const reversedShortestPath = [];

    let currentNode = endNode;

    while (currentNode !== null) {
        reversedShortestPath.push(currentNode);
        currentNode = howWeReachedNodes[currentNode];
    }

    return reversedShortestPath.reverse();
}


function getPath(graph, startNode, endNode) {

    // Find the shortest route in the network between the two users
    /*
      make sure that both nodes are in the graph first
    
      hold the values we need to visit in queue and add the startNode
      hold an hash map of how we reached each node adding null to the startNode
      
      go through each graph node while there are nodes to visit
        dequeue the current node from the nodes to visit
        
        see if the node is the end node we are looking for
          return the helper function that reconstructs the path
        
        for each nodes neighbor check if its how we reached nodes does not have 
          the property of the neighbor and add it the list of how we reached the
          node
      
      if there is no path then should return null
    */
    if (!graph.hasOwnProperty(startNode)) {
        throw Error('Start node is not in the graph!');
    }

    if (!graph.hasOwnProperty(endNode)) {
        throw Error('End node is not in the graph');
    }

    const nodesToVisit = new Queue();
    nodesToVisit.enqueue(startNode);

    // how we reached the node and to keep track of nodes seen
    const howWeReachedNodes = {};
    howWeReachedNodes[startNode] = null;

    while (nodesToVisit.size > 0) {
        const currentNode = nodesToVisit.dequeue();

        if (currentNode === endNode) {
            return reconstructPath(howWeReachedNodes, startNode, endNode);
        }

        graph[currentNode].forEach(neighbor => {
            if (!howWeReachedNodes.hasOwnProperty(neighbor)) {
                nodesToVisit.enqueue(neighbor);
                howWeReachedNodes[neighbor] = currentNode;
            }
        });
    }


    return null;
}

















// Tests
const graph = {
    'a': ['b', 'c', 'd'],
    'b': ['a', 'd'],
    'c': ['a', 'e'],
    'd': ['a', 'b'],
    'e': ['c'],
    'f': ['g'],
    'g': ['f']
};

let desc = 'two hop path 1';
let actual = getPath(graph, 'a', 'e');
let expected = ['a', 'c', 'e'];
assertDeepEqual(actual, expected, desc);

desc = 'two hop path 2';
actual = getPath(graph, 'd', 'c');
expected = ['d', 'a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 1';
actual = getPath(graph, 'a', 'c');
expected = ['a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 2';
actual = getPath(graph, 'f', 'g');
expected = ['f', 'g'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 3';
actual = getPath(graph, 'g', 'f');
expected = ['g', 'f'];
assertDeepEqual(actual, expected, desc);

desc = 'zero hop path';
actual = getPath(graph, 'a', 'a');
expected = ['a'];
assertDeepEqual(actual, expected, desc);

desc = 'no path';
actual = getPath(graph, 'a', 'f');
expected = null;
assertDeepEqual(actual, expected, desc);

desc = 'start node not present';
assertThrowsError(() => {
    getPath(graph, 'h', 'a');
}, desc);

desc = 'end node not present';
assertThrowsError(() => {
    getPath(graph, 'a', 'h');
}, desc);

function assertDeepEqual(a, b, desc) {
    const aStr = JSON.stringify(a);
    const bStr = JSON.stringify(b);
    if (aStr !== bStr) {
        console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
    } else {
        console.log(`${desc} ... PASS`);
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