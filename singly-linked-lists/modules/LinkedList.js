import Node from "./Nodes.js";

export default class LinkedList {
    constructor() {
        // * Head initialized as pointing to null. List size should be 0, if so. (Empty List.)
        this.head = null;
        this.size = 0;
    }

    addToHead(data) {
        /*
         * 1) Will always add to the head, in this method.
         * 2) A new Node is initialized, with a pointer to the current list, be it empty , pointing to null, --- cont. next line ---
         * or an existing linked-list of values.
         * 3) Current head is then override, with the value of the new node, that points to the rest of the list
         * and it's tail end is always pointing to null.
         */

        const node = new Node(data, this.head);
        this.head = node;
        this.size++;
    }

    addToTail(data) {
        // * Check to see if the list is empty --- head pointer, pointing to null.
        // * If so, call AddToHead and pass the data to it, to make it the head.

        if (!this.head) {
            return this.addToHead(data);
        } else {
            // * Initialize the new node with data.

            const node = new Node(data);
            this.size++;

            // * Points to the current list
            let current = this.head;
            while (current) {
                // * Tap into the current node and check to see if it's pointer is point to null.
                // * If so, append to the end of the list.

                if (current.next === null) {
                    current.next = node;
                    return;
                }
                // * Move node pointer over to the next node, to allow repeating of while loop

                current = current.next;
            }
        }
    }

    at(index) {
        // * Initializes a counter that will increase for each node in linked list, per iteration of while loop.
        // * If count iteration is equal to the index passed, capture node in temp variable and break out of while loop.
        // * Return the captured node.
        let count = 0;
        let length = this.size;

        // * Checks if index passed is 0 and the list while initialized, has a length of 0, to start
        // * In this event, it returns a reference to the initialized linked list.
        if (index === 0 && length === 0) {
            return this;
        }

        // * Catch the index being passed, if a negative number was passed and add the total length to the passed index.
        // * This allows for access to the linked-list from the end, updating the index as the difference of the two, to get the
        // * appropriate node.
        if (index < 0) {
            index = length + index;
        }

        // * Error is thrown if the value exceeds the total size of the linked-list.
        if (index < 0 || index >= length) throw this.rangeErr();
        let nodeAtIndex;
        let current = this.head;
        while (current) {
            if (count === index) {
                nodeAtIndex = current;
                break;
            }
            count++;
            current = current.next;
        }
        return nodeAtIndex;
    }

    contains(value) {
        // * Returns a boolean value, depending on whether the value passed as an argument exists in list, or not.
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    clearList() {
        // * Sets pointer of list, back to null (empty list)
        // * Size of list is empty and sets the size back to 0
        this.head = null;
        this.size = 0;
        return this;
    }

    findIndexOf(value) {
        // * Returns the index of node, from the value passed, as an argument.
        let current = this.head;
        let count = 0;
        let index;

        while (current) {
            if (current.value === value) {
                index = count;
                return index;
            }
            if (!current && !value) {
                break;
            }

            count++;
            current = current.next;
        }
        return null;
    }

    getHead() {
        // * Returns first node's value in the list and logs the first node.
        // * If list is of size 0, meaning no nodes have been added, returns default value ---> null.
        return this.head;
    }

    getTail() {
        // * While Loop through all the nodes in the list, as long as the next pointer is not null.
        // * Returns null if list is of size 0.
        // * Returns final node, once that node's current pointer, next, is equal to null, --- cont. next line ---
        // * which means, the end of the list.

        let current = this.head;
        if (current) {
            while (current.next) {
                current = current.next;
            }
        }
        return current;
    }

    getSize() {
        return this.size;
    }

    insertAt(index, value) {
        // * Inserts a new value, based on differing conditions.
        // * If the index passed, points to the head of the list and exists or not, it will add the value to the head.
        // * If the index passed, points to the end of the list, using the index of -1, it will add the value to the tail end.
        /*
         * Otherwise, it will take the specified index, call and store the node references using the at(index) method,
         * for before that index and at that index, updating the pointers from the new node to point to the current node,
         * and the node before.next pointer, to point at the newly initialized node.
         */
        let current = this.head;

        if ((index === 0 && current) || !current) {
            return this.addToHead(value);
        } else if (index === -1) {
            return this.addToTail(value);
        } else {
            let nodeBefore = this.at(index - 1);
            let nodeAtCurrIndex = this.at(index);

            const node = new Node(value);
            node.next = nodeAtCurrIndex;
            nodeBefore.next = node;
            this.size++;
        }
    }

    pop() {
        let current = this.head;
        // * ClearList is called when the head pointer and/ current.next, is falsy (null).
        // * Prevents the typeErr thrown and indicates that the list is empty/clear.
        if (!current || !current.next) {
            return this.clearList();
        } else {
            let beforeLast;
            while (current) {
                // * Loop through the linked-listed from start to finish, checking for the second to last node's --- cont. next line ---
                // * pointer, seeing if it equals null. If so, then set that current node's next pointer, to null.
                // * This removes the pointer from targeting, the tail end of the linked list (it's final node).

                if (!current.next.next) {
                    beforeLast = current;
                    beforeLast.next = null;
                    this.size--;
                    return;
                }

                current = current.next;
            }
        }
    }

    printValues() {
        // * Reference the current list via the pointer, this.head and store in temp variable, current.
        // * While current node does not === null, print all values of each node via current.value.
        // * Then, update the condition under which the while loop operates, by shifting the pointer, --- cont. next line ---
        // * over to the next node.

        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }

    removeAt(index) {
        // * Removes a value at the specified index by changing the pointer from the node before --- cont. next line ---
        // * the specified index, to the immediate node after the one, specified by the index, passed.
        let current = this.head;
        let length = this.getSize();

        // * Handle negative index argument
        if (index < 0) {
            index = length + index;
        }

        // * Handle index out of range
        if (index < 0 || index >= length) throw this.rangeErr();

        // * Remove node at the start (head) of the list.
        if (index === 0 && current) {
            this.head = current.next;
            this.size--;
            return this;
        }

        let nodeBefore = this.at(index - 1);
        let nodeAfter = nodeBefore.next.next;

        nodeBefore.next = nodeAfter;
        this.size--;
        return this;
    }

    toString() {
        // * Returns a string result of all the values current in the list, from start to tail end (null)
        let current = this.head;
        let result = "";
        while (current) {
            if (current.next) {
                result += `${current.value} -> `;
            } else {
                result += `${current.value} -> null`;
            }
            current = current.next;
        }
        return result;
    }

    rangeErr() {
        return new Error("Exceeded the bounds of this list.");
    }
}
