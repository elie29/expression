export class Expression {
  public constructor(
    private left: Expression | number,
    private operator: string,
    private right: Expression | number
  ) {}

  public evaluate(): number {
    switch (this.operator) {
      case '+':
        return this.leftValue + this.rightValue;
      case '*':
        return this.leftValue * this.rightValue;
      // add other cases for each new operator
    }
    throw new Error('Unkown operator');
  }

  private get leftValue(): number {
    if (this.left instanceof Expression) {
      return this.left.evaluate();
    }
    return this.left;
  }

  private get rightValue(): number {
    if (this.right instanceof Expression) {
      return this.right.evaluate();
    }
    return this.right;
  }
}
