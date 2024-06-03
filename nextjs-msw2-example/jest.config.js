const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // https://mswjs.io/docs/migrations/1.x-to-2.x#remap-fetch-api-globals
  setupFiles: ["./jest.polyfills.js"],
  testEnvironment: "jsdom",
  // reference: https://stackoverflow.com/questions/77399773/cannot-find-module-msw-node-from
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  // transform: {
  //   "^.+\\.tsx?$": "@swc/jest",
  // },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
