describe('Expressions with operator precedence', () => {
  test('1 + 6 + 5 * 8 should return 47', () => {
    expect(1 + 6 + 5 * 8).toBe(47);
  });

  test('1 + (6 + 5) * 8 should return 89', () => {
    expect(1 + (6 + 5) * 8).toBe(89);
  });

  test('(1 + 6 + 5) * 8 should return 96', () => {
    expect((1 + 6 + 5) * 8).toBe(96);
  });
});
