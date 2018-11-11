import { AdditionOperatorExpression } from './expression/addition-operator-expression';
import { MultiplicationOperatorExpression } from './expression/multiplication-operator-expression';
import { ValueExpression } from './expression/value-expression';

{
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
  console.log('1 + 6 + 5 * 8', '=', expression.evaluate());
}

{
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
  console.log('1 + (6 + 5) * 8', '=', expression.evaluate());
}

{
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
  console.log('(1 + 6 + 5) * 8', '=', expression.evaluate());
}
