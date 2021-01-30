/*
Given an undirected graph ↴ with maximum degree ↴ DD, find a graph coloring ↴ using at most D+1D+1 colors.

For example:

First described by Robert Frucht in 1939, the Frucht graph is a 3-regular graph with 12 vertices, 18 edges, and no nontrivial symmetries.
This graph's maximum degree (DD) is 3, so we have 4 colors (D+1D+1). Here's one possible coloring:

The Frucht graph with legal coloring.
Graphs are represented by an array of NN node objects, each with a label, a set of neighbors, and a color:

  class GraphNode {
  constructor(label) {
    this.label = label;
    this.neighbors = new Set();
    this.color = null;
  }
}

const a = new GraphNode('a');
const b = new GraphNode('b');
const c = new GraphNode('c');

a.neighbors.add(b);
b.neighbors.add(a);
c.neighbors.add(b);
b.neighbors.add(c);

const graph = [a, b, c];0
*/

class GraphNode {
    constructor(label) {
        this.label = label;
        this.neighbors = new Set();
        this.color = null;
    }
}

function colorGraph(graph, colors) {

    // Create a valid coloring for the graph
    /*
      O(N+M) time where NN is the number of nodes and MM is the number of edges.
    */

    graph.forEach(node => {

        if (node.neighbors.has(node)) {
            throw new Error(`Legal coloring impossible for node with loop: ${node.label}`);
        }

        // Get the node's neighbors' colors, as a set so we
        // can check if a color is illegal in constant time
        const illegalColors = new Set();

        node.neighbors.forEach(neighbor => {
            if (neighbor.color !== null) {
                illegalColors.add(neighbor.color);
            }
        });

        // Assign the first legal color
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];

            if (!illegalColors.has(color)) {
                node.color = color;
                break;
            }
        }
    });

}


















// Tests
const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'white'];

let graph = [];
{
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    graph = [nodeA, nodeB, nodeC, nodeD];
}
colorGraph(graph, colors);
assertEqual(validateGraphColoring(graph), true, 'line graph');

{
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    graph = [nodeA, nodeB, nodeC, nodeD];
}
colorGraph(graph, colors);
assertEqual(validateGraphColoring(graph), true, 'separate graph');

{
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    graph = [nodeA, nodeB, nodeC];
}
colorGraph(graph, colors);
assertEqual(validateGraphColoring(graph), true, 'triangle graph');

{
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    const nodeE = new GraphNode('E');
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeD);
    nodeB.neighbors.add(nodeE);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeC.neighbors.add(nodeE);
    nodeD.neighbors.add(nodeB);
    nodeD.neighbors.add(nodeC);
    nodeD.neighbors.add(nodeE);
    nodeE.neighbors.add(nodeB);
    nodeE.neighbors.add(nodeC);
    nodeE.neighbors.add(nodeD);
    graph = [nodeA, nodeB, nodeC, nodeD, nodeE];
}
colorGraph(graph, colors);
assertEqual(validateGraphColoring(graph), true, 'envelope graph');

{
    const nodeA = new GraphNode('A');
    nodeA.neighbors.add(nodeA);
    graph = [nodeA];
}
assertThrows(() => {
    colorGraph(graph, colors);
}, 'loop graph');

function validateGraphColoring(graph) {

    const maxDegree = Math.max(...graph.map(node => node.neighbors.size));

    const colorsUsed = new Set();

    graph.forEach(node => {
        colorsUsed.add(node.color);
    });

    if (colorsUsed.has(null)) {
        return false;
    }

    if (colorsUsed.size > maxDegree + 1) {
        return false;
    }

    let badEdges = 0;

    graph.forEach(node => {
        node.neighbors.forEach(neighbor => {
            if (neighbor.color === node.color) {
                badEdges += 1;
            }
        });
    });

    if (badEdges > 0) {
        return false;
    }

    return true;
}

function assertEqual(a, b, desc) {
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