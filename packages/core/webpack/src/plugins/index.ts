import { plugins as basePlugins } from "@nimbus-ds/webpack";
import {
  dtsBundleGeneratorPlugin,
  DtsBundleGeneratorWebpackPlugin,
  DtsBundleGeneratorPluginConfig,
} from "./dtsBundleGeneratorPlugin";
import {
  MoveFilesIntoDistFolderPlugin,
  MoveFilesIntoDistFolderPluginOptions,
} from "./MoveFilesIntoDistFolderPlugin";

export const plugins = {
  ...basePlugins,
  dtsBundleGeneratorPlugin,
  MoveFilesIntoDistFolderPlugin,
};

export {
  dtsBundleGeneratorPlugin,
  DtsBundleGeneratorWebpackPlugin,
  MoveFilesIntoDistFolderPlugin,
};
export type {
  DtsBundleGeneratorPluginConfig,
  MoveFilesIntoDistFolderPluginOptions,
};
