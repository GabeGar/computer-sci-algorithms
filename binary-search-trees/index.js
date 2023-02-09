import Tree from "./modules/Tree.js";
import randomUnsortedArray from "./utils/randomArray.js";

// * --- Driver script --- * //

// * Create a binary search tree from an array of random numbers.
const unsortedArr = randomUnsortedArray();
const tree = new Tree(unsortedArr);

// * Print Original Tree.
console.log("Original Tree: ");
console.log("\n");
tree.prettyPrint();
console.log("\n");

// * Confirm that the tree is balanced by calling isBalanced.
console.log(`Tree is balanced?: ${tree.isBalanced()}`);

// * Print out all elements in level, pre, post, and in order.
console.log("\n");
console.log("Pre-Order:");
console.log(tree.preOrder());

console.log("\n");
console.log("In-Order:");
console.log(tree.inOrder());

console.log("\n");
console.log("Post-Order:");
console.log(tree.postOrder());

// * Unbalance the tree by adding several numbers > 100.
console.log("\n");
console.log("Inserting 100 random values into tree, from 0 to 500.");

for (let i = 1; i !== 100; i++) {
    tree.insert(Math.floor(Math.random() * 1001));
}

// * Confirm that the tree is unbalanced by calling isBalanced().
console.log("\n");
console.log(`Tree is balanced?: ${tree.isBalanced()}`);

// * Balance the tree by calling reBalance().
console.log("---- Called reBalanced() here. ----");
tree.reBalance();

// * Confirm that the tree is now balanced by calling isBalanced().
console.log(`Tree is balanced?: ${tree.isBalanced()}`);

// * Print out all elements in level, pre, post, and in order.

console.log("\n");
console.log("Level-Order: ");
console.log(tree.levelOrder());

console.log("\n");
console.log("Pre-Order:");
console.log(tree.preOrder());

console.log("\n");
console.log("In-Order:");
console.log(tree.inOrder());

console.log("\n");
console.log("Post-Order:");
console.log(tree.postOrder());

// * Print rebalanced Tree
console.log("\n");
console.log("The rebalanced Tree:");
console.log("\n");
tree.prettyPrint();
