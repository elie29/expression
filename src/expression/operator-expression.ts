import { Expression } from './expression';

export abstract class OperatorExpression extends Expression {
  public constructor(protected left: Expression, protected right: Expression) {
    super();
  }
}
