class Node {
    constructor(val, left, right) {
        this.left = left;
        this.right = right;
        this.val = val;
    }
}

//              5
//           3      7
//        1    4   6   8

const nodeL2_a = new Node(1);
const nodeL2_b = new Node(4);
const nodeL1_a = new Node(3, nodeL2_a, nodeL2_b);

const nodeL2_c = new Node(6);
const nodeL2_d = new Node(8);
const nodeL1_b = new Node(7, nodeL2_c, nodeL2_d);

const root = new Node(5, nodeL1_a, nodeL1_b);

function traverse(node) {
    if(node == null){
        return;
    }

    traverse(node.left);
    console.log(node.val);
    traverse(node.right);
}

traverse(root);