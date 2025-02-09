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

  test('success / использование соли', () => {
    const num = 135487;
    const salt = 'dkqwndj!2e2i2dqw@';
    const another_salt = 'dkqwndj!2e2i1dqw@';
    
    const code = NumberCoder.encode(num);
    expect(code).toHaveLength(6);
    expect(NumberCoder.decode(code)).toBe(num);
    
    const salted_code = NumberCoder.encode(num, salt);
    expect(salted_code).toHaveLength(6);
    expect(NumberCoder.decode(salted_code, salt)).toBe(num);

    const correct_salt_decoded = NumberCoder.decode(salted_code, salt)
    const incorrect_salt_decoded = NumberCoder.decode(salted_code, another_salt)
    expect(correct_salt_decoded).not.toBe(incorrect_salt_decoded);

    console.log(code)
    console.log(salted_code)
    console.log(correct_salt_decoded)
    console.log(incorrect_salt_decoded)
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
  });
});
