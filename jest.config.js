module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  moduleDirectories: [
    "node_modules"
  ],

  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
