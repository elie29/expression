import {
  hasHighPrecedence,
  hasLowPrecedence,
  LEFT_PARENTHESIS,
  parenthesesMapToIndex,
  RIGHT_PARENTHESIS
} from './interpreter-operator';

/**
 * const a = (((3 + 5))) would be changed in any editor to a = 3 + 5
 * so unnecessary parentheses will throw an exception
 * and won't be tokenized, check expressions-lexer-test.ts for more details.
 *
 * Spaces should be respected between operands and operators
 * 3+5-2 is not valid, it should be 3 + 5 - 2
 * 3+-5*2 is not valid, it should be 3 + -5 * 2
 */
export class ExpressionLexer {
  public constructor(protected expression: string) {}

  /**
   * 3 * (5 + 8) returns ['*', '3', '+', '5', '8']
   * 3 + 5 * -8 returns ['+', '3', '*', '5', '-8']
   */
  public tokenize(): string[] {
    const tokens = this.split();
    return this.mergeAll(tokens);
  }

  /**
   * 3 + 5 * -8 returns ['3', '+', '5', '*', '-8']
   */
  protected split(): string[] {
    // split with capturing to keep operators
    return this.expression
      .split(/( + | - | * | \/ |\(|\))/)
      .map(item => item.trim())
      .filter(Boolean);
  }

  /**
   * Inspired from mergeSort Algorithm
   */
  protected mergeAll(tokens: string[]): string[] {
    tokens = this.dropFirstBlockParentheses(tokens);
    const index = this.findPrecedenceIndex(tokens);
    const left = tokens.slice(0, index);
    const right = tokens.slice(index + 1);

    if (left.length <= 1 && right.length <= 1) {
      return this.merge(tokens[index], left, right);
    }
    return this.merge(tokens[index], this.mergeAll(left), this.mergeAll(right));
  }

  protected dropFirstBlockParentheses(tokens: string[]): string[] {
    if (!tokens.includes(LEFT_PARENTHESIS)) {
      return tokens;
    }
    const last = tokens.length - 1;
    if (tokens[0] !== LEFT_PARENTHESIS || tokens[last] !== RIGHT_PARENTHESIS) {
      return tokens;
    }
    const dropped = tokens.slice(1, last);
    return this.isInvalidSyntax(dropped) ? tokens : dropped;
  }

  /**
   * (a OP b) OP (c OP d): in this case parentheses should not be deleted
   */
  protected isInvalidSyntax(tokens: string[]): boolean {
    let open = 0;
    return tokens.some(token => {
      open += parenthesesMapToIndex.get(token) || 0;
      // stop when a closed parenthesis is before an opened one
      return open < 0;
    });
  }

  protected findPrecedenceIndex(tokens: string[]): number {
    return tokens.length <= 1 ? tokens.length : this.findPrecedence(tokens);
  }

  protected findPrecedence(tokens: string[]): number {
    const items = this.hideSubOperators(tokens);
    const index = this.lowIndex(items) || this.highIndex(items);
    // Operator was found ?
    if (index > 0) {
      return index;
    }
    throw new Error('Invalid expression!');
  }

  /**
   * All sub operators will be replaced by empty string
   * @returns a new structure for lookup purpose
   */
  protected hideSubOperators(tokens: string[]): string[] {
    if (!tokens.includes(LEFT_PARENTHESIS)) {
      return tokens;
    }
    let hideAfter = 0;
    return tokens.map(token => {
      hideAfter += parenthesesMapToIndex.get(token) || 0;
      return hideAfter > 0 ? '' : token;
    });
  }

  protected lowIndex(tokens: string[]): number {
    return this.index(tokens, hasLowPrecedence);
  }

  protected highIndex(tokens: string[]): number {
    return this.index(tokens, hasHighPrecedence);
  }

  /**
   * Index zero should not exist and would throw an error!
   */
  protected index(tokens: string[], callback: Function): number {
    const index = tokens.findIndex(token => callback(token));
    return index <= 0 ? 0 : index;
  }

  protected merge(operator: string, left: string[], right: string[]): string[] {
    if (operator) {
      return [operator, ...left, ...right];
    }
    return [...left, ...right];
  }
}
