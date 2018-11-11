import { AdditionOperatorExpression } from '../addition-operator-expression';
import { DivisionOperatorExpression } from '../division-operator-expression';
import { MinusOperatorExpression } from '../minus-operator-expression';
import { MultiplicationOperatorExpression } from '../multiplication-operator-expression';

export const PLUS = '+';
export const MINUS = '-';
export const DIVISION = '/';
export const MULTIPLICATION = '*';
export const LEFT_PARENTHESIS = '(';
export const RIGHT_PARENTHESIS = ')';

// typescript reverse mapping
export const OPERATORS_MAP = new Map()
  .set(PLUS, AdditionOperatorExpression)
  .set(MINUS, MinusOperatorExpression)
  .set(DIVISION, DivisionOperatorExpression)
  .set(MULTIPLICATION, MultiplicationOperatorExpression);

export const SUPPORTED_OPERATORS = [PLUS, MINUS, DIVISION, MULTIPLICATION];

export const LOW_PRECEDENCE = [PLUS, MINUS];

export const HIGH_PRECEDENCE = [MULTIPLICATION, DIVISION];

export const hasLowPrecedence = token => LOW_PRECEDENCE.includes(token);

export const hasHighPrecedence = token => HIGH_PRECEDENCE.includes(token);

export const parenthesesMapToIndex = new Map()
  .set(LEFT_PARENTHESIS, 1) // increment
  .set(RIGHT_PARENTHESIS, -1); // decrement
