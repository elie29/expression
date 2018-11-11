import { AdditionOperatorExpression } from './expression/addition-operator-expression';
import { ExpressionInterpreter } from './expression/interpreter/expression-interpreter';
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

let interpreter = new ExpressionInterpreter();

console.log(interpreter.interpret('1 + 2'));

console.log(interpreter.interpret('1 + -5 * 8'));

console.log(interpreter.interpret('1 + 2 * 8'));

console.log(interpreter.interpret('1 + -5'));

try {
  // Unnecessary parentheses throw exception
  interpreter.interpret('(((1 + 5 * 8)))');
} catch (error) {
  console.log(error.message);
}

console.log(interpreter.interpret('1 + (6 + 5) * 8'));

console.log(interpreter.interpret('(3 + 2 * 8) - 5'));

console.log(interpreter.interpret('1 * (5 + 8)'));

console.log(interpreter.interpret('(5 + 6) * (8 + -9)'));

console.log(interpreter.interpret('(5 + 6) * (8 + -9) + (2 * 3)'));

console.log(
  interpreter.interpret(
    '((-5 + 8) * (-3 + -2) * ((4 + 8) / (5 - -1) - 3) * (-2 - -4) * (5 * (8 + 6)) + 4) * 8'
  )
);
