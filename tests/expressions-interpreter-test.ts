import { ExpressionInterpreter } from '../src/expression/interpreter/expression-interpreter';

describe('Parse expressions using ExpressionParser class', () => {
  test('should throw an exception', () => {
    const interpreter = new ExpressionInterpreter();
    expect(() => interpreter.interpret('')).toThrowError();
  });

  test("'5+8' should throw an exception", () => {
    const interpreter = new ExpressionInterpreter();
    expect(() => interpreter.interpret('5+8')).toThrowError();
  });

  test("'5 + 8' should return 13", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('5 + 8')).toEqual(5 + 8);
  });

  test("'5 + 8 * 3' should return 29", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('5 + 8 * 3')).toEqual(5 + 8 * 3);
  });

  test("'5 + 8 * -3 / 5' should be close to 0.2", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('5 + 8 * -3 / 5')).toEqual(5 + (8 * -3) / 5);
    expect(interpreter.interpret('5 + 8 * -3 / 5')).toEqual(5 + 8 * (-3 / 5));
    expect(interpreter.interpret('5 + (8 * -3) / 5')).toEqual(5 + (8 * -3) / 5);
  });

  test("'(5 + 8)' should return 13", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('(5 + 8)')).toEqual(5 + 8);
  });

  test("'(5 + 8) * 3' should return 39", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('(5 + 8) * 3')).toEqual((5 + 8) * 3);
    expect(interpreter.interpret('3 * (5 + 8)')).toEqual(3 * (5 + 8));
  });

  test("'(5 + 8 * 3)' should return 29", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('(5 + 8 * 3)')).toEqual(29);
  });

  test("'(6 + 8 * 3) + 5' should return 35", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('(6 + 8 * 3) + 5')).toEqual(35);
  });

  test("'(5 * (2 + 3)) / 4' should return 6.25", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('(5 * (2 + 3)) / 4')).toEqual(6.25);
  });

  test("'5 + (6 + 8 * 3) - 2' should return 33", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('5 + (6 + 8 * 3) - 2')).toEqual(33);
  });

  test("'5 * ((6 + 8) * 3) - 2' should return 208", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('5 * ((6 + 8) * 3) - 2')).toEqual(208);
  });

  test("'(-5 + 8) * (-3 + -2) * (5 - -1)' should return -90", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('(-5 + 8) * (-3 + -2) * (5 - -1)')).toEqual(
      -90
    );
  });

  test("'(-5 - -8) * (-3 + -2) * (5 - 1)' should return -60", () => {
    const interpreter = new ExpressionInterpreter();
    expect(interpreter.interpret('(-5 - -8) * (-3 + -2) * (5 - 1)')).toEqual(
      -60
    );
  });

  test("'((-5 + 8) * (-3 + -2) * ((4 + 8) / (5 - -1) - 3) * (-2 - -4) * (5 * (8 + 6)) + 4) * 8' should return 26432", () => {
    const interpreter = new ExpressionInterpreter();
    const exp =
      '((-5 + 8) * (-3 + -2) * ((4 + 8) / (5 - -1) - 3) * (-2 - -4) * (5 * (8 + 6)) + 4) * 8';
    expect(interpreter.interpret(exp)).toEqual(16832);
  });
});
