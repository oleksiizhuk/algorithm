"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('LinkedList', () => {
    it('should insert elements at the end', () => {
        const list = new index_1.LinkedList();
        list.insertAtEnd(1);
        list.insertAtEnd(2);
        list.insertAtEnd(3);
        expect(list.traverse()).toEqual([1, 2, 3]);
    });
});
