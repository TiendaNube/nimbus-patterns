import path from "path";
import { configuration } from "@nimbus-ds/patterns-webpack/src";

const baseConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "@nimbus-ds/patterns",
  },
};

const config = configuration.getConfiguration(baseConfig);
Reflect.deleteProperty(config, "externals");
config.externals = configuration.externalLibs;
export default () => config;
