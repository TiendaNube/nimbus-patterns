import {
  utils,
  rules,
  plugins,
  configuration as baseConfiguration,
} from "@nimbus-ds/webpack";

import {
  externalLibs,
  externalPackages,
  base,
  getConfiguration
} from "./config";

export const configuration = {
  ...baseConfiguration,
  getConfiguration,
  base,
  externalLibs,
  externalPackages,
};

const webpack = {
  rules,
  plugins,
  configuration,
  utils,
};

export default webpack;
