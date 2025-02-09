export class NumberCoder {
    private static readonly CODE_LENGTH = 6;
    private static readonly BASE = 36;
    // Максимальное число, которое можно закодировать в 6 символов: 36^6 - 1
    private static readonly MAX_VALUE = Math.pow(NumberCoder.BASE, NumberCoder.CODE_LENGTH) - 1;
  
    /**
     * Кодирует число в 6-символьный код.
     * @param num Число (целое, от 0 до MAX_VALUE).
     * @returns Код в виде строки длиной 6 символов.
     * @throws Error если входное значение не соответствует требованиям.
     */
    public static encode(num: number): string {
      if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new Error('Входное значение должно быть целым числом.');
      }
      if (num < 0 || num > NumberCoder.MAX_VALUE) {
        throw new Error(`Число должно быть в диапазоне от 0 до ${NumberCoder.MAX_VALUE}.`);
      }
  
      // Преобразуем число в строку в 36-тиричной системе и переводим в верхний регистр
      const encoded = num.toString(NumberCoder.BASE).toUpperCase();
  
      // Если длина меньше 6, дополняем ведущими нулями
      return encoded.padStart(NumberCoder.CODE_LENGTH, '0');
    }
  
    /**
     * Декодирует 6-символьный код обратно в число.
     * @param code Строка длиной 6 символов, состоящая из цифр 0-9 и букв A-Z.
     * @returns Исходное число.
     * @throws Error если входная строка не соответствует требованиям.
     */
    public static decode(code: string): number {
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
      return num;
    }
  }
  