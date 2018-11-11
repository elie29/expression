import { Expression } from '../expression';
import { ValueExpression } from '../value-expression';
import { ExpressionLexer } from './expression-lexer';
import { ExpressionParser } from './expression-parser';
import { InterpreterNode } from './interpreter-node';
import { OPERATORS_MAP } from './interpreter-operator';

export class ExpressionInterpreter {
  public interpret(expression: string): number {
    const lexer = new ExpressionLexer(expression);
    const parser = new ExpressionParser(lexer);
    const tree = parser.parse();
    return this.evaluate(tree);
  }

  protected evaluate(tree: InterpreterNode): number {
    const expression = this.traverse(tree);
    return expression.evaluate();
  }

  protected traverse(node: InterpreterNode): Expression {
    const expression = OPERATORS_MAP.get(node.data);
    if (!expression) {
      return new ValueExpression(+node.data);
    }
    return new expression(
      this.traverse(node.getLeft()),
      this.traverse(node.getRight())
    );
  }
}
