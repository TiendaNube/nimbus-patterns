import path from "path";
import webpack, { configuration } from "@nimbus-ds/patterns-webpack/src";

const baseDir = path.resolve(__dirname, "src");

const { dtsCommands, packageExports, webpackEntries } =
  webpack.utils.getComponentsPackageExports(baseDir, ["components"]);

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/patterns",
  },
  entry: {
    "./next": path.resolve(baseDir, "next/index.ts"),
    ...webpackEntries,
  },
};

const componentPropsJson = "components-props.json";

const config = configuration.getConfiguration(baseConfig, {
  dtsBundleConfig: {
    entries: [
      `node ../../node_modules/.bin/dts-bundle-generator --no-check -o ./dist/index.d.ts ./src/index.ts`,
      `node ../../node_modules/.bin/dts-bundle-generator --no-check -o ./dist/next/index.d.ts ./src/next/index.ts`,
      ...dtsCommands,
    ],
  },
  packageJsonConfig: {
    transform: (packageJson: any) => {
      packageJson.files = ["dist", "next", "CHANGELOG.md", "README.md"];
      packageJson.typesVersions = {
        "*": {
          next: ["./dist/next/index.d.ts"],
        },
      };
      packageJson.exports = {
        // Add the main export
        ".": {
          import: "./dist/index.js",
          require: "./dist/index.js",
        },
        "./next": {
          types: "./dist/next/index.d.ts",
          import: "./dist/next/index.js",
          require: "./dist/next/index.js",
        },
        // Component props export
        [`./${componentPropsJson}`]: {
          import: `./dist/${componentPropsJson}`,
          require: `./dist/${componentPropsJson}`,
        },
        ...packageExports,
      };
      return packageJson;
    },
    files: ["CHANGELOG.md", "README.md"],
  },
});

Reflect.deleteProperty(config, "externals");
config.externals = configuration.externalLibs;

export default () => config;
