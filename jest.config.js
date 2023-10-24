/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  coverageReporters: ["json"],

  setupFilesAfterEnv: ["./tests/jest.setup.js"],

  testMatch: ["<rootDir>/tests/**/*.test.js"],
};

module.exports = config;
