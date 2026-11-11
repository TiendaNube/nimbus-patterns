import {
  utils,
  rules,
  configuration as baseConfiguration,
} from "@nimbus-ds/webpack";

import { externalLibs, base, getConfiguration } from "./config";
import { plugins } from "./plugins";

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
