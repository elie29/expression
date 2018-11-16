import { ValueExpression } from '../value-expression';
import { ExpressionLexer } from './expression-lexer';
import { ExpressionParser } from './expression-parser';
import { OPERATORS_MAP } from './interpreter-operator';

export class ExpressionInterpreter {
  public interpret(expression: string): number {
    const lexer = new ExpressionLexer(expression);
    const parser = new ExpressionParser(lexer);
    const tokens = parser.parse();
    return this.evaluate(tokens);
  }

  /**
   * Evaluate tokens respecting precedence rules.
   */
  protected evaluate(tokens: string[]): number {
    while (tokens.length > 1) {
      const token = this.checkCurrentTokenAndComputeExpression(tokens);
      tokens.push(token as string);
    }
    return +(tokens.pop() as string);
  }

  protected checkCurrentTokenAndComputeExpression(
    tokens: string[]
  ): string | number {
    const token = tokens.shift() as string;
    const leftOperand = tokens[0];
    const rightOperand = tokens[1];

    if (this.isCurrentExpression(leftOperand, rightOperand)) {
      // drop left and right operands
      tokens.shift();
      tokens.shift();
      return this.evaluateOperands(token, leftOperand, rightOperand);
    }
    return token;
  }

  protected isCurrentExpression(
    leftOperand: string,
    rightOperand: string
  ): boolean {
    return !OPERATORS_MAP.get(leftOperand) && !OPERATORS_MAP.get(rightOperand);
  }

  protected evaluateOperands(
    operator: string,
    leftOperand: string,
    rightOperand: string
  ): number {
    const clazz = OPERATORS_MAP.get(operator);
    const expression = new clazz(
      new ValueExpression(+leftOperand),
      new ValueExpression(+rightOperand)
    );
    return expression.evaluate();
  }
}
