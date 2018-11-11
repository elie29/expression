import { OPERATORS_MAP } from './interpreter-operator';

export class InterpreterNode {
  protected left: InterpreterNode;
  protected right: InterpreterNode;
  constructor(public readonly data) {}

  public insert(data: string): void {
    this.insertLeft(data) || this.insertRight(data);
  }

  public getLeft(): InterpreterNode {
    return this.left;
  }

  public getRight(): InterpreterNode {
    return this.right;
  }

  protected insertLeft(data): boolean {
    const insertLeft = !this.left || this.hasAvailableLeaf(this.left);
    if (insertLeft) {
      this.left
        ? this.left.insert(data)
        : (this.left = new InterpreterNode(data));
    }
    return insertLeft; // for the OR purpose
  }

  protected insertRight(data): void {
    this.right
      ? this.right.insert(data)
      : (this.right = new InterpreterNode(data));
  }

  protected hasAvailableLeaf(node: InterpreterNode): boolean {
    // Numeric operand found ?
    if (!OPERATORS_MAP.get(node.data)) {
      return false;
    }
    // whenever a gap is found at left or right keep searching
    return (
      !node.left ||
      this.hasAvailableLeaf(node.left) ||
      !node.right ||
      this.hasAvailableLeaf(node.right)
    );
  }
}
