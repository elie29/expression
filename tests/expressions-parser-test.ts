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

  test("'5 + 8' should be parsed", () => {
    const lexer = new ExpressionLexer('5 + 8');
    const parser = new ExpressionParser(lexer);
    const res = { data: '+', left: { data: '5' }, right: { data: '8' } };
    expect(parser.parse()).toEqual(res);
  });

  test("'5 + 8 * 3' should be parsed", () => {
    const lexer = new ExpressionLexer('5 + 8 * 3');
    const parser = new ExpressionParser(lexer);
    const res = {
      data: '+',
      left: { data: '5' },
      right: { data: '*', left: { data: '8' }, right: { data: '3' } }
    };
    expect(parser.parse()).toEqual(res);
  });

  test("'5 + 8 * -3 / 5' should be parsed", () => {
    const lexer = new ExpressionLexer('5 + 8 * -3 / 5');
    const parser = new ExpressionParser(lexer);
    const res = {
      data: '+',
      left: { data: '5' },
      right: {
        data: '*',
        left: { data: '8' },
        right: { data: '/', left: { data: '-3' }, right: { data: '5' } }
      }
    };
    expect(parser.parse()).toEqual(res);
  });

  test("'(5 + 8)' should be parsed", () => {
    const lexer = new ExpressionLexer('(5 + 8)');
    const parser = new ExpressionParser(lexer);
    const res = {
      data: '+',
      left: { data: '5' },
      right: { data: '8' }
    };
    expect(parser.parse()).toEqual(res);
  });

  test("'(5 + 8) * 3' should be parsed", () => {
    const lexer = new ExpressionLexer('(5 + 8) * 3');
    const parser = new ExpressionParser(lexer);
    const res = {
      data: '*',
      left: { data: '+', left: { data: '5' }, right: { data: '8' } },
      right: { data: '3' }
    };
    expect(parser.parse()).toEqual(res);
  });

  test("'(-5 + 8) * (-3 + -2) * (5 - -1)' should be parsed", () => {
    const lexer = new ExpressionLexer('(-5 + 8) * (-3 + -2) * (5 - -1)');
    const parser = new ExpressionParser(lexer);
    const res = {
      data: '*',
      left: { data: '+', left: { data: '-5' }, right: { data: '8' } },
      right: {
        data: '*',
        left: { data: '+', left: { data: '-3' }, right: { data: '-2' } },
        right: { data: '-', left: { data: '5' }, right: { data: '-1' } }
      }
    };
    expect(parser.parse()).toEqual(res);
  });

  test("'(-5 - -8) * (-3 + -2) * (5 - 1)' should be parsed", () => {
    const lexer = new ExpressionLexer('(-5 - -8) * (-3 + -2) * (5 - 1)');
    const parser = new ExpressionParser(lexer);
    const res = {
      data: '*',
      left: { data: '-', left: { data: '-5' }, right: { data: '-8' } },
      right: {
        data: '*',
        left: { data: '+', left: { data: '-3' }, right: { data: '-2' } },
        right: { data: '-', left: { data: '5' }, right: { data: '1' } }
      }
    };
    expect(parser.parse()).toEqual(res);
  });
});
