//Given the root of a binary tree, display the node values at each level. 
//Node values for all levels should be displayed on separate lines. 
//Let’s take a look at the below binary tree.

class Node {
    constructor(val, left, right) {
        this.left = left;
        this.right = right;
        this.val = val;
    }
}

//              55
//           60     75
//       40    80  65  95

const nodeL2_a = new Node(40);
const nodeL2_b = new Node(80);
const nodeL1_a = new Node(60, nodeL2_a, nodeL2_b);

const nodeL2_c = new Node(65);
const nodeL2_d = new Node(95);
const nodeL1_b = new Node(75, nodeL2_c, nodeL2_d);

const root = new Node(55, nodeL1_a, nodeL1_b);

const levels = [];

function traverse(node, level) {
    if(node == null){
        return;
    }

    if(levels[level] == null){
        levels[level] = [];
    }

    levels[level].push(node.val);

    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
}

traverse(root, 0);

console.log(levels);