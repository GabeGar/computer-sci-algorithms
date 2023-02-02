import LinkedList from "./modules/LinkedList.js";

const linkedList = new LinkedList();

// Adding stuff to list

linkedList.addToHead([
    { Person: "John", Age: 46 },
    { Person: "Bob", Age: 22 },
    { Person: "Mark", Age: 17 },
]);
linkedList.addToTail({ Hello: "World!" });

for (let i = 1; i <= 3; i++) {
    linkedList.addToTail(i);
}

// Testing linked-list methods

console.log(linkedList.toString());
// console.log(linkedList.removeAt(0));
// console.log(linkedList.removeAt(0));
// console.log(linkedList.clearList());
console.log(linkedList.insertAt(0, 7777));
console.log(linkedList.toString());
// console.log(linkedList);
console.log(linkedList.at(-5));
