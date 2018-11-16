/**
 * Spaces should be respected between operands and operators
 * 3+5-2 is not valid, it should be 3 + 5 - 2
 * 3+-5*2 is not valid, it should be 3 + -5 * 2
 */
export class ExpressionLexer {
  public constructor(protected expression: string) {}

  /**
   * Transform an expression string into array of tokens
   * 3 + 2 * 8 => [3, +, 2, *, 8]
   */
  public tokenize(): string[] {
    // split with capturing to keep operators
    return this.expression
      .split(/( + | - | * | \/ |\(|\))/)
      .map(item => item.trim())
      .filter(Boolean);
  }
}
