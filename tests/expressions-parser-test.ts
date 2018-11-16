import { ExpressionLexer } from '../src/expression/interpreter/expression-lexer';
import { ExpressionParser } from '../src/expression/interpreter/expression-parser';

describe('Parse expressions using ExpressionParser class', () => {
  test('should throw an exception', () => {
    const lexer = new ExpressionLexer('');
    const parser = new ExpressionParser(lexer);
    expect(() => parser.parse()).toThrowError();
  });

  test("'5+8' should throw an exception", () => {
    const lexer = new ExpressionLexer('5+8');
    const parser = new ExpressionParser(lexer);
    expect(() => parser.parse()).toThrowError();
  });

  test("'((5 + 9))' should throw an exception for unnecessary parentheses", () => {
    const lexer = new ExpressionLexer('((5 + 9))');
    const parser = new ExpressionParser(lexer);
    expect(() => parser.parse()).toThrowError();
  });

  test("'((5 + (8 * 3)))' should throw an exception for unnecessary parentheses", () => {
    const lexer = new ExpressionLexer('((5 + (8 * 3)))');
    const parser = new ExpressionParser(lexer);
    expect(() => parser.parse()).toThrowError();
  });

  test("'5 + 8' should be parsed", () => {
    const lexer = new ExpressionLexer('5 + 8');
    const parser = new ExpressionParser(lexer);
    const res = ['+', '5', '8'];
    expect(parser.parse()).toEqual(res);
  });

  test("'5 + 8 * 3' should be parsed", () => {
    const lexer = new ExpressionLexer('5 + 8 * 3');
    const parser = new ExpressionParser(lexer);
    const res = ['+', '5', '*', '8', '3'];
    expect(parser.parse()).toEqual(res);
  });

  test("'5 + 8 * -3 / 5' should be parsed", () => {
    const lexer = new ExpressionLexer('5 + 8 * -3 / 5');
    const parser = new ExpressionParser(lexer);
    const res = ['+', '5', '*', '8', '/', '-3', '5'];
    expect(parser.parse()).toEqual(res);
  });

  test("'(5 + 8)' should be parsed", () => {
    const lexer = new ExpressionLexer('(5 + 8)');
    const parser = new ExpressionParser(lexer);
    const res = ['+', '5', '8'];
    expect(parser.parse()).toEqual(res);
  });

  test("'(5 + 8) * 3' should be parsed", () => {
    const lexer = new ExpressionLexer('(5 + 8) * 3');
    const parser = new ExpressionParser(lexer);
    const res = ['*', '+', '5', '8', '3'];
    expect(parser.parse()).toEqual(res);
  });

  test("'(6 + 8 * 3) + 5' should be tokenized", () => {
    const lexer = new ExpressionLexer('(6 + 8 * 3) + 5');
    const parser = new ExpressionParser(lexer);
    expect(parser.parse()).toEqual(['+', '+', '6', '*', '8', '3', '5']);
  });

  test("'5 + (6 + 8 * 3) - 2' should be tokenized", () => {
    const lexer = new ExpressionLexer('5 + (6 + 8 * 3) - 2');
    const parser = new ExpressionParser(lexer);
    const res = ['+', '5', '-', '+', '6', '*', '8', '3', '2'];
    expect(parser.parse()).toEqual(res);
  });

  test("'5 * ((6 + 8) * 3) - 2' should be tokenized", () => {
    const lexer = new ExpressionLexer('5 * ((6 + 8) * 3) - 2');
    const parser = new ExpressionParser(lexer);
    const res = ['-', '*', '5', '*', '+', '6', '8', '3', '2'];
    expect(parser.parse()).toEqual(res);
  });

  test("'(-5 + 8) * (-3 + -2) * (5 - -1)' should be parsed", () => {
    const lexer = new ExpressionLexer('(-5 + 8) * (-3 + -2) * (5 - -1)');
    const parser = new ExpressionParser(lexer);
    const res = ['*', '+', '-5', '8', '*', '+', '-3', '-2', '-', '5', '-1'];
    expect(parser.parse()).toEqual(res);
  });

  test("'(-5 - -8) * (-3 + -2) * (5 - 1)' should be parsed", () => {
    const lexer = new ExpressionLexer('(-5 - -8) * (-3 + -2) * (5 - 1)');
    const parser = new ExpressionParser(lexer);
    const res = ['*', '-', '-5', '-8', '*', '+', '-3', '-2', '-', '5', '1'];
    expect(parser.parse()).toEqual(res);
  });
});
