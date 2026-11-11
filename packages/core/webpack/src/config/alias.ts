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

const pathKeys = Object.keys(tsconfigPaths);

/**
 * Longest keys first so subpath aliases (e.g. `@nimbus-ds/patterns/next`)
 * always precede their parent (`@nimbus-ds/patterns`). Parents that have
 * subpaths also get an exact match (`$`) to avoid prefix collisions.
 */
const packages = [...pathKeys]
  .sort((a, b) => b.length - a.length)
  .reduce((prev: { [key: string]: string }, curr) => {
    const path = join(utils.rootDir, tsconfigPaths[curr][0]);
    if (pathKeys.some((key) => key.startsWith(`${curr}/`))) {
      prev[`${curr}$`] = path;
    }
    prev[curr] = path;
    return prev;
  }, {});

export const aliasItems = packages;
