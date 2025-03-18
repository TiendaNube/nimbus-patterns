/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import { rules, utils, configuration, plugins } from "@nimbus-ds/webpack";
import merge from "webpack-merge";
import { Configuration } from "webpack";

import { WebpackBaseConfig } from "@nimbus-ds/webpack/dist/utils";
import { externalItems } from "./external";
import { aliasItems } from "./alias";

const webpack = ({
  dtsBundleConfig,
  packageJsonConfig,
  useClientInjectionOptions,
}: WebpackBaseConfig = {}): Configuration => ({
  target: "node",
  mode: utils.isProduction ? "production" : "development",
  entry: {
    "./index": "./src/index.ts",
  },
  output: {
    filename: (pathData) =>
      pathData.chunk?.name === "./index" ? "[name].js" : "[name]/index.js",
    library: {
      name: ["@nimbus-ds", "[name]"],
      type: "umd",
    },
    libraryTarget: "umd",
  },
  module: {
    rules: utils.arrayFilterEmpty([rules.typescriptRule, rules.svgRule]),
  },
  plugins: [
    plugins.dtsBundleGeneratorPlugin(dtsBundleConfig),
    new plugins.MoveFilesIntoDistFolderPlugin(packageJsonConfig),
    new plugins.UseClientInjectionPlugin(useClientInjectionOptions),
  ],
  resolve: {
    alias: aliasItems,
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: externalItems,
});

export const getConfiguration = (
  config?: Configuration,
  extraParams?: WebpackBaseConfig
) =>
  utils.isProduction
    ? merge(webpack(extraParams), configuration.production, config || {})
    : merge(webpack(), configuration.development, config || {});

export default getConfiguration();
