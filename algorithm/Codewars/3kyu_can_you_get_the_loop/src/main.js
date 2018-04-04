class Node {}

function loop_size(node) {
    let rabbit = node.next.next;
    let tottle = node.next;

    while(rabbit != tottle) {
        rabbit = rabbit.next.next;
        tottle = tottle.next;
    }

    let count = 1;
    rabbit = rabbit.next;
    while(tottle != rabbit) {
        count++;
        rabbit = rabbit.next;
    }
    return count;
}

let node1 = new Node();
node1.next = node1;

console.log(loop_size(node1)); // 1

node1 = new Node();
let node2 = new Node();

node1.next = node2
node2.next = node1

console.log(loop_size(node1)); // 2

node1 = new Node();
node2 = new Node();
let node3 = new Node();

node1.next = node2
node2.next = node3
node3.next = node2

console.log(loop_size(node3)); // 2