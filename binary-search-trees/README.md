# Binary-Search-Trees

An implementation of a binary search tree data structure.
**_Index.js_**, contains driver code, for testing the majority of the functionality, from the tree object.

## The Following Methods Are Included For The Tree:

-   insert(value) - Inserts a new node, with the value, into the tree.
-   delete(value) - Removes the node that has the value, from the tree.
-   find(value) - Returns a node that has the value, in the tree.
-   levelOrder() - Traverses all nodes of the tree, in levelOrder. (via a queue).
-   inOrder() - Traverses all nodes of the tree, inOrder (Left, Print-Data, Right).
-   preOrder() - Traverses all nodes of the tree, preOrder. (Print-Data, Left, Right).
-   postOrder() - Traverses all nodes of the tree, in postOrder. (Left, Right, Print-Data).
-   height(node) - Returns the height of a node or tree, itself.
-   depth(node) - Returns the depth of a node or the tree, itself.
-   isBalanced() - Returns true/false, if the tree is balanced or otherwise.
-   reBalance() - Re-balances the tree, utilizing the inOrder() method, to get a sorted array.
-   prettyPrint() - Prints the tree visually, to the console.

### Private Helper Methods:

-   \_buildTree() - gets called when initializing a tree object & anytime a call to reBalance(), is made.
-   \_deleteHelper() - called when using delete(). Contains further logic, which made the original function, chunky.
