import { ExpressionLexer } from '../src/expression/interpreter/expression-lexer';

describe('Tokenize expressions using ExpressionLexer class', () => {
  test('should return empty array', () => {
    const lexer = new ExpressionLexer('');
    expect(lexer.tokenize()).toEqual([]);
  });

  test("'((5 + 9))' should throw an exception for unnecessary parentheses", () => {
    const lexer = new ExpressionLexer('((5 + 9))');
    expect(() => lexer.tokenize()).toThrowError();
  });

  test("'((5 + (8 * 3)))' should throw an exception for unnecessary parentheses", () => {
    const lexer = new ExpressionLexer('((5 + (8 * 3)))');
    expect(() => lexer.tokenize()).toThrowError();
  });

  test("'5 + 8' should return [+, 5, 8]", () => {
    const lexer = new ExpressionLexer('5 + 8');
    expect(lexer.tokenize()).toEqual(['+', '5', '8']);
  });

  test("'5 + 8 * 3' should return [+, 5, *, 8, 3]", () => {
    const lexer = new ExpressionLexer('5 + 8 * 3');
    expect(lexer.tokenize()).toEqual(['+', '5', '*', '8', '3']);
  });

  test("'5 + 8 * -3 / 5' should return [+, 5, *, 8, /, -3, 5]", () => {
    const lexer = new ExpressionLexer('5 + 8 * -3 / 5');
    expect(lexer.tokenize()).toEqual(['+', '5', '*', '8', '/', '-3', '5']);
  });

  test("'5+8' should return [5+8] and not [+, 5, 8]", () => {
    const lexer = new ExpressionLexer('5+8');
    expect(lexer.tokenize()).toEqual(['5+8']);
  });

  test("'(5 + 8)' should return [+, 5, 8]", () => {
    const lexer = new ExpressionLexer('(5 + 8)');
    expect(lexer.tokenize()).toEqual(['+', '5', '8']);
  });

  test("'(5 + (8 * 3))' should return [+, 5, *, 8, 3]", () => {
    const lexer = new ExpressionLexer('(5 + (8 * 3))');
    expect(lexer.tokenize()).toEqual(['+', '5', '*', '8', '3']);
  });

  test("'(5 + 8 * 3)' should return [+, 5, *, 8, 3]", () => {
    const lexer = new ExpressionLexer('(5 + 8 * 3)');
    expect(lexer.tokenize()).toEqual(['+', '5', '*', '8', '3']);
  });

  test("'(5 + 8) * 3' should return [*, +, 5, 8]", () => {
    const lexer = new ExpressionLexer('(5 + 8) * 3');
    expect(lexer.tokenize()).toEqual(['*', '+', '5', '8', '3']);
  });

  test("'(6 + 8 * 3) + 5' should be tokenized", () => {
    const lexer = new ExpressionLexer('(6 + 8 * 3) + 5');
    expect(lexer.tokenize()).toEqual(['+', '+', '6', '*', '8', '3', '5']);
  });

  test("'5 + (6 + 8 * 3) - 2' should be tokenized", () => {
    const lexer = new ExpressionLexer('5 + (6 + 8 * 3) - 2');
    const res = ['+', '5', '-', '+', '6', '*', '8', '3', '2'];
    expect(lexer.tokenize()).toEqual(res);
  });

  test("'5 * ((6 + 8) * 3) - 2' should be tokenized", () => {
    const lexer = new ExpressionLexer('5 * ((6 + 8) * 3) - 2');
    const res = ['-', '*', '5', '*', '+', '6', '8', '3', '2'];
    expect(lexer.tokenize()).toEqual(res);
  });

  test("'(-5 + 8) * (-3 + -2) * (5 - -1)' should be tokenized", () => {
    const lexer = new ExpressionLexer('(-5 + 8) * (-3 + -2) * (5 - -1)');
    const res = ['*', '+', '-5', '8', '*', '+', '-3', '-2', '-', '5', '-1'];
    expect(lexer.tokenize()).toEqual(res);
  });

  test("'(-5 - -8) * (-3 + -2) * (5 - 1)' should be tokenized", () => {
    const lexer = new ExpressionLexer('(-5 - -8) * (-3 + -2) * (5 - 1)');
    const res = ['*', '-', '-5', '-8', '*', '+', '-3', '-2', '-', '5', '1'];
    expect(lexer.tokenize()).toEqual(res);
  });
});
