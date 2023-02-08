import Tree from "./modules/Tree.js";
import randomUnsortedArray from "./utils/randomArray.js";

// Working with a non-dynamically generated, unsorted, array.
const unsortedArr = [
    5, 12, 55, 1, 7, 30, 42, 8, 23, 3, 6, 77, 19, 13, 17, 11, 0, 89, 75,
];

// Random Unsorted Array of variable length
// const unsortedArr = randomUnsortedArray();

const tree = new Tree(unsortedArr);
console.log(tree);
tree.prettyPrint();
tree.delete(11);
tree.prettyPrint();

// console.log(tree.find(42));
