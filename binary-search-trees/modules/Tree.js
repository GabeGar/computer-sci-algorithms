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

    // * Builds a tree, from a sorted array, upon initialization of the tree class object.
    buildTree(sortedArray) {
        if (sortedArray.length === 0 || sortedArray[0] === null) return null;

        const midPoint = Math.floor(sortedArray.length / 2);
        const node = new Node(sortedArray[midPoint]);
        node.left = this.buildTree(sortedArray.slice(0, midPoint));
        node.right = this.buildTree(sortedArray.slice(midPoint + 1));
        return node;
    }

    // * Removes a value, if present in the tree.
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

    // * Returns the depth of a node, by passing it's value as the parameter.
    depth(node, root = this.root) {
        // * Default to -1, if there is no node argument passed.
        if (!node) return -1;

        // * Base case
        if (root === null) return -1;

        // * Check if the node passed in is equal to the current node.
        if (root.value === node.value) return 0;

        // * Check if the node is in the left subtree.
        let left = this.depth(node, root.left);
        if (left >= 0) return left + 1;

        // * Check if the node is in the right subtree.
        let right = this.depth(node, root.right);
        if (right >= 0) return right + 1;

        // * Return -1 if node is not found in the tree.
        return -1;
    }

    // * Finds a specified value and returns the node which contains it, or null when value not found.
    find(value, root = this.root) {
        // * Base case for when root is null (value not found) or value is found.
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

    /*
     * Obtain height of node in the tree, a passed node or root (by default),
     * to the leaf node (has 0 children; pointers both === null).
     */
    height(node = this.root) {
        /*
         * Balances out the final return value, since the leaf node edges, pointing to null,
         * do not count towards a positive tree height.
         */
        if (node === null) return -1;

        // * Traverse down the left and right subtrees until a leaf node is met that has both values === null (base case).
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        // * Math.max to return the greater of the two values and add 1, to offset the final height of the tree.
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // * Breadth-first traversal --- levelOrder.
    levelOrder(callbackFn, root = this.root) {
        if (root === null) return;

        const levelOrderArr = [];
        // * Initialize the queue with the root.
        const queue = [root];

        while (queue.length > 0) {
            // * Get reference to the first node.
            let currentNode = queue[0];
            /*
             * Check for callback existence. If it doesn't exist, push to a separate array to be returned, directly,
             * before enqueuing children.
             */
            callbackFn
                ? callbackFn(currentNode)
                : levelOrderArr.push(currentNode.value);
            // * Enqueue left node reference before right node reference, if they exist, in that order.
            if (currentNode.left !== null) queue.push(currentNode.left);
            if (currentNode.right !== null) queue.push(currentNode.right);
            // * Finally, Dequeue the first element in then queue, which has already been handled, by this point.
            queue.shift();
        }
        // * Return the levelOrder array, if no callbackFn is passed, to handle each node, in the loop.
        return levelOrderArr;
    }

    // * Depth-first --- inOrder.
    inOrder(callbackFn, node = this.root, inOrderArr = []) {
        if (node === null) return;

        // * inOrder --- L, data, R.
        // * *** Always results in sorted fashion. ***
        this.inOrder(callbackFn, node.left, inOrderArr);
        callbackFn ? callbackFn(node) : inOrderArr.push(node.value);
        this.inOrder(callbackFn, node.right, inOrderArr);

        return inOrderArr;
    }

    // * Inserts a value, if not already present in tree.
    insert(value, root = this.root) {
        // * Prevents non-values from inserting into tree.
        if (!value)
            throw new Error(
                "An empty, non-value was passed as an argument, to the value parameter."
            );

        // * Base case for when root is pointing to null, return the new node.
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

    // * Depth-first --- preOrder.
    preOrder(callbackFn, node = this.root, preOrderArr = []) {
        if (node === null) return;

        // * preOrder --- Data, L, R.
        callbackFn ? callbackFn(node) : preOrderArr.push(node.value);
        this.preOrder(callbackFn, node.left, preOrderArr);
        this.preOrder(callbackFn, node.right, preOrderArr);

        return preOrderArr;
    }

    // * Prints the tree in a visually structured format, to the console.
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

    // * Depth-first --- postOrder.
    postOrder(callbackFn, node = this.root, postOrderArr = []) {
        if (node === null) return;

        // * postOrder --- L, R, data.
        this.postOrder(callbackFn, node.left, postOrderArr);
        this.postOrder(callbackFn, node.right, postOrderArr);
        callbackFn ? callbackFn(node) : postOrderArr.push(node.value);

        return postOrderArr;
    }

    // * --- Private Method(s) ---

    _deleteHelper(node) {
        // * Is a leaf node --- no left or right node pointers (both null).
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
