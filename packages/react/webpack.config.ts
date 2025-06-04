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
  entry: webpackEntries,
};

const componentPropsJson = "components-props.json";

const config = configuration.getConfiguration(baseConfig, {
  dtsBundleConfig: {
    entries: [
      `node ../../node_modules/.bin/dts-bundle-generator -o ./dist/index.d.ts ./src/index.ts`,
      ...dtsCommands,
    ],
  },
  packageJsonConfig: {
    transform: (packageJson: any) => {
      packageJson.exports = {
        // Add the main export
        ".": {
          import: "./dist/index.js",
          require: "./dist/index.js",
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
    files: ["CHANGELOG.md", "README.md", componentPropsJson],
  },
});

Reflect.deleteProperty(config, "externals");
config.externals = configuration.externalLibs;

export default () => config;
