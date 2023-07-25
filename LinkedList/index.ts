class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  constructor(public data: T) {}
}

export interface ILinkedList<T> {
  insertInBegin(data: T): Node<T>
  insertAtEnd(data: T): Node<T>
  // deleteNode(node: Node<T>): void
  traverse():T[]
  search(comparator: (data: T) => boolean): Node<T> | null
  size(): number

  //additional methods
  setHeadToStart(): void
  setHeadToEnd(): void
  deleteLastNode(): void
  getCurrentNode(): Node<T> | null
  print(): void
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;

  private getLast = (node: Node<T>) : Node<T> => {
    return node.next ? this.getLast(node.next) : node
  }
  public insertAtEnd(data: T): Node<T> {
    const node = new Node(data)

    if(!this.head) {
      this.head = node
    } else {

      const lastNode = this.getLast(this.head)
      node.prev = lastNode
      lastNode.next = node;
    }

    return node
  }

  public insertInBegin(data: T): Node<T> {
    const node = new Node(data)
    if(!this.head) {
      this.head = node
    } else {
      this.head.prev = node
      this.head.next = this.head
      this.head = node
    }

    return node;
  }

  public setHeadToStart() {
    if(!this.head) {
      return
    }

    if(!this.head.prev) {
      return;
    }

    while (this.head.prev) {
      this.head = this.head.prev
    }
  }

  public setHeadToEnd() {
    if(!this.head) {
      return
    }
    if(!this.head.next) {
      return;
    }

    while (this.head?.next) {
      this.head = this.head.next
    }
  }

  getCurrentNode(): Node<T> | null {
    return this.head
  }

  public deleteLastNode(): void {
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

  private addToArray = (array: T[], node: Node<T>): T[] => {
    array.push(node.data);
    return node.next ? this.addToArray(array, node.next) : array
  }

  public traverse(): T[] {
    const array: T[] = [];
    if(!this.head) {
      return array;
    }

    return this.addToArray(array, this.head)
  }

  public size(): number {
    return this.traverse().length
  }

  public search(comparator: (data: T) => boolean): Node<T> | null {
    const checkNext = (node: Node<T>): Node<T> | null => {
      if (comparator(node.data)) {
        return node;
      }
      return node.next ? checkNext(node.next) : null;
    };

    return this.head ? checkNext(this.head) : null;
  }

  public print() {
    let copyHead = this.head
    while (copyHead) {
      console.log(copyHead?.data)
      copyHead = copyHead?.next || null
    }
  }
}

const List = new LinkedList()

List.insertAtEnd(1)
List.insertAtEnd(2)
List.insertAtEnd(3)
List.print() // 1 2 3
console.log('traverse = ', List.traverse()); // [ 1, 2, 3 ]
console.log('LinkedList size = ', List.size()); // 3
const result = List.search((data) => data === 2);
console.log('search = ', result?.data) // 2

List.setHeadToEnd()
console.log('getCurrentNode = ', List.getCurrentNode()?.data); // 3


List.setHeadToStart()
console.log('getCurrentNode = ' + List.getCurrentNode()?.data); // 1
List.deleteLastNode()
List.print() // 1 2

export {}
