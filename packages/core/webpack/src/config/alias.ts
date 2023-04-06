/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 * @see https://webpack.js.org/configuration/dev-server/
 */

import { join } from "path";
import { utils } from "@nimbus-ds/webpack";

import tsconfig from "../../../../../tsconfig.json";

const tsconfigPaths = tsconfig.compilerOptions.paths as {
  [key: string]: string[];
};

const packages = Object.keys(tsconfigPaths).reduce(
  (prev: { [key: string]: string }, curr) => {
    const path = join(utils.rootDir, tsconfigPaths[curr][0]);
    prev[curr] = path;
    return prev;
  },
  {}
);

export const aliasItems = packages;
