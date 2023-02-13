import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["dist"],
  moduleNameMapper: {
    // atomics
    "@nimbus-ds/menubutton": "<rootDir>/packages/react/MenuButton/src",
    "@nimbus-ds/menu": "<rootDir>/packages/react/Menu/src",
    "@nimbus-ds/page": "<rootDir>/packages/react/Page/src",
  },
};

export default config;
