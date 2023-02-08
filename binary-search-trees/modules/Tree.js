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

    delete(value, root = this.root) {
        if (!value)
            throw new Error(
                "An empty, non-value was passed as an argument, to the value parameter."
            );

        if (root === null) {
            return root;
        }

        if (root.value === value) {
            return this._deleteHelper(root);
        } else if (root.value < value) {
            root.right = this.delete(value, root.right);
        } else {
            root.left = this.delete(value, root.left);
        }

        return root;
    }

    // Finds a specified value and returns the node which contains it, or null when value not found.
    find(value, root = this.root) {
        // * Base case for when root is null (value not found) or value is found
        if (root === null || root.value === value) {
            return root;
        }

        /*
         * Passing in the right subtree of the root, which has a larger value and ignores the left subtree,
         * so long as the condition remains true, per recursive call to find.
         */
        if (root.value < value) {
            return this.find(value, root.right);
        } else {
            return this.find(value, root.left);
        }
    }

    insert(value, root = this.root) {
        // * Prevents non-values from inserting into tree.
        if (!value)
            throw new Error(
                "An empty, non-value was passed as an argument, to the value parameter."
            );

        // * Base case for when root is pointing to null, return the node.
        if (root === null) {
            return new Node(value);
        }

        // * Prevents the insertion of a value that already exists in the tree.
        if (this.find(value)) {
            return;
        }

        if (root.value < value) {
            root.right = this.insert(value, root.right);
        } else {
            root.left = this.insert(value, root.left);
        }

        return root;
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

    // * Private Methods

    _deleteHelper(node) {
        // * Is a leaf node --- no left or right node pointers (both null)
        if (node.left === null && node.right === null) {
            return null;

            // * Return the right node, if it's left pointer is null.
        } else if (node.left === null) {
            return node.right;

            // * Return the left node, if the right pointer is null.
        } else if (node.right === null) {
            return node.left;
        } else {
            // * Find the node with the minimum value in the right subtree of the node to be deleted.
            let minValueNode = node.right;

            // * Keep track of the parent of the node with the minimum value.
            let parentOfMinValueNode = node;

            // * Traverse down the left branch of the right subtree to find the node with the minimum value.
            while (minValueNode.left !== null) {
                parentOfMinValueNode = minValueNode;
                minValueNode = minValueNode.left;
            }

            // * Replace the value of the node to be deleted with the value of the node with the minimum value.
            node.value = minValueNode.value;

            /*
             * If the node with the minimum value is a child of the node to be deleted,
             *set the right child of the node to be deleted, to be the right child of the node with the minimum value.
             */
            if (parentOfMinValueNode === node) {
                node.right = minValueNode.right;
            } else {
                /*
                 * If the node with the minimum value is not a child of the node to be deleted,
                 * set the left child of the parent of the node with the minimum value to be the right child,
                 * of the node with the minimum value.
                 */
                parentOfMinValueNode.left = minValueNode.right;
            }
        }

        return node;
    }
}

export default Tree;
