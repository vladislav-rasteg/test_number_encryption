"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberCoder_1 = require("../src/NumberCoder");
describe('NumberCoder', () => {
    test('success / кодирование валидного числа', () => {
        const num = 135487;
        const code = NumberCoder_1.NumberCoder.encode(num);
        expect(code).toHaveLength(6);
        expect(NumberCoder_1.NumberCoder.decode(code)).toBe(num);
    });
    test('success / кодирование числа 0', () => {
        expect(NumberCoder_1.NumberCoder.encode(0)).toBe('000000');
    });
    test('success / код для 35^6 - 1 (максимльное значение)', () => {
        const max = Math.pow(36, 6) - 1;
        const code = NumberCoder_1.NumberCoder.encode(max);
        expect(code).toBe('ZZZZZZ');
        expect(NumberCoder_1.NumberCoder.decode(code)).toBe(max);
    });
    test('success / использование соли', () => {
        const num = 135487;
        const salt = 'dkqwndj!2e2i2dqw@';
        const another_salt = 'dkqwndj!2e2i1dqw@';
        const code = NumberCoder_1.NumberCoder.encode(num);
        expect(code).toHaveLength(6);
        expect(NumberCoder_1.NumberCoder.decode(code)).toBe(num);
        const salted_code = NumberCoder_1.NumberCoder.encode(num, salt);
        expect(salted_code).toHaveLength(6);
        expect(NumberCoder_1.NumberCoder.decode(salted_code, salt)).toBe(num);
        const correct_salt_decoded = NumberCoder_1.NumberCoder.decode(salted_code, salt);
        const incorrect_salt_decoded = NumberCoder_1.NumberCoder.decode(salted_code, another_salt);
        expect(correct_salt_decoded).not.toBe(incorrect_salt_decoded);
        console.log(code);
        console.log(salted_code);
        console.log(correct_salt_decoded);
        console.log(incorrect_salt_decoded);
    });
    test('success / число для валидного кода', () => {
        const code = '000001';
        expect(NumberCoder_1.NumberCoder.decode(code)).toBe(1);
    });
    test('error / неверная длина кода', () => {
        expect(() => NumberCoder_1.NumberCoder.decode('ABC')).toThrow();
        expect(() => NumberCoder_1.NumberCoder.decode('ABCDEFG')).toThrow();
    });
    test('error / недопустимые символы', () => {
        expect(() => NumberCoder_1.NumberCoder.decode('ABC1!F')).toThrow();
        expect(() => NumberCoder_1.NumberCoder.decode('abc123')).toThrow();
    });
    test('error / неверный тип и нецелое число', () => {
        expect(() => NumberCoder_1.NumberCoder.encode('123')).toThrow();
        expect(() => NumberCoder_1.NumberCoder.encode(123.456)).toThrow();
    });
    test('error / число выходит за пределы 36^6', () => {
        expect(() => NumberCoder_1.NumberCoder.encode(-1)).toThrow();
        const tooLarge = Math.pow(36, 6);
        expect(() => NumberCoder_1.NumberCoder.encode(tooLarge)).toThrow();
    });
});
