console.log('minmaxo1');

class ListNode {
    constructor(prev, next, val){
        this.next = next;
        this.prev = prev;
        this.keys = new Set();
        this.val = val;
    }
}

class minmax {
    constructor(){
        this.keyMap = new Map();
        this.frequencyMap = new Map();
        this.root = new ListNode(null, null, 0);
        this.root.next = this.root;
        this.root.prev = this.root;
        this.frequencyMap.set(0, this.root);
    }

    removeNode(frequency) {
        if(frequency === 0){
            return;
        } else {
            const node = this.frequencyMap.get(frequency);
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
    }

    addNodeUp(prevNode, frequency) {
        const newNode = new ListNode(prevNode, prevNode.next, frequency);
        prevNode.next.prev = newNode;
        prevNode.next = newNode;
        this.frequencyMap.set(frequency, newNode);
        return newNode;
    }

    addNodeDown(nextNode, frequency) {
        const newNode = new ListNode(nextNode.prev, nextNode, frequency);
        nextNode.prev.next = newNode;
        nextNode.prev = newNode;
        this.frequencyMap.set(frequency, newNode);
        return newNode;
    }

    removeNode(frequency) {
        const node = this.frequencyMap.get(frequency);
        let prev = node.prev;
        let next = node.next;

        prev.next = next;
        next.prev = prev;
        this.frequencyMap.delete(frequency);
    }

    put(key) {
        let frequency = this.keyMap.get(key);
        if(frequency == null){
            frequency = 0;
        }
        frequency++;
        this.keyMap.set(key, frequency);

        let previousNode = this.frequencyMap.get(frequency - 1);
        let node = this.frequencyMap.get(frequency);

        if(node == null){
            console.log('creating ' + frequency);
            node = this.addNodeUp(previousNode, frequency);
        }
        
        previousNode.keys.delete(key);
        if(previousNode.keys.size === 0 && previousNode.val !== 0){
            console.log('removing ' + previousNode.val);
            this.removeNode(previousNode.val);
        }

        node.keys.add(key);
    }

    remove(key){
        let frequency = this.keyMap.get(key);
        const oldNode = this.frequencyMap.get(frequency);
        frequency--;
        let node = this.frequencyMap.get(frequency);

        if(node == null){
            node = this.addNodeDown(oldNode, frequency);
        }

        if(frequency === 0){
            this.keyMap.delete(key);
        } else {
            this.keyMap.set(key, frequency);
            node.keys.add(key);
        }

        oldNode.keys.delete(key);
        if(oldNode.keys.size === 0){
            this.removeNode(oldNode.val);
        }
    }

    getMin(){
        return this.root.val;
    }

    getMax(){
        let tail = this.root.prev;
        return tail.val;
    }
}


const testObject = new minmax();

testObject.put('foo');
testObject.put('foo');
testObject.put('foo');
testObject.remove('foo');
testObject.remove('foo');
testObject.put('bar');
testObject.put('bar');
testObject.put('testing');
testObject.put('testing');
testObject.put('testing');
testObject.put('bar');
testObject.remove('bar');
testObject.remove('bar');
testObject.remove('bar');
testObject.put('testing');

console.log(testObject.root.val);
console.log(testObject.root.next.val);
console.log(testObject.root.next.next.val);
console.log(testObject.root.next.next.next.val);

console.log('-------------')

console.log(testObject.root.val);
console.log(testObject.root.prev.val);
console.log(testObject.root.prev.prev.val);
console.log(testObject.root.prev.prev.prev.val);

console.log('-------------')
console.log(testObject.getMin());
console.log(testObject.getMax());