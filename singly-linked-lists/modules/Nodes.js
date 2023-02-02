export default class Node {
    // * Value stores any data for the initialize node.
    // * Upon initializing, pointer next will default to node, if not made to point to another existing node.
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
