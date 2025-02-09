# NumberCoder Library
Используется 36-ричная система счисления (цифры 0-9 и буквы A-Z).

## Установка и запуск
1. Клонируйте репозиторий.
2. Установите зависимости, выполнив:

   ```bash
   npm install

## Пример кодированных значений
NumberCoder.encode(0)  //returns 000000
NumberCoder.encode(1)  //returns 000001
NumberCoder.encode(135_487)  //returns 002WJJ
NumberCoder.encode(535_487)  //returns 00BH6N
NumberCoder.encode(Math.pow(36, 6) - 1)  //returns ZZZZZZ