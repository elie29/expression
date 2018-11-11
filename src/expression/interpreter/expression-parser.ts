import { ExpressionLexer } from './expression-lexer';
import { InterpreterNode } from './interpreter-node';

export class ExpressionParser {
  public constructor(protected lexer: ExpressionLexer) {}

  /**
   * Transform array of expressions to AST
   */
  public parse(): InterpreterNode {
    const tokens = this.lexer.tokenize();
    // at least 3 elements to be valid
    if (tokens.length < 3) {
      throw new Error('Invalid Expression could not be parsed');
    }
    return this.toNodeTree(tokens);
  }

  protected toNodeTree(tokens: string[]): InterpreterNode {
    const root = new InterpreterNode(tokens.shift());
    while (tokens.length) {
      root.insert(tokens.shift() as string);
    }
    return root;
  }
}
