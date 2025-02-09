"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberCoder = void 0;
class NumberCoder {
    /**
     * Кодирует число в 6-символьный код.
     * Если передана соль, применяется сдвиг, зависящий от соли, для дополнительной обфускации.
     * @param num Число (целое, от 0 до MAX_VALUE).
     * @param salt (необязательно) Строка-соль для обфускации.
     * @returns Код в виде строки длиной 6 символов.
     * @throws Error если входное значение не соответствует требованиям.
     */
    static encode(num, salt) {
        if (typeof num !== 'number' || !Number.isInteger(num)) {
            throw new Error('Входное значение должно быть целым числом.');
        }
        if (num < 0 || num > NumberCoder.MAX_VALUE) {
            throw new Error(`Число должно быть в диапазоне от 0 до ${NumberCoder.MAX_VALUE}.`);
        }
        let transformedNum = num;
        if (salt !== undefined) {
            const mod = NumberCoder.MAX_VALUE + 1;
            const saltShift = NumberCoder.computeSalt(salt);
            transformedNum = (num + saltShift) % mod;
        }
        // Преобразуем число в строку в 36-тиричной системе счисления и переводим в верхний регистр
        const encoded = transformedNum.toString(NumberCoder.BASE).toUpperCase();
        // Если длина меньше 6, дополняем ведущими нулями
        return encoded.padStart(NumberCoder.CODE_LENGTH, '0');
    }
    /**
     * Декодирует 6-символьный код обратно в число.
     * Если передана соль, производится обратный сдвиг для расшифровки.
     * @param code Строка длиной 6 символов, состоящая из цифр 0-9 и букв A-Z.
     * @param salt (необязательно) Строка-соль для расшифровки.
     * @returns Исходное число.
     * @throws Error если входная строка не соответствует требованиям.
     */
    static decode(code, salt) {
        if (typeof code !== 'string') {
            throw new Error('Входное значение должно быть строкой.');
        }
        if (code.length !== NumberCoder.CODE_LENGTH) {
            throw new Error(`Код должен состоять ровно из ${NumberCoder.CODE_LENGTH} символов.`);
        }
        if (!/^[0-9A-Z]+$/.test(code)) {
            throw new Error('Код содержит недопустимые символы. Разрешены только цифры 0-9 и буквы A-Z.');
        }
        const num = parseInt(code, NumberCoder.BASE);
        if (isNaN(num)) {
            throw new Error('Не удалось декодировать код.');
        }
        let originalNum = num;
        if (salt !== undefined) {
            const mod = NumberCoder.MAX_VALUE + 1;
            const saltShift = NumberCoder.computeSalt(salt);
            // Обратный сдвиг с учётом возможного отрицательного результата
            originalNum = (num - saltShift) % mod;
            if (originalNum < 0) {
                originalNum += mod;
            }
        }
        return originalNum;
    }
    /**
     * Вычисляет числовое значение соли на основе переданной строки.
     * Используется простая хэш-функция, зависящая от символов строки.
     * @param salt Соль.
     * @returns Числовое значение соли.
     */
    static computeSalt(salt) {
        const mod = NumberCoder.MAX_VALUE + 1;
        let hash = 0;
        for (let i = 0; i < salt.length; i++) {
            hash = (hash * 31 + salt.charCodeAt(i)) % mod;
        }
        return hash;
    }
}
exports.NumberCoder = NumberCoder;
NumberCoder.CODE_LENGTH = 6;
NumberCoder.BASE = 36;
// Максимальное число, которое можно закодировать в 6 символов: 36^6 - 1
NumberCoder.MAX_VALUE = Math.pow(NumberCoder.BASE, NumberCoder.CODE_LENGTH) - 1;
