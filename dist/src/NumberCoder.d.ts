export declare class NumberCoder {
    private static readonly CODE_LENGTH;
    private static readonly BASE;
    private static readonly MAX_VALUE;
    /**
     * Кодирует число в 6-символьный код.
     * Если передана соль, применяется сдвиг, зависящий от соли, для дополнительной обфускации.
     * @param num Число (целое, от 0 до MAX_VALUE).
     * @param salt (необязательно) Строка-соль для обфускации.
     * @returns Код в виде строки длиной 6 символов.
     * @throws Error если входное значение не соответствует требованиям.
     */
    static encode(num: number, salt?: string): string;
    /**
     * Декодирует 6-символьный код обратно в число.
     * Если передана соль, производится обратный сдвиг для расшифровки.
     * @param code Строка длиной 6 символов, состоящая из цифр 0-9 и букв A-Z.
     * @param salt (необязательно) Строка-соль для расшифровки.
     * @returns Исходное число.
     * @throws Error если входная строка не соответствует требованиям.
     */
    static decode(code: string, salt?: string): number;
    /**
     * Вычисляет числовое значение соли на основе переданной строки.
     * Используется простая хэш-функция, зависящая от символов строки.
     * @param salt Соль.
     * @returns Числовое значение соли.
     */
    private static computeSalt;
}
