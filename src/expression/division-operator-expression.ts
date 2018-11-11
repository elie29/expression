import { OperatorExpression } from './operator-expression';

export class DivisionOperatorExpression extends OperatorExpression {
  public evaluate(): number {
    return this.left.evaluate() / this.right.evaluate();
  }
}
