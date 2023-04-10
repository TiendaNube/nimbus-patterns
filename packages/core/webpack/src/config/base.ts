/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import { rules, utils, configuration, plugins } from "@nimbus-ds/webpack";
import merge from "webpack-merge";
import { Configuration } from "webpack";

import { externalItems } from "./external";
import { aliasItems } from "./alias";

const webpack: Configuration = {
  target: "node",
  mode: utils.isProduction ? "production" : "development",
  entry: {
    "./index": "./src/index.ts",
  },
  output: {
    filename: "[name].js",
    libraryTarget: "umd",
  },
  module: {
    rules: utils.arrayFilterEmpty([rules.typescriptRule, rules.svgRule]),
  },
  plugins: [plugins.dtsBundleGeneratorPlugin()],
  resolve: {
    alias: aliasItems,
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: externalItems,
};

export const getConfiguration = (config?: Configuration) =>
  utils.isProduction
    ? merge(webpack, configuration.production, config || {})
    : merge(webpack, configuration.development, config || {});

export default getConfiguration();
