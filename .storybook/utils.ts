import path from "path";

export const convertTsConfigPathsToWebpackAliases = () => {
  const rootDir = path.resolve(__dirname, "../");
  const tsconfig = require("../tsconfig.json");
  const tsconfigPaths = Object.entries(tsconfig.compilerOptions.paths);
  const paths = tsconfigPaths.reduce((aliases, [realPath, mappedPath]: any) => {
    const packageName = mappedPath[0].split("/")[5];
    const alias = `${mappedPath[0]}/${packageName}.tsx`;
    aliases[realPath] = path.join(rootDir, alias);
    return aliases;
  }, {});
  return paths;
};
