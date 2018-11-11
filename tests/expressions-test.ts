import { Expression } from '../src/expression/expression';

describe('Expressions with operator precedence', () => {
  test('1 + 6 + 5 * 8 should return 47', () => {
    const leftExpression = new Expression(1, '+', 6);
    const rightExpression = new Expression(5, '*', 8);
    const expression = new Expression(leftExpression, '+', rightExpression);
    expect(expression.evaluate()).toBe(47);
  });

  test('1 + (6 + 5) * 8 should return 89', () => {
    const leftExpression = new Expression(6, '+', 5);
    const rightExpression = new Expression(leftExpression, '*', 8);
    const expression = new Expression(1, '+', rightExpression);
    expect(expression.evaluate()).toBe(89);
  });

  test('(1 + 6 + 5) * 8 should return 96', () => {
    const firstExpression = new Expression(1, '+', 6);
    const leftExpression = new Expression(firstExpression, '+', 5);
    const expression = new Expression(leftExpression, '*', 8);
    expect(expression.evaluate()).toBe(96);
  });
});
