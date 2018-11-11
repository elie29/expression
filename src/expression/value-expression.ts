import { Expression } from './expression';

export class ValueExpression extends Expression {
  public constructor(protected value: number) {
    super();
  }

  public evaluate(): number {
    return this.value;
  }
}
