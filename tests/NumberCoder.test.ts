import { NumberCoder } from '../src/NumberCoder';

describe('NumberCoder', () => {
  test('success / кодирование валидного числа', () => {
    const num = 135487;
    const code = NumberCoder.encode(num);
    expect(code).toHaveLength(6);
    expect(NumberCoder.decode(code)).toBe(num);
  });

  test('success / кодирование числа 0', () => {
    expect(NumberCoder.encode(0)).toBe('000000');
  });

  test('success / код для 35^6 - 1 (максимльное значение)', () => {
    const max = Math.pow(36, 6) - 1;
    const code = NumberCoder.encode(max);
    expect(code).toBe('ZZZZZZ');
    expect(NumberCoder.decode(code)).toBe(max);
  });

  test('success / число для валидного кода', () => {
    const code = '000001';
    expect(NumberCoder.decode(code)).toBe(1);
  });

  test('error / неверная длина кода', () => {
    expect(() => NumberCoder.decode('ABC')).toThrow();
    expect(() => NumberCoder.decode('ABCDEFG')).toThrow();
  });

  test('error / недопустимые символы', () => {
    expect(() => NumberCoder.decode('ABC1!F')).toThrow();
    expect(() => NumberCoder.decode('abc123')).toThrow();
  });

  test('error / неверный тип и нецелое число', () => {
    expect(() => NumberCoder.encode('123' as any)).toThrow();
    expect(() => NumberCoder.encode(123.456)).toThrow();
  });

  test('error / число выходит за пределы 36^6', () => {
    expect(() => NumberCoder.encode(-1)).toThrow();
    const tooLarge = Math.pow(36, 6);
    expect(() => NumberCoder.encode(tooLarge)).toThrow();
    console.log(NumberCoder.encode(0))
    console.log(NumberCoder.encode(1))
    console.log(NumberCoder.encode(135_487))
    console.log(NumberCoder.encode(535_487))
    console.log(NumberCoder.encode(Math.pow(36, 6) - 1))
  });
});
