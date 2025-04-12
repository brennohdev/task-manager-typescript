/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // Adicionando o preset ts-jest
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Certificando-se de que o ts-jest use o tsconfig correto
    },
  },
};
