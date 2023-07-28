"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.getLast = (node) => {
            return node.next ? this.getLast(node.next) : node;
        };
        this.addToArray = (array, node) => {
            array.push(node.data);
            return node.next ? this.addToArray(array, node.next) : array;
        };
    }
    insertAtEnd(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
        }
        else {
            const lastNode = this.getLast(this.head);
            node.prev = lastNode;
            lastNode.next = node;
        }
        return node;
    }
    insertInBegin(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
        }
        else {
            this.head.prev = node;
            this.head.next = this.head;
            this.head = node;
        }
        return node;
    }
    setHeadToStart() {
        if (!this.head) {
            return;
        }
        if (!this.head.prev) {
            return;
        }
        while (this.head.prev) {
            this.head = this.head.prev;
        }
    }
    setHeadToEnd() {
        var _a;
        if (!this.head) {
            return;
        }
        if (!this.head.next) {
            return;
        }
        while ((_a = this.head) === null || _a === void 0 ? void 0 : _a.next) {
            this.head = this.head.next;
        }
    }
    getCurrentNode() {
        return this.head;
    }
    deleteLastNode() {
        if (!this.head) {
            return;
        }
        if (!this.head.next) {
            this.head = null;
            return;
        }
        let current = this.head;
        let penultimate = null;
        while (current.next) {
            penultimate = current;
            current = current.next;
        }
        // @ts-ignore
        penultimate.next = null;
    }
    traverse() {
        const array = [];
        if (!this.head) {
            return array;
        }
        return this.addToArray(array, this.head);
    }
    size() {
        return this.traverse().length;
    }
    search(comparator) {
        const checkNext = (node) => {
            if (comparator(node.data)) {
                return node;
            }
            return node.next ? checkNext(node.next) : null;
        };
        return this.head ? checkNext(this.head) : null;
    }
    print() {
        let copyHead = this.head;
        while (copyHead) {
            console.log(copyHead === null || copyHead === void 0 ? void 0 : copyHead.data);
            copyHead = (copyHead === null || copyHead === void 0 ? void 0 : copyHead.next) || null;
        }
    }
}
exports.LinkedList = LinkedList;
const List = new LinkedList();
List.insertAtEnd(1);
List.insertAtEnd(2);
List.insertAtEnd(3);
List.print(); // 1 2 3
console.log('traverse = ', List.traverse()); // [ 1, 2, 3 ]
console.log('LinkedList size = ', List.size()); // 3
const result = List.search((data) => data === 2);
console.log('search = ', result === null || result === void 0 ? void 0 : result.data); // 2
List.setHeadToEnd();
console.log('getCurrentNode = ', (_a = List.getCurrentNode()) === null || _a === void 0 ? void 0 : _a.data); // 3
List.setHeadToStart();
console.log('getCurrentNode = ' + ((_b = List.getCurrentNode()) === null || _b === void 0 ? void 0 : _b.data)); // 1
List.deleteLastNode();
List.print(); // 1 2
