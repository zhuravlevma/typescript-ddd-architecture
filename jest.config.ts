import { Config } from 'jest';

const config: Config = {
  // Указываем корневые директории для тестов
  roots: ['<rootDir>/src', '<rootDir>/test'],

  // Регулярное выражение для поиска тестов
  testRegex: '.*\\.spec\\.ts$', // Для файлов с окончанием `.spec.ts`

  // Игнорируем эти пути при поиске тестов
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Какие расширения модулей нужно обрабатывать
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Преобразование TypeScript в JavaScript перед тестами
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Указываем окружение для выполнения тестов
  testEnvironment: 'node',

  // Чистим mock между тестами
  clearMocks: true,

  // Покрытие кода тестами
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.(t|j)s', // Указываем файлы для покрытия
    '!src/main.ts', // Исключаем main.ts
    '!src/**/*.module.ts', // Исключаем модули
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'], // Форматы отчётов покрытия
};

export default config;
