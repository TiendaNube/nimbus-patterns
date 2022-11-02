import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["dist"],
};

export default config;
