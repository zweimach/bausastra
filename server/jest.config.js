module.exports = {
  displayName: "server",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/?(*.)(spec|test).js"],
  transform: {
    "\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.js$"],
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
};
