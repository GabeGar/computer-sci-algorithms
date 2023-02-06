import Node from "./Node.js";

/*
 * **** Balanced Binary Search Tree - Sorted Arrays *****
 * Set The middle element of the array as root.
 * Recursively do the same for the left half and right half.
 * Get the middle of the left half and make it the left child of the root created in step 1.
 * Get the middle of the right half and make it the right child of the root created in step 1.
 * Print the pre-order of the tree.
 */

class Tree {
    constructor(array) {
        // Initialize tree class with a sorted, non-repeating values, array.
        // Sets the class attribute root, as the node returned from buildTree.
        // If any empty array is passed, a new array with only the value of null is passed.
        const sortedArr = [...new Set(array)].sort((a, b) => (a > b ? 1 : -1));
        this.root = this.buildTree(sortedArr);
    }

    // Builds the tree, from a sorted array.
    buildTree(sortedArray) {
        if (sortedArray.length === 0 || sortedArray[0] === null) return null;

        const midPoint = Math.floor(sortedArray.length / 2);
        const node = new Node(sortedArray[midPoint]);
        node.left = this.buildTree(sortedArray.slice(0, midPoint));
        node.right = this.buildTree(sortedArray.slice(midPoint + 1));
        return node;
    }

    // Prints the tree in a visually structured format, to the console.
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "|   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "|   "}`,
                true
            );
        }
    }
}

export default Tree;
