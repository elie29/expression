import { AdditionOperatorExpression } from '../src/expression/addition-operator-expression';
import { MultiplicationOperatorExpression } from '../src/expression/multiplication-operator-expression';
import { ValueExpression } from '../src/expression/value-expression';

describe('Expressions with operator precedence', () => {
  test('1 + 6 + 5 * 8 should return 47', () => {
    const leftExpression = new AdditionOperatorExpression(
      new ValueExpression(1),
      new ValueExpression(6)
    );
    const rightExpression = new MultiplicationOperatorExpression(
      new ValueExpression(5),
      new ValueExpression(8)
    );
    const expression = new AdditionOperatorExpression(
      leftExpression,
      rightExpression
    );
    expect(expression.evaluate()).toBe(47);
  });

  test('1 + (6 + 5) * 8 should return 89', () => {
    const leftExpression = new AdditionOperatorExpression(
      new ValueExpression(6),
      new ValueExpression(5)
    );
    const rightExpression = new MultiplicationOperatorExpression(
      leftExpression,
      new ValueExpression(8)
    );
    const expression = new AdditionOperatorExpression(
      new ValueExpression(1),
      rightExpression
    );
    expect(expression.evaluate()).toBe(89);
  });

  test('(1 + 6 + 5) * 8 should return 96', () => {
    const firstExpression = new AdditionOperatorExpression(
      new ValueExpression(1),
      new ValueExpression(6)
    );
    const leftExpression = new AdditionOperatorExpression(
      firstExpression,
      new ValueExpression(5)
    );
    const expression = new MultiplicationOperatorExpression(
      leftExpression,
      new ValueExpression(8)
    );
    expect(expression.evaluate()).toBe(96);
  });
});
