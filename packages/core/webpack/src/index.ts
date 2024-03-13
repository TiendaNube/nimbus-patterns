import {
  utils,
  rules,
  plugins,
  configuration as baseConfiguration,
} from "@nimbus-ds/webpack";

import { externalLibs, base, getConfiguration } from "./config";

export const configuration = {
  ...baseConfiguration,
  getConfiguration,
  base,
  externalLibs,
};

const webpack = {
  rules,
  plugins,
  configuration,
  utils,
};

export default webpack;
