import { ExpressionLexer } from '../src/expression/interpreter/expression-lexer';

describe('Tokenize expressions using ExpressionLexer class', () => {
  test('should return empty array', () => {
    const lexer = new ExpressionLexer('');
    expect(lexer.tokenize()).toEqual([]);
  });

  test("'5 + 8' should should be tokenized", () => {
    const lexer = new ExpressionLexer('5 + 8');
    expect(lexer.tokenize()).toEqual(['5', '+', '8']);
  });

  test("'5 + 8 * 3' should should be tokenized", () => {
    const lexer = new ExpressionLexer('5 + 8 * 3');
    expect(lexer.tokenize()).toEqual(['5', '+', '8', '*', '3']);
  });

  test("'(-5 + 8) * (-3 + -2) * (5 - -1)' should be tokenized", () => {
    const lexer = new ExpressionLexer('(-5 + 8) * (-3 + -2) * (5 - -1)');
    const res = [
      '(',
      '-5',
      '+',
      '8',
      ')',
      '*',
      '(',
      '-3',
      '+',
      '-2',
      ')',
      '*',
      '(',
      '5',
      '-',
      '-1',
      ')'
    ];
    expect(lexer.tokenize()).toEqual(res);
  });
});
