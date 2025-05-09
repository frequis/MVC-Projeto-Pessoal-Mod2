module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      'controllers/**/*.js',
      'models/**/*.js',
      'routes/**/*.js',
      '!**/node_modules/**',
    ],
    coverageDirectory: 'coverage',
  };
  