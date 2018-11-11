import { Expression } from './expression/expression';

{
  const leftExpression = new Expression(1, '+', 6);
  const rightExpression = new Expression(5, '*', 8);
  const expression = new Expression(leftExpression, '+', rightExpression);
  console.log('1 + 6 + 5 * 8', '=', expression.evaluate());
}

{
  const leftExpression = new Expression(6, '+', 5);
  const rightExpression = new Expression(leftExpression, '*', 8);
  const expression = new Expression(1, '+', rightExpression);
  console.log('1 + (6 + 5) * 8', '=', expression.evaluate());
}

{
  const firstExpression = new Expression(1, '+', 6);
  const leftExpression = new Expression(firstExpression, '+', 5);
  const expression = new Expression(leftExpression, '*', 8);
  console.log('(1 + 6 + 5) * 8', '=', expression.evaluate());
}
